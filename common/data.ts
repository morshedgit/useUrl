export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export const dummyProducts: Product[] = [
  { id: 1, name: "Product 1", price: 99.99, category: "Electronics" },
  { id: 2, name: "Product 2", price: 199.99, category: "Home" },
  { id: 3, name: "Wireless Headphones", price: 59.99, category: "Electronics" },
  { id: 4, name: "Bluetooth Speaker", price: 45.99, category: "Electronics" },
  { id: 5, name: "Smart Watch", price: 199.99, category: "Electronics" },
  { id: 6, name: "4K Television", price: 799.99, category: "Electronics" },
  { id: 7, name: "Laptop", price: 1099.99, category: "Electronics" },
  { id: 8, name: "Espresso Machine", price: 299.99, category: "Home" },
  { id: 9, name: "Blender", price: 99.99, category: "Home" },
  {
    id: 10,
    name: "Electric Toothbrush",
    price: 39.99,
    category: "Personal Care",
  },
  { id: 11, name: "Hair Dryer", price: 49.99, category: "Personal Care" },
  { id: 12, name: "Gaming Console", price: 499.99, category: "Electronics" },
  { id: 13, name: "Action Camera", price: 199.99, category: "Electronics" },
  {
    id: 14,
    name: "Digital SLR Camera",
    price: 649.99,
    category: "Electronics",
  },
  { id: 15, name: "Tablet", price: 399.99, category: "Electronics" },
  {
    id: 16,
    name: "Noise Cancelling Headphones",
    price: 299.99,
    category: "Electronics",
  },
  { id: 17, name: "Smart Home Speaker", price: 129.99, category: "Home" },
  { id: 18, name: "Smartphone", price: 999.99, category: "Electronics" },
  { id: 19, name: "Fitness Tracker", price: 59.99, category: "Personal Care" },
  { id: 20, name: "Drone", price: 749.99, category: "Electronics" },
  { id: 21, name: "Robot Vacuum", price: 499.99, category: "Home" },
  { id: 22, name: "E-reader", price: 129.99, category: "Electronics" },
];
