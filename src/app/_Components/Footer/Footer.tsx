"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative shadow-[0_-6px_25px_rgba(249,168,212,0.35)] dark:shadow-[0_-6px_25px_rgba(0,0,0,0.6)]">
      {/* Gradient Background with subtle fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black" />

      <div className="relative mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">
            Stay Updated
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Subscribe to get the latest deals & tech news from{" "}
            <b className="text-pink-500">EagleMart</b>.
          </p>

          <form className="mt-6">
            <div className="relative max-w-lg mx-auto">
              <input
                className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 pe-32 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                id="email"
                type="email"
                placeholder="you@example.com"
              />
              <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Footer Content */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-32">
          {/* About & Socials */}
          <div className="mx-auto max-w-sm lg:max-w-none text-center lg:text-left">
            <p className="mt-4 text-gray-600 dark:text-gray-400 lg:text-lg">
              EagleMart brings you the best fashion & tech products with love
              and quality. Shop smart, shop EagleMart!
            </p>

            <div className="mt-6 flex justify-center gap-5 lg:justify-start">
              {[
                {
                  title: "Facebook",
                  icon: FaFacebookF,
                  href: "https://facebook.com",
                  color: "text-blue-600",
                  hover: "hover:text-blue-800",
                },
                {
                  title: "Instagram",
                  icon: FaInstagram,
                  href: "https://instagram.com",
                  color: "text-pink-500",
                  hover: "hover:text-pink-700",
                },
                {
                  title: "Twitter",
                  icon: FaTwitter,
                  href: "https://twitter.com",
                  color: "text-sky-500",
                  hover: "hover:text-sky-700",
                },
                {
                  title: "Github",
                  icon: FaGithub,
                  href: "https://github.com",
                  color: "text-gray-800 dark:text-gray-200",
                  hover: "hover:text-black dark:hover:text-white",
                },
              ].map(({ icon: Icon, href, color, hover = "", title }, i) => (
                <a
                  title={title}
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 bg-white dark:bg-gray-800 rounded-full ${color} ${hover} transition transform hover:scale-110 hover:shadow-md`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            {[
              {
                title: "Services",
                links: [
                  "Marketing",
                  "Graphic Design",
                  "App Development",
                  "Web Development",
                ],
              },
              {
                title: "About",
                links: ["About", "Careers", "History", "Our Team"],
              },
              { title: "Support", links: ["FAQs", "Contact", "Live Chat"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-semibold text-purple-600">{title}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:underline underline-offset-4 transition"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © <span className="font-bold text-purple-600">MOSTAFA</span> 𖤍 2025.
            All rights reserved.
            <br />
            Built with{" "}
            <a
              href="https://nextjs.org"
              className="text-purple-600 hover:underline"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com"
              className="text-pink-500 hover:underline"
            >
              TailwindCSS
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
