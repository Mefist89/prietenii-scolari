'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultScreen from './ResultScreen';

// Генерация одного раунда
function generateRound() {
  const target = Math.floor(Math.random() * 14) + 2;
  const expressions: { text: string; result: number }[] = [];

  // 2 правильных примера
  const half = Math.floor(target / 2);
  expressions.push({ text: `${half}+${target - half}=`, result: target });
  expressions.push({ text: `${target + 3}-3=`, result: target });

  // 4 неправильных примера (гарантированно 4 штуки)
  const wrongResults: number[] = [];
  const offsets = [-3, -2, -1, 1, 2, 3];

  for (const offset of offsets) {
    const wrongResult = target + offset;
    if (wrongResult > 0 && wrongResults.length < 4) {
      wrongResults.push(wrongResult);
    }
  }

  for (const wrongResult of wrongResults) {
    const a = Math.floor(wrongResult / 2);
    const b = wrongResult - a;
    expressions.push({ text: `${a}+${b}=`, result: wrongResult });
  }

  // Перемешиваем
  for (let i = expressions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [expressions[i], expressions[j]] = [expressions[j], expressions[i]];
  }

  return { target, expressions };
}

interface BattleGameProps {
  onBackToIntro: () => void;
}

export default function BattleGame({ onBackToIntro }: BattleGameProps) {
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [currentRound, setCurrentRound] = useState(0);
  const [roundData, setRoundData] = useState<{ target: number; expressions: { text: string; result: number }[] } | null>(null);
  const [timer, setTimer] = useState(10);
  const [mayaScore, setMayaScore] = useState(0);
  const [stingScore, setStingScore] = useState(0);
  const [roundWinner, setRoundWinner] = useState<'maya' | 'sting' | 'none' | null>(null);
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const totalRounds = 10;

  // Инициализация первого раунда
  useEffect(() => {
    const firstRound = generateRound();
    setRoundData(firstRound);
  }, []);

  // Начать новый раунд
  function startNewRound() {
    const newRound = generateRound();
    setRoundData(newRound);
    setTimer(10);
    setRoundWinner(null);
    setPlayerAnswered(false);
    setSelectedAnswer(null);
  }

  // Сбросить игру
  function resetGame() {
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

    // CPU отвечает через 10 секунд
    const cpuTimer = setTimeout(() => {
      if (!playerAnswered) {
        setPlayerAnswered(true);
        setRoundWinner('sting');
        setStingScore(s => s + 1);
        setSelectedAnswer(roundData.target);
      }
    }, 10000);

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

  // PLAYING
  if (gameState === 'playing' && roundData) {
    const timerPercentage = (timer / 10) * 100;

    return (
      <div
        className="min-h-screen p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ui/lv6-math/bg.png')" }}
      >
        {/* Overlay for better readability - 40% darker */}
        <div className="absolute inset-0 bg-black/40"></div>

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
          <div className="flex justify-center items-center gap-4 md:gap-8 px-2">
            {/* Maya */}
            <motion.div
              animate={roundWinner === 'maya' ? { y: [0, -30, 0] } : {}}
              transition={{ repeat: roundWinner === 'maya' ? 3 : 0, duration: 0.4 }}
              className="text-center flex-shrink-0"
            >
              {/* Score badge - honey drop */}
              <motion.div
                key={mayaScore}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="mb-3 relative"
              >
                <Image
                  src="/images/ui/lv6-math/drop.png"
                  alt="Score"
                  width={80}
                  height={100}
                  className="mx-auto h-[80px] w-auto object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-black text-yellow-900 drop-shadow-md pt-2">
                  {mayaScore}
                </span>
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
                  width={234}
                  height={312}
                  className={`relative z-10 transition-all duration-300 h-[273px] w-auto object-contain ${roundWinner === 'sting' ? 'grayscale opacity-50' : ''}`}
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

            {/* Expressions - in the middle */}
            <div className="flex-1 max-w-xs md:max-w-md">
              <div className="grid grid-cols-2 gap-3">
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(expr.result)}
                      disabled={playerAnswered}
                      whileHover={!playerAnswered ? { scale: 1.05 } : {}}
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
              {/* Score badge - honey drop */}
              <motion.div
                key={stingScore}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="mb-3 relative"
              >
                <Image
                  src="/images/ui/lv6-math/drop.png"
                  alt="Score"
                  width={80}
                  height={100}
                  className="mx-auto h-[80px] w-auto object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-black text-yellow-900 drop-shadow-md pt-2">
                  {stingScore}
                </span>
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
                  src="/images/characters/maya-math/sting.png"
                  alt="Sting"
                  width={234}
                  height={312}
                  className={`relative z-10 transition-all duration-300 h-[273px] w-auto object-contain ${roundWinner === 'maya' ? 'grayscale opacity-50' : ''}`}
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
    return (
      <ResultScreen
        mayaScore={mayaScore}
        stingScore={stingScore}
        onPlayAgain={resetGame}
      />
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
