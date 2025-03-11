import { Product } from "@shared/schema";

// Demo product data for the inventory
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation and 24-hour battery life.",
    price: 12999, // $129.99
    category: "Electronics",
    inStock: 45,
    onSale: 20, // 20% off
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with adjustable height, lumbar support, and breathable mesh back.",
    price: 19999, // $199.99
    category: "Furniture",
    inStock: 12,
    onSale: 0,
  },
  {
    id: 3,
    name: "Smart Home Hub",
    description: "Control all your smart home devices from one central hub with voice commands and app integration.",
    price: 14999, // $149.99
    category: "Electronics",
    inStock: 30,
    onSale: 0,
  },
  {
    id: 4,
    name: "Outdoor Patio Set",
    description: "5-piece weather-resistant patio set perfect for your backyard or deck.",
    price: 59999, // $599.99
    category: "Outdoor",
    inStock: 5,
    onSale: 40, // 40% off (summer sale)
  },
  {
    id: 5,
    name: "Stainless Steel Cookware Set",
    description: "10-piece stainless steel cookware set with non-stick coating and heat-resistant handles.",
    price: 24999, // $249.99
    category: "Kitchen",
    inStock: 18,
    onSale: 15, // 15% off
  },
];

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return demoProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getProductsOnSale(): Promise<Product[]> {
  return demoProducts.filter((product) => product.onSale > 0);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const lowerQuery = query.toLowerCase();
  return demoProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
}

export async function getProductById(id: number): Promise<Product | undefined> {
  return demoProducts.find((product) => product.id === id);
}

export async function getProductInfo(userQuery: string): Promise<string> {
  // First, try to find products that match the query
  const matchingProducts = await searchProducts(userQuery);
  
  if (matchingProducts.length === 0) {
    return "I couldn't find any products matching your query. Would you like me to search for something else?";
  }
  
  // Format product information for the AI assistant
  const productInfo = matchingProducts.map(product => {
    const price = (product.price / 100).toFixed(2);
    const salePrice = product.onSale > 0 
      ? ((product.price * (100 - product.onSale)) / 10000).toFixed(2)
      : null;
    
    return `
Product: ${product.name}
Description: ${product.description}
Price: $${price}${salePrice ? ` (On sale: $${salePrice})` : ''}
Category: ${product.category}
In Stock: ${product.inStock > 0 ? `Yes (${product.inStock} available)` : 'No'}
${product.onSale > 0 ? `Sale: ${product.onSale}% off` : ''}
    `.trim();
  }).join('\n\n');
  
  return productInfo;
}
