"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Компонент для печатающегося текста
function TypewriterText({
  text,
  delay = 0,
  onComplete,
  className,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 50); // 50ms на букву
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, started, onComplete]);

  return (
    <p className={className}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  );
}

export default function RomanaMenuPage() {
  const [showLumi, setShowLumi] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [text1Complete, setText1Complete] = useState(false);

  useEffect(() => {
    // Lumi появляется через 1 секунду
    const lumiTimer = setTimeout(() => {
      setShowLumi(true);
    }, 1000);

    // Текст появляется через 2 секунды
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    return () => {
      clearTimeout(lumiTimer);
      clearTimeout(textTimer);
    };
  }, []);

  // Кнопка появляется после завершения второго текста
  const handleText2Complete = () => {
    setTimeout(() => {
      setShowButton(true);
    }, 500); // Небольшая пауза после текста
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/rom/bg.png')" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Lumi появляется */}
        <AnimatePresence>
          {showLumi && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="flex flex-col items-center"
            >
              {/* Lumi */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/characters/lumi-rom/lumi.png"
                  alt="Lumi"
                  width={300}
                  height={400}
                  className="h-[300px] md:h-[400px] w-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Текстовый пузырь */}
              <AnimatePresence>
                {showText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mt-6 relative"
                  >
                    {/* Пузырь с текстом */}
                    <div className="bg-[#F0F4E5] rounded-3xl px-8 py-6 shadow-2xl border-4 border-[#4A6E3C] max-w-md">
                      {/* Хвостик пузыря */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-[#4A6E3C]"></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[16px] border-b-[#F0F4E5]"></div>

                      <TypewriterText
                        text="Bună ziua! Eu sunt Lumi!"
                        delay={300}
                        onComplete={() => setText1Complete(true)}
                        className="text-[#612422] text-xl md:text-2xl font-bold text-center"
                      />

                      {text1Complete && (
                        <TypewriterText
                          text="Hai să învățăm limba română împreună!"
                          delay={300}
                          onComplete={handleText2Complete}
                          className="text-[#4A6E3C] text-lg md:text-xl text-center mt-2"
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Кнопка "Da !!!" */}
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mt-6"
                  >
                    <Link href="/limba-romana/menu">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-4 bg-gradient-to-r from-[#E8A33D] to-[#D4922E] hover:from-[#D4922E] hover:to-[#C4820E] text-white font-black text-2xl rounded-full shadow-xl border-4 border-[#F0F4E5] transition-all"
                      >
                        Da !!!
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
