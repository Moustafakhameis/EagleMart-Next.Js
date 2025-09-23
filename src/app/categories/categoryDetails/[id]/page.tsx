"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryById } from "_/app/_services/categories.service";
import { CategoryType } from "_/app/_InterFaces/products";
import Image from "next/image";

export default function CategoryDetailPageClient() {
  const params = useParams();
  const categoryId = params?.id;

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    async function fetchCategory() {
      const data = await getCategoryById(categoryId as string);
      setCategory(data);
      setLoading(false);
    }

    fetchCategory();
  }, [categoryId]);

  if (!categoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7EBF0]">
        <p className="text-xl text-red-500 font-semibold">
          Invalid category ID
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7EBF0]">
        <p className="text-xl text-purple-600 font-semibold">Loading...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7EBF0]">
        <p className="text-xl text-red-500 font-semibold">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-12 bg-[#F7EBF0]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-purple-600">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-600 mb-8 text-center">
          {category.name}
        </h1>

        {/* Image */}
        {category.image && (
          <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl mb-8 shadow-lg border-2 border-pink-500 relative">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Category Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base">
          <div className="flex items-center gap-3">
            <span className="text-purple-500 text-lg">🆔</span>
            <span>ID: {category._id}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-pink-500 text-lg">🔗</span>
            <span>Slug: {category.slug}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-purple-500 text-lg">🖼️</span>
            <span>Has Image: {category.image ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <a
            href="/categories"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold 
            hover:bg-pink-500 hover:shadow-xl transition transform hover:scale-105"
          >
            Back to All Categories
          </a>
        </div>
      </div>
    </div>
  );
}
