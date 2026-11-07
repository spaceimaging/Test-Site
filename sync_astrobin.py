#!/usr/bin/env python3
"""
AstroBin Automated Gallery Importer for AstroArchive
----------------------------------------------------
- Connects directly to AstroBin's public v2 JSON endpoint (no API keys required).
- Enforces a strict limit of at most 5 images per session.
- Automatically skips images already present in `catalog.js`.
- Downloads high-resolution QHD plates and generates centered high-res crops.

Usage:
  # Import the next 5 unimported images from your AstroBin gallery:
  python3 sync_astrobin.py --push

  # Import a smaller batch (e.g., 3 images) from your gallery:
  python3 sync_astrobin.py --count 3 --push

  # Import specific AstroBin URLs or hashes (up to 5 max):
  python3 sync_astrobin.py https://www.astrobin.com/wsnb0p/ --push
"""

import argparse
import datetime
import json
import os
import re
import struct
import subprocess
import sys
import urllib.parse
import urllib.request
from collections import OrderedDict

DEFAULT_USER_ID = 101282  # Rafal_Szwejkowski
MAX_IMAGES_PER_SESSION = 5

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_PATH = os.path.join(BASE_DIR, "catalog.js")
IMAGES_DIR = os.path.join(BASE_DIR, "images")

IAU_CONSTELLATIONS = {
    "And": "Andromeda", "Ant": "Antlia", "Aps": "Apus", "Aqr": "Aquarius",
    "Aql": "Aquila", "Ara": "Ara", "Ari": "Aries", "Aur": "Auriga",
    "Boo": "Boötes", "Cae": "Caelum", "Cam": "Camelopardalis", "Cnc": "Cancer",
    "CVn": "Canes Venatici", "CMa": "Canis Major", "CMi": "Canis Minor",
    "Cap": "Capricornus", "Car": "Carina", "Cas": "Cassiopeia", "Cen": "Centaurus",
    "Cep": "Cepheus", "Cet": "Cetus", "Cha": "Chamaeleon", "Cir": "Circinus",
    "Col": "Columba", "Com": "Coma Berenices", "CrA": "Corona Australis",
    "CrB": "Corona Borealis", "Crv": "Corvus", "Crt": "Crater", "Cru": "Crux",
    "Cyg": "Cygnus", "Del": "Delphinus", "Dor": "Dorado", "Dra": "Draco",
    "Equ": "Equuleus", "Eri": "Eridanus", "For": "Fornax", "Gem": "Gemini",
    "Gru": "Grus", "Her": "Hercules", "Hor": "Horologium", "Hya": "Hydra",
    "Hyi": "Hydrus", "Ind": "Indus", "Lac": "Lacerta", "Leo": "Leo",
    "LMi": "Leo Minor", "Lep": "Lepus", "Lib": "Libra", "Lup": "Lupus",
    "Lyn": "Lynx", "Lyr": "Lyra", "Men": "Mensa", "Mic": "Microscopium",
    "Mon": "Monoceros", "Mus": "Musca", "Nor": "Norma", "Oct": "Octans",
    "Oph": "Ophiuchus", "Ori": "Orion", "Pav": "Pavo", "Peg": "Pegasus",
    "Per": "Perseus", "Phe": "Phoenix", "Pic": "Pictor", "Psc": "Pisces",
    "PsA": "Piscis Austrinus", "Pup": "Puppis", "Pyx": "Pyxis", "Ret": "Reticulum",
    "Sge": "Sagitta", "Sgr": "Sagittarius", "Sco": "Scorpius", "Scl": "Sculptor",
    "Sct": "Scutum", "Ser": "Serpens", "Sex": "Sextans", "Tau": "Taurus",
    "Tel": "Telescopium", "Tri": "Triangulum", "TrA": "Triangulum Australe",
    "Tuc": "Tucana", "UMa": "Ursa Major", "UMi": "Ursa Minor", "Vel": "Vela",
    "Vir": "Virgo", "Vol": "Volans", "Vul": "Vulpecula"
}


def fetch_json(url):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def download_file(url, dest_path):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp, open(dest_path, "wb") as out:
        out.write(resp.read())


