// types.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export type Notification = {
  type: "danger" | "info" | "success";
  title: string;
  body: string;
  open?: boolean;
};
