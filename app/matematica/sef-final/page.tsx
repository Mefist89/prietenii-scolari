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
  const [timer, setTimer] = useState(5);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8"
          >
            ⚔️ BĂTĂLIA FINALĂ ⚔️
          </motion.h1>

          <div className="flex justify-center items-center gap-8 mb-8">
            {/* Maya */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-center"
            >
              <Image
                src="/images/characters/maya-math/hero-maya-happy.png"
                alt="Maya"
                width={180}
                height={180}
                className="mx-auto"
              />
              <p className="text-2xl font-bold text-yellow-600 mt-2">MAYA</p>
              <p className="text-gray-600">(Tu)</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-6xl font-bold text-red-600"
            >
              VS
            </motion.div>

            {/* Sting */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-center"
            >
              <Image
                src="/images/characters/maya-math/Sting.png"
                alt="Sting"
                width={180}
                height={180}
                className="mx-auto"
              />
              <p className="text-2xl font-bold text-orange-600 mt-2">STING</p>
              <p className="text-gray-600">(CPU)</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-yellow-100 rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-yellow-800 mb-4">📜 Reguli:</h2>
            <ul className="text-lg text-gray-700 space-y-2">
              <li>• Apare un număr în caseta portocalie</li>
              <li>• Găsește expresia care dă acest rezultat</li>
              <li>• Ai 10 secunde să răspunzi!</li>
              <li>• Sting răspunde în 5 secunde - fii rapid!</li>
              <li>• Primul care răspunde corect câștigă punctul</li>
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
              className="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-bold text-xl rounded-full transition-all hover:scale-105"
            >
              ← Înapoi
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-full shadow-lg"
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
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-400 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Timer */}
          <div className="flex justify-center mb-4">
            <motion.div
              key={timer}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className={`px-8 py-3 rounded-full text-2xl font-bold text-white ${
                timer <= 3 ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {timer} sec
            </motion.div>
          </div>

          {/* Target Number */}
          <div className="flex justify-center mb-6">
            <motion.div
              key={`target-${currentRound}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-orange-400 rounded-3xl px-16 py-6 shadow-2xl"
            >
              <span className="text-7xl md:text-8xl font-bold text-white">{roundData.target}</span>
            </motion.div>
          </div>

          {/* Main Row: Maya - Expressions - Sting */}
          <div className="flex justify-center items-center gap-4 md:gap-8 px-4">
            {/* Maya */}
            <motion.div
              animate={roundWinner === 'maya' ? { y: [0, -20, 0] } : {}}
              transition={{ repeat: roundWinner === 'maya' ? 3 : 0, duration: 0.3 }}
              className="text-center flex-shrink-0"
            >
              <div className="bg-yellow-100 rounded-xl px-4 py-2 mb-2 inline-block">
                <span className="text-2xl md:text-3xl font-bold text-yellow-600">{mayaScore}</span>
              </div>
              <div>
                <Image
                  src="/images/characters/maya-math/hero-maya-happy.png"
                  alt="Maya"
                  width={140}
                  height={180}
                  className={roundWinner === 'sting' ? 'grayscale opacity-50' : ''}
                />
              </div>
              <AnimatePresence>
                {roundWinner === 'maya' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-bold text-green-600 mt-2"
                  >
                    +1! 🎉
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Expressions */}
            <div className="flex-1 max-w-sm">
              <div className="grid grid-cols-1 gap-2">
                {roundData.expressions.map((expr, index) => {
                  const isCorrect = expr.result === roundData.target;
                  const isSelected = selectedAnswer === expr.result;
                  const showResult = roundWinner !== null;

                  let bgColor = 'bg-blue-500 hover:bg-blue-600';
                  if (showResult) {
                    if (isCorrect) bgColor = 'bg-green-500 ring-4 ring-green-300';
                    else if (isSelected) bgColor = 'bg-red-500';
                    else bgColor = 'bg-blue-300 opacity-60';
                  }

                  return (
                    <motion.button
                      key={`${currentRound}-${index}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(expr.result)}
                      disabled={playerAnswered}
                      whileHover={!playerAnswered ? { scale: 1.05 } : {}}
                      whileTap={!playerAnswered ? { scale: 0.95 } : {}}
                      className={`py-3 px-6 rounded-full text-xl font-bold text-white transition-colors ${bgColor} ${
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
              animate={roundWinner === 'sting' ? { y: [0, -20, 0] } : {}}
              transition={{ repeat: roundWinner === 'sting' ? 3 : 0, duration: 0.3 }}
              className="text-center flex-shrink-0"
            >
              <div className="bg-orange-100 rounded-xl px-4 py-2 mb-2 inline-block">
                <span className="text-2xl md:text-3xl font-bold text-orange-600">{stingScore}</span>
              </div>
              <div>
                <Image
                  src="/images/characters/maya-math/Sting.png"
                  alt="Sting"
                  width={140}
                  height={180}
                  className={roundWinner === 'maya' ? 'grayscale opacity-50' : ''}
                />
              </div>
              <AnimatePresence>
                {roundWinner === 'sting' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-bold text-red-600 mt-2"
                  >
                    +1! 😈
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Round indicator */}
          <div className="text-center mt-6">
            <span className="text-xl font-bold text-gray-700 bg-white/80 px-4 py-2 rounded-full">
              Runda {currentRound + 1}/{totalRounds}
            </span>
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
      <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
        >
          {playerWon ? (
            <>
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>
              <h1 className="text-4xl font-bold text-green-600 mb-4">
                FELICITĂRI! AI CÂȘTIGAT!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Maya a învins pe Sting! Ești campionul matematicii!
              </p>
            </>
          ) : tie ? (
            <>
              <div className="text-8xl mb-4">🤝</div>
              <h1 className="text-4xl font-bold text-yellow-600 mb-4">
                EGALITATE!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                O luptă strânsă! Încearcă din nou pentru victorie!
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-4">😢</div>
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                STING A CÂȘTIGAT!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Nu-ți face griji! Exersează și încearcă din nou!
              </p>
            </>
          )}

          {/* Score */}
          <div className="flex justify-center gap-12 mb-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-center"
            >
              <Image
                src="/images/characters/maya-math/hero-maya-happy.png"
                alt="Maya"
                width={100}
                height={100}
              />
              <p className="text-3xl font-bold text-yellow-600">{mayaScore}</p>
            </motion.div>
            <div className="text-4xl font-bold text-gray-400 self-center">-</div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-center"
            >
              <Image
                src="/images/characters/maya-math/Sting.png"
                alt="Sting"
                width={100}
                height={100}
              />
              <p className="text-3xl font-bold text-orange-600">{stingScore}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            <Link
              href="/matematica/menu"
              className="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-bold text-xl rounded-full transition-all hover:scale-105"
            >
              ← Meniu
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-full shadow-lg"
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
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-white text-2xl">Se încarcă...</div>
    </div>
  );
}
