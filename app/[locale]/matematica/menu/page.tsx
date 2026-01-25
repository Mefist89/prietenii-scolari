'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function MatematicaMenuPage() {
  const t = useTranslations();

  const levels = [
    { id: 1, title: t('Math.level1.title'), subtitle: t('Math.level1.subtitle'), href: '/matematica/nivel-1', emoji: '⚖️' },
    { id: 2, title: t('Math.level2.title'), subtitle: t('Math.level2.subtitle'), href: '/matematica/nivel-2', emoji: '➕' },
    { id: 3, title: t('Math.level3.title'), subtitle: t('Math.level3.subtitle'), href: '/matematica/nivel-3', emoji: '🔢' },
    { id: 4, title: t('Math.level4.title'), subtitle: t('Math.level4.subtitle'), href: '/matematica/nivel-4', emoji: '📊' },
    { id: 5, title: t('Math.level5.title'), subtitle: t('Math.level5.subtitle'), href: '/matematica/nivel-5', emoji: '🍎' },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/math/bg-main.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Animated background - using fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0">
        {[
          { left: 10, top: 10, dur: 5.2, delay: 0.3, emoji: 0 },
          { left: 40, top: 20, dur: 6.1, delay: 1.2, emoji: 1 },
          { left: 75, top: 15, dur: 4.8, delay: 0.8, emoji: 2 },
          { left: 20, top: 40, dur: 5.5, delay: 1.5, emoji: 3 },
          { left: 55, top: 35, dur: 6.3, delay: 0.1, emoji: 4 },
          { left: 85, top: 45, dur: 4.2, delay: 1.8, emoji: 5 },
          { left: 30, top: 60, dur: 5.8, delay: 0.6, emoji: 6 },
          { left: 65, top: 55, dur: 6.5, delay: 1.1, emoji: 7 },
          { left: 5, top: 75, dur: 4.5, delay: 1.9, emoji: 0 },
          { left: 45, top: 70, dur: 5.1, delay: 0.4, emoji: 1 },
          { left: 80, top: 80, dur: 6.8, delay: 1.4, emoji: 2 },
          { left: 15, top: 85, dur: 4.3, delay: 0.9, emoji: 3 },
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
            <span className="text-yellow-400/30 text-2xl font-mono">
              {['➕', '➖', '✖️', '➗', '🔢', '📐', '🎯', '⭐'][item.emoji]}
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
            {t('Math.title')}
          </h1>
          <p className="text-yellow-200 text-lg md:text-xl mt-2 font-semibold drop-shadow-md">
            {t('Math.chooseLevel')}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto w-full">
          {/* Maya Character */}
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
                src="/images/characters/maya-math/hero-maya2.png"
                alt="Maya"
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
                    className="relative bg-gradient-to-br from-yellow-50/95 to-yellow-100/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border-4 border-yellow-400/70 cursor-pointer transition-all hover:shadow-2xl hover:shadow-yellow-500/50 hover:border-yellow-300"
                  >
                    {/* Level Number Badge */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                      <span className="text-white font-black text-lg md:text-xl">{level.id}</span>
                    </div>

                    {/* Emoji Icon */}
                    <div className="text-5xl md:text-6xl mb-3 text-center">
                      {level.emoji}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-yellow-800 font-bold text-lg md:text-xl mb-1">
                        {level.title}
                      </h3>
                      <p className="text-yellow-700/80 text-sm md:text-base font-medium">
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
              <Link href="/matematica/sef-final">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-br from-red-500/95 to-orange-500/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border-4 border-yellow-400/70 cursor-pointer transition-all hover:shadow-2xl hover:shadow-orange-500/50 hover:border-yellow-300"
                >
                  {/* Boss Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                    <span className="text-xl md:text-2xl">👑</span>
                  </div>

                  {/* Emoji Icon */}
                  <div className="text-5xl md:text-6xl mb-3 text-center">
                    🐝
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                      {t('Math.finalBoss')}
                    </h3>
                    <p className="text-yellow-100 text-sm md:text-base font-medium">
                      {t('Math.supremeChallenge')}
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
              className="px-8 py-3 bg-white/90 hover:bg-white text-yellow-700 font-bold text-lg rounded-full shadow-lg border-2 border-yellow-400 transition-colors backdrop-blur-sm"
            >
              ← {t('Common.back')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
