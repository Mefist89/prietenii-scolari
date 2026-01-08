'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ResultsPage from '@/components/ResultsPage';

export default function Nivel2Page() {
  // Exercițiul 1: Квадраты - ввод цифр
  const [ex1Answers, setEx1Answers] = useState(['', '', '', '']);

  // Exercițiul 2: Круги - ввод цифр
  const [ex2Answers, setEx2Answers] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);

  // Exercițiul 3: Схемы с кругами и квадратами
  const [ex3Answers, setEx3Answers] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);

  // Проверка ответов
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Правильные ответы для Exercițiul 1
  const exercises1 = [
    { question: '= 4 + 1 + 1', correct: '6' },
    { question: '= 5 - 1 + 2', correct: '6' },
    { question: '= 8 - 2 + 3', correct: '9' },
    { question: '= 10 - 1 - 2', correct: '7' },
  ];

  // Правильные ответы для Exercițiul 2 (левая сторона - 10)
  const exercises2Left = [
    { question: '= 4 +', correct: '6' },
    { question: '= 2 +', correct: '8' },
    { question: '= 5 +', correct: '5' },
  ];

  // Правильные ответы для Exercițiul 2 (правая сторона - 8)
  const exercises2Right = [
    { question: '= 4 +', suffix: '+ 2', correct: '2' },
    { question: '= 2 +', suffix: '+ 5', correct: '1' },
    { question: '= 5 +', suffix: '+ 3', correct: '0' },
  ];

  // Третий ряд - круг с цифрой 8
  const exercises2Third = [
    { question: '= 10 -', correct: '2' },
    { question: '= 9 -', correct: '1' },
    { question: '= 8 -', correct: '0' },
  ];

  // Четвертый ряд - круг с цифрой 6
  const exercises2Fourth = [
    { question: '= 9 -', suffix: '- 1', correct: '2' },
    { question: '= 7 -', suffix: '- 1', correct: '0' },
    { question: '= 10 -', suffix: '- 2', correct: '2' },
  ];

  // Exercițiul 3: Схемы - первая схема (круг 10)
  // 10 → 3 + square1 → square2 + 2 → square3 + 1
  // Логика: 10 = 3 + square1, значит square1 = 7
  // 7 = square2 + 2, значит square2 = 5
  // 5 = square3 + 1, значит square3 = 4
  const ex3Schema1 = {
    circle: 10,
    answers: { square1: '7', square2: '5', square3: '4' },
  };

  // Exercițiul 3: Схемы - вторая схема (круг 8)
  // 2 + square1 → square2 + 1 → square3 + 2 → 8
  // Работаем от конца: square3 + 2 = 8, значит square3 = 6
  // square2 + 1 = 6, значит square2 = 5
  // 2 + square1 = 5, значит square1 = 3
  const ex3Schema2 = {
    circle: 8,
    answers: { square1: '3', square2: '5', square3: '6' },
  };

  // Exercițiul 3: Схемы - третья схема (круг 15)
  // 15 → 5 + square1 → square2 + 3 → square3 + 2
  // 15 = 5 + square1, значит square1 = 10
  // 10 = square2 + 3, значит square2 = 7
  // 7 = square3 + 2, значит square3 = 5
  const ex3Schema3 = {
    circle: 15,
    answers: { square1: '10', square2: '7', square3: '5' },
  };

  // Exercițiul 3: Схемы - четвертая схема (круг 12)
  // 4 + square1 → square2 + 2 → square3 + 3 → 12
  // Работаем от конца: square3 + 3 = 12, значит square3 = 9
  // square2 + 2 = 9, значит square2 = 7
  // 4 + square1 = 7, значит square1 = 3
  const ex3Schema4 = {
    circle: 12,
    answers: { square1: '3', square2: '7', square3: '9' },
  };

  const handleEx1Change = (index: number, value: string) => {
    if (isChecked) return;
    // Только цифры
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex1Answers];
      newAnswers[index] = value;
      setEx1Answers(newAnswers);
    }
  };

  const handleEx2Change = (index: number, value: string) => {
    if (isChecked) return;
    // Только цифры
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex2Answers];
      newAnswers[index] = value;
      setEx2Answers(newAnswers);
    }
  };

  const handleEx3Change = (index: number, value: string) => {
    if (isChecked) return;
    // Только цифры
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex3Answers];
      newAnswers[index] = value;
      setEx3Answers(newAnswers);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;

    // Проверка Exercițiul 1
    exercises1.forEach((ex, i) => {
      if (ex1Answers[i] === ex.correct) correctCount++;
    });

    // Проверка Exercițiul 2 (левая сторона)
    exercises2Left.forEach((ex, i) => {
      if (ex2Answers[i] === ex.correct) correctCount++;
    });

    // Проверка Exercițiul 2 (правая сторона)
    exercises2Right.forEach((ex, i) => {
      if (ex2Answers[i + 3] === ex.correct) correctCount++;
    });

    // Проверка Exercițiul 2 (третий ряд)
    exercises2Third.forEach((ex, i) => {
      if (ex2Answers[i + 6] === ex.correct) correctCount++;
    });

    // Проверка Exercițiul 2 (четвертый ряд)
    exercises2Fourth.forEach((ex, i) => {
      if (ex2Answers[i + 9] === ex.correct) correctCount++;
    });

    // Проверка Exercițiul 3 (первая схема - 3 квадрата)
    if (ex3Answers[0] === ex3Schema1.answers.square1) correctCount++;
    if (ex3Answers[1] === ex3Schema1.answers.square2) correctCount++;
    if (ex3Answers[2] === ex3Schema1.answers.square3) correctCount++;

    // Проверка Exercițiul 3 (вторая схема - 3 квадрата)
    if (ex3Answers[3] === ex3Schema2.answers.square1) correctCount++;
    if (ex3Answers[4] === ex3Schema2.answers.square2) correctCount++;
    if (ex3Answers[5] === ex3Schema2.answers.square3) correctCount++;

    // Проверка Exercițiul 3 (третья схема - 3 квадрата)
    if (ex3Answers[6] === ex3Schema3.answers.square1) correctCount++;
    if (ex3Answers[7] === ex3Schema3.answers.square2) correctCount++;
    if (ex3Answers[8] === ex3Schema3.answers.square3) correctCount++;

    // Проверка Exercițiul 3 (четвертая схема - 3 квадрата)
    if (ex3Answers[9] === ex3Schema4.answers.square1) correctCount++;
    if (ex3Answers[10] === ex3Schema4.answers.square2) correctCount++;
    if (ex3Answers[11] === ex3Schema4.answers.square3) correctCount++;

    setScore(correctCount);
    setIsChecked(true);
    setShowResults(true);
  };

  const resetAnswers = () => {
    setEx1Answers(['', '', '', '']);
    setEx2Answers(['', '', '', '', '', '', '', '', '', '', '', '']);
    setEx3Answers(['', '', '', '', '', '', '', '', '', '', '', '']);
    setIsChecked(false);
    setScore(0);
    setShowResults(false);
  };

  const getInputClass = (answer: string, correct: string) => {
    if (!isChecked) {
      return 'border-2 border-[#D4C5A9] focus:border-[#E67E3B] focus:outline-none text-[#E67E3B]';
    }
    return answer === correct
      ? 'border-2 border-[#5A9C5C] bg-[#E8F5E8] text-[#5A9C5C]'
      : 'border-2 border-[#C95F5F] bg-[#FFE8E8] text-[#C95F5F]';
  };

  // Если показываем результаты, отображаем ResultsPage
  if (showResults) {
    return (
      <ResultsPage
        score={score}
        totalQuestions={28}
        levelName="Nivel 2"
        onRetry={resetAnswers}
        nextLevelPath="/matematica/nivel-3"
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
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
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
              <h1 className="text-4xl md:text-5xl font-bold text-[#E67E3B] mb-2">Nivel 2</h1>
              <p className="text-xl md:text-2xl text-[#8B7355]">Exerciții cu adunări și scăderi</p>
            </div>

            <div className="space-y-8">
              {/* Explicația */}
              <div className="bg-[#FFF3D6] p-6 rounded-xl border-2 border-[#F4D35E]">
                <h2 className="text-2xl font-bold text-[#E67E3B] mb-4">📚 Ce vei învăța:</h2>
                <p className="text-lg text-gray-700">
                  Învățăm să rezolvăm exerciții cu adunări și scăderi! Vom completa valorile lipsă în ecuații matematice și vom învăța să lucrăm cu schemele numerice.
                </p>
              </div>

              {/* Exercițiul 1 - Квадраты */}
              <div className="bg-[#E8F4F8] p-8 rounded-2xl border-4 border-[#95C9DD]">
                <h3 className="text-2xl font-bold text-[#5A8FA8] mb-6">Exercițiul 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises1.map((exercise, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center gap-3 mb-4">
                        {/* Квадрат */}
                        <div className="w-20 h-20 bg-[#5A8FA8] rounded-lg flex items-center justify-center">
                          <input
                            type="text"
                            value={ex1Answers[index]}
                            onChange={(e) => handleEx1Change(index, e.target.value)}
                            maxLength={2}
                            disabled={isChecked}
                            className={`w-14 h-14 text-center text-3xl font-bold bg-white rounded-md ${getInputClass(ex1Answers[index], exercise.correct)}`}
                          />
                        </div>
                        {/* Равенство и выражение */}
                        <span className="text-2xl font-bold text-gray-800">{exercise.question}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercițiul 2 - Круги */}
              <div className="bg-[#F5E8F5] p-8 rounded-2xl border-4 border-[#D4A5D4]">
                <h3 className="text-2xl font-bold text-[#9B6B9B] mb-6">Exercițiul 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Левая сторона - круг с цифрой 10 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-6">
                      {/* Большой оранжевый круг */}
                      <div className="w-28 h-28 flex-shrink-0 bg-[#E67E3B] rounded-full flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">10</span>
                      </div>

                      {/* Три примера */}
                      <div className="flex-1 space-y-3">
                        {exercises2Left.map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800">{exercise.question}</span>
                            <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center">
                              <input
                                type="text"
                                value={ex2Answers[index]}
                                onChange={(e) => handleEx2Change(index, e.target.value)}
                                maxLength={2}
                                disabled={isChecked}
                                className={`w-10 h-10 text-center text-xl font-bold bg-white rounded-md ${getInputClass(ex2Answers[index], exercise.correct)}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Правая сторона - круг с цифрой 8 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-6">
                      {/* Большой оранжевый круг */}
                      <div className="w-28 h-28 flex-shrink-0 bg-[#E67E3B] rounded-full flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">8</span>
                      </div>

                      {/* Три примера */}
                      <div className="flex-1 space-y-3">
                        {exercises2Right.map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800">{exercise.question}</span>
                            <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center">
                              <input
                                type="text"
                                value={ex2Answers[index + 3]}
                                onChange={(e) => handleEx2Change(index + 3, e.target.value)}
                                maxLength={2}
                                disabled={isChecked}
                                className={`w-10 h-10 text-center text-xl font-bold bg-white rounded-md ${getInputClass(ex2Answers[index + 3], exercise.correct)}`}
                              />
                            </div>
                            <span className="text-lg font-bold text-gray-800">{exercise.suffix}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Третий ряд - круг с цифрой 12 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-6">
                      {/* Большой оранжевый круг */}
                      <div className="w-28 h-28 flex-shrink-0 bg-[#E67E3B] rounded-full flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">8</span>
                      </div>

                      {/* Три примера */}
                      <div className="flex-1 space-y-3">
                        {exercises2Third.map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800">{exercise.question}</span>
                            <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center">
                              <input
                                type="text"
                                value={ex2Answers[index + 6]}
                                onChange={(e) => handleEx2Change(index + 6, e.target.value)}
                                maxLength={2}
                                disabled={isChecked}
                                className={`w-10 h-10 text-center text-xl font-bold bg-white rounded-md ${getInputClass(ex2Answers[index + 6], exercise.correct)}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Четвертый ряд - круг с цифрой 9 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-6">
                      {/* Большой оранжевый круг */}
                      <div className="w-28 h-28 flex-shrink-0 bg-[#E67E3B] rounded-full flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">6</span>
                      </div>

                      {/* Три примера */}
                      <div className="flex-1 space-y-3">
                        {exercises2Fourth.map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800">{exercise.question}</span>
                            <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center">
                              <input
                                type="text"
                                value={ex2Answers[index + 9]}
                                onChange={(e) => handleEx2Change(index + 9, e.target.value)}
                                maxLength={2}
                                disabled={isChecked}
                                className={`w-10 h-10 text-center text-xl font-bold bg-white rounded-md ${getInputClass(ex2Answers[index + 9], exercise.correct)}`}
                              />
                            </div>
                            <span className="text-lg font-bold text-gray-800">{exercise.suffix}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercițiul 3 - Схемы */}
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6">Exercițiul 3</h3>

                <div className="space-y-8">
                  {/* Первая схема - круг 10 */}
                  <div className="bg-white p-8 rounded-xl shadow-md overflow-x-auto">
                    <div className="flex items-center justify-center gap-3 min-w-max">
                      {/* Круг 10 */}
                      <div className="w-24 h-24 bg-[#E67E3B] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-4xl font-bold text-white">10</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* 3 + квадрат */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-bold text-gray-800">3</span>
                        <span className="text-lg text-gray-600">+</span>
                      </div>
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[0]}
                          onChange={(e) => handleEx3Change(0, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[0], ex3Schema1.answers.square1)}`}
                        />
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 2 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[1]}
                          onChange={(e) => handleEx3Change(1, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[1], ex3Schema1.answers.square2)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">2</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 1 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[2]}
                          onChange={(e) => handleEx3Change(2, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[2], ex3Schema1.answers.square3)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">1</span>
                      </div>
                    </div>
                  </div>

                  {/* Вторая схема - круг 8 */}
                  <div className="bg-white p-8 rounded-xl shadow-md overflow-x-auto">
                    <div className="flex items-center justify-center gap-3 min-w-max">
                      {/* 2 + квадрат */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-bold text-gray-800">2</span>
                        <span className="text-lg text-gray-600">+</span>
                      </div>
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[3]}
                          onChange={(e) => handleEx3Change(3, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[3], ex3Schema2.answers.square1)}`}
                        />
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 1 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[4]}
                          onChange={(e) => handleEx3Change(4, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[4], ex3Schema2.answers.square2)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">1</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 2 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[5]}
                          onChange={(e) => handleEx3Change(5, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[5], ex3Schema2.answers.square3)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">2</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* Круг 8 */}
                      <div className="w-24 h-24 bg-[#E67E3B] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-4xl font-bold text-white">8</span>
                      </div>
                    </div>
                  </div>

                  {/* Третья схема - круг 15 */}
                  <div className="bg-white p-8 rounded-xl shadow-md overflow-x-auto">
                    <div className="flex items-center justify-center gap-3 min-w-max">
                      {/* Круг 15 */}
                      <div className="w-24 h-24 bg-[#E67E3B] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-4xl font-bold text-white">15</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* 5 + квадрат */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-bold text-gray-800">5</span>
                        <span className="text-lg text-gray-600">+</span>
                      </div>
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[6]}
                          onChange={(e) => handleEx3Change(6, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[6], ex3Schema3.answers.square1)}`}
                        />
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 3 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[7]}
                          onChange={(e) => handleEx3Change(7, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[7], ex3Schema3.answers.square2)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">3</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 2 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[8]}
                          onChange={(e) => handleEx3Change(8, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[8], ex3Schema3.answers.square3)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">2</span>
                      </div>
                    </div>
                  </div>

                  {/* Четвертая схема - круг 12 */}
                  <div className="bg-white p-8 rounded-xl shadow-md overflow-x-auto">
                    <div className="flex items-center justify-center gap-3 min-w-max">
                      {/* 4 + квадрат */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-bold text-gray-800">4</span>
                        <span className="text-lg text-gray-600">+</span>
                      </div>
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[9]}
                          onChange={(e) => handleEx3Change(9, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[9], ex3Schema4.answers.square1)}`}
                        />
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 2 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[10]}
                          onChange={(e) => handleEx3Change(10, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[10], ex3Schema4.answers.square2)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">2</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* квадрат + 3 */}
                      <div className="w-14 h-14 bg-[#5A8FA8] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <input
                          type="text"
                          value={ex3Answers[11]}
                          onChange={(e) => handleEx3Change(11, e.target.value)}
                          maxLength={2}
                          disabled={isChecked}
                          className={`w-10 h-10 text-center text-lg font-bold bg-white rounded-md ${getInputClass(ex3Answers[11], ex3Schema4.answers.square3)}`}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-600">+</span>
                        <span className="text-lg font-bold text-gray-800">3</span>
                      </div>

                      {/* Стрелка */}
                      <div className="relative w-12 h-0.5 bg-[#5A9C5C] flex-shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#5A9C5C]"></div>
                      </div>

                      {/* Круг 12 */}
                      <div className="w-24 h-24 bg-[#E67E3B] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-4xl font-bold text-white">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопки навигации и действий */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="/matematica/menu"
                  className="px-8 py-5 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  ← Înapoi la Matematică
                </Link>
                <button
                  onClick={checkAnswers}
                  className="px-12 py-5 bg-[#E67E3B] hover:bg-[#D66D2A] text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  Verifică răspunsurile
                </button>
                <button
                  onClick={resetAnswers}
                  className="px-12 py-5 bg-[#8B7355] hover:bg-[#7A6449] text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  Resetează
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
