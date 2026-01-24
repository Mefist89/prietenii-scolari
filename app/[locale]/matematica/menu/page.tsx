'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function MatematicaMenuPage() {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/math/bg-main.png"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col py-8">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/3 flex justify-center"
            >
              <Image
                src="/images/characters/maya-math/hero-maya2.png"
                alt="Maya"
                width={350}
                height={500}
                className="drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-2/3"
            >
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-yellow-800 mb-4 drop-shadow-lg">
                  {t('Math.title')}
                </h1>
                <p className="text-2xl md:text-3xl text-yellow-700 font-semibold drop-shadow">
                  {t('Math.chooseLevel')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/matematica/nivel-1">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">1️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">{t('Math.level1.title')}</h2>
                    <p className="text-yellow-700 text-center text-sm">{t('Math.level1.subtitle')}</p>
                  </div>
                </Link>

                <Link href="/matematica/nivel-2">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">2️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">{t('Math.level2.title')}</h2>
                    <p className="text-yellow-700 text-center text-sm">{t('Math.level2.subtitle')}</p>
                  </div>
                </Link>

                <Link href="/matematica/nivel-3">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">3️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">{t('Math.level3.title')}</h2>
                    <p className="text-yellow-700 text-center text-sm">{t('Math.level3.subtitle')}</p>
                  </div>
                </Link>

                <Link href="/matematica/nivel-4">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">4️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">{t('Math.level4.title')}</h2>
                    <p className="text-yellow-700 text-center text-sm">{t('Math.level4.subtitle')}</p>
                  </div>
                </Link>

                <Link href="/matematica/nivel-5">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">5️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">{t('Math.level5.title')}</h2>
                    <p className="text-yellow-700 text-center text-sm">{t('Math.level5.subtitle')}</p>
                  </div>
                </Link>

                <Link href="/matematica/sef-final">
                  <div className="bg-gradient-to-br from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-xl border-4 border-red-600">
                    <div className="text-4xl mb-3 text-center">👑</div>
                    <h2 className="text-xl font-bold text-white mb-1 text-center">{t('Math.finalBoss')}</h2>
                    <p className="text-white text-center text-sm font-semibold">{t('Math.supremeChallenge')}</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex justify-center">
          <Link
            href="/"
            className="px-10 py-4 bg-yellow-600 hover:bg-yellow-700 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            ← {t('Common.back')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
