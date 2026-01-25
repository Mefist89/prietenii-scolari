'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function RomanaMenuPage() {
  const t = useTranslations();

  const levels = [
    { id: 1, title: t('Romanian.level1.title'), subtitle: t('Romanian.level1.subtitle'), href: '/limba-romana/nivel-1' },
    { id: 2, title: t('Romanian.level2.title'), subtitle: t('Romanian.level2.subtitle'), href: '/limba-romana/nivel-2' },
    { id: 3, title: t('Romanian.level3.title'), subtitle: t('Romanian.level3.subtitle'), href: '/limba-romana/nivel-3' },
    { id: 4, title: t('Romanian.level4.title'), subtitle: t('Romanian.level4.subtitle'), href: '/limba-romana/nivel-4' },
    { id: 5, title: t('Romanian.level5.title'), subtitle: t('Romanian.level5.subtitle'), href: '/limba-romana/nivel-5' },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/rom/bg-frame.jpg')" }}
    >
      {/* Overlay - 60% darker */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 min-h-screen flex flex-col p-4">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-6"
        >
          <h1 className="text-4xl md:text-5xl font-black text-[#F0F4E5] drop-shadow-lg">
            {t('Romanian.title')}
          </h1>
          <p className="text-[#E8A33D] text-lg md:text-xl mt-2 font-semibold">
            {t('Romanian.chooseLevel')}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto w-full">
          {/* Lumi */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/characters/lumi-rom/lumi.png"
                alt="Lumi"
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
                    className={`
                      relative bg-gradient-to-br from-[#F0F4E5] to-[#E8E4D9]
                      rounded-2xl p-4 md:p-6 shadow-xl border-4 border-[#4A6E3C]
                      cursor-pointer transition-all
                      hover:shadow-2xl hover:border-[#E8A33D]
                    `}
                  >
                    {/* Level Number Badge */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#E8A33D] to-[#D4922E] rounded-full flex items-center justify-center border-3 border-[#F0F4E5] shadow-lg">
                      <span className="text-white font-black text-lg md:text-xl">{level.id}</span>
                    </div>

                    {/* Content */}
                    <div className="text-center pt-2">
                      <h3 className="text-[#612422] font-bold text-lg md:text-xl mb-1">
                        {level.title}
                      </h3>
                      <p className="text-[#4A6E3C] text-sm md:text-base font-medium">
                        {level.subtitle}
                      </p>
                    </div>

                    {/* Stars (placeholder for progress) */}
                    <div className="flex justify-center gap-1 mt-3">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className="text-[#E8A33D] text-lg">⭐</span>
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
              <Link href="/limba-romana/sef-final">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative bg-gradient-to-br from-[#612422] to-[#4A1A19]
                    rounded-2xl p-4 md:p-6 shadow-xl border-4 border-[#8B3A38]
                    cursor-pointer transition-all
                    hover:shadow-2xl hover:border-[#E8A33D]
                  `}
                >
                  {/* Boss Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#8B3A38] to-[#612422] rounded-full flex items-center justify-center border-3 border-[#F0F4E5] shadow-lg">
                    <span className="text-xl md:text-2xl">👑</span>
                  </div>

                  {/* Content */}
                  <div className="text-center pt-2">
                    <h3 className="text-[#F0F4E5] font-bold text-lg md:text-xl mb-1">
                      {t('Romanian.finalBoss')}
                    </h3>
                    <p className="text-[#E8A33D] text-sm md:text-base font-medium">
                      {t('Romanian.finalChallenge')}
                    </p>
                  </div>

                  {/* Lock/Trophy */}
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
              className="px-8 py-3 bg-[#4A6E3C] hover:bg-[#3D5C32] text-[#F0F4E5] font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30 transition-colors"
            >
              {t('Romanian.backHome')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
