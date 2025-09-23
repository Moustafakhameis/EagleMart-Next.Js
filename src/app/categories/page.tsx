import { getAllCategories } from "_/app/_services/categories.service";
import { CategoryType } from "_/app/_InterFaces/products";
import Link from "next/link";
import Image from "next/image";

export default async function CategoriesPage() {
  const categories: CategoryType[] = await getAllCategories();

  return (
    <div className="min-h-screen bg-[#F7EBF0] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center text-purple-600 mb-12">
        All Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/categoryDetails/${cat._id}`}
            className="
    relative overflow-hidden rounded-2xl p-6 flex flex-col items-center text-center
    bg-white dark:bg-gray-900
    transition transform hover:scale-105
    shadow-md hover:shadow-xl
  "
          >
            {/* Subtle glow effect */}
            <span className="absolute inset-0 rounded-2xl bg-pink-400/20 blur-3xl opacity-0 transition-opacity duration-500 hover:opacity-30 pointer-events-none"></span>
            <div className="relative w-24 h-24 ">
              <Image
                src={cat.image}
                alt={cat.name}
                className="object-contain rounded-full mb-4 border-2 border-pink-500"
                fill
              />
            </div>
            <h2 className="text-xl font-bold text-purple-500 mb-2">
              {cat.name}
            </h2>

            {/* Digital details */}
            <div className="flex gap-4 text-gray-600 text-sm mt-auto">
              <div className="flex items-center gap-1">
                <span className="text-pink-500">🛒</span>
                <span>{Math.floor(Math.random() * 100)} Products</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-purple-500">📌</span>
                <span>{cat.slug}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
