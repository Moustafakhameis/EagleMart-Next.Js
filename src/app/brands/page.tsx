import Image from "next/image";
import { getAllBrands } from "../_services/brands.service";
import Link from "next/link";

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/brandDetails/${brand._id}`}
            className="bg-pink-100 dark:bg-pink-900/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center shadow hover:shadow-xl transition"
          >
            {/* <img
              src={brand.image}
              alt={brand.name}
              className="w-24 h-24 object-contain mb-3"
            /> */}

            <Image
              src={brand.image}
              alt={brand.name}
              width={96}
              height={96}
              className="w-24 h-24 object-contain mb-3"
            />

            <h2 className="text-lg font-medium">{brand.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
