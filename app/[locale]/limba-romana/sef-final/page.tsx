'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// Типы вопросов для битвы
type QuestionType = 'antonym' | 'plural' | 'singular' | 'fillBlank';

interface BattleQuestion {
  type: QuestionType;
  question: string;
  correctAnswer: string;
  options: string[];
}

// Банк вопросов
const questionBank: BattleQuestion[] = [
  // Antonime
  { type: 'antonym', question: 'Antonimul lui "mare":', correctAnswer: 'mic', options: ['mic', 'înalt', 'lung', 'greu'] },
  { type: 'antonym', question: 'Antonimul lui "cald":', correctAnswer: 'rece', options: ['fierbinte', 'rece', 'cald', 'moale'] },
  { type: 'antonym', question: 'Antonimul lui "vechi":', correctAnswer: 'nou', options: ['antic', 'nou', 'stricat', 'frumos'] },
  { type: 'antonym', question: 'Antonimul lui "bun":', correctAnswer: 'rău', options: ['rău', 'dulce', 'mare', 'mic'] },
  { type: 'antonym', question: 'Antonimul lui "sus":', correctAnswer: 'jos', options: ['aici', 'acolo', 'jos', 'sus'] },
  // Plural
  { type: 'plural', question: 'Plural de la "carte":', correctAnswer: 'cărți', options: ['cărți', 'carte', 'cartele', 'cărti'] },
  { type: 'plural', question: 'Plural de la "copil":', correctAnswer: 'copii', options: ['copile', 'copii', 'copiii', 'copila'] },
  { type: 'plural', question: 'Plural de la "casă":', correctAnswer: 'case', options: ['casele', 'căși', 'case', 'casa'] },
  { type: 'plural', question: 'Plural de la "floare":', correctAnswer: 'flori', options: ['floare', 'florii', 'flori', 'florile'] },
  { type: 'plural', question: 'Plural de la "om":', correctAnswer: 'oameni', options: ['omi', 'oameni', 'omeni', 'omii'] },
  // Singular
  { type: 'singular', question: 'Singular de la "stele":', correctAnswer: 'stea', options: ['stel', 'stea', 'steluță', 'stelă'] },
  { type: 'singular', question: 'Singular de la "păsări":', correctAnswer: 'pasăre', options: ['păsar', 'pasăre', 'pasară', 'pasara'] },
  { type: 'singular', question: 'Singular de la "mere":', correctAnswer: 'măr', options: ['mar', 'măr', 'mere', 'mară'] },
  { type: 'singular', question: 'Singular de la "câini":', correctAnswer: 'câine', options: ['câin', 'câine', 'cânele', 'cânii'] },
  // Fill in the blank
  { type: 'fillBlank', question: 'Pisica ___ pe canapea.', correctAnswer: 'doarme', options: ['doarme', 'mănâncă', 'aleargă', 'cântă'] },
  { type: 'fillBlank', question: 'Soarele ___ dimineața.', correctAnswer: 'răsare', options: ['apune', 'răsare', 'plouă', 'ninge'] },
  { type: 'fillBlank', question: 'Copiii ___ în parc.', correctAnswer: 'se joacă', options: ['citesc', 'se joacă', 'dorm', 'gătesc'] },
  { type: 'fillBlank', question: 'Câinele ___ la ușă.', correctAnswer: 'latră', options: ['miaună', 'latră', 'cântă', 'doarme'] },
  { type: 'fillBlank', question: 'Pasărea ___ pe cer.', correctAnswer: 'zboară', options: ['înoată', 'zboară', 'aleargă', 'sare'] },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateRound(): BattleQuestion {
  const randomIndex = Math.floor(Math.random() * questionBank.length);
  const question = { ...questionBank[randomIndex] };
  question.options = shuffleArray(question.options);
  return question;
}

export default function SefFinalPage() {
  const t = useTranslations();
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [roundData, setRoundData] = useState<BattleQuestion | null>(null);
  const [timer, setTimer] = useState(10);
  const [lumiScore, setLumiScore] = useState(0);
  const [bossScore, setBossScore] = useState(0);
  const [roundWinner, setRoundWinner] = useState<'lumi' | 'boss' | 'none' | null>(null);
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const totalRounds = 10;

  // Инициализация первого раунда
  useEffect(() => {
    if (gameState === 'playing' && !roundData) {
      setRoundData(generateRound());
    }
  }, [gameState, roundData]);

  function startGame() {
    setGameState('playing');
    setRoundData(generateRound());
  }

  function startNewRound() {
    setRoundData(generateRound());
    setTimer(10);
    setRoundWinner(null);
    setPlayerAnswered(false);
    setSelectedAnswer(null);
  }

  function resetGame() {
    setRoundData(generateRound());
    setCurrentRound(0);
    setLumiScore(0);
    setBossScore(0);
    setTimer(10);
    setRoundWinner(null);
    setPlayerAnswered(false);
    setSelectedAnswer(null);
    setGameState('playing');
  }

  function handleAnswer(answer: string) {
    if (playerAnswered || roundWinner) return;

    setPlayerAnswered(true);
    setSelectedAnswer(answer);

    if (roundData && answer === roundData.correctAnswer) {
      setRoundWinner('lumi');
      setLumiScore(s => s + 1);
    } else {
      setRoundWinner('boss');
      setBossScore(s => s + 1);
    }
  }

  // Таймер и CPU
  useEffect(() => {
    if (gameState !== 'playing' || !roundData || roundWinner) return;

    const cpuTimer = setTimeout(() => {
      if (!playerAnswered) {
        setPlayerAnswered(true);
        setRoundWinner('boss');
        setBossScore(s => s + 1);
        setSelectedAnswer(roundData.correctAnswer);
      }
    }, 10000);

    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          if (!playerAnswered) {
            setPlayerAnswered(true);
            setRoundWinner('none');
            setSelectedAnswer(roundData.correctAnswer);
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

  // INTRO SCREEN
  if (gameState === 'intro') {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: "url('/images/rom/bg-frame.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-[#F0F4E5] mb-4 drop-shadow-lg">
              👑 {t('Romanian.boss.title')}
            </h1>
            <p className="text-xl md:text-2xl text-[#E8A33D] mb-8 font-bold">
              {t('Romanian.boss.challenge')}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-8 items-end mb-8"
          >
            {/* Lumi */}
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/images/characters/lumi-rom/lumi.png"
                  alt="Lumi"
                  width={200}
                  height={267}
                  className="h-[200px] w-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
              <p className="text-[#F0F4E5] font-bold text-xl mt-2">Lumi</p>
              <p className="text-green-400 text-sm">{t('Romanian.boss.you')}</p>
            </div>

            <div className="text-4xl font-black text-[#E8A33D]">{t('Romanian.boss.vs')}</div>

            {/* Boss - Nick */}
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Image
                  src="/images/characters/lumi-rom/nick.png"
                  alt="Nick"
                  width={200}
                  height={267}
                  className="h-[200px] w-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
              <p className="text-[#F0F4E5] font-bold text-xl mt-2">Nick</p>
              <p className="text-red-400 text-sm">{t('Romanian.boss.opponent')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[#F0F4E5] rounded-2xl p-6 max-w-md text-center border-4 border-[#4A6E3C] mb-8"
          >
            <p className="text-[#612422] font-bold">
              🎯 {t('Romanian.boss.rule1')}<br/>
              ⏱️ {t('Romanian.boss.rule2')}<br/>
              🏆 {t('Romanian.boss.rule3')}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4"
          >
            <Link href="/limba-romana/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#4A6E3C] hover:bg-[#3D5C32] text-[#F0F4E5] font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30"
              >
                {t('Romanian.back')}
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-[#E8A33D] to-[#D4922E] hover:from-[#D4922E] hover:to-[#E8A33D] text-white font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30"
            >
              🎮 {t('Romanian.boss.startBattle')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // PLAYING
  if (gameState === 'playing' && roundData) {
    const timerPercentage = (timer / 10) * 100;

    return (
      <div
        className="min-h-screen p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/rom/bg-frame.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Timer Bar */}
          <div className="mb-4">
            <div className="flex justify-center mb-2">
              <motion.div
                key={timer}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className={`px-6 py-2 rounded-full text-2xl font-bold text-white shadow-lg ${
                  timer <= 3 ? 'bg-red-500 animate-pulse' : 'bg-[#4A6E3C]'
                }`}
              >
                ⏱️ {timer} {t('Romanian.boss.sec')}
              </motion.div>
            </div>
            <div className="w-full max-w-md mx-auto h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${timer <= 3 ? 'bg-red-500' : 'bg-[#4A6E3C]'}`}
                initial={{ width: '100%' }}
                animate={{ width: `${timerPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Round indicator */}
          <div className="text-center mb-4">
            <span className="text-lg font-bold text-white/80 bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
              {t('Romanian.boss.round', { current: currentRound + 1, total: totalRounds })}
            </span>
          </div>

          {/* Question */}
          <div className="flex justify-center mb-6">
            <motion.div
              key={`question-${currentRound}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#E8A33D]/50 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#F0F4E5] to-[#E8E4D9] rounded-3xl px-8 md:px-12 py-6 shadow-2xl border-4 border-[#4A6E3C]">
                <span className="text-2xl md:text-3xl font-black text-[#612422]">{roundData.question}</span>
              </div>
            </motion.div>
          </div>

          {/* Main Row: Lumi - Options - Boss */}
          <div className="flex justify-center items-center gap-4 md:gap-8 px-2">
            {/* Lumi */}
            <motion.div
              animate={roundWinner === 'lumi' ? { y: [0, -30, 0] } : {}}
              transition={{ repeat: roundWinner === 'lumi' ? 3 : 0, duration: 0.4 }}
              className="text-center flex-shrink-0"
            >
              <motion.div
                key={lumiScore}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="mb-3"
              >
                <div className="bg-gradient-to-br from-[#4A6E3C] to-[#3D5C32] rounded-full w-16 h-16 flex items-center justify-center mx-auto border-4 border-[#F0F4E5] shadow-lg">
                  <span className="text-2xl font-black text-white">{lumiScore}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className={`absolute -inset-2 rounded-full blur-lg transition-all duration-300 ${
                  roundWinner === 'lumi' ? 'bg-green-400/60' : roundWinner === 'boss' ? 'bg-gray-400/30' : 'bg-[#E8A33D]/40'
                }`}></div>

                <Image
                  src="/images/characters/lumi-rom/lumi.png"
                  alt="Lumi"
                  width={180}
                  height={240}
                  className={`relative z-10 transition-all duration-300 h-[180px] w-auto object-contain ${roundWinner === 'boss' ? 'grayscale opacity-50' : ''}`}
                />
              </motion.div>

              <AnimatePresence>
                {roundWinner === 'lumi' && (
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

            {/* Options - in the middle */}
            <div className="flex-1 max-w-xs md:max-w-md">
              <div className="grid grid-cols-2 gap-3">
                {roundData.options.map((option, index) => {
                  const isCorrect = option === roundData.correctAnswer;
                  const isSelected = selectedAnswer === option;
                  const showResult = roundWinner !== null;

                  let buttonStyle = 'bg-gradient-to-r from-[#4A6E3C] to-[#3D5C32] hover:from-[#3D5C32] hover:to-[#4A6E3C] border-[#F0F4E5]/30';
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
                      onClick={() => handleAnswer(option)}
                      disabled={playerAnswered}
                      whileHover={!playerAnswered ? { scale: 1.05 } : {}}
                      whileTap={!playerAnswered ? { scale: 0.95 } : {}}
                      className={`py-3 px-4 rounded-xl text-lg font-bold text-white transition-all shadow-lg border-2 ${buttonStyle} ${
                        playerAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Boss - Nick */}
            <motion.div
              animate={roundWinner === 'boss' ? { y: [0, -30, 0] } : {}}
              transition={{ repeat: roundWinner === 'boss' ? 3 : 0, duration: 0.4 }}
              className="text-center flex-shrink-0"
            >
              <motion.div
                key={bossScore}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="mb-3"
              >
                <div className="bg-gradient-to-br from-[#612422] to-[#8B3A38] rounded-full w-16 h-16 flex items-center justify-center mx-auto border-4 border-[#F0F4E5] shadow-lg">
                  <span className="text-2xl font-black text-white">{bossScore}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="relative"
              >
                <div className={`absolute -inset-2 rounded-full blur-lg transition-all duration-300 ${
                  roundWinner === 'boss' ? 'bg-red-400/60' : roundWinner === 'lumi' ? 'bg-gray-400/30' : 'bg-orange-400/40'
                }`}></div>

                <Image
                  src="/images/characters/lumi-rom/nick.png"
                  alt="Nick"
                  width={180}
                  height={240}
                  className={`relative z-10 transition-all duration-300 h-[180px] w-auto object-contain ${roundWinner === 'lumi' ? 'grayscale opacity-50' : ''}`}
                />
              </motion.div>

              <AnimatePresence>
                {roundWinner === 'boss' && (
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
    const playerWon = lumiScore > bossScore;
    const isDraw = lumiScore === bossScore;

    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: "url('/images/rom/bg-frame.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          {/* Confetti for winner - using fixed values to avoid hydration mismatch */}
          {playerWon && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[
                { left: 5, rotate: 45, dur: 2.2, delay: 0.1 },
                { left: 12, rotate: 120, dur: 3.1, delay: 0.3 },
                { left: 20, rotate: 200, dur: 2.5, delay: 0.2 },
                { left: 28, rotate: 80, dur: 3.5, delay: 0.4 },
                { left: 35, rotate: 290, dur: 2.8, delay: 0.1 },
                { left: 42, rotate: 150, dur: 3.2, delay: 0.5 },
                { left: 50, rotate: 30, dur: 2.3, delay: 0.2 },
                { left: 58, rotate: 180, dur: 3.8, delay: 0.3 },
                { left: 65, rotate: 260, dur: 2.6, delay: 0.4 },
                { left: 72, rotate: 100, dur: 3.0, delay: 0.1 },
                { left: 80, rotate: 320, dur: 2.9, delay: 0.5 },
                { left: 88, rotate: 60, dur: 3.3, delay: 0.2 },
                { left: 95, rotate: 210, dur: 2.4, delay: 0.3 },
                { left: 8, rotate: 140, dur: 3.6, delay: 0.4 },
                { left: 18, rotate: 270, dur: 2.7, delay: 0.1 },
                { left: 25, rotate: 15, dur: 3.4, delay: 0.5 },
                { left: 33, rotate: 190, dur: 2.1, delay: 0.2 },
                { left: 45, rotate: 85, dur: 3.7, delay: 0.3 },
                { left: 55, rotate: 240, dur: 2.5, delay: 0.4 },
                { left: 62, rotate: 340, dur: 3.1, delay: 0.1 },
                { left: 70, rotate: 55, dur: 2.8, delay: 0.5 },
                { left: 78, rotate: 165, dur: 3.3, delay: 0.2 },
                { left: 85, rotate: 295, dur: 2.2, delay: 0.3 },
                { left: 92, rotate: 110, dur: 3.5, delay: 0.4 },
                { left: 3, rotate: 225, dur: 2.9, delay: 0.1 },
                { left: 15, rotate: 350, dur: 3.0, delay: 0.5 },
                { left: 38, rotate: 70, dur: 2.6, delay: 0.2 },
                { left: 48, rotate: 180, dur: 3.2, delay: 0.3 },
                { left: 68, rotate: 310, dur: 2.4, delay: 0.4 },
                { left: 82, rotate: 25, dur: 3.8, delay: 0.1 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: ['#E8A33D', '#4A6E3C', '#612422', '#F0F4E5'][i % 4],
                    left: `${item.left}%`,
                  }}
                  initial={{ y: -20, opacity: 1 }}
                  animate={{
                    y: '100vh',
                    opacity: 0,
                    rotate: item.rotate,
                  }}
                  transition={{
                    duration: item.dur,
                    delay: item.delay,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center mb-8"
          >
            {playerWon ? (
              <>
                <h1 className="text-5xl md:text-7xl font-black text-[#F0F4E5] mb-4">🏆 {t('Romanian.boss.victory')}</h1>
                <p className="text-2xl text-[#E8A33D] font-bold">{t('Romanian.boss.victoryMessage')}</p>
              </>
            ) : isDraw ? (
              <>
                <h1 className="text-5xl md:text-7xl font-black text-[#F0F4E5] mb-4">🤝 {t('Romanian.boss.tie')}</h1>
                <p className="text-2xl text-[#E8A33D] font-bold">{t('Romanian.boss.tieMessage')}</p>
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-black text-[#F0F4E5] mb-4">😔 {t('Romanian.boss.defeat')}</h1>
                <p className="text-2xl text-[#E8A33D] font-bold">{t('Romanian.boss.defeatMessage')}</p>
              </>
            )}
          </motion.div>

          {/* Score Display */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-12 items-center mb-8"
          >
            <div className="text-center">
              <Image
                src="/images/characters/lumi-rom/lumi.png"
                alt="Lumi"
                width={120}
                height={160}
                className="h-[120px] w-auto object-contain mx-auto mb-2"
              />
              <div className={`text-5xl font-black ${playerWon ? 'text-green-400' : 'text-[#F0F4E5]'}`}>
                {lumiScore}
              </div>
              <p className="text-[#F0F4E5] font-bold">Lumi</p>
            </div>

            <div className="text-3xl font-black text-[#E8A33D]">{t('Romanian.boss.vs')}</div>

            <div className="text-center">
              <Image
                src="/images/characters/lumi-rom/nick.png"
                alt="Nick"
                width={120}
                height={160}
                className="h-[120px] w-auto object-contain mx-auto mb-2"
              />
              <div className={`text-5xl font-black ${!playerWon && !isDraw ? 'text-red-400' : 'text-[#F0F4E5]'}`}>
                {bossScore}
              </div>
              <p className="text-[#F0F4E5] font-bold">Nick</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <Link href="/limba-romana/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#4A6E3C] hover:bg-[#3D5C32] text-[#F0F4E5] font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30"
              >
                {t('Romanian.boss.menu')}
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-8 py-3 bg-gradient-to-r from-[#E8A33D] to-[#D4922E] hover:from-[#D4922E] hover:to-[#E8A33D] text-white font-bold text-lg rounded-full shadow-lg border-2 border-[#F0F4E5]/30"
            >
              🔄 {t('Romanian.boss.playAgain')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Loading fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#612422] via-[#4A6E3C] to-[#E8A33D] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-[#F0F4E5] border-t-transparent rounded-full"
      />
    </div>
  );
}
