import { useEffect, useState } from "react";
import { useUrl } from "./useUrl";
import { Product } from "../types";
import { useFetch } from "./useFetch";
import { useDebounce } from "./useDebounce";
import { Notification } from "@/common/types";

// const url = new URL(
//   "https://65272d3e917d673fd76d7c05.mockapi.io/api/v1/products"
// );

const getUrl = (searchTerm?: string) => {
  const url = new URL(
    "https://65272d3e917d673fd76d7c05.mockapi.io/api/v1/products"
  );
  if (searchTerm) {
    url.searchParams.append("search", searchTerm);
  }
  return url;
};
export const useProducts = () => {
  const [searchTerm] = useUrl<string>("searchTerm");
  const [_, setSearchTermLoading] = useUrl<boolean>("searchTermLoading");
  const [filters] = useUrl<string[]>("filters");
  const [sort] = useUrl<string>("sort");
  const [products, setProducts] = useState<Product[]>([]);
  const [notifications, setNotifications] =
    useUrl<Notification[]>("notifications");
  const deboucedSearchTerm = useDebounce(searchTerm, 0);

  useFetch<Product[], string>(
    getUrl(searchTerm),
    {
      setResult: setProducts,
      setLoading: (v: boolean) => setSearchTermLoading(v),
      setError: (e) => {
        console.log(e);

        setNotifications([
          ...(notifications || []),
          {
            title: "Error",
            body: JSON.stringify(e),
            open: true,
            type: "danger",
          },
        ]);
      },
    },
    [deboucedSearchTerm]
  );

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    console.log(products);
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters) {
      updatedProducts = updatedProducts.filter(
        (product) => filters.length === 0 || filters?.includes(product.category)
      );
    }

    if (sort) {
      updatedProducts = updatedProducts.sort((a, b) => {
        if (sort === "price-asc") {
          return a.price - b.price;
        } else if (sort === "price-desc") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setFilteredProducts(updatedProducts);
  }, [filters, sort, products]);

  return { filteredProducts };
};
