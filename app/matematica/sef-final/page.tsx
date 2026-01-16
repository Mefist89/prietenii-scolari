'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Генерация одного раунда
function generateRound() {
  const target = Math.floor(Math.random() * 14) + 2;
  const expressions: { text: string; result: number }[] = [];

  // 2 правильных примера
  const half = Math.floor(target / 2);
  expressions.push({ text: `${half}+${target - half}=`, result: target });
  expressions.push({ text: `${target + 3}-3=`, result: target });

  // 4 неправильных примера
  const offsets = [-2, -1, 1, 2];
  for (const offset of offsets) {
    const wrongResult = target + offset;
    if (wrongResult > 0) {
      const a = Math.floor(wrongResult / 2);
      const b = wrongResult - a;
      expressions.push({ text: `${a}+${b}=`, result: wrongResult });
    }
  }

  // Перемешиваем
  for (let i = expressions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [expressions[i], expressions[j]] = [expressions[j], expressions[i]];
  }

  return { target, expressions };
}

export default function SefFinalPage() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [roundData, setRoundData] = useState<{ target: number; expressions: { text: string; result: number }[] } | null>(null);
  const [timer, setTimer] = useState(10);
  const [mayaScore, setMayaScore] = useState(0);
  const [stingScore, setStingScore] = useState(0);
  const [roundWinner, setRoundWinner] = useState<'maya' | 'sting' | 'none' | null>(null);
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const totalRounds = 10;

  // Начать игру
  function startGame() {
    const firstRound = generateRound();
    setRoundData(firstRound);
    setCurrentRound(0);
    setMayaScore(0);
    setStingScore(0);
    setTimer(10);
    setRoundWinner(null);
    setPlayerAnswered(false);
    setSelectedAnswer(null);
    setGameState('playing');
  }

  // Начать новый раунд
  function startNewRound() {
    const newRound = generateRound();
    setRoundData(newRound);
    setTimer(10);
    setRoundWinner(null);
    setPlayerAnswered(false);
    setSelectedAnswer(null);
  }

  // Обработка ответа
  function handleAnswer(result: number) {
    if (playerAnswered || roundWinner) return;

    setPlayerAnswered(true);
    setSelectedAnswer(result);

    if (roundData && result === roundData.target) {
      setRoundWinner('maya');
      setMayaScore(s => s + 1);
    } else {
      setRoundWinner('sting');
      setStingScore(s => s + 1);
    }
  }

  // Таймер и CPU
  useEffect(() => {
    if (gameState !== 'playing' || !roundData || roundWinner) return;

    // CPU отвечает через 5 секунд
    const cpuTimer = setTimeout(() => {
      if (!playerAnswered) {
        setPlayerAnswered(true);
        setRoundWinner('sting');
        setStingScore(s => s + 1);
        setSelectedAnswer(roundData.target);
      }
    }, 5000);

    // Обратный отсчет
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          if (!playerAnswered) {
            setPlayerAnswered(true);
            setRoundWinner('none');
            setSelectedAnswer(roundData.target);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(cpuTimer);
      clearInterval(interval);
    };
  }, [gameState, roundData, roundWinner, playerAnswered]);

  // Переход к следующему раунду
  useEffect(() => {
    if (!roundWinner || gameState !== 'playing') return;

    const nextTimer = setTimeout(() => {
      if (currentRound < totalRounds - 1) {
        setCurrentRound(r => r + 1);
        startNewRound();
      } else {
        setGameState('finished');
      }
    }, 2000);

    return () => clearTimeout(nextTimer);
  }, [roundWinner, currentRound, gameState]);

  // INTRO
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Animated background stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

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
              ⚔️ BĂTĂLIA FINALĂ ⚔️
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
                  width={180}
                  height={180}
                  className="mx-auto relative z-10"
                />
              </motion.div>
              <p className="text-2xl font-bold text-yellow-600 mt-2">MAYA</p>
              <p className="text-gray-500 font-medium">(Tu)</p>
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
                  src="/images/characters/maya-math/Sting.png"
                  alt="Sting"
                  width={180}
                  height={180}
                  className="mx-auto relative z-10"
                />
              </motion.div>
              <p className="text-2xl font-bold text-orange-600 mt-2">STING</p>
              <p className="text-gray-500 font-medium">(CPU)</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-8 border-2 border-yellow-300"
          >
            <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">📜</span> Reguli:
            </h2>
            <ul className="text-lg text-gray-700 space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                Apare un număr în caseta portocalie
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                Găsește expresia care dă acest rezultat
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                Ai <span className="font-bold text-red-600">10 secunde</span> să răspunzi!
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🐝</span>
                Sting răspunde în <span className="font-bold text-orange-600">5 secunde</span> - fii rapid!
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                Primul care răspunde corect câștigă punctul
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
              ← Înapoi
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-xl rounded-full shadow-lg border-2 border-red-400"
            >
              🎮 START BĂTĂLIA!
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // PLAYING
  if (gameState === 'playing' && roundData) {
    const timerPercentage = (timer / 10) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Timer Bar */}
          <div className="mb-4">
            <div className="flex justify-center mb-2">
              <motion.div
                key={timer}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className={`px-6 py-2 rounded-full text-2xl font-bold text-white shadow-lg ${
                  timer <= 3 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                }`}
              >
                ⏱️ {timer} sec
              </motion.div>
            </div>
            <div className="w-full max-w-md mx-auto h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${timer <= 3 ? 'bg-red-500' : 'bg-emerald-500'}`}
                initial={{ width: '100%' }}
                animate={{ width: `${timerPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Round indicator */}
          <div className="text-center mb-4">
            <span className="text-lg font-bold text-white/80 bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
              Runda {currentRound + 1} din {totalRounds}
            </span>
          </div>

          {/* Target Number */}
          <div className="flex justify-center mb-6">
            <motion.div
              key={`target-${currentRound}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-orange-500/50 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl px-12 md:px-20 py-6 shadow-2xl border-4 border-yellow-300">
                <span className="text-6xl md:text-8xl font-black text-white drop-shadow-lg">{roundData.target}</span>
              </div>
            </motion.div>
          </div>

          {/* Main Row: Maya - Expressions - Sting */}
          <div className="flex justify-center items-center gap-2 md:gap-6 px-2">
            {/* Maya */}
            <motion.div
              animate={roundWinner === 'maya' ? { y: [0, -30, 0] } : {}}
              transition={{ repeat: roundWinner === 'maya' ? 3 : 0, duration: 0.4 }}
              className="text-center flex-shrink-0"
            >
              {/* Score badge - выше персонажа */}
              <motion.div
                key={mayaScore}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="mb-3"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-xl border-4 border-yellow-300 mx-auto">
                  <span className="text-2xl md:text-3xl font-black text-yellow-900">{mayaScore}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                {/* Glow effect */}
                <div className={`absolute -inset-2 rounded-full blur-lg transition-all duration-300 ${
                  roundWinner === 'maya' ? 'bg-green-400/60' : roundWinner === 'sting' ? 'bg-gray-400/30' : 'bg-yellow-400/40'
                }`}></div>

                <Image
                  src="/images/characters/maya-math/hero-maya-happy.png"
                  alt="Maya"
                  width={130}
                  height={170}
                  className={`relative z-10 transition-all duration-300 ${roundWinner === 'sting' ? 'grayscale opacity-50' : ''}`}
                />
              </motion.div>

              <AnimatePresence>
                {roundWinner === 'maya' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2"
                  >
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      +1! 🎉
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Expressions */}
            <div className="flex-1 max-w-xs md:max-w-sm">
              <div className="grid grid-cols-1 gap-2">
                {roundData.expressions.map((expr, index) => {
                  const isCorrect = expr.result === roundData.target;
                  const isSelected = selectedAnswer === expr.result;
                  const showResult = roundWinner !== null;

                  let buttonStyle = 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400';
                  if (showResult) {
                    if (isCorrect) buttonStyle = 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 ring-4 ring-green-400/50';
                    else if (isSelected) buttonStyle = 'bg-gradient-to-r from-red-500 to-red-600 border-red-400';
                    else buttonStyle = 'bg-gradient-to-r from-gray-400 to-gray-500 border-gray-300 opacity-50';
                  }

                  return (
                    <motion.button
                      key={`${currentRound}-${index}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(expr.result)}
                      disabled={playerAnswered}
                      whileHover={!playerAnswered ? { scale: 1.05, x: 5 } : {}}
                      whileTap={!playerAnswered ? { scale: 0.95 } : {}}
                      className={`py-3 px-6 rounded-xl text-xl font-bold text-white transition-all shadow-lg border-2 ${buttonStyle} ${
                        playerAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {expr.text}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Sting */}
            <motion.div
              animate={roundWinner === 'sting' ? { y: [0, -30, 0] } : {}}
              transition={{ repeat: roundWinner === 'sting' ? 3 : 0, duration: 0.4 }}
              className="text-center flex-shrink-0"
            >
              {/* Score badge - выше персонажа */}
              <motion.div
                key={stingScore}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="mb-3"
              >
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-xl border-4 border-orange-300 mx-auto">
                  <span className="text-2xl md:text-3xl font-black text-orange-900">{stingScore}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="relative"
              >
                {/* Glow effect */}
                <div className={`absolute -inset-2 rounded-full blur-lg transition-all duration-300 ${
                  roundWinner === 'sting' ? 'bg-red-400/60' : roundWinner === 'maya' ? 'bg-gray-400/30' : 'bg-orange-400/40'
                }`}></div>

                <Image
                  src="/images/characters/maya-math/Sting.png"
                  alt="Sting"
                  width={130}
                  height={170}
                  className={`relative z-10 transition-all duration-300 ${roundWinner === 'maya' ? 'grayscale opacity-50' : ''}`}
                />
              </motion.div>

              <AnimatePresence>
                {roundWinner === 'sting' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2"
                  >
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      +1! 😈
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // FINISHED
  if (gameState === 'finished') {
    const playerWon = mayaScore > stingScore;
    const tie = mayaScore === stingScore;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Confetti effect for winner */}
        {playerWon && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
                }}
                initial={{ y: -20, opacity: 1 }}
                animate={{
                  y: '100vh',
                  rotate: Math.random() * 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-gradient-to-b from-white to-gray-100 rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center relative z-10 border-4 border-yellow-400"
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
                  FELICITĂRI! AI CÂȘTIGAT!
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Maya a învins pe Sting! Ești campionul matematicii! 🌟
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
                O luptă strânsă! Încearcă din nou pentru victorie!
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-4">😢</div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  STING A CÂȘTIGAT!
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Nu-ți face griji! Exersează și încearcă din nou! 💪
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
                  height={100}
                  className="relative z-10"
                />
              </div>
              <div className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full px-6 py-2 inline-block">
                <p className="text-3xl font-black text-yellow-900">{mayaScore}</p>
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
                  src="/images/characters/maya-math/Sting.png"
                  alt="Sting"
                  width={100}
                  height={100}
                  className="relative z-10"
                />
              </div>
              <div className="mt-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full px-6 py-2 inline-block">
                <p className="text-3xl font-black text-orange-900">{stingScore}</p>
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
              onClick={startGame}
              className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-xl rounded-full shadow-lg border-2 border-red-400"
            >
              🔄 Joacă din nou
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Loading fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full"
      />
    </div>
  );
}
