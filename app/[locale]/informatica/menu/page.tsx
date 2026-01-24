'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function InformaticaMenuPage() {
  const t = useTranslations();

  const levels = [
    { id: 1, title: t('Info.level1.title'), subtitle: t('Info.level1.subtitle'), href: '/informatica/nivel-1', emoji: '💻' },
    { id: 2, title: t('Info.level2.title'), subtitle: t('Info.level2.subtitle'), href: '/informatica/nivel-2', emoji: '🖥️' },
    { id: 3, title: t('Info.level3.title'), subtitle: t('Info.level3.subtitle'), href: '/informatica/nivel-3', emoji: '🔄' },
    { id: 4, title: t('Info.level4.title'), subtitle: t('Info.level4.subtitle'), href: '/informatica/nivel-4', emoji: '🛡️' },
    { id: 5, title: t('Info.level5.title'), subtitle: t('Info.level5.subtitle'), href: '/informatica/nivel-5', emoji: '⌨️' },
  ];
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/info/bg.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated background - using fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0">
        {[
          { left: 12, top: 8, dur: 5.2, delay: 0.3, emoji: 0 },
          { left: 45, top: 15, dur: 6.1, delay: 1.2, emoji: 1 },
          { left: 78, top: 22, dur: 4.8, delay: 0.8, emoji: 2 },
          { left: 23, top: 35, dur: 5.5, delay: 1.5, emoji: 3 },
          { left: 56, top: 42, dur: 6.3, delay: 0.1, emoji: 4 },
          { left: 89, top: 48, dur: 4.2, delay: 1.8, emoji: 5 },
          { left: 34, top: 55, dur: 5.8, delay: 0.6, emoji: 6 },
          { left: 67, top: 62, dur: 6.5, delay: 1.1, emoji: 7 },
          { left: 8, top: 68, dur: 4.5, delay: 1.9, emoji: 0 },
          { left: 42, top: 75, dur: 5.1, delay: 0.4, emoji: 1 },
          { left: 75, top: 82, dur: 6.8, delay: 1.4, emoji: 2 },
          { left: 18, top: 88, dur: 4.3, delay: 0.9, emoji: 3 },
          { left: 51, top: 5, dur: 5.9, delay: 1.7, emoji: 4 },
          { left: 84, top: 28, dur: 6.2, delay: 0.2, emoji: 5 },
          { left: 27, top: 45, dur: 4.6, delay: 1.3, emoji: 6 },
          { left: 62, top: 58, dur: 5.4, delay: 0.7, emoji: 7 },
          { left: 95, top: 72, dur: 6.7, delay: 1.6, emoji: 0 },
          { left: 15, top: 18, dur: 4.9, delay: 0.5, emoji: 1 },
          { left: 48, top: 32, dur: 5.7, delay: 1.0, emoji: 2 },
          { left: 81, top: 65, dur: 6.4, delay: 1.8, emoji: 3 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: item.dur,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <span className="text-cyan-400/30 text-2xl font-mono">
              {['💻', '🖱️', '⌨️', '🖥️', '📱', '🔌', '</>', '{}'][item.emoji]}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-4">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-6"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
            {t('Info.title')}
          </h1>
          <p className="text-cyan-200 text-lg md:text-xl mt-2 font-semibold drop-shadow-md">
            {t('Info.chooseLevel')}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto w-full">
          {/* Byte Character */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/characters/byte-info/byte.png"
                alt="Byte"
                width={325}
                height={433}
                className="h-[260px] md:h-[364px] w-auto object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Levels Grid */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={level.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border-4 border-cyan-400/50 cursor-pointer transition-all hover:shadow-2xl hover:shadow-cyan-500/50 hover:border-cyan-300"
                  >
                    {/* Level Number Badge */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                      <span className="text-white font-black text-lg md:text-xl">{level.id}</span>
                    </div>

                    {/* Emoji Icon */}
                    <div className="text-5xl md:text-6xl mb-3 text-center">
                      {level.emoji}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-cyan-300 font-bold text-lg md:text-xl mb-1">
                        {level.title}
                      </h3>
                      <p className="text-cyan-100/80 text-sm md:text-base font-medium">
                        {level.subtitle}
                      </p>
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mt-3">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className="text-yellow-400 text-lg">⭐</span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}

            {/* Final Boss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/informatica/sef-final">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-br from-red-600/95 to-orange-600/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border-4 border-yellow-400/70 cursor-pointer transition-all hover:shadow-2xl hover:shadow-yellow-500/50 hover:border-yellow-300"
                >
                  {/* Boss Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                    <span className="text-xl md:text-2xl">👑</span>
                  </div>

                  {/* Emoji Icon */}
                  <div className="text-5xl md:text-6xl mb-3 text-center">
                    🤖
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                      {t('Info.finalBoss')}
                    </h3>
                    <p className="text-yellow-100 text-sm md:text-base font-medium">
                      {t('Info.finalChallenge')}
                    </p>
                  </div>

                  {/* Trophy */}
                  <div className="flex justify-center mt-3">
                    <span className="text-2xl">🏆</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pb-6"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/90 hover:bg-white text-blue-600 font-bold text-lg rounded-full shadow-lg border-2 border-cyan-300 transition-colors backdrop-blur-sm"
            >
              {t('Info.backHome')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
