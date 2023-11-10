"use client";

import React from "react";
import { useUrl } from "@/common/hooks/useUrl";
import Spinner from "./Spinner";

type SearchFilterSortProps = {};

export const SearchFilterSort: React.FC<SearchFilterSortProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useUrl<string, string>("searchTerm");
  const [searchTermLoading] = useUrl<string, string>("searchTermLoading");
  const [filters, setFilters] = useUrl<string[], string>("filters");
  const [sort, setSort] = useUrl<string, string>("sort");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg shadow mb-6">
      <div className="flex-grow flex justify-between items-center border rounded">
        <input
          className="w-full h-full p-2 rounded"
          type="text"
          placeholder="Search products..."
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {searchTermLoading && (
          <div className="p-2">
            <Spinner />
          </div>
        )}
      </div>
      <button
        className={`p-2 rounded ${
          filters?.includes("Electronics")
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
        onClick={() => {
          let updatedFilters: string[] = [];
          if (filters?.includes("Electronics")) {
            updatedFilters = filters?.filter((f: string) => f != "Electronics");
          } else {
            updatedFilters = [...(filters || []), "Electronics"];
          }
          setFilters(updatedFilters);
        }}
      >
        Electronics
      </button>
      <button
        className={`p-2 rounded ${
          filters?.includes("Home") ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => {
          let updatedFilters: string[] = [];
          if (filters?.includes("Home")) {
            updatedFilters = filters?.filter((f: string) => f != "Home");
          } else {
            updatedFilters = [...(filters || []), "Home"];
          }
          setFilters(updatedFilters);
        }}
      >
        Home
      </button>
      <select
        className="p-2 border rounded"
        value={sort || ""}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};
