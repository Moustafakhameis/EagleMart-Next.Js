"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput({ initialSearch }: { initialSearch: string }) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          // live search في نفس الوقت
          router.push(`/?search=${encodeURIComponent(e.target.value)}`);
        }}
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 "
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-purple-600 hover:shadow-lg transition ease-in-out duration-500"
      >
        Search
      </button>
    </form>
  );
}
