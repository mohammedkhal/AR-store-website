export interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  priceValue: number;
  category: string;
  description: string;
  thumbnail: string;
  glbModel: string;
  usdzModel: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export const products: Product[] = [
  {
    id: 'gaming-chair',
    name: 'Executive Ergonomic Office Chair',
    sku: 'EOS-CH-4091',
    price: '$499.00',
    priceValue: 499.0,
    category: 'Executive Seating',
    description:
      'High-grade leather manager chair engineered for long-duration posture correction and lumbar support.',
    thumbnail:
      'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/office_chair.jpeg',
    glbModel: 'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/office_chair.glb',
    usdzModel: '/models/gaming-chair.usdz',
    specs: [
      { label: 'Overall Dimensions', value: '29.5" W x 30.5" D x 45.25" H' },
      { label: 'Seat Dimensions', value: '20.5" W x 19.75" D x 18.0" H' },
      { label: 'Material', value: 'Full-grain top leather, die-cast aluminum frame' },
      { label: 'Weight Capacity', value: '350 lbs (static load rated)' },
      { label: 'Mechanism', value: 'Synchronous tilt with 4-lock positions' },
      { label: 'Lumbar Support', value: 'Adjustable, height-variable' },
      { label: 'Base', value: 'Five-star polished aluminum with dual-wheel casters' },
      { label: 'Compliance', value: 'ANSI/BIFMA X5.1, SGS certified' },
      { label: 'Warranty', value: '10-year limited commercial warranty' },
    ],
  },
  {
    id: 'office-desk-plant',
    name: 'Desk Botanical Planter - Ceramic Base',
    sku: 'EOS-PL-1022',
    price: '$45.00',
    priceValue: 45.0,
    category: 'Office Decor & Amenities',
    description:
      'Low-maintenance indoor botanical specimen housed in a sealed matte-finish ceramic vessel.',
    thumbnail:
      'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/plant.jpeg',
    glbModel: 'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/planrt.glb',
    usdzModel: 'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/planrt.usdz',
    specs: [
      { label: 'Vessel Dimensions', value: '6.0" dia. x 7.0" H' },
      { label: 'Overall Height (with foliage)', value: '14.0" H' },
      { label: 'Material', value: 'Glazed stoneware ceramic, matte finish' },
      { label: 'Specimen', value: 'Sansevieria trifasciata (live, potted)' },
      { label: 'Light Requirement', value: 'Low to medium indirect light' },
      { label: 'Watering Cycle', value: 'Every 14-21 days' },
      { label: 'Weight', value: '4.2 lbs (fully assembled)' },
      { label: 'Compliance', value: 'USDA APHIS import-certified' },
      { label: 'Warranty', value: '30-day live-arrival guarantee' },
    ],
  },
  {
    id: 'wall-panel',
    name: 'Acoustic Slat Architectural Wall Panel',
    sku: 'EOS-AP-8830',
    price: '$120.00',
    priceValue: 120.0,
    category: 'Wall Systems & Acoustics',
    description:
      'Commercial-grade acoustic timber panel designed for sound attenuation in conference rooms and private offices.',
    thumbnail: 'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/wall_panel_2.jpeg',
    glbModel: 'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/wall_panel_2.glb',
    usdzModel: 'https://raw.githubusercontent.com/mohammedkhal/AR-store-website/main/wall-panel_2.usdz',
    specs: [
      { label: 'Panel Dimensions', value: '94.5" W x 47.25" H x 1.5" D' },
      { label: 'Coverage Area', value: '31.0 sq. ft. per panel' },
      { label: 'Material', value: 'FSC-certified oak slats on PET acoustic backing' },
      { label: 'Acoustic Rating', value: 'NRC 0.45 (sound absorption class A)' },
      { label: 'Fire Rating', value: 'ASTM E84 Class A / EN 13501-1 B-s1,d0' },
      { label: 'Mounting', value: 'Concealed Z-clip system (included)' },
      { label: 'Weight', value: '24.0 lbs per panel' },
      { label: 'Compliance', value: 'FSC, GREENGUARD Gold certified' },
      { label: 'Warranty', value: '5-year structural warranty' },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