def load_catalog():
    if not os.path.exists(CATALOG_PATH):
        return []
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r"const\s+astroCatalog\s*=\s*(\[.*\])\s*;", content, re.DOTALL)
    if not match:
        raise ValueError("Could not parse astroCatalog array in catalog.js")
    return json.loads(match.group(1))


def update_index_html_version():
    index_path = os.path.join(BASE_DIR, "index.html")
    if not os.path.exists(index_path):
        return
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()
    new_version = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    html = re.sub(
        r'<script\s+src="catalog\.js(?:\?[^"]*)?"\s*></script>',
        f'<script src="catalog.js?v={new_version}"></script>',
        html
    )
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)


def save_catalog(catalog):
    update_index_html_version()
    header = (
        "/**\n"
        " * Astrophotography Observational Archive - Target Catalog Data\n"
        " *\n"
        " * Managed automatically by `sync_astrobin.py` (or edit manually).\n"
        " * Each session imports at most 5 new images from AstroBin.\n"
        " */\n\n"
        "const astroCatalog = "
    )
    body = json.dumps(catalog, indent=2, ensure_ascii=False)
    with open(CATALOG_PATH, "w", encoding="utf-8") as f:
        f.write(header + body + ";\n")


def format_ra_dec(ra_deg, dec_deg):
    if ra_deg is None or dec_deg is None:
        return "Coordinates pending plate solution"
    ra_deg = float(ra_deg)
    dec_deg = float(dec_deg)
    ra_hours = ra_deg / 15.0
    rh = int(ra_hours)
    rm = int((ra_hours - rh) * 60)
    rs = ((ra_hours - rh) * 60 - rm) * 60

    sign = "+" if dec_deg >= 0 else "−"
    abs_dec = abs(dec_deg)
    dd = int(abs_dec)
    dm = int((abs_dec - dd) * 60)
    ds = ((abs_dec - dd) * 60 - dm) * 60
    return f"RA {rh:02d}h {rm:02d}m {rs:04.1f}s | Dec {sign}{dd:02d}° {dm:02d}′ {ds:04.1f}″"


def detect_category(img):
    title = (img.get("title") or "").lower()
    themes = [t.upper() for t in (img.get("explorationThemes") or [])]
    sol = img.get("solution") or {}
    subjects = (sol.get("objectsInField") or "").lower()

    planetary_keywords = [
        "planetary nebula", "planetary", " pn ", "pn g", "pk ", "abell 61",
        "abell 39", "abell 36", "abell 43", "abell 70", "abell 78", "patchick",
        "m27", "m57", "m76", "m97", "ngc 6543", "ngc 7293", "ngc 7009",
        "ngc 7662", "ngc 6826", "ngc 6781", "ngc 2392", "ngc 1514", "ngc 3587",
        "ngc 6884", "ngc 6886", "ngc 6891", "ngc 6803", "ngc 6804", "ngc 6807",
        "ngc 6818", "ngc 6826", "ngc 6833", "ngc 6842", "jones 1", "ring nebula",
        "dumbbell", "helix", "owl nebula", "cat's eye", "saturn nebula", "little dumb"
    ]
    nebula_keywords = [
        "nebula", "sh2-", "sh 2-", "sharpless", "lbn", "ldn", "vdb", "ic 63",
        "ic 59", "ic 1396", "ic 1805", "ic 1848", "ngc 7000", "ngc 6888",
        "ngc 281", "ngc 1499", "ngc 2237", "ngc 6960", "ngc 6992", "abell",
        "snr", "veil", "rosette", "pelican", "clamshell", "poppy", "ghost",
        "gecko", "wizard", "heart", "soul", "california", "bubble", "crescent",
        "tulip", "iris", "elephant", "cave", "pacman", "squid", "bat"
    ]
    galaxy_keywords = [
        "galaxy", "galaxies", "arp ", "arp91", "m31", "m33", "m51", "m63",
        "m64", "m74", "m81", "m82", "m87", "m94", "m101", "m104", "m106",
        "makarian", "markarian", "stephan", "hikson", "hickson", "ugc", "pgc"
    ]
    cluster_keywords = [
        "globular", "open cluster", "star cluster", "m13", "m3", "m5", "m15",
        "m92", "m2", "m53", "m45", "pleiades", "hyades", "double cluster",
        "ngc 2419", "ngc 869", "ngc 884", "ngc 7789", "ngc 188"
    ]

    for kw in planetary_keywords:
        if kw in title:
            return "planetary-nebulae"
    for kw in galaxy_keywords:
        if kw in title:
            return "galaxies"
    for kw in cluster_keywords:
        if kw in title:
            return "clusters"
    for kw in nebula_keywords:
        if kw in title:
            return "nebulae"

    if any("PLANETARY" in t for t in themes):
        return "planetary-nebulae"
    if any("NEBULA" in t or "SUPERNOVA" in t or "HUBBLE_PALETTE" in t or "NARROWBAND" in t for t in themes):
        return "nebulae"
    if any("GALAX" in t for t in themes):
        return "galaxies"
    if "STAR_CLUSTERS" in themes or "GLOBULAR" in themes:
        return "clusters"

    if "ngc" in title and ("f/8" in str(img.get("imagingTelescopes2")) or "ritchey" in str(img.get("imagingTelescopes2")).lower()):
        return "galaxies"
    return "nebulae"


