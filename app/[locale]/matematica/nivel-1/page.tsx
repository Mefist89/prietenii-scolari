'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ResultsPage from '@/components/ResultsPage';

export default function Nivel1Page() {
  const t = useTranslations();

  // Exercițiul 1: Numere simple
  const [ex1Answers, setEx1Answers] = useState(['', '', '', '']);

  // Exercițiul 2: Cu adunare
  const [ex2Answers, setEx2Answers] = useState(['', '', '', '']);

  // Exercițiul 3: Două operații
  const [ex3Answers, setEx3Answers] = useState(['', '', '', '']);

  // Проверка ответов
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const exercises1 = [
    { left: '1', right: '2', correct: '<' },
    { left: '5', right: '3', correct: '>' },
    { left: '4', right: '4', correct: '=' },
    { left: '7', right: '9', correct: '<' },
  ];

  const exercises2 = [
    { left: '1+2', right: '4', correct: '<' },
    { left: '2+3', right: '5', correct: '=' },
    { left: '4+1', right: '3', correct: '>' },
    { left: '3+2', right: '6', correct: '<' },
  ];

  const exercises3 = [
    { left: '1+2', right: '7-2', correct: '<' },
    { left: '3+4', right: '9-2', correct: '=' },
    { left: '5+3', right: '6-1', correct: '>' },
    { left: '2+2', right: '8-4', correct: '=' },
  ];

  const handleAnswer = (exerciseSet: string, index: number, answer: string) => {
    if (isChecked) return; // Не позволяем менять ответы после проверки

    if (exerciseSet === 'ex1') {
      const newAnswers = [...ex1Answers];
      newAnswers[index] = answer;
      setEx1Answers(newAnswers);
    } else if (exerciseSet === 'ex2') {
      const newAnswers = [...ex2Answers];
      newAnswers[index] = answer;
      setEx2Answers(newAnswers);
    } else if (exerciseSet === 'ex3') {
      const newAnswers = [...ex3Answers];
      newAnswers[index] = answer;
      setEx3Answers(newAnswers);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;

    exercises1.forEach((ex, i) => {
      if (ex1Answers[i] === ex.correct) correctCount++;
    });

    exercises2.forEach((ex, i) => {
      if (ex2Answers[i] === ex.correct) correctCount++;
    });

    exercises3.forEach((ex, i) => {
      if (ex3Answers[i] === ex.correct) correctCount++;
    });

    setScore(correctCount);
    setIsChecked(true);
    setShowResults(true);
  };

  const resetAnswers = () => {
    setEx1Answers(['', '', '', '']);
    setEx2Answers(['', '', '', '']);
    setEx3Answers(['', '', '', '']);
    setIsChecked(false);
    setScore(0);
    setShowResults(false);
  };

  const getButtonClass = (exerciseSet: string, index: number, buttonValue: string) => {
    let currentAnswer = '';
    let correctAnswer = '';

    if (exerciseSet === 'ex1') {
      currentAnswer = ex1Answers[index];
      correctAnswer = exercises1[index].correct;
    } else if (exerciseSet === 'ex2') {
      currentAnswer = ex2Answers[index];
      correctAnswer = exercises2[index].correct;
    } else if (exerciseSet === 'ex3') {
      currentAnswer = ex3Answers[index];
      correctAnswer = exercises3[index].correct;
    }

    if (currentAnswer === buttonValue) {
      if (isChecked) {
        return currentAnswer === correctAnswer
          ? 'bg-[#86C588] text-white border-2 border-[#5A9C5C]'
          : 'bg-[#E88B8B] text-white border-2 border-[#C95F5F]';
      }
      return 'bg-[#F4D35E] text-gray-800 border-2 border-[#E8B84E]';
    }
    return 'bg-white hover:bg-[#FFF3D6] text-gray-700 border-2 border-[#D4C5A9] transition-colors';
  };

  // Если показываем результаты, отображаем ResultsPage
  if (showResults) {
    return (
      <ResultsPage
        score={score}
        totalQuestions={12}
        levelName={t('Math.level1.title')}
        onRetry={resetAnswers}
        nextLevelPath="/matematica/nivel-2"
        menuPath="/matematica/menu"
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0">
        <Image
          src="/images/math/bg-frame.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/math/bottle.png"
                  alt="Honey Bottle"
                  width={112}
                  height={112}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#E67E3B] mb-2">{t('Math.level1.title')}</h1>
              <p className="text-xl md:text-2xl text-[#8B7355]">{t('Math.level1.subtitle')}</p>
            </div>

            <div className="space-y-8">
              {/* Explicația */}
              <div className="bg-[#FFF3D6] p-6 rounded-xl border-2 border-[#F4D35E]">
                <h2 className="text-2xl font-bold text-[#E67E3B] mb-4">📚 {t('Common.whatYouLearn')}</h2>
                <p className="text-lg text-gray-700">
                  {t('Math.level1.description')}
                </p>
              </div>

              {/* Exercițiul 1 */}
              <div className="bg-[#E8F4F8] p-8 rounded-2xl border-4 border-[#95C9DD]">
                <h3 className="text-2xl font-bold text-[#5A8FA8] mb-6">{t('Common.exercise')} 1: {t('Math.level1.exercise1')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises1.map((exercise, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-4xl font-bold text-gray-800">{exercise.left}</span>
                        <div className="w-16 h-16 bg-[#F0F0F0] rounded-lg flex items-center justify-center border-2 border-[#D4C5A9]">
                          <span className="text-3xl font-bold text-[#5A8FA8]">
                            {ex1Answers[index] || '?'}
                          </span>
                        </div>
                        <span className="text-4xl font-bold text-gray-800">{exercise.right}</span>
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleAnswer('ex1', index, '>')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex1', index, '>')}`}
                        >
                          &gt;
                        </button>
                        <button
                          onClick={() => handleAnswer('ex1', index, '<')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex1', index, '<')}`}
                        >
                          &lt;
                        </button>
                        <button
                          onClick={() => handleAnswer('ex1', index, '=')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex1', index, '=')}`}
                        >
                          =
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercițiul 2 */}
              <div className="bg-[#F5E8F5] p-8 rounded-2xl border-4 border-[#D4A5D4]">
                <h3 className="text-2xl font-bold text-[#9B6B9B] mb-6">{t('Common.exercise')} 2: {t('Math.level1.exercise2')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises2.map((exercise, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-4xl font-bold text-gray-800">{exercise.left}</span>
                        <div className="w-16 h-16 bg-[#F0F0F0] rounded-lg flex items-center justify-center border-2 border-[#D4C5A9]">
                          <span className="text-3xl font-bold text-[#9B6B9B]">
                            {ex2Answers[index] || '?'}
                          </span>
                        </div>
                        <span className="text-4xl font-bold text-gray-800">{exercise.right}</span>
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleAnswer('ex2', index, '>')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex2', index, '>')}`}
                        >
                          &gt;
                        </button>
                        <button
                          onClick={() => handleAnswer('ex2', index, '<')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex2', index, '<')}`}
                        >
                          &lt;
                        </button>
                        <button
                          onClick={() => handleAnswer('ex2', index, '=')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex2', index, '=')}`}
                        >
                          =
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercițiul 3 */}
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6">{t('Common.exercise')} 3: {t('Math.level1.exercise3')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises3.map((exercise, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-4xl font-bold text-gray-800">{exercise.left}</span>
                        <div className="w-16 h-16 bg-[#F0F0F0] rounded-lg flex items-center justify-center border-2 border-[#D4C5A9]">
                          <span className="text-3xl font-bold text-[#5A9C5C]">
                            {ex3Answers[index] || '?'}
                          </span>
                        </div>
                        <span className="text-4xl font-bold text-gray-800">{exercise.right}</span>
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleAnswer('ex3', index, '>')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex3', index, '>')}`}
                        >
                          &gt;
                        </button>
                        <button
                          onClick={() => handleAnswer('ex3', index, '<')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex3', index, '<')}`}
                        >
                          &lt;
                        </button>
                        <button
                          onClick={() => handleAnswer('ex3', index, '=')}
                          className={`px-6 py-3 rounded-xl font-bold text-2xl transition-all hover:scale-105 shadow-md ${getButtonClass('ex3', index, '=')}`}
                        >
                          =
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопки навигации и действий */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="/matematica/menu"
                  className="px-8 py-5 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  ← {t('Math.backToMath')}
                </Link>
                <button
                  onClick={checkAnswers}
                  className="px-12 py-5 bg-[#E67E3B] hover:bg-[#D66D2A] text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  {t('Common.checkAnswers')}
                </button>
                <button
                  onClick={resetAnswers}
                  className="px-12 py-5 bg-[#8B7355] hover:bg-[#7A6449] text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  {t('Common.reset')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
