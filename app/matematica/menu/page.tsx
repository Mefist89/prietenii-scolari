'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MatematicaMenuPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Фон */}
      <div className="absolute inset-0">
        <Image
          src="/images/math/bg-main.png"
          alt="Background"
          fill
          className="object-cover"
        />
        {/* Затемнение на 20% */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 min-h-screen flex flex-col py-8">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-8">
            {/* Мая слева */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/3 flex justify-center"
            >
              <Image
                src="/images/characters/maya-math/hero-maya2.png"
                alt="Мая"
                width={350}
                height={500}
                className="drop-shadow-2xl"
              />
            </motion.div>

            {/* Уровни справа */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-2/3"
            >
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-yellow-800 mb-4 drop-shadow-lg">
                  Matematică cu Maya
                </h1>
                <p className="text-2xl md:text-3xl text-yellow-700 font-semibold drop-shadow">
                  Alege nivelul tău:
                </p>
              </div>

              {/* Niveluri */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Nivel 1 */}
                <Link href="/matematica/nivel-1">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">1️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">Nivel 1</h2>
                    <p className="text-yellow-700 text-center text-sm">Adunări Simple</p>
                  </div>
                </Link>

                {/* Nivel 2 */}
                <Link href="/matematica/nivel-2">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">2️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">Nivel 2</h2>
                    <p className="text-yellow-700 text-center text-sm">Scăderi Simple</p>
                  </div>
                </Link>

                {/* Nivel 3 */}
                <Link href="/matematica/nivel-3">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">3️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">Nivel 3</h2>
                    <p className="text-yellow-700 text-center text-sm">Înmulțiri Simple</p>
                  </div>
                </Link>

                {/* Nivel 4 */}
                <Link href="/matematica/nivel-4">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">4️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">Nivel 4</h2>
                    <p className="text-yellow-700 text-center text-sm">Împărțiri Simple</p>
                  </div>
                </Link>

                {/* Nivel 5 */}
                <Link href="/matematica/nivel-5">
                  <div className="bg-white hover:bg-yellow-100 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg border-4 border-yellow-300">
                    <div className="text-4xl mb-3 text-center">5️⃣</div>
                    <h2 className="text-xl font-bold text-yellow-800 mb-1 text-center">Nivel 5</h2>
                    <p className="text-yellow-700 text-center text-sm">Operații Combinate</p>
                  </div>
                </Link>

                {/* Șef Final */}
                <Link href="/matematica/sef-final">
                  <div className="bg-gradient-to-br from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-xl border-4 border-red-600">
                    <div className="text-4xl mb-3 text-center">👑</div>
                    <h2 className="text-xl font-bold text-white mb-1 text-center">Șef Final</h2>
                    <p className="text-white text-center text-sm font-semibold">Provocarea Supremă!</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Кнопка Назад */}
        <div className="relative z-10 mt-8 flex justify-center">
          <Link
            href="/"
            className="px-10 py-4 bg-yellow-600 hover:bg-yellow-700 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            ← Înapoi
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
