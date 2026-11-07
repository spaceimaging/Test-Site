/**
 * Astrophotography Observational Archive - Target Catalog Data
 * 
 * To add a new image:
 * 1. Put the image in the `images/` folder (e.g. `images/my_target.jpg`).
 * 2. Add an entry to the `astroCatalog` array below.
 */

const astroCatalog = [
  {
    id: "arp91",
    category: "galaxies",
    name: "Arp 91 & NGC 5951",
    designation: "Arp 91 (NGC 5953 / NGC 5954) & NGC 5951",
    constellation: "Serpens Caput",
    coords: "RA 15h 34m 16.37s | Dec +15° 05′ 37.8″",
    optics: "GSO 8\" f/8 Ritchey-Chretien (1600mm focal length, f/8)",
    mount: "ZWO AM5N Harmonic Mount &bull; ZWO OAG-L",
    camera: "ZWO ASI533MM Pro &bull; Pixel scale: 0.658\"/pixel &bull; Orientation: 0.012°",
    exposureBreakdown: "<span class='text-white font-semibold'>Luminance:</span> 70 × 300s (5h 50m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 31 × 180s (1h 33m) &bull; <span class='text-[#4ade80] font-semibold'>Green:</span> 31 × 180s (1h 33m) &bull; <span class='text-[#38bdf8] font-semibold'>Blue:</span> 28 × 180s (1h 24m)",
    totalTime: "10h 20m",
    dates: "Mar 29–30, Apr 3–4, 7, 9, 23 2025 &bull; Avg Moon Age: 4.86d (Phase: 37.94%)",
    software: "PixInsight &bull; WCS: DDM Thin Plate Spline",
    resolution: "2967 x 2548 px (File size: 3.3 MB)",
    fov: "Field radius: 0.358° &bull; Pixel scale: 0.658\"/pixel &bull; Orientation: 0.012°",
    notes: "Arp 91 is a pair of interacting galaxies, ~100 Mly distant, both ca. 12 mag.<br><br><strong>NGC 5953</strong> (below) is the face-on one appears \"amorphous\" with a central bulge and tightly wound spiral arms. It acts as the dominant gravitational force in the pair.<br><br><strong>NGC 5954</strong> (top) is inclined, with a bar structure, and looser spiral arms. It is being visibly distorted by its larger companion and there's a tidal bridge between the galaxies, made of stars, gas and dust.<br><br>Immediately below is a faint galaxy <strong>PGC 55478</strong>. It is mag. 17 and is at the limits of my RC8's reach when it comes to extended sources.<br><br>At the bottom-right we see an edge-on galaxy <strong>NGC 5951</strong>.",
    mainImage: "images/arp91.jpg",
    crops: [
      {
        title: "Arp 91 Interacting Pair (NGC 5953 & NGC 5954)",
        image: "images/arp91_crop.jpg",
        description: "High resolution view of the distorted spiral arms and tidal bridge between the galaxies."
      },
      {
        title: "NGC 5951 Edge-On Spiral Galaxy",
        image: "images/ngc5951_crop.jpg",
        description: "Slender edge-on spiral galaxy showing disk structure and dust absorption."
      }
    ]
  },
  {
    id: "ngc2419",
    category: "clusters",
    name: "NGC 2419 (Intergalactic Wanderer)",
    designation: "NGC 2419 / Caldwell 25 / GCl 12",
    constellation: "Lynx",
    coords: "RA 07h 37m 57.77s | Dec +38° 52′ 49.3″",
    optics: "GSO 10\" f/8 Ritchey-Chretien (2000mm focal length, f/8)",
    mount: "Sky-Watcher EQ6-Ri Pro &bull; ZWO OAG-L &bull; ZWO CAA Camera Angle Adjuster",
    camera: "ZWO ASI2600MM Pro &bull; Pixel scale: 0.385\"/pixel &bull; Orientation: 45.04°",
    exposureBreakdown: "<span class='text-white font-semibold'>Luminance:</span> 52 × 300s (4h 20m) &bull; <span class='text-[#e06060] font-semibold'>Red:</span> 41 × 300s (3h 25m) &bull; <span class='text-[#4ade80] font-semibold'>Green:</span> 31 × 300s (2h 35m) &bull; <span class='text-[#38bdf8] font-semibold'>Blue:</span> 28 × 300s (2h 20m)",
    totalTime: "12h 40m",
    dates: "Apr 2–3 2023, Apr 11 2025, Apr 3, 19–20, 29 2026 &bull; Avg Moon Age: 11.11d (Phase: 69.96%)",
    software: "ZWO EFW 7 x 2\" &bull; PixInsight &bull; WCS: DDM Thin Plate Spline",
    resolution: "5811 x 3675 px (File size: 11.8 MB)",
    fov: "Field radius: 0.368° &bull; Pixel scale: 0.385\"/pixel &bull; Orientation: 45.04°",
    notes: "NGC 2419 (Caldwell 25), dubbed the 'Intergalactic Wanderer' by astronomer Harlow Shapley, is one of the most distant and intrinsically luminous globular clusters associated with the Milky Way. Located roughly 300,000 light-years from Earth and the Galactic Center—farther out than the Magellanic Clouds—it takes approximately 3 billion years to complete a single galactic orbit. Captured through a 10\" Ritchey-Chrétien telescope at a high resolution of 0.385 arcsec/pixel, revealing the dense stellar swarm of aging Population II stars surrounded by an array of distant background field stars and faint galaxies.",
    mainImage: "images/ngc2419.jpg",
    crops: [
      {
        title: "NGC 2419 Cluster Core & Stellar Halo (High Resolution Crop)",
        image: "images/ngc2419_crop.jpg",
        description: "Magnified view of the dense central core resolved with the 10\" RC at 0.385\"/pixel."
      }
    ]
  }
];
