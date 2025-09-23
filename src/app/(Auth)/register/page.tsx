import React from "react";
import Image from "next/image";
import img from "_/assets/View.svg";
import { LiaUsersSolid } from "react-icons/lia";
import stairs from "_/assets/stairs-icon.jpg";
import { ImArrowDownLeft2 } from "react-icons/im";
import RegisterForm from "./RegisterForm";
import { RiHomeHeartFill } from "react-icons/ri";

export default function Register() {
  return (
    <div className=" min-h-screen flex mt-30 md:mt-0 md:mx-10">
      <div className="container mx-auto md:flex items-stretch">
        <div className="w-full h-full md:flex justify-center items-center">
          <div className="md:w-1/2 md:h-3/4 p-5 bg-white">
            <h1 className="text-3xl font-bold uppercase border-b-2 border-red-600 border-dashed w-fit mx-auto  flex justify-center items-center gap-2">
              Join our community{" "}
              <RiHomeHeartFill className="text-red-600" size={35} />
            </h1>
            <div className="mt-5 lg:mt-12 relative">
              <RegisterForm />
            </div>
          </div>

          <div className="md:w-1/2 md:h-3/4 hidden lg:flex relative">
            <div className="absolute top-10 right-30">
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold w-80">Register Now :</h1>
                <span className="text-red-600 font-bold w-full">
                  Let&apos;s get started
                </span>
              </div>
              <div className="flex justify-start items-center w-20 mt-20">
                <h1 className="text-3xl font-bold w-20 flex flex-col gap-1 relative z-50">
                  BE
                  <Image
                    src={stairs}
                    alt="stairs icon"
                    className="absolute top-2 right-[-9]"
                    width={45}
                    height={45}
                  />
                  {/* <FaStairs
                  size={25}
                  className="absolute top-6 right-1 transform rotate-90"
                /> */}
                  <span className="text-red-600 ms-22 z-40">
                    {/* <FaStairs
                    size={25}
                    className="absolute top-6 left-[-30]"
                  /> */}
                    <Image
                      src={stairs}
                      alt="stairs icon"
                      className="absolute top-12 right-[-8] transform scale-x-[-1]"
                      width={45}
                      height={45}
                    />
                    ONE
                  </span>
                  <span className="z-40">OF</span>
                  <Image
                    src={stairs}
                    alt="stairs icon"
                    className="absolute top-22 right-[-8]"
                    width={45}
                    height={45}
                  />
                  {/* <FaStairs
                  size={25}
                  className="absolute top-26 right-2 transform rotate-90"
                /> */}
                  <span className="text-red-600 ms-22 relative">
                    US
                    <ImArrowDownLeft2
                      size={25}
                      className="absolute top-7 left-[-33]"
                    />
                  </span>
                  <span className=" w-full">
                    <LiaUsersSolid size={45} />
                  </span>
                </h1>
              </div>
            </div>
            <Image
              src={img}
              alt="View icon"
              className="w-full h-auto md:h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
