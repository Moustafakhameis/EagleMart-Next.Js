import React, { lazy, Suspense } from "react";
import Products from "../products/page";
import StaticSwiper from "../_Components/StaticSwiper/StaticSwiper";
import CategoriesLoader from "../_Components/CategoriesSWiper/CategoriesLoader";
// import CategoriesSwiper from "./_Components/CategoriesSWiper/CategoriesSwiper";

const CategoriesSwiper = lazy(
  () => import("../_Components/CategoriesSWiper/CategoriesSwiper")
);

export default function Home() {
  return (
    <>
      <StaticSwiper />
      <div className="mt-16 mb-16">
        <Suspense fallback={<CategoriesLoader />}>
          <CategoriesSwiper />
        </Suspense>
      </div>
      <Products />
    </>
  );
}
