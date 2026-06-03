import Image from "next/image";
import Logo from "_/assets/Logo.png";
import MotionSection from "./MotionSection";
import TeamSection from "./TeamSection";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-white dark:bg-background text-black dark:text-white min-h-screen px-6 py-12 lg:px-20 lg:py-16">
      {/* Hero Section */}
      <MotionSection className="text-center space-y-6" variant="fadeInUp">
        <div className="flex justify-center items-center">
          <Image
            src={Logo}
            alt="EagleMart Logo"
            width={120}
            height={120}
            className="rounded-2xl transform scale-150"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700">
          About EagleMart
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          EagleMart is your trusted online marketplace for the latest clothing
          trends and cutting-edge tech gadgets. Our mission is to bring style
          and technology together in one seamless shopping experience.
        </p>
      </MotionSection>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <MotionSection
          className="p-6 rounded-2xl shadow-md bg-pink-100 dark:bg-pink-900/30 hover:shadow-xl transition"
          variant="fadeInLeft"
        >
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            To be the leading e-commerce hub that inspires lifestyle choices
            through fashion and technology.
          </p>
        </MotionSection>

        <MotionSection
          className="p-6 rounded-2xl shadow-md bg-purple-100 dark:bg-purple-900/30 hover:shadow-xl transition"
          variant="fadeInRight"
        >
          <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Deliver top-quality products at the best prices, backed by
            exceptional customer service and innovation.
          </p>
        </MotionSection>
      </div>

      {/* Values */}
      <MotionSection className="mt-20 text-center" variant="zoomIn">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">Our Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "Innovation",
            "Quality",
            "Trust",
            "Affordability",
            "Sustainability",
            "Customer First",
          ].map((value, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">{value}</h3>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Team Section */}
      <div className="mt-24">
        <TeamSection />
      </div>

      {/* CTA Section */}
      <MotionSection className="mt-28 text-center" variant="fadeInUp">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6">
          Ready to Explore EagleMart?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Discover the best fashion and tech products tailored just for you.
          Start your journey today!
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transition transform hover:scale-110"
        >
          Shop Now
        </Link>
      </MotionSection>
    </div>
  );
}
