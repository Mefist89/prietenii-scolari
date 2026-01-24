'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Question = {
  id: number;
  questionKey: string;
  image: string;
  optionKeys: string[];
  correct: number;
};

const questionData: Question[] = [
  { id: 1, questionKey: 'q1', image: '💻', optionKeys: ['q1a1', 'q1a2', 'q1a3', 'q1a4'], correct: 0 },
  { id: 2, questionKey: 'q2', image: '⌨️', optionKeys: ['q2a1', 'q2a2', 'q2a3', 'q2a4'], correct: 1 },
  { id: 3, questionKey: 'q3', image: '🖥️', optionKeys: ['q3a1', 'q3a2', 'q3a3', 'q3a4'], correct: 0 },
  { id: 4, questionKey: 'q4', image: '🖱️', optionKeys: ['q4a1', 'q4a2', 'q4a3', 'q4a4'], correct: 1 },
  { id: 5, questionKey: 'q5', image: '💾', optionKeys: ['q5a1', 'q5a2', 'q5a3', 'q5a4'], correct: 2 },
  { id: 6, questionKey: 'q6', image: '🖼️', optionKeys: ['q6a1', 'q6a2', 'q6a3', 'q6a4'], correct: 1 },
  { id: 7, questionKey: 'q7', image: '🖨️', optionKeys: ['q7a1', 'q7a2', 'q7a3', 'q7a4'], correct: 1 },
  { id: 8, questionKey: 'q8', image: '🌐', optionKeys: ['q8a1', 'q8a2', 'q8a3', 'q8a4'], correct: 1 },
];

export default function InformaticaNivel1() {
  const t = useTranslations();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const questionItem = questionData[currentQuestion];
  const question = {
    ...questionItem,
    question: t(`Info.questions.${questionItem.questionKey}`),
    options: questionItem.optionKeys.map(key => t(`Info.questions.${key}`)),
  };

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
      if (currentQuestion < questionData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  if (gameFinished) {
    const percentage = (score / questionData.length) * 100;
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
            {passed ? t('Info.congratulations') : t('Info.wellTried')}
          </h2>
          <p className="text-2xl text-blue-600 mb-6">
            {t('Info.answeredCorrectly', { score: score, total: questionData.length })}
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
              {t('Info.menu')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.tryAgain')}
            </button>
            {passed && (
              <button
                onClick={() => router.push('/informatica/nivel-2')}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all"
              >
                {t('Info.nextLevel')}
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
              {t('Info.questionOf', { current: currentQuestion + 1, total: questionData.length })}
            </span>
            <span className="text-lg font-bold text-green-600">
              {t('Info.score')} {score}/{questionData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questionData.length) * 100}%` }}
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
              {isCorrect ? t('Info.correct') : t('Info.incorrect')}
            </motion.div>
          )}
        </motion.div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-blue-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            {t('Info.backToMenu')}
          </button>
        </div>
      </div>
    </div>
  );
}
