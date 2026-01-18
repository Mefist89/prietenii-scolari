'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const levels = [
  { id: 1, title: 'Nivel 1', subtitle: 'Cunoaște computerul', href: '/informatica/nivel-1', emoji: '💻' },
  { id: 2, title: 'Nivel 2', subtitle: 'Părțile computerului', href: '/informatica/nivel-2', emoji: '🖥️' },
  { id: 3, title: 'Nivel 3', subtitle: 'Algoritmi simpli', href: '/informatica/nivel-3', emoji: '🔄' },
  { id: 4, title: 'Nivel 4', subtitle: 'Siguranța pe internet', href: '/informatica/nivel-4', emoji: '🛡️' },
  { id: 5, title: 'Nivel 5', subtitle: 'Primii pași în programare', href: '/informatica/nivel-5', emoji: '⌨️' },
];

export default function InformaticaMenuPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/info/bg.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <span className="text-cyan-400/30 text-2xl font-mono">
              {['💻', '🖱️', '⌨️', '🖥️', '📱', '🔌', '</>','{}'][Math.floor(Math.random() * 8)]}
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
            Informatică cu Byte
          </h1>
          <p className="text-cyan-200 text-lg md:text-xl mt-2 font-semibold drop-shadow-md">
            Alege nivelul de învățare
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
                      Șef Final
                    </h3>
                    <p className="text-yellow-100 text-sm md:text-base font-medium">
                      Provocarea finală!
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
              ← Înapoi acasă
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
