const baseUrl = import.meta.env.BASE_URL;

function resolveAssetUrl(url: string): string {
  if (!url) return url;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${baseUrl}${url.replace(/^\/+/, '')}`;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  placement: string;
  priceValue: number;
  category: string;
  description: string;
  thumbnail: string;
  images?: string[];
  glbModel: string;
  modelPosition?: string;
  modelScale?: string;
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
    price: '﷼ 499.00',
    placement: 'floor',
    priceValue: 499.0,
    category: 'Executive Seating',
    description:
      'High-grade leather manager chair engineered for long-duration posture correction and lumbar support.',
    thumbnail:
      resolveAssetUrl('/assets/images/office_chair.jpeg'),
    images: [
      resolveAssetUrl('/assets/images/office_chair.jpeg'),
      resolveAssetUrl('/assets/images/chairs_side_1.png'),
      resolveAssetUrl('/assets/images/chair_side_2.png'),
    ],
    glbModel: resolveAssetUrl('/assets/images/office_chair.glb'),
    modelPosition: '0 0 0',
    modelScale: '0.95 0.95 0.95',
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
    price: '﷼ 45.00',
    placement: 'floor',
    priceValue: 45.0,
    category: 'Office Decor & Amenities',
    description:
      'Low-maintenance indoor botanical specimen housed in a sealed matte-finish ceramic vessel.',
    thumbnail:
      resolveAssetUrl('/assets/images/plant.jpeg'),
    images: [
      resolveAssetUrl('/assets/images/plant.jpeg'),
      resolveAssetUrl('/assets/images/plant.jpeg'),
    ],
    glbModel: resolveAssetUrl('/assets/images/plant.glb'),
    modelPosition: '0 0 0.15',
    modelScale: '1.1 1.1 1.1',
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
    id: 'couch',
    name: 'Modern Sectional Couch',
    sku: 'EOS-AP-8830',
    price: '﷼ 1,200.00',
    priceValue: 1200.0,
    category: 'Office Decor & Amenities',
    placement: 'floor',
    description:
      'A modern sectional couch designed for comfort and style in contemporary office spaces.',
    thumbnail: resolveAssetUrl('/assets/images/couch_1.jpeg'),
    images: [
      resolveAssetUrl('/assets/images/couch_2.jpeg'),
      resolveAssetUrl('/assets/images/couch_3.jpeg'),
      resolveAssetUrl('/assets/images/couch_4.jpeg'),
    ],
    glbModel: resolveAssetUrl('/assets/images/couch.glb'),
    modelPosition: '0 0 0.05',
    modelScale: '0.55 0.55 0.55',
    specs: [
      { label: 'Overall Dimensions', value: '84" W x 36" D x 32" H' },
      { label: 'Seating Capacity', value: '3 adults comfortably' },
      { label: 'Material', value: 'Performance fabric upholstery with solid wood frame' },
      { label: 'Fill', value: 'High-density foam and feather blend cushions' },
      { label: 'Leg Finish', value: 'Matte black powder-coated metal' },
      { label: 'Assembly', value: 'No-tool assembly required' },
      { label: 'Weight', value: '118 lbs' },
      { label: 'Warranty', value: '2-year limited warranty' },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
