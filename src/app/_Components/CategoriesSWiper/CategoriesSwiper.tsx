import {getAllCategories} from "_/app/_services/categories.service";
import MySwiper from "../MySwiper/MySwiper";

export default async function CategoriesSwiper() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto mt-20 relative mb-16 ">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-b-2 border-orange-500 inline-block">
        Shop Popular Categories
      </h2>

      <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-6">
        <MySwiper
          slidesPerView={6}
          spaceBetween={20}
          imagesList={
            categories?.map((c) => ({
              src: c.image,
              name: c.name,
            })) ?? []
          }
        />
      </div>
    </div>
  );
}