def format_duration_hm(seconds):
    hrs = int(seconds // 3600)
    mins = int(round((seconds % 3600) / 60))
    if mins == 60:
        hrs += 1
        mins = 0
    if hrs > 0 and mins > 0:
        return f"{hrs}h {mins:02d}m"
    elif hrs > 0:
        return f"{hrs}h 00m"
    return f"{mins}m"


def build_exposure_breakdown(img):
    acqs = img.get("deepSkyAcquisitions") or []
    if not acqs:
        return ("<span class='text-white font-semibold'>Light Frames</span>", "N/A", "N/A")

    groups = OrderedDict()
    total_sec = 0.0
    dates = sorted(set(a.get("date") for a in acqs if a.get("date")))

    for a in acqs:
        num = int(a.get("number") or 0)
        dur = float(a.get("duration") or 0)
        if num <= 0 or dur <= 0:
            continue
        total_sec += num * dur

        ftype = (a.get("filter2Type") or "").upper()
        fname = a.get("filter2Name") or ""

        if ftype in ("H_ALPHA", "HA") or "h-alpha" in fname.lower() or "ha" in fname.lower():
            label, color = "Ha", "text-[#e06060]"
        elif ftype == "OIII" or "oxygen" in fname.lower() or "oiii" in fname.lower():
            label, color = "OIII", "text-[#5ce0d8]"
        elif ftype == "SII" or "sulfur" in fname.lower() or "sii" in fname.lower():
            label, color = "SII", "text-[#f59e0b]"
        elif "alp-t" in fname.lower() or "dual" in fname.lower() or ftype == "DUAL_BAND":
            label, color = "Dual-Band (Ha/OIII)", "text-[#e06060]"
        elif ftype in ("L", "LUM", "CLEAR") or "luminance" in fname.lower() or "uv/ir" in fname.lower() or "clear" in fname.lower():
            label, color = "Luminance", "text-white"
        elif ftype == "R" or "red" in fname.lower():
            label, color = "Red", "text-[#e06060]"
        elif ftype == "G" or "green" in fname.lower():
            label, color = "Green", "text-[#4ade80]"
        elif ftype == "B" or "blue" in fname.lower():
            label, color = "Blue", "text-[#38bdf8]"
        elif fname:
            label, color = fname, "text-white"
        else:
            label, color = "OSC Light", "text-white"

        key = (label, color, int(dur))
        groups[key] = groups.get(key, 0) + num

    parts = []
    for (label, color, dur), count in groups.items():
        sub_sec = count * dur
        parts.append(
            f"<span class='{color} font-semibold'>{label}:</span> {count} × {dur}s ({format_duration_hm(sub_sec)})"
        )

    breakdown_html = " &bull; ".join(parts)
    total_str = format_duration_hm(total_sec)

    # Format dates nicely
    if dates:
        parsed_dates = [datetime.date.fromisoformat(d) for d in dates]
        if len(parsed_dates) <= 4:
            date_str = ", ".join(d.strftime("%b %-d, %Y") for d in parsed_dates)
        else:
            first_d = parsed_dates[0].strftime("%b %-d, %Y")
            last_d = parsed_dates[-1].strftime("%b %-d, %Y")
            date_str = f"{first_d} – {last_d} ({len(parsed_dates)} nights)"
    else:
        date_str = "Published " + (img.get("published") or "")[:10]

    moon_age = img.get("averageMoonAge")
    moon_illum = img.get("averageMoonIllumination")
    if moon_age is not None and moon_illum is not None:
        date_str += f" &bull; Avg Moon Age: {float(moon_age):.1f}d (Phase: {float(moon_illum)*100:.0f}%)"

    return breakdown_html, total_str, date_str


def generate_crop_from_image(img_path, crop_path, square_cropping, orig_w, orig_h):
    """Creates a 620x560 high-res crop centered on AstroBin's squareCropping region."""
    tmp_bmp = f"/tmp/astro_crop_{os.getpid()}.bmp"
    tmp_out_bmp = f"/tmp/astro_crop_out_{os.getpid()}.bmp"
    try:
        subprocess.run(
            ["sips", "-s", "format", "bmp", img_path, "--out", tmp_bmp],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
        )
        with open(tmp_bmp, "rb") as f:
            f.seek(18)
            w, h = struct.unpack("<ii", f.read(8))
            f.seek(54)
            data = f.read()

        abs_h = abs(h)
        cx, cy = w // 2, abs_h // 2

        if square_cropping and orig_w and orig_h:
            try:
                x1, y1, x2, y2 = [float(v) for v in square_cropping.split(",")]
                cx = int(((x1 + x2) / 2.0) * (w / float(orig_w)))
                cy = int(((y1 + y2) / 2.0) * (abs_h / float(orig_h)))
            except Exception:
                pass

        cw = min(620, w)
        ch = min(560, abs_h)
        start_x = max(0, min(w - cw, cx - cw // 2))
        start_y = max(0, min(abs_h - ch, cy - ch // 2))

        row_padded = (w * 3 + 3) & (~3)
        crop_padded = (cw * 3 + 3) & (~3)
        crop_data = bytearray(crop_padded * ch)

        for dy in range(ch):
            src_y = start_y + dy
            src_row_idx = (h - 1 - src_y) if h > 0 else src_y
            src_start = src_row_idx * row_padded
            dst_row_idx = ch - 1 - dy
            dst_start = dst_row_idx * crop_padded
            crop_data[dst_start : dst_start + cw * 3] = data[
                src_start + start_x * 3 : src_start + (start_x + cw) * 3
            ]

        file_size = 54 + len(crop_data)
        bmp_header = struct.pack("<2sIHHI", b"BM", file_size, 0, 0, 54)
        dib_header = struct.pack(
            "<IIIHHIIIIII", 40, cw, ch, 1, 24, 0, len(crop_data), 2835, 2835, 0, 0
        )
        with open(tmp_out_bmp, "wb") as out_f:
            out_f.write(bmp_header + dib_header + crop_data)

        subprocess.run(
            ["sips", "-s", "format", "jpeg", tmp_out_bmp, "--out", crop_path],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
        )
    finally:
        for p in (tmp_bmp, tmp_out_bmp):
            if os.path.exists(p):
                os.remove(p)


def build_catalog_entry(img):
    img_hash = img.get("hash") or str(img.get("pk"))
    title = (img.get("title") or f"Target {img_hash}").strip()
    sol = img.get("solution") or {}
    objects_in_field = sol.get("objectsInField") or ""
    designation = objects_in_field if objects_in_field else title

    const_code = img.get("constellation") or ""
    constellation = IAU_CONSTELLATIONS.get(const_code, const_code or "Deep Sky")

    coords = format_ra_dec(sol.get("ra"), sol.get("dec"))

    telescopes = [
        f"{t.get('brandName', '')} {t.get('name', '')}".strip()
        for t in (img.get("imagingTelescopes2") or [])
    ]
    optics = " &bull; ".join(telescopes) if telescopes else "Observatory Imaging Telescope"

    mounts = [
        f"{m.get('brandName', '')} {m.get('name', '')}".strip()
        for m in (img.get("mounts2") or [])
    ]
    mount_str = " &bull; ".join(mounts) if mounts else "Equatorial GoTo Mount"

    cameras = [
        f"{c.get('brandName', '')} {c.get('name', '')}".strip()
        for c in (img.get("imagingCameras2") or [])
    ]
    cam_str = " &bull; ".join(cameras) if cameras else "Cooled Astronomy Camera"
    pixscale = sol.get("pixscale") or sol.get("pixelScale")
    orientation = sol.get("orientation")
    if pixscale:
        cam_str += f" &bull; Pixel scale: {float(pixscale):.3f}\"/pixel"
    if orientation is not None:
        cam_str += f" &bull; Orientation: {float(orientation):.2f}°"

    breakdown_html, total_str, date_str = build_exposure_breakdown(img)

    accessories = [
        f"{a.get('brandName', '')} {a.get('name', '')}".strip()
        for a in (img.get("accessories2") or [])
    ]
    software_list = [
        f"{s.get('brandName', '')} {s.get('name', '')}".strip()
        for s in (img.get("software2") or [])
    ]
    sw_parts = accessories + (software_list if software_list else ["PixInsight"])
    software_str = " &bull; ".join(sw_parts)

    w = img.get("w") or 0
    h = img.get("h") or 0
    upload_len = img.get("uploaderUploadLength") or 0
    size_mb = f" (File size: {upload_len / (1024*1024):.1f} MB)" if upload_len else ""
    res_str = f"{w} x {h} px{size_mb}" if (w and h) else "Full Resolution Master"

    radius = sol.get("radius")
    fov_parts = []
    if radius:
        fov_parts.append(f"Field radius: {float(radius):.3f}°")
    if pixscale:
        fov_parts.append(f"Pixel scale: {float(pixscale):.3f}\"/pixel")
    if orientation is not None:
        fov_parts.append(f"Orientation: {float(orientation):.2f}°")
    fov_str = " &bull; ".join(fov_parts) if fov_parts else "Plate solved field"

    desc_html = (img.get("descriptionHtml") or "").strip()
    if desc_html:
        # Clean outer <p> tags into <br><br> for consistent styling
        notes = re.sub(r"</p>\s*<p>", "<br><br>", desc_html)
        notes = re.sub(r"^<p>|</p>$", "", notes).strip()
    else:
        notes = f"Deep-sky integration of <strong>{title}</strong> in {constellation}."
        if objects_in_field:
            notes += f" Prominent catalogued objects in field: {objects_in_field}."

    # Find best image URL (prefer qhd 2560px, then hd 1824px, then regular)
    thumbs = {t.get("alias"): t.get("url") for t in (img.get("thumbnails") or [])}
    img_url = thumbs.get("qhd") or thumbs.get("hd") or thumbs.get("regular")
    if not img_url and img.get("thumbnails"):
        img_url = img["thumbnails"][-1].get("url")

    os.makedirs(IMAGES_DIR, exist_ok=True)
    main_rel = f"images/{img_hash}.jpg"
    crop_rel = f"images/{img_hash}_crop.jpg"
    main_abs = os.path.join(BASE_DIR, main_rel)
    crop_abs = os.path.join(BASE_DIR, crop_rel)

    print(f"  -> Downloading QHD image for [{img_hash}] {title}...")
    download_file(img_url, main_abs)

    print(f"  -> Generating high-resolution crop for [{img_hash}]...")
    generate_crop_from_image(
        main_abs, crop_abs, img.get("squareCropping"), w, h
    )

    return {
        "id": img_hash,
        "astrobinHash": img_hash,
        "category": detect_category(img),
        "name": title,
        "designation": designation,
        "constellation": constellation,
        "coords": coords,
        "optics": optics,
        "mount": mount_str,
        "camera": cam_str,
        "exposureBreakdown": breakdown_html,
        "totalTime": total_str,
        "dates": date_str,
        "software": software_str,
        "resolution": res_str,
        "fov": fov_str,
        "notes": notes,
        "mainImage": main_rel,
        "crops": [
            {
                "title": f"{title} — Region of Interest (High Resolution Crop)",
                "image": crop_rel,
                "description": f"Full-scale detail inspection at {float(pixscale):.3f}\"/pixel." if pixscale else "Magnified view of the primary target structure."
            }
        ]
    }


def extract_hash_from_arg(arg):
    arg = arg.strip()
    m = re.search(r"astrobin\.com/(?:full/)?([a-zA-Z0-9]{5,8})/?", arg)
    if m and m.group(1).lower() not in ("users", "iotd", "search", "forum"):
        return m.group(1)
    if re.match(r"^[a-zA-Z0-9]{5,8}$", arg):
        return arg
    return None


def main():
    parser = argparse.ArgumentParser(description="Sync up to 5 images per session from AstroBin.")
    parser.add_argument("targets", nargs="*", help="Optional AstroBin image URLs, hashes, or user gallery URL.")
    parser.add_argument("--count", type=int, default=MAX_IMAGES_PER_SESSION, help="Number of images to import (max 5).")
    parser.add_argument("--user-id", type=int, default=DEFAULT_USER_ID, help="AstroBin numeric user ID.")
    parser.add_argument("--push", action="store_true", help="Automatically git commit and push after importing.")
    args = parser.parse_args()

    limit = max(1, min(args.count, MAX_IMAGES_PER_SESSION))
    if args.count > MAX_IMAGES_PER_SESSION:
        print(f"[Notice] Capping session import count to {MAX_IMAGES_PER_SESSION} images max.")

    catalog = load_catalog()
    existing_hashes = {
        (item.get("astrobinHash") or item.get("id")) for item in catalog
    }

    specific_hashes = []
    for t in args.targets:
        h = extract_hash_from_arg(t)
        if h:
            specific_hashes.append(h)

    imported_entries = []

    if specific_hashes:
        for h in specific_hashes[:limit]:
            if h in existing_hashes:
                print(f"[Skip] {h} is already in catalog.js")
                continue
            url = f"https://app.astrobin.com/api/v2/images/image/?hash={h}"
            data = fetch_json(url)
            results = data.get("results") or []
            if not results:
                print(f"[Warning] No image found for hash {h}")
                continue
            entry = build_catalog_entry(results[0])
            imported_entries.append(entry)
            existing_hashes.add(h)
    else:
        print(f"Scanning AstroBin gallery (user={args.user_id}) for up to {limit} new images...")
        page = 1
        while len(imported_entries) < limit:
            url = f"https://app.astrobin.com/api/v2/images/image/?user={args.user_id}&page={page}"
            try:
                data = fetch_json(url)
            except Exception as e:
                print(f"Stopped at page {page}: {e}")
                break

            results = data.get("results") or []
            if not results:
                break

            for img in results:
                h = img.get("hash") or str(img.get("pk"))
                title = img.get("title")
                if h in existing_hashes or title in {c.get("name") for c in catalog}:
                    print(f"  [Page {page}] Skipping already-imported: {h} ({title})")
                    continue

                print(f"  [Page {page}] Importing ({len(imported_entries)+1}/{limit}): {h} — {title}")
                entry = build_catalog_entry(img)
                imported_entries.append(entry)
                existing_hashes.add(h)
                if len(imported_entries) >= limit:
                    break

            if not data.get("next"):
                break
            page += 1

    if not imported_entries:
        print("No new images imported in this session.")
        return

    # Prepend or append? Keeping newest additions easily visible while preserving existing order:
    catalog.extend(imported_entries)
    save_catalog(catalog)
    print(f"\nSuccessfully added {len(imported_entries)} image(s) to catalog.js!")

    if args.push:
        print("Committing and pushing to GitHub...")
        subprocess.run(["git", "add", "catalog.js", "index.html", "images/"], cwd=BASE_DIR, check=True)
        titles = ", ".join(e["id"] for e in imported_entries)
        subprocess.run(
            ["git", "commit", "-m", f"Import {len(imported_entries)} AstroBin image(s): {titles}"],
            cwd=BASE_DIR, check=True
        )
        subprocess.run(["git", "push", "origin", "main"], cwd=BASE_DIR, check=True)
        print("Pushed live to GitHub Pages!")


if __name__ == "__main__":
    main()
