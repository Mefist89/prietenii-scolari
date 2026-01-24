'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const characters = [
    {
      id: 1,
      key: 'maya',
      image: '/images/characters/maya-math/maya.png',
      bgColor: 'from-yellow-400 to-orange-500',
      iconBg: 'from-orange-500 to-orange-600',
      buttonBg: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-500',
      href: '/matematica' as const,
    },
    {
      id: 2,
      key: 'byte',
      image: '/images/characters/byte-info/byte.png',
      bgColor: 'from-gray-800 to-gray-900',
      iconBg: 'from-cyan-400 to-cyan-500',
      buttonBg: 'from-cyan-400 to-blue-500',
      textColor: 'text-cyan-400',
      href: '/informatica' as const,
    },
    {
      id: 3,
      key: 'lumi',
      image: '/images/characters/lumi-rom/lumi.png',
      bgColor: 'from-red-900 to-amber-900',
      iconBg: 'from-amber-500 to-orange-600',
      buttonBg: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      href: '/limba-romana' as const,
    },
  ];

  const switchLanguage = (newLocale: 'ro' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            {t('HomePage.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">
            {t('HomePage.subtitle')}
          </p>
        </motion.div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-5xl mx-auto">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="max-w-sm mx-auto w-full"
            >
              <Link href={character.href}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative cursor-pointer group"
                >
                  {/* Outer Frame with Border */}
                  <div className="bg-white rounded-[37px] p-5 shadow-2xl">
                    {/* Inner Card with Gradient Background */}
                    <div className={`relative bg-gradient-to-br ${character.bgColor} rounded-[28px] overflow-hidden`}>
                      {/* Character Section */}
                      <div className="relative h-[368px] flex items-end justify-center px-7 pt-9 pb-7">
                        {/* Decorative floating elements */}
                        <div className="absolute top-7 left-7 w-2 h-5 bg-white/30 rounded-full rotate-45"></div>
                        <div className="absolute top-9 right-9 w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="absolute bottom-28 left-9 w-2 h-2 bg-white/30 rounded-full"></div>
                        <div className="absolute top-14 right-7 w-2 h-6 bg-white/30 rounded-full rotate-12"></div>

                        {/* Character */}
                        <div className="relative z-10 flex flex-col items-center mb-5 w-full h-full">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-end justify-center"
                          >
                            <div className="relative w-[230px] h-[299px]">
                              <Image
                                src={character.image}
                                alt={t(`Characters.${character.key}.name`)}
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                              />
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Info Blocks */}
                      <div className="px-6 pb-6 space-y-3">
                        {/* Subject Block */}
                        <div className={`${character.id === 2 ? 'bg-gray-800/90' : character.id === 3 ? 'bg-red-950/90' : 'bg-white'} rounded-2xl p-5 shadow-lg`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-14 h-14 bg-gradient-to-br ${character.iconBg} rounded-full flex items-center justify-center text-white text-2xl shrink-0`}>
                              {character.id === 1 ? '➕' : character.id === 2 ? '💻' : '📖'}
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm ${character.id === 2 || character.id === 3 ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                                {t(`Characters.${character.key}.name`)}
                              </p>
                              <p className={`text-lg font-bold ${character.textColor} truncate`}>
                                {t(`Characters.${character.key}.subject`)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Start Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full bg-gradient-to-r ${character.buttonBg} text-white font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg`}
                        >
                          {t('HomePage.startAdventure')}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Menu Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/cum-sa-joci"
            className="px-8 py-3 bg-white hover:bg-purple-50 text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-purple-200"
          >
            📖 {t('HomePage.howToPlay')}
          </Link>
          <Link
            href="/contacte"
            className="px-8 py-3 bg-white hover:bg-purple-50 text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-purple-200"
          >
            ✉️ {t('HomePage.contacts')}
          </Link>
          <Link
            href="/creatori"
            className="px-8 py-3 bg-white hover:bg-purple-50 text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-purple-200"
          >
            👥 {t('HomePage.creators')}
          </Link>
          <button
            onClick={() => switchLanguage('ro')}
            className={`px-8 py-3 font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 ${
              locale === 'ro'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-400'
                : 'bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-200'
            }`}
          >
            <Image src="/images/flags/ro.svg" alt="Română" width={24} height={16} className="rounded-sm" />
            Română
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`px-8 py-3 font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 ${
              locale === 'en'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-400'
                : 'bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-200'
            }`}
          >
            <Image src="/images/flags/en.svg" alt="English" width={24} height={16} className="rounded-sm" />
            English
          </button>
        </motion.div>
      </div>
    </div>
  );
}
