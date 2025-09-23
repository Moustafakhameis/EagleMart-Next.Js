"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

type ImageItem = { src: string; name?: string } | string;

export default function MySwiper({
  imagesList,
  spaceBetween = 10,
  slidesPerView = 1,
}: {
  imagesList?: ImageItem[];
  spaceBetween?: number;
  slidesPerView?: number;
}) {
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);


  useEffect(() => {
    if (paginationRef.current) {
      setPaginationEl(paginationRef.current);
    }
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        pagination={{
          clickable: true,
          el: paginationEl,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 mx-1 rounded-full bg-gray-300 transition-all duration-300 ease-in-out"></span>`;
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="w-full overflow-hidden"
      >
        {imagesList?.map((item, index) => {
          const src = typeof item === "string" ? item : item.src;
          const name = typeof item === "string" ? "" : item.name;

          return (
            <SwiperSlide key={src + index}>
              <div className="relative w-full h-[400px]">
                <Image
                  src={src}
                  alt={`Slide image ${index + 1}`}
                  fill
                  className="object-fill"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              {name && (
                <h1 className="text-center text-gray-800 text-xl font-medium mt-2">
                  {name}
                </h1>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* pagination container */}
      {/* <div
        ref={paginationRef}
        className="custom-pagination absolute bottom-[-30] z-10 right-1/2 transform translate-x-1/2 items-end mt-4"
      ></div> */}
    </>
  );
}
