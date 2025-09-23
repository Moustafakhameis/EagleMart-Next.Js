import MySwiper from "../MySwiper/MySwiper";
import Image from "next/image";
// import swiperIMG1 from "_/assets/images/slider-image-1.jpeg";
// import swiperIMG2 from "_/assets/images/slider-image-2.jpeg";
// import swiperIMG3 from "_/assets/images/slider-image-3.jpeg";
import swiperIMG1 from "_/assets/images/E-CommerceSlider-1.jpg";
import swiperIMG2 from "_/assets/images/E-CommerceSlider-2.jpg";
import swiperIMG3 from "_/assets/images/E-CommerceSlider-3.jpg";
import swiperIMG4 from "_/assets/images/E-CommerceSlider-4.jpg";
import swiperIMG5 from "_/assets/images/E-CommerceSlider-5.jpg";
import swiperIMG6 from "_/assets/images/E-CommerceSlider-6.jpg";
import swiperIMG7 from "_/assets/images/E-CommerceSlider-7.jpg";
import swiperIMG8 from "_/assets/images/E-CommerceSlider-8.jpg";
import swiperIMG9 from "_/assets/images/E-CommerceSlider-9.jpg";
import swiperIMG10 from "_/assets/images/E-CommerceSlider-10.jpg";

import staticIMG1 from "_/assets/images/staticIMG1.jpg";
// import staticIMG2 from "_/assets/images/staticIMG2.jpg";
import staticIMG3 from "_/assets/images/staticIMG3.jpg";

export default function StaticSwiper() {
  return (
    <div className="container mx-auto flex mt-12 relative rounded-2xl overflow-hidden shadow-2xl">
      <MySwiper
        imagesList={[
          swiperIMG1.src,
          swiperIMG2.src,
          swiperIMG3.src,
          swiperIMG4.src,
          swiperIMG5.src,
          swiperIMG6.src,
          swiperIMG8.src,
          swiperIMG7.src,
          swiperIMG9.src,
          swiperIMG10.src,
        ]}
      />

      <div className="w-1/4 flex flex-col ">
        <Image
          src={staticIMG3}
          className="w-full h-[200px]"
          alt="Static Image 1"
        />
        <Image
          src={staticIMG1}
          className="w-full h-[200px] "
          alt="Static Image 2"
        />
      </div>
    </div>
  );
}
