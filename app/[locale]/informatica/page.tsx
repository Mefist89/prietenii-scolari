'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function InformaticaIntroPage() {
  const t = useTranslations();
  const [showByte, setShowByte] = useState(false);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showSecondText, setShowSecondText] = useState(false);
  const [displayedSecondText, setDisplayedSecondText] = useState('');
  const [showButton, setShowButton] = useState(false);

  const firstText = t('Info.intro.greeting');
  const secondText = t('Info.intro.ready');

  useEffect(() => {
    // Показываем Byte через 1 секунду
    const byteTimer = setTimeout(() => {
      setShowByte(true);
      // Начинаем показывать первый текст через 0.5 секунды после появления Byte
      setTimeout(() => setShowText(true), 500);
    }, 1000);

    return () => clearTimeout(byteTimer);
  }, []);

  // Анимация первого текста
  useEffect(() => {
    if (showText && displayedText.length < firstText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(firstText.slice(0, displayedText.length + 1));
      }, 50); // Скорость печатания (50мс на букву)

      return () => clearTimeout(timer);
    } else if (displayedText.length === firstText.length && displayedText.length > 0 && !showSecondText) {
      // Показываем второй текст через 1 секунду после завершения первого
      setTimeout(() => setShowSecondText(true), 1000);
    }
  }, [showText, displayedText, firstText, showSecondText]);

  // Анимация второго текста
  useEffect(() => {
    if (showSecondText && displayedSecondText.length < secondText.length) {
      const timer = setTimeout(() => {
        setDisplayedSecondText(secondText.slice(0, displayedSecondText.length + 1));
      }, 50);

      return () => clearTimeout(timer);
    } else if (displayedSecondText.length === secondText.length && displayedSecondText.length > 0) {
      // Показываем кнопку через 1 секунду после завершения второго текста
      setTimeout(() => setShowButton(true), 1000);
    }
  }, [showSecondText, displayedSecondText, secondText]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0">
        <Image
          src="/images/info/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Byte */}
      {showByte && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <Image
            src="/images/characters/byte-info/byte.png"
            alt="Byte"
            width={400}
            height={600}
            className="drop-shadow-2xl"
          />
        </motion.div>
      )}

      {/* Текстовое поле */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl z-20"
        >
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-cyan-400">
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-cyan-100 font-semibold text-center leading-relaxed">
                {displayedText}
                {!showSecondText && displayedText.length < firstText.length && (
                  <span className="inline-block w-1 h-8 bg-cyan-400 ml-1 animate-pulse" />
                )}
              </p>

              {showSecondText && (
                <p className="text-3xl md:text-4xl text-cyan-300 font-bold text-center">
                  {displayedSecondText}
                  {displayedSecondText.length < secondText.length && (
                    <span className="inline-block w-1 h-8 bg-cyan-400 ml-1 animate-pulse" />
                  )}
                </p>
              )}

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center gap-4 mt-6"
                >
                  <Link
                    href="/informatica/menu"
                    className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-2xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    {t('Info.intro.yes')}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Кнопка пропуска */}
      <Link
        href="/informatica/menu"
        className="absolute top-8 right-8 px-6 py-3 bg-cyan-600/80 hover:bg-cyan-700 text-white font-semibold rounded-full transition-colors z-30"
      >
        {t('Info.intro.skip')}
      </Link>
    </div>
  );
}