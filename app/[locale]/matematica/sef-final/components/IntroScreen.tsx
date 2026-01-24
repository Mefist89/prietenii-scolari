'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface IntroScreenProps {
  onStartGame: () => void;
}

export default function IntroScreen({ onStartGame }: IntroScreenProps) {
  const t = useTranslations();
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/ui/lv6-math/bg.png')" }}
    >
      {/* Overlay for better readability - 40% darker */}
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white to-yellow-50 rounded-3xl shadow-2xl p-8 max-w-4xl w-full relative z-10 border-4 border-yellow-400"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8"
        >
          <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {t('Math.finalBossGame.battleTitle')}
          </span>
        </motion.h1>

        <div className="flex justify-center items-center gap-4 md:gap-8 mb-8">
          {/* Maya */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-xl"></div>
              <Image
                src="/images/characters/maya-math/hero-maya-happy.png"
                alt="Maya"
                width={150}
                height={200}
                className="mx-auto relative z-10 h-[180px] w-auto object-contain"
              />
            </motion.div>
            <p className="text-2xl font-bold text-yellow-600 mt-2">MAYA</p>
            <p className="text-gray-500 font-medium">{t('Math.finalBossGame.you')}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="relative"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-5xl md:text-7xl font-black text-red-600 drop-shadow-lg"
            >
              VS
            </motion.span>
          </motion.div>

          {/* Sting */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-orange-400/30 rounded-full blur-xl"></div>
              <Image
                src="/images/characters/maya-math/sting.png"
                alt="Sting"
                width={150}
                height={200}
                className="mx-auto relative z-10 h-[180px] w-auto object-contain"
              />
            </motion.div>
            <p className="text-2xl font-bold text-orange-600 mt-2">STING</p>
            <p className="text-gray-500 font-medium">{t('Math.finalBossGame.cpu')}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-8 border-2 border-yellow-300"
        >
          <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <span className="text-3xl">📜</span> {t('Math.finalBossGame.rules')}
          </h2>
          <ul className="text-lg text-gray-700 space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              {t('Math.finalBossGame.rule1')}
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              {t('Math.finalBossGame.rule2')}
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">⏱️</span>
              {t('Math.finalBossGame.rule3')} <span className="font-bold text-red-600">{t('Math.finalBossGame.rule3Seconds')}</span> {t('Math.finalBossGame.rule3End')}
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🐝</span>
              {t('Math.finalBossGame.rule4')} <span className="font-bold text-orange-600">{t('Math.finalBossGame.rule4Seconds')}</span> {t('Math.finalBossGame.rule4End')}
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              {t('Math.finalBossGame.rule5')}
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <Link
            href="/matematica/menu"
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl rounded-full transition-all hover:scale-105 border-2 border-gray-300"
          >
            {t('Math.finalBossGame.back')}
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-xl rounded-full shadow-lg border-2 border-red-400"
          >
            {t('Math.finalBossGame.startBattle')}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
