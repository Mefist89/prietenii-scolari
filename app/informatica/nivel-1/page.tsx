'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type Question = {
  id: number;
  question: string;
  image: string;
  options: string[];
  correct: number;
};

const questions: Question[] = [
  {
    id: 1,
    question: 'Ce este un computer?',
    image: '💻',
    options: ['O mașină electronică care procesează informații', 'Un joc', 'O carte', 'O jucărie'],
    correct: 0,
  },
  {
    id: 2,
    question: 'Cu ce introducem text în computer?',
    image: '⌨️',
    options: ['Cu mouse-ul', 'Cu tastatura', 'Cu monitorul', 'Cu imprimanta'],
    correct: 1,
  },
  {
    id: 3,
    question: 'Ce vedem pe ecranul computerului?',
    image: '🖥️',
    options: ['Informații și imagini', 'Nimic', 'Doar litere', 'Doar numere'],
    correct: 0,
  },
  {
    id: 4,
    question: 'Cu ce apăsăm pe butoane pe ecran?',
    image: '🖱️',
    options: ['Cu degetele direct', 'Cu mouse-ul', 'Cu tastatura', 'Cu vocea'],
    correct: 1,
  },
  {
    id: 5,
    question: 'Unde salvăm fișierele pe computer?',
    image: '💾',
    options: ['Pe monitor', 'Pe mouse', 'Pe hard disk / în memorie', 'Pe tastatură'],
    correct: 2,
  },
  {
    id: 6,
    question: 'Ce tip de fișier este o poză?',
    image: '🖼️',
    options: ['Document text', 'Imagine (foto)', 'Muzică', 'Video'],
    correct: 1,
  },
  {
    id: 7,
    question: 'Ce face o imprimantă?',
    image: '🖨️',
    options: ['Afișează pe ecran', 'Tipărește pe hârtie', 'Cântă muzică', 'Joacă jocuri'],
    correct: 1,
  },
  {
    id: 8,
    question: 'Ce conectează computerele între ele?',
    image: '🌐',
    options: ['Cablul de curent', 'Internetul', 'Mouse-ul', 'Tastatura'],
    correct: 1,
  },
];

export default function InformaticaNivel1() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    const correct = index === question.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  if (gameFinished) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
        >
          <div className="text-8xl mb-6">
            {passed ? '🎉' : '💪'}
          </div>
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            {passed ? 'Felicitări!' : 'Bine încercat!'}
          </h2>
          <p className="text-2xl text-blue-600 mb-6">
            Ai răspuns corect la {score} din {questions.length} întrebări!
          </p>
          <div className="w-full bg-gray-200 rounded-full h-8 mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={`h-8 rounded-full ${passed ? 'bg-green-500' : 'bg-orange-500'}`}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="flex items-center justify-center h-full text-white font-bold">
                {percentage.toFixed(0)}%
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              ← Meniu
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              🔄 Încearcă din nou
            </button>
            {passed && (
              <button
                onClick={() => router.push('/informatica/nivel-2')}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all"
              >
                Următorul nivel →
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-800">
              Întrebarea {currentQuestion + 1} din {questions.length}
            </span>
            <span className="text-lg font-bold text-green-600">
              Scor: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-6">{question.image}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: showFeedback ? 1 : 1.05 }}
                whileTap={{ scale: showFeedback ? 1 : 0.95 }}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`p-6 rounded-2xl font-bold text-lg transition-all border-4 ${
                  showFeedback
                    ? index === question.correct
                      ? 'bg-green-500 text-white border-green-600'
                      : selectedAnswer === index
                      ? 'bg-red-500 text-white border-red-600'
                      : 'bg-gray-200 text-gray-500 border-gray-300'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 cursor-pointer'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-6 rounded-2xl text-center text-white font-bold text-xl ${
                isCorrect ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              {isCorrect ? '✅ Corect! Bravo!' : '❌ Încearcă din nou!'}
            </motion.div>
          )}
        </motion.div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-blue-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            ← Înapoi la meniu
          </button>
        </div>
      </div>
    </div>
  );
}
