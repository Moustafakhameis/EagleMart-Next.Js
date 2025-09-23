// "use client";

// import { useState, useEffect } from "react";

// export default function LogoTypewriter() {
//   const wordsToType = ["EagleMart", "Next.js", "Typescript", "TailwindCSS"];
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isCursorVisible, setIsCursorVisible] = useState(true);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   // avoid hydration error
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // typing and deleting effect
//   useEffect(() => {
//     if (isPaused || !isMounted) return;

//     const currentWord = wordsToType[currentWordIndex];

//     if (currentLetterIndex === currentWord.length + 10 && !isDeleting) {
//       setIsPaused(true);
//       setTimeout(() => {
//         setIsDeleting(true);
//         setIsPaused(false);
//       }, 1000);
//       return;
//     }

//     if (currentLetterIndex === 0 && isDeleting) {
//       setIsDeleting(false);
//       setCurrentWordIndex((prev) => (prev + 1) % wordsToType.length);
//       return;
//     }

//     const typingSpeed = isDeleting ? 100 : 150;
//     const timeout = setTimeout(() => {
//       setCurrentLetterIndex((prev) => prev + (isDeleting ? -1 : 1));
//     }, typingSpeed);

//     return () => clearTimeout(timeout);
//   }, [
//     currentLetterIndex,
//     currentWordIndex,
//     isDeleting,
//     isPaused,
//     isMounted,
//     wordsToType,
//   ]);

//   // cursor blinking
//   useEffect(() => {
//     if (!isMounted) return;
//     const cursorBlinkInterval = setInterval(() => {
//       setIsCursorVisible((prev) => !prev);
//     }, 500);
//     return () => clearInterval(cursorBlinkInterval);
//   }, [isMounted]);

//   const currentWord = wordsToType[currentWordIndex];

//   return (
//     <span
//       title={currentWord}
//       className="self-center text-2xl font-semibold whitespace-nowrap
//                  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
//                  bg-[length:200%_200%] animate-gradient
//                  bg-clip-text text-transparent text-left
//                  transition-all duration-500 ease-in-out min-w-[12ch]"
//     >
//       {/* Placeholder (non-breaking space) during SSR */}
//       {isMounted ? currentWord.substring(0, currentLetterIndex) : "\u00A0"}
//       <span
//         className={`ml-1 ${
//           isCursorVisible ? "opacity-100" : "opacity-0"
//         } bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
//         bg-clip-text text-transparent`}
//       >
//         |
//       </span>
//     </span>
//   );
// }






"use client";

import { useState, useEffect, useMemo } from "react";

export default function LogoTypewriter() {
  const wordsToType = useMemo(
    () => ["EagleMart", "Next.js", "Typescript", "TailwindCSS"],
    []
  );

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // avoid hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // typing and deleting effect
  useEffect(() => {
    if (isPaused || !isMounted) return;

    const currentWord = wordsToType[currentWordIndex];

    if (currentLetterIndex === currentWord.length + 10 && !isDeleting) {
      setIsPaused(true);
      setTimeout(() => {
        setIsDeleting(true);
        setIsPaused(false);
      }, 1000);
      return;
    }

    if (currentLetterIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % wordsToType.length);
      return;
    }

    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(() => {
      setCurrentLetterIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentLetterIndex,
    currentWordIndex,
    isDeleting,
    isPaused,
    isMounted,
    wordsToType,
  ]);

  // cursor blinking
  useEffect(() => {
    if (!isMounted) return;
    const cursorBlinkInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlinkInterval);
  }, [isMounted]);

  const currentWord = wordsToType[currentWordIndex];

  return (
    <span
      title={currentWord}
      className="self-center text-2xl font-semibold whitespace-nowrap
                 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                 bg-[length:200%_200%] animate-gradient
                 bg-clip-text text-transparent text-left
                 transition-all duration-500 ease-in-out min-w-[12ch]"
    >
      {isMounted ? currentWord.substring(0, currentLetterIndex) : "\u00A0"}
      <span
        className={`ml-1 ${
          isCursorVisible ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        bg-clip-text text-transparent`}
      >
        |
      </span>
    </span>
  );
}
