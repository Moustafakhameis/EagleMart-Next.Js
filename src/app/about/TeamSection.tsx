"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Logo from "_/assets/Logo.png";

const teamMembers = [
  {
    id: 1,
    name: "Moustafa Ali",
    role: "CEO & Founder",
    image: Logo,
    socials: {
      linkedin: "https://www.linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    id: 2,
    name: "Mohamed Badawy",
    role: "CTO",
    image: Logo,
    socials: {
      linkedin: "https://www.linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    id: 3,
    name: "Mohamed Amr",
    role: "Lead Designer",
    image: Logo,
    socials: {
      linkedin: "https://www.linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    id: 4,
    name: "Moustafa Rady",
    role: "Marketing Head",
    image: Logo,
    socials: {
      linkedin: "https://www.linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
{
  id: 5,
  name: "Mahmoud Nady",
  role: "Frontend Developer",
  image: Logo,
  socials: {
    linkedin: "https://www.linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
},
{
  id: 6,
  name: "Mohamed Hossam",
  role: "Backend Developer",
  image: Logo,
  socials: {
    linkedin: "https://www.linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
},

];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-purple-600">
          Meet Our Team
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 "
          variants={container}
          initial="hidden"
          animate="show"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              whileHover={{
                scale: 1.05,
                rotate: -1.5,
                transition: { type: "spring", stiffness: 200, damping: 10 },
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 cursor-pointer group border border-transparent dark:border-gray-700"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-contain border-2 border-pink-500"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.role}</p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-sky-500 hover:text-sky-700 transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
