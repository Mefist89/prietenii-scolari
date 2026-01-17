'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Фиксированные позиции конфетти (избегаем hydration error)
const CONFETTI_POSITIONS = [
  { left: 5, color: '#FFD700', duration: 3.2, delay: 0.1, rotate: 45 },
  { left: 12, color: '#FF6B6B', duration: 4.1, delay: 0.5, rotate: 120 },
  { left: 18, color: '#4ECDC4', duration: 3.5, delay: 0.8, rotate: 200 },
  { left: 25, color: '#45B7D1', duration: 4.5, delay: 0.3, rotate: 90 },
  { left: 32, color: '#96CEB4', duration: 3.8, delay: 1.2, rotate: 270 },
  { left: 38, color: '#FFD700', duration: 4.2, delay: 0.6, rotate: 30 },
  { left: 45, color: '#FF6B6B', duration: 3.3, delay: 1.0, rotate: 150 },
  { left: 52, color: '#4ECDC4', duration: 4.8, delay: 0.2, rotate: 220 },
  { left: 58, color: '#45B7D1', duration: 3.6, delay: 0.9, rotate: 80 },
  { left: 65, color: '#96CEB4', duration: 4.0, delay: 1.5, rotate: 300 },
  { left: 72, color: '#FFD700', duration: 3.9, delay: 0.4, rotate: 60 },
  { left: 78, color: '#FF6B6B', duration: 4.3, delay: 1.1, rotate: 180 },
  { left: 85, color: '#4ECDC4', duration: 3.4, delay: 0.7, rotate: 240 },
  { left: 92, color: '#45B7D1', duration: 4.6, delay: 1.3, rotate: 110 },
  { left: 98, color: '#96CEB4', duration: 3.7, delay: 0.0, rotate: 330 },
  { left: 8, color: '#FFD700', duration: 4.4, delay: 1.4, rotate: 15 },
  { left: 22, color: '#FF6B6B', duration: 3.1, delay: 0.85, rotate: 195 },
  { left: 35, color: '#4ECDC4', duration: 4.7, delay: 1.6, rotate: 255 },
  { left: 48, color: '#45B7D1', duration: 3.0, delay: 0.35, rotate: 75 },
  { left: 62, color: '#96CEB4', duration: 4.9, delay: 1.8, rotate: 315 },
  { left: 75, color: '#FFD700', duration: 3.25, delay: 0.55, rotate: 135 },
  { left: 88, color: '#FF6B6B', duration: 4.15, delay: 1.25, rotate: 285 },
  { left: 95, color: '#4ECDC4', duration: 3.45, delay: 0.15, rotate: 165 },
  { left: 15, color: '#45B7D1', duration: 4.35, delay: 1.05, rotate: 345 },
  { left: 55, color: '#96CEB4', duration: 3.55, delay: 0.75, rotate: 225 },
  { left: 42, color: '#FFD700', duration: 4.25, delay: 1.45, rotate: 105 },
  { left: 68, color: '#FF6B6B', duration: 3.15, delay: 0.25, rotate: 285 },
  { left: 82, color: '#4ECDC4', duration: 4.55, delay: 1.65, rotate: 45 },
  { left: 28, color: '#45B7D1', duration: 3.65, delay: 0.95, rotate: 210 },
  { left: 3, color: '#96CEB4', duration: 4.05, delay: 1.35, rotate: 150 },
];

interface ResultScreenProps {
  mayaScore: number;
  stingScore: number;
  onPlayAgain: () => void;
}

export default function ResultScreen({ mayaScore, stingScore, onPlayAgain }: ResultScreenProps) {
  const playerWon = mayaScore > stingScore;
  const tie = mayaScore === stingScore;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/ui/lv6-math/bg.png')" }}
    >
      {/* Overlay for better readability - 40% darker */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Confetti effect for winner */}
      {playerWon && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {CONFETTI_POSITIONS.map((confetti, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: `${confetti.left}%`,
                backgroundColor: confetti.color,
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{
                y: '100vh',
                rotate: confetti.rotate,
                opacity: 0,
              }}
              transition={{
                duration: confetti.duration,
                repeat: Infinity,
                delay: confetti.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
        className="bg-gradient-to-b from-white to-gray-100 rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center relative z-20 border-4 border-yellow-400"
      >
        {playerWon ? (
          <>
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-8xl mb-4"
            >
              🏆
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                FELICITARI! AI CASTIGAT!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Maya a invins pe Sting! Esti campionul matematicii! 🌟
            </p>
          </>
        ) : tie ? (
          <>
            <div className="text-8xl mb-4">🤝</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                EGALITATE!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              O lupta stransa! Incearca din nou pentru victorie!
            </p>
          </>
        ) : (
          <>
            <div className="text-8xl mb-4">😢</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                STING A CASTIGAT!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Nu-ti face griji! Exerseaza si incearca din nou! 💪
            </p>
          </>
        )}

        {/* Score */}
        <div className="flex justify-center items-center gap-6 md:gap-12 mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="relative">
              <div className={`absolute -inset-2 rounded-full blur-lg ${playerWon ? 'bg-green-400/50' : 'bg-gray-300/50'}`}></div>
              <Image
                src="/images/characters/maya-math/hero-maya-happy.png"
                alt="Maya"
                width={100}
                height={120}
                className="relative z-10 h-[100px] w-auto object-contain"
              />
            </div>
            <div className="mt-2 relative">
              <Image
                src="/images/ui/lv6-math/drop.png"
                alt="Score"
                width={60}
                height={75}
                className="mx-auto h-[60px] w-auto object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-yellow-900 drop-shadow-md pt-1">
                {mayaScore}
              </span>
            </div>
          </motion.div>

          <div className="text-5xl font-black text-gray-300">-</div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="relative">
              <div className={`absolute -inset-2 rounded-full blur-lg ${!playerWon && !tie ? 'bg-red-400/50' : 'bg-gray-300/50'}`}></div>
              <Image
                src="/images/characters/maya-math/sting.png"
                alt="Sting"
                width={100}
                height={120}
                className="relative z-10 h-[100px] w-auto object-contain"
              />
            </div>
            <div className="mt-2 relative">
              <Image
                src="/images/ui/lv6-math/drop.png"
                alt="Score"
                width={60}
                height={75}
                className="mx-auto h-[60px] w-auto object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-yellow-900 drop-shadow-md pt-1">
                {stingScore}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/matematica/menu"
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl rounded-full transition-all hover:scale-105 border-2 border-gray-300"
          >
            ← Meniu
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-xl rounded-full shadow-lg border-2 border-red-400"
          >
            🔄 Joaca din nou
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
