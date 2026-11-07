/**
 * Astrophotography Observational Archive - Target Catalog Data
 *
 * Managed automatically by `sync_astrobin.py` (or edit manually).
 * Each session imports at most 5 new images from AstroBin.
 */

const astroCatalog = [
  {
    "id": "ic63",
    "astrobinHash": "tc332r",
    "category": "nebulae",
    "name": "The Ghost of Cassiopeia and Gamma Cas (IC 63)",
    "designation": "IC 63 / Sh2-185 / Ghost of Cassiopeia & γ Cas",
    "constellation": "Cassiopeia",
    "coords": "RA 00h 59m 49s | Dec +60° 54′ 00″",
    "optics": "GSO 10\" F/4 Carbon Imaging Newtonian (1000mm, with 0.86x Reducer at 860mm f/3.44)",
    "mount": "ZWO AM5N Harmonic Mount &bull; ZWO OAG-L",
    "camera": "ZWO ASI2600MC Pro &bull; Pixel scale: 0.899\"/pixel &bull; Orientation: 178.81°",
    "exposureBreakdown": "<span class='text-white font-semibold'>OSC Light:</span> 224 × 120s (7h 28m total)",
    "totalTime": "7h 28m",
    "dates": "Sep 11, 15, 19, 2026 &bull; Avg Moon Age: 4.24d (Phase: ~25%)",
    "software": "Sky-Watcher 0.86x Coma Corrector &bull; ZWO EFW 5 x 2\" &bull; PixInsight",
    "resolution": "5925 x 4000 px (File size: 14.7 MB)",
    "fov": "Field radius: 0.893° &bull; Pixel scale: 0.899\"/pixel &bull; Orientation: 178.81°",
    "notes": "Cassiopeia Ghost with brilliant Gamma Cas just in time for the Halloween season.<br><br><strong>IC 63</strong> (popularly dubbed the 'Ghost of Cassiopeia') is a luminous veil of emission and reflection nebulosity, sculpted and intensely ionized by the fierce ultraviolet output of nearby eruptive variable hypergiant star <strong>Gamma Cassiopeiae (Navi)</strong>. The ghostly shape glows in filamentary hydrogen-alpha crimson, with dust reflection wrapping around the blazing stellar glare.",
    "mainImage": "images/ic63.jpg",
    "crops": [
      {
        "title": "IC 63 'The Ghost' Ionization Veil (High Resolution Crop)",
        "image": "images/ic63_crop.jpg",
        "description": "Delicate ghostly filamentary boundary of IC 63 sculpted by intense stellar ultraviolet radiation."
      },
      {
        "title": "Gamma Cassiopeiae (Navi) Star Field (High Resolution Crop)",
        "image": "images/gammacas_crop.jpg",
        "description": "Brilliant B0.5 IVe variable star Gamma Cas with Newtonian 4-vane diffraction spikes and surrounding dust."
      }
    ]
  },
  {
    "id": "arp91",
    "astrobinHash": "yninph",
    "category": "galaxies",
    "name": "Arp 91 & NGC 5951",
    "designation": "Arp 91 (NGC 5953 / NGC 5954) & NGC 5951",
    "constellation": "Serpens Caput",
    "coords": "RA 15h 34m 16.37s | Dec +15° 05′ 37.8″",
    "optics": "GSO 8\" f/8 Ritchey-Chretien (1600mm focal length, f/8)",
    "mount": "ZWO AM5N Harmonic Mount &bull; ZWO OAG-L",
    "camera": "ZWO ASI533MM Pro &bull; Pixel scale: 0.658\"/pixel &bull; Orientation: 0.012°",
    "exposureBreakdown": "<span class='text-white font-semibold'>Luminance:</span> 70 × 300s (5h 50m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 31 × 180s (1h 33m) &bull; <span class='text-[#4ade80] font-semibold'>Green:</span> 31 × 180s (1h 33m) &bull; <span class='text-[#38bdf8] font-semibold'>Blue:</span> 28 × 180s (1h 24m)",
    "totalTime": "10h 20m",
    "dates": "Mar 29–30, Apr 3–4, 7, 9, 23 2025 &bull; Avg Moon Age: 4.86d (Phase: 37.94%)",
    "software": "PixInsight &bull; WCS: DDM Thin Plate Spline",
    "resolution": "2967 x 2548 px (File size: 3.3 MB)",
    "fov": "Field radius: 0.358° &bull; Pixel scale: 0.658\"/pixel &bull; Orientation: 0.012°",
    "notes": "Arp 91 is a pair of interacting galaxies, ~100 Mly distant, both ca. 12 mag.<br><br><strong>NGC 5953</strong> (below) is the face-on one appears \"amorphous\" with a central bulge and tightly wound spiral arms. It acts as the dominant gravitational force in the pair.<br><br><strong>NGC 5954</strong> (top) is inclined, with a bar structure, and looser spiral arms. It is being visibly distorted by its larger companion and there's a tidal bridge between the galaxies, made of stars, gas and dust.<br><br>Immediately below is a faint galaxy <strong>PGC 55478</strong>. It is mag. 17 and is at the limits of my RC8's reach when it comes to extended sources.<br><br>At the bottom-right we see an edge-on galaxy <strong>NGC 5951</strong>.",
    "mainImage": "images/arp91.jpg",
    "crops": [
      {
        "title": "Arp 91 Interacting Pair (NGC 5953 & NGC 5954)",
        "image": "images/arp91_crop.jpg",
        "description": "High resolution view of the distorted spiral arms and tidal bridge between the galaxies."
      },
      {
        "title": "NGC 5951 Edge-On Spiral Galaxy",
        "image": "images/ngc5951_crop.jpg",
        "description": "Slender edge-on spiral galaxy showing disk structure and dust absorption."
      }
    ]
  },
  {
    "id": "ngc2419",
    "astrobinHash": "rsr9uk",
    "category": "clusters",
    "name": "NGC 2419 (Intergalactic Wanderer)",
    "designation": "NGC 2419 / Caldwell 25 / GCl 12",
    "constellation": "Lynx",
    "coords": "RA 07h 37m 57.77s | Dec +38° 52′ 49.3″",
    "optics": "GSO 10\" f/8 Ritchey-Chretien (2000mm focal length, f/8)",
    "mount": "Sky-Watcher EQ6-Ri Pro &bull; ZWO OAG-L &bull; ZWO CAA Camera Angle Adjuster",
    "camera": "ZWO ASI2600MM Pro &bull; Pixel scale: 0.385\"/pixel &bull; Orientation: 45.04°",
    "exposureBreakdown": "<span class='text-white font-semibold'>Luminance:</span> 52 × 300s (4h 20m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 41 × 300s (3h 25m) &bull; <span class='text-[#4ade80] font-semibold'>Green:</span> 31 × 300s (2h 35m) &bull; <span class='text-[#38bdf8] font-semibold'>Blue:</span> 28 × 300s (2h 20m)",
    "totalTime": "12h 40m",
    "dates": "Apr 2–3 2023, Apr 11 2025, Apr 3, 19–20, 29 2026 &bull; Avg Moon Age: 11.11d (Phase: 69.96%)",
    "software": "ZWO EFW 7 x 2\" &bull; PixInsight &bull; WCS: DDM Thin Plate Spline",
    "resolution": "5811 x 3675 px (File size: 11.8 MB)",
    "fov": "Field radius: 0.368° &bull; Pixel scale: 0.385\"/pixel &bull; Orientation: 45.04°",
    "notes": "NGC 2419 (Caldwell 25), dubbed the 'Intergalactic Wanderer' by astronomer Harlow Shapley, is one of the most distant and intrinsically luminous globular clusters associated with the Milky Way. Located roughly 300,000 light-years from Earth and the Galactic Center—farther out than the Magellanic Clouds—it takes approximately 3 billion years to complete a single galactic orbit. Captured through a 10\" Ritchey-Chrétien telescope at a high resolution of 0.385 arcsec/pixel, revealing the dense stellar swarm of aging Population II stars surrounded by an array of distant background field stars and faint galaxies.",
    "mainImage": "images/ngc2419.jpg",
    "crops": [
      {
        "title": "NGC 2419 Cluster Core & Stellar Halo (High Resolution Crop)",
        "image": "images/ngc2419_crop.jpg",
        "description": "Magnified view of the dense central core resolved with the 10\" RC at 0.385\"/pixel."
      }
    ]
  },
  {
    "id": "wsnb0p",
    "astrobinHash": "wsnb0p",
    "category": "nebulae",
    "name": "Sh2-119 Clamshell Nebula",
    "designation": "NGC 7044, The star 68 Cyg",
    "constellation": "Cygnus",
    "coords": "RA 21h 19m 21.8s | Dec +43° 57′ 21.6″",
    "optics": "William Optics Fluorostar 91 / FLT91",
    "mount": "Sky-Watcher EQ6-Ri Pro",
    "camera": "ZWO ASI2600MM Pro &bull; ZWO ASI6200MM Pro &bull; Pixel scale: 1.791\"/pixel &bull; Orientation: 48.49°",
    "exposureBreakdown": "<span class='text-[#f59e0b] font-semibold'>SII:</span> 58 × 300s (4h 50m) &bull; <span class='text-[#e06060] font-semibold'>Ha:</span> 81 × 300s (6h 45m) &bull; <span class='text-[#5ce0d8] font-semibold'>OIII:</span> 37 × 300s (3h 05m) &bull; <span class='text-[#38bdf8] font-semibold'>Blue:</span> 17 × 120s (34m) &bull; <span class='text-[#4ade80] font-semibold'>Green:</span> 16 × 120s (32m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 24 × 120s (48m) &bull; <span class='text-[#e06060] font-semibold'>Ha:</span> 89 × 900s (22h 15m) &bull; <span class='text-[#f59e0b] font-semibold'>SII:</span> 49 × 900s (12h 15m) &bull; <span class='text-[#5ce0d8] font-semibold'>OIII:</span> 40 × 900s (10h 00m)",
    "totalTime": "61h 04m",
    "dates": "Jun 10, 2023 – Sep 18, 2026 (21 nights) &bull; Avg Moon Age: 7.5d (Phase: 50%)",
    "software": "William Optics UltraFlat 91 .79x &bull; ZWO EFW 7 x 2″ &bull; ZWO OAG-L &bull; Pleiades Astrophoto PixInsight &bull; Stefan Berg Nighttime Imaging 'N' Astronomy (N.I.N.A. / NINA)",
    "resolution": "8820 x 5983 px (File size: 23.8 MB)",
    "fov": "Field radius: 2.651° &bull; Pixel scale: 1.791\"/pixel &bull; Orientation: 48.49°",
    "notes": "Located at 2200 ly away from us, Sh2-119 was initially a site of major star formation activity.  But once the central O-type blue supergiant formed, the pressure of its radiation and stellar winds pushed apart and ionized the gaseous cloud, resulting in the markedly bipolar clamshell shape.",
    "mainImage": "images/wsnb0p.jpg",
    "crops": [
      {
        "title": "Sh2-119 Clamshell Nebula — Region of Interest (High Resolution Crop)",
        "image": "images/wsnb0p_crop.jpg",
        "description": "Full-scale detail inspection at 1.791\"/pixel."
      }
    ]
  },
  {
    "id": "llkarc",
    "astrobinHash": "llkarc",
    "category": "nebulae",
    "name": "Sh2-140 - The Poppy Flower Nebula",
    "designation": "The star 25 Cep",
    "constellation": "Cepheus",
    "coords": "RA 22h 16m 50.9s | Dec +63° 08′ 16.8″",
    "optics": "GSO 10\" F/4 Carbon Imaging Newtonian",
    "mount": "ZWO AM5N",
    "camera": "ZWO ASI2600MC Pro &bull; Pixel scale: 0.896\"/pixel &bull; Orientation: 178.07°",
    "exposureBreakdown": "<span class='text-[#e06060] font-semibold'>Dual-Band (Ha/OIII):</span> 30 × 600s (5h 00m) &bull; <span class='text-white font-semibold'>Luminance:</span> 69 × 300s (5h 45m)",
    "totalTime": "10h 45m",
    "dates": "Sep 22, 2026, Sep 23, 2026 &bull; Avg Moon Age: 11.1d (Phase: 86%)",
    "software": "Sky-Watcher 0.86x Coma Corrector for Quattro 150P (P150F600/F4) &bull; ZWO EFW 5 x 2\" &bull; ZWO OAG-L &bull; PixInsight",
    "resolution": "5999 x 4002 px (File size: 14.0 MB)",
    "fov": "Field radius: 0.897° &bull; Pixel scale: 0.896\"/pixel &bull; Orientation: 178.07°",
    "notes": "Sh2-140 the Poppy Flower visually resembles the Sh2-101 Tulip.  But there are differences between these red flowers: </p><ul><li><p>there’s only one ionizing star vs multiple O stars in the Tulip</p></li><li><p>the Tulip is twice as far at 6k LY, vs 3k LY for the Poppy</p></li><li><p>the OIII signal in the Tulip is much stronger.</p></li><li><p>there’s substantial dust presence in Sh2-140 while the Tulip is mostly an emission target</p></li></ul>",
    "mainImage": "images/llkarc.jpg",
    "crops": [
      {
        "title": "Sh2-140 - The Poppy Flower Nebula — Region of Interest (High Resolution Crop)",
        "image": "images/llkarc_crop.jpg",
        "description": "Full-scale detail inspection at 0.896\"/pixel."
      }
    ]
  },
  {
    "id": "0a2f6c",
    "astrobinHash": "0a2f6c",
    "category": "nebulae",
    "name": "LBN 534 \"Checkmark Nebula\" & vdB 158",
    "designation": "The star 18 And",
    "constellation": "Andromeda",
    "coords": "RA 23h 36m 37.4s | Dec +49° 07′ 19.2″",
    "optics": "William Optics Fluorostar 91 / FLT91",
    "mount": "ZWO AM3",
    "camera": "ZWO ASI6200MM Pro &bull; Pixel scale: 3.565\"/pixel &bull; Orientation: 358.62°",
    "exposureBreakdown": "<span class='text-[#4ade80] font-semibold'>Green:</span> 98 × 180s (4h 54m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 170 × 180s (8h 30m) &bull; <span class='text-[#38bdf8] font-semibold'>Blue:</span> 89 × 180s (4h 27m) &bull; <span class='text-white font-semibold'>Luminance:</span> 168 × 300s (14h 00m) &bull; <span class='text-[#e06060] font-semibold'>Ha:</span> 17 × 600s (2h 50m)",
    "totalTime": "34h 41m",
    "dates": "Oct 18, 2025 – Sep 22, 2026 (9 nights) &bull; Avg Moon Age: 0.1d (Phase: 14%)",
    "software": "William Optics UltraFlat 91 .79x &bull; ZWO EFW 7 x 2″ &bull; ZWO OAG-L &bull; PixInsight",
    "resolution": "4537 x 3052 px (File size: 8.1 MB)",
    "fov": "Field radius: 2.707° &bull; Pixel scale: 3.565\"/pixel &bull; Orientation: 358.62°",
    "notes": "Every now and then I venture into dust territory, even though my location is far from ideal.<br><br>LBN 534 (the \"Checkmark Nebula\") and the blue reflection nebula vdB 158 sit in the vicinity of Andromeda, Cassiopea and Lacerta. Even though I didn't use a narrowband Ha filter, Red channel data revealed very subtle, reddish background hydrogen filaments.<br><br>Interestingly, the open cluster NGC 7686 on the right may actually be just an asterism and not a real cluster.<br><br>Revision: went ahead and captured 3h of Ha signal to prepare HaLRGB version.",
    "mainImage": "images/0a2f6c.jpg",
    "crops": [
      {
        "title": "LBN 534 \"Checkmark Nebula\" & vdB 158 — Region of Interest (High Resolution Crop)",
        "image": "images/0a2f6c_crop.jpg",
        "description": "Full-scale detail inspection at 3.565\"/pixel."
      }
    ]
  },
  {
    "id": "rzxgos",
    "astrobinHash": "rzxgos",
    "category": "nebulae",
    "name": "Sh2-126 - Gecko, Galaxies and LBNs",
    "designation": "The star 8 Lac, The star 10 Lac, The star 12 Lac, The star 13 Lac",
    "constellation": "Lacerta",
    "coords": "RA 22h 34m 24.5s | Dec +40° 28′ 04.8″",
    "optics": "William Optics Fluorostar 91 / FLT91",
    "mount": "ZWO AM5N",
    "camera": "ZWO ASI6200MM Pro &bull; Pixel scale: 1.794\"/pixel &bull; Orientation: 359.02°",
    "exposureBreakdown": "<span class='text-[#38bdf8] font-semibold'>Blue:</span> 37 × 180s (1h 51m) &bull; <span class='text-[#4ade80] font-semibold'>Green:</span> 37 × 180s (1h 51m) &bull; <span class='text-[#e06060] font-semibold'>Ha:</span> 41 × 600s (6h 50m) &bull; <span class='text-white font-semibold'>Luminance:</span> 266 × 180s (13h 18m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 45 × 180s (2h 15m)",
    "totalTime": "26h 05m",
    "dates": "Sep 24, 2025 – Aug 20, 2026 (7 nights) &bull; Avg Moon Age: 3.9d (Phase: 21%)",
    "software": "William Optics UltraFlat 91 .79x &bull; ZWO EFW 7 x 2″ &bull; ZWO OAG-L &bull; PixInsight",
    "resolution": "9418 x 6184 px (File size: 24.6 MB)",
    "fov": "Field radius: 2.808° &bull; Pixel scale: 1.794\"/pixel &bull; Orientation: 359.02°",
    "notes": "A wide-field view centered on the Lacerta OB1 molecular cloud complex. The Ha of Sh2-126 is ionized by the massive runaway O-type star 10 Lacertae (visible near the bottom edge). <br><br>Many background galaxies, but what stood out for me was the compact WBL 682 galaxy group (~225 Mly),  and radio galaxy UGC 12064 (3C 449).  It’s a target for my RC10 now.",
    "mainImage": "images/rzxgos.jpg",
    "crops": [
      {
        "title": "Sh2-126 - Gecko, Galaxies and LBNs — Region of Interest (High Resolution Crop)",
        "image": "images/rzxgos_crop.jpg",
        "description": "Full-scale detail inspection at 1.794\"/pixel."
      }
    ]
  },
  {
    "id": "tlpra3",
    "astrobinHash": "tlpra3",
    "category": "nebulae",
    "name": "Sh2-154 and NGC 7419 in Cepheus",
    "designation": "NGC 7419",
    "constellation": "Cepheus",
    "coords": "RA 22h 52m 31.9s | Dec +61° 14′ 52.8″",
    "optics": "GSO 10\" F/4 Carbon Imaging Newtonian",
    "mount": "ZWO AM5N",
    "camera": "ZWO ASI2600MC Pro &bull; Pixel scale: 0.898\"/pixel &bull; Orientation: 359.12°",
    "exposureBreakdown": "<span class='text-[#e06060] font-semibold'>Dual-Band (Ha/OIII):</span> 76 × 600s (12h 40m) &bull; <span class='text-white font-semibold'>Luminance:</span> 187 × 180s (9h 21m)",
    "totalTime": "22h 01m",
    "dates": "Aug 3, 2026 – Aug 17, 2026 (9 nights) &bull; Avg Moon Age: 1.2d (Phase: 15%)",
    "software": "Sky-Watcher 0.86x Coma Corrector for Quattro 150P (P150F600/F4) &bull; ZWO EFW 5 x 2\" &bull; ZWO OAG-L &bull; PixInsight",
    "resolution": "6053 x 4023 px (File size: 16.8 MB)",
    "fov": "Field radius: 0.906° &bull; Pixel scale: 0.898\"/pixel &bull; Orientation: 359.12°",
    "notes": "Neighboring the well-known Cave Nebula (Sh2-155), Sh2-154 never got the same type of attention. It is a rather faint, extended H II region embedded within the dense gas and dust complexes of Cepheus. Without dramatic pillars, sharp shock fronts, or prominent Bok globules, it easily gets overlooked.<br><br>NGC 7419 is a heavily reddened young open cluster. It hosts a record five red supergiants. Interstellar extinction in the blue band here is severe (well over a factor of ten), giving this cluster its distinctive warm, golden hue.",
    "mainImage": "images/tlpra3.jpg",
    "crops": [
      {
        "title": "Sh2-154 and NGC 7419 in Cepheus — Region of Interest (High Resolution Crop)",
        "image": "images/tlpra3_crop.jpg",
        "description": "Full-scale detail inspection at 0.898\"/pixel."
      }
    ]
  }
];
