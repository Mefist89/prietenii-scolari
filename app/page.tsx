'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const characters = [
  {
    id: 1,
    name: 'Maya',
    subject: 'Matematică',
    description: 'Maya te va învăța matematica',
    image: '/images/characters/maya-math/maya.png',
    bgColor: 'from-yellow-400 to-orange-500',
    href: '/matematica',
  },
  {
    id: 2,
    name: 'Byte',
    subject: 'Informatică',
    description: 'Byte te va învăța informatica',
    image: '/images/characters/byte-info/byte.png',
    bgColor: 'from-cyan-400 to-blue-500',
    href: '/informatica',
  },
  {
    id: 3,
    name: 'Lumi',
    subject: 'Limba Română',
    description: 'Lumi te va învăța limba română',
    image: '/images/characters/lumi-rom/lumi.png',
    bgColor: 'from-pink-400 to-purple-500',
    href: '/limba-romana',
  },
];

export default function HomePage() {
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
            Prietenii Școlari
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">
            Alege personajul tău și începe aventura!
          </p>
        </motion.div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={character.href}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative bg-gradient-to-br ${character.bgColor} rounded-3xl overflow-hidden shadow-2xl cursor-pointer group`}
                >
                  {/* Character Image */}
                  <div className="relative h-80 flex items-end justify-center p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <Image
                        src={character.image}
                        alt={character.name}
                        width={300}
                        height={400}
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="bg-white p-6 relative">
                    <h2 className="text-3xl font-black text-gray-800 mb-1">
                      {character.subject}
                    </h2>
                    <p className="text-lg font-bold text-gray-600 mb-3">
                      {character.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {character.description}
                    </p>

                    {/* Know More Link */}
                    <div className="flex items-center text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">
                      <span>Joacă acum</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm"></div>
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
            📖 Cum să joci
          </Link>
          <Link
            href="/contacte"
            className="px-8 py-3 bg-white hover:bg-purple-50 text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-purple-200"
          >
            ✉️ Contacte
          </Link>
          <Link
            href="/creatori"
            className="px-8 py-3 bg-white hover:bg-purple-50 text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-purple-200"
          >
            👥 Creatori
          </Link>
        </motion.div>
      </div>
    </div>
  );
}