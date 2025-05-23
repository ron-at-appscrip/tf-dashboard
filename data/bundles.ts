import { products } from "./products";

function getRandomProducts(count: number) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((p, idx) => ({
    name: p.name,
    qty: Math.floor(Math.random() * 3) + 1,
    price: parseFloat(p.price),
    main: idx === 0,
  }));
}

const bundleTypes = [
  ["main", "active"],
  ["upsell", "active", "storefront"],
  ["main", "inactive"],
  ["upsell", "inactive"],
  ["main", "active", "storefront"],
];

export const bundles = Array.from({ length: 20 }).map((_, i) => {
  const productCount = Math.floor(Math.random() * 3) + 1;
  const bundleProducts = getRandomProducts(productCount);
  const msrp = bundleProducts.reduce((sum, p) => sum + p.price * p.qty, 0);
  const discount = Math.random() < 0.5 ? Math.random() * 0.3 + 0.1 : 0; // 10-40% discount
  const bundlePrice = parseFloat((msrp * (1 - discount)).toFixed(2));
  const customerSaves = parseFloat((msrp - bundlePrice).toFixed(2));
  const type = bundleTypes[i % bundleTypes.length];
  const sku = `BND-${1000 + i}`;
  const name = `Bundle Offer #${i + 1}`;
  const slug = `bundle-offer-${i + 1}`;
  const date = `5/${10 + (i % 20)}/2025`;
  const description = `Special bundle deal including ${bundleProducts.map(p => p.name).join(", ")}. Save more with this exclusive offer!`;
  return {
    name,
    sku,
    description,
    type,
    products: bundleProducts,
    msrp,
    bundlePrice,
    customerSaves,
    date,
    slug,
  };
}); 