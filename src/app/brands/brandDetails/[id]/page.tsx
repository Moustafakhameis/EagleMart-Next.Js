import { getBrandById } from "_/app/_services/brands.service";
import Image from "next/image";

interface BrandDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandDetailPage({
  params,
}: BrandDetailPageProps) {
  const { id } = await params;
  const brand = await getBrandById(id);

  if (!brand) {
    return <p className="text-center text-red-500">Brand not found</p>;
  }

  return (
    <div className="container mx-auto p-6 text-center">
      {/* <img
        src={brand.image}
        alt={brand.name}
        className="mx-auto w-48 h-48 object-contain mb-6"
      /> */}

      <Image
        src={brand.image}
        alt={brand.name}
        width={192}
        height={192}
        className="mx-auto w-48 h-48 object-contain mb-6"
      />

      <h1 className="text-4xl font-bold">{brand.name}</h1>
      <p className="text-gray-600 mt-2">ID: {brand._id}</p>
      <p className="text-gray-600 mt-2">Slug: {brand.slug}</p>
    </div>
  );
}
