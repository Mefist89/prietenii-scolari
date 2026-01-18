'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  emoji: string;
};

const questions: Question[] = [
  { id: 1, category: 'Baze IT', question: 'Ce este un computer?', options: ['O mașină electronică', 'O jucărie', 'O carte', 'Un telefon'], correct: 0, emoji: '💻' },
  { id: 2, category: 'Hardware', question: 'Cu ce introducem text?', options: ['Mouse', 'Tastatură', 'Monitor', 'Boxe'], correct: 1, emoji: '⌨️' },
  { id: 3, category: 'Algoritmi', question: 'Ce este un algoritm?', options: ['Un joc', 'O serie de pași', 'O poză', 'Un număr'], correct: 1, emoji: '🔄' },
  { id: 4, category: 'Siguranță', question: 'Ce faci dacă primești email de la străini?', options: ['Îl deschid', 'Îl șterg', 'Răspund', 'Îl forward'], correct: 1, emoji: '🛡️' },
  { id: 5, category: 'Programare', question: 'Ce înseamnă o buclă?', options: ['A sări', 'A repeta', 'A opri', 'A șterge'], correct: 1, emoji: '🔁' },
  { id: 6, category: 'Hardware', question: 'Ce afișează informații?', options: ['Tastatura', 'Mouse-ul', 'Monitorul', 'Imprimanta'], correct: 2, emoji: '🖥️' },
  { id: 7, category: 'Siguranță', question: 'Cui dai parola ta?', options: ['Prietenilor', 'Nimănui', 'Profului', 'Tuturor'], correct: 1, emoji: '🔒' },
  { id: 8, category: 'Programare', question: 'Ce comandă face iepurașul să meargă?', options: ['Sari', 'Mergi înainte', 'Stai', 'Dansează'], correct: 1, emoji: '🐰' },
  { id: 9, category: 'Baze IT', question: 'Unde salvăm fișierele?', options: ['Pe monitor', 'În memorie', 'Pe mouse', 'Pe tastatură'], correct: 1, emoji: '💾' },
  { id: 10, category: 'Algoritmi', question: 'Care e primul pas la spălatul pe dinți?', options: ['Clătesc gura', 'Ud periuța', 'Pun pastă', 'Mă spăl'], correct: 1, emoji: '🪥' },
];

export default function InformaticaSefFinal() {
  const router = useRouter();
  const [gameState, setGameState] = useState<'intro' | 'battle' | 'result'>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [bossScore, setBossScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerRunning, setTimerRunning] = useState(false);

  const currentQuestion = questions[currentRound];

  // Start timer when battle begins
  useState(() => {
    if (gameState === 'battle' && !showFeedback && timerRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const startGame = () => {
    setGameState('battle');
    setTimerRunning(true);
  };

  const handleTimeout = () => {
    setShowFeedback(true);
    setTimerRunning(false);
    // Boss answers correctly (simulated)
    const bossIsCorrect = Math.random() > 0.3;
    if (bossIsCorrect) {
      setBossScore(bossScore + 1);
    }

    setTimeout(nextRound, 2000);
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);
    setTimerRunning(false);

    const isCorrect = index === currentQuestion.correct;
    if (isCorrect) {
      setPlayerScore(playerScore + 1);
    }

    // Boss answers (simulated)
    const bossIsCorrect = Math.random() > 0.3;
    if (bossIsCorrect && !isCorrect) {
      setBossScore(bossScore + 1);
    }

    setTimeout(nextRound, 2500);
  };

  const nextRound = () => {
    if (currentRound < questions.length - 1) {
      setCurrentRound(currentRound + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(15);
      setTimerRunning(true);
    } else {
      setGameState('result');
    }
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl mb-6"
          >
            🤖
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-red-600 mb-4">
            Șef Final: Robotul
          </h1>
          <p className="text-2xl text-orange-600 mb-8">
            Provocarea supremă în informatică!
          </p>

          <div className="bg-yellow-50 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-orange-800 mb-4">
              Reguli:
            </h3>
            <ul className="text-left text-orange-700 space-y-2">
              <li>🎯 10 întrebări din toate nivelurile</li>
              <li>⏱️ 15 secunde pentru fiecare întrebare</li>
              <li>🤖 Robotul răspunde și el!</li>
              <li>🏆 Câștigă cel cu cele mai multe răspunsuri corecte</li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-12 py-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-2xl font-bold rounded-full shadow-2xl"
          >
            ⚔️ Începe Bătălia!
          </motion.button>

          <div className="mt-6">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full transition-all"
            >
              ← Înapoi
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Result Screen
  if (gameState === 'result') {
    const playerWon = playerScore > bossScore;
    const tie = playerScore === bossScore;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl text-center"
        >
          <div className="text-9xl mb-6">
            {playerWon ? '🏆' : tie ? '🤝' : '💪'}
          </div>
          <h2 className="text-5xl font-black mb-6">
            {playerWon ? (
              <span className="text-green-600">Victorie!</span>
            ) : tie ? (
              <span className="text-blue-600">Egalitate!</span>
            ) : (
              <span className="text-orange-600">Bine încercat!</span>
            )}
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-2xl">
              <div className="text-5xl mb-2">🐰</div>
              <h3 className="text-xl font-bold text-blue-800">Tu</h3>
              <p className="text-4xl font-black text-blue-600">{playerScore}</p>
            </div>
            <div className="bg-red-100 p-6 rounded-2xl">
              <div className="text-5xl mb-2">🤖</div>
              <h3 className="text-xl font-bold text-red-800">Robot</h3>
              <p className="text-4xl font-black text-red-600">{bossScore}</p>
            </div>
          </div>

          {playerWon && (
            <div className="bg-yellow-100 p-6 rounded-2xl mb-8">
              <p className="text-xl font-bold text-yellow-800">
                🎉 Felicitări! Ai învins Robotul și ai completat toate nivelurile de Informatică!
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              ← Meniu
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              🔄 Joacă din nou
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              🏠 Acasă
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Battle Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Battle Header */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Player */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <div className="text-5xl mb-2">🐰</div>
            <h3 className="font-bold text-blue-800">Tu</h3>
            <p className="text-3xl font-black text-blue-600">{playerScore}</p>
          </motion.div>

          {/* Timer & Round */}
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-lg font-bold text-gray-700 mb-2">
              Runda {currentRound + 1}/10
            </p>
            <motion.div
              animate={{ scale: timeLeft <= 5 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
              className={`text-5xl font-black ${timeLeft <= 5 ? 'text-red-600' : 'text-orange-600'}`}
            >
              {timeLeft}
            </motion.div>
            <p className="text-sm text-gray-500">secunde</p>
          </div>

          {/* Boss */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <div className="text-5xl mb-2">🤖</div>
            <h3 className="font-bold text-red-800">Robot</h3>
            <p className="text-3xl font-black text-red-600">{bossScore}</p>
          </motion.div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentRound}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Category Badge */}
          <div className="inline-block bg-orange-100 px-6 py-2 rounded-full mb-6">
            <span className="text-orange-800 font-bold">{currentQuestion.category}</span>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-6">{currentQuestion.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: showFeedback ? 1 : 1.03 }}
                whileTap={{ scale: showFeedback ? 1 : 0.97 }}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`p-6 rounded-2xl font-bold text-lg transition-all border-4 ${
                  showFeedback
                    ? index === currentQuestion.correct
                      ? 'bg-green-500 text-white border-green-600'
                      : selectedAnswer === index
                      ? 'bg-red-500 text-white border-red-600'
                      : 'bg-gray-200 text-gray-500 border-gray-300'
                    : 'bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300 cursor-pointer'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-6 rounded-2xl text-center text-white font-bold text-xl ${
                  selectedAnswer === currentQuestion.correct ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {selectedAnswer === currentQuestion.correct
                  ? '✅ Corect! +1 punct!'
                  : '❌ Greșit! Robotul câștigă!'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
