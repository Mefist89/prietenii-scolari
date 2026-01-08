'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ResultsPage from '@/components/ResultsPage';

export default function Nivel3Page() {
  // Exercițiul 1: 4 задания с шариками (разные цвета)
  const [ex1Answers, setEx1Answers] = useState(['', '', '', '']);

  // Exercițiul 2: 9 заданий - разложить число на Z и U (по 2 ответа на каждый вопрос = 18 ответов)
  const [ex2Answers, setEx2Answers] = useState(Array(18).fill(''));

  // Exercițiul 3: Мини-игра с перетаскиванием шариков
  const [ex3CurrentIndex, setEx3CurrentIndex] = useState(0);
  const [ex3TensBalls, setEx3TensBalls] = useState<string[]>([]); // Шарики на левой стороне (десятки)
  const [ex3OnesBalls, setEx3OnesBalls] = useState<string[]>([]); // Шарики на правой стороне (единицы)

  // Проверка ответов
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Feedback модальное окно
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'partial' | 'incorrect'>('correct');

  // Exercițiul 1: Разные цвета шариков
  const exercises1 = [
    { tens: 1, ones: 3, tensColor: 'red', onesColor: 'green', correct: '13' }, // 1 красный + 3 зеленых
    { tens: 2, ones: 4, tensColor: 'orange', onesColor: 'blue', correct: '24' }, // 2 оранжевых + 4 синих
    { tens: 3, ones: 1, tensColor: 'purple', onesColor: 'green', correct: '31' }, // 3 фиолетовых + 1 зеленый
    { tens: 4, ones: 2, tensColor: 'red', onesColor: 'orange', correct: '42' }, // 4 красных + 2 оранжевых
  ];

  // Exercițiul 2: Разложить число на десятки и единицы (дано число, найти Z и U)
  const exercises2Data = [
    // Блок 1
    { number: 15, tens: '1', ones: '5', color: '#4CAF50' },
    { number: 20, tens: '2', ones: '0', color: '#4CAF50' },
    { number: 18, tens: '1', ones: '8', color: '#4CAF50' },
    // Блок 2
    { number: 32, tens: '3', ones: '2', color: '#FF9800' },
    { number: 27, tens: '2', ones: '7', color: '#FF9800' },
    { number: 40, tens: '4', ones: '0', color: '#FF9800' },
    // Блок 3
    { number: 19, tens: '1', ones: '9', color: '#9C27B0' },
    { number: 35, tens: '3', ones: '5', color: '#9C27B0' },
    { number: 26, tens: '2', ones: '6', color: '#9C27B0' },
  ];

  // Exercițiul 3: Мини-игра - числа для расстановки шариков (7 уровней)
  const exercises3Data = [
    { number: 23, tens: 2, ones: 3, color: '#4CAF50' },
    { number: 45, tens: 4, ones: 5, color: '#FF9800' },
    { number: 17, tens: 1, ones: 7, color: '#9C27B0' },
    { number: 30, tens: 3, ones: 0, color: '#2196F3' },
    { number: 52, tens: 5, ones: 2, color: '#F44336' },
    { number: 64, tens: 6, ones: 4, color: '#00BCD4' },
    { number: 18, tens: 1, ones: 8, color: '#FF5722' },
  ];

  // Доступные цвета шариков в коробке
  const availableBallColors = ['red', 'green', 'blue', 'orange', 'purple'];

  const handleEx1Change = (index: number, value: string) => {
    if (isChecked) return;
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex1Answers];
      newAnswers[index] = value;
      setEx1Answers(newAnswers);
    }
  };

  const handleEx2Change = (index: number, value: string) => {
    if (isChecked) return;
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex2Answers];
      newAnswers[index] = value;
      setEx2Answers(newAnswers);
    }
  };

  // Функции для Exercițiul 3 (мини-игра с drag-and-drop)
  const handleDragStart = (e: React.DragEvent, color: string) => {
    if (isChecked) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('ballColor', color);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isChecked) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDropOnTens = (e: React.DragEvent) => {
    if (isChecked) return;
    e.preventDefault();
    const color = e.dataTransfer.getData('ballColor');
    if (color) {
      setEx3TensBalls([...ex3TensBalls, color]);
    }
  };

  const handleDropOnOnes = (e: React.DragEvent) => {
    if (isChecked) return;
    e.preventDefault();
    const color = e.dataTransfer.getData('ballColor');
    if (color) {
      setEx3OnesBalls([...ex3OnesBalls, color]);
    }
  };

  const addBallToTens = (color: string) => {
    if (isChecked) return;
    setEx3TensBalls([...ex3TensBalls, color]);
  };

  const addBallToOnes = (color: string) => {
    if (isChecked) return;
    setEx3OnesBalls([...ex3OnesBalls, color]);
  };

  const removeBallFromTens = (index: number) => {
    if (isChecked) return;
    setEx3TensBalls(ex3TensBalls.filter((_, i) => i !== index));
  };

  const removeBallFromOnes = (index: number) => {
    if (isChecked) return;
    setEx3OnesBalls(ex3OnesBalls.filter((_, i) => i !== index));
  };

  const checkEx3Current = () => {
    const current = exercises3Data[ex3CurrentIndex];
    const correctTens = ex3TensBalls.length === current.tens;
    const correctOnes = ex3OnesBalls.length === current.ones;

    if (correctTens && correctOnes) {
      // Правильно! Показываем feedback и переходим к следующему
      setFeedbackType('correct');
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        if (ex3CurrentIndex < exercises3Data.length - 1) {
          setEx3CurrentIndex(ex3CurrentIndex + 1);
          setEx3TensBalls([]);
          setEx3OnesBalls([]);
        }
      }, 2000);

      return 2; // Оба правильны
    } else if (correctTens || correctOnes) {
      setFeedbackType('partial');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
      return 1; // Одно правильно
    }

    setFeedbackType('incorrect');
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
    return 0; // Оба неправильны
  };

  const checkAnswers = () => {
    let correctCount = 0;

    // Проверка Exercițiul 1
    exercises1.forEach((ex, i) => {
      if (ex1Answers[i] === ex.correct) correctCount++;
    });

    // Проверка Exercițiul 2 (для каждого числа 2 ответа: десятки и единицы)
    exercises2Data.forEach((ex, i) => {
      const tensIndex = i * 2;
      const onesIndex = i * 2 + 1;
      if (ex2Answers[tensIndex] === ex.tens) correctCount++;
      if (ex2Answers[onesIndex] === ex.ones) correctCount++;
    });

    // Проверка Exercițiul 3 (мини-игра)
    // Проверяем текущий прогресс: за каждый пройденный уровень +2 балла
    correctCount += ex3CurrentIndex * 2;

    // Проверяем текущий уровень
    const current = exercises3Data[ex3CurrentIndex];
    if (ex3TensBalls.length === current.tens) correctCount++;
    if (ex3OnesBalls.length === current.ones) correctCount++;

    setScore(correctCount);
    setIsChecked(true);
    setShowResults(true);
  };

  const resetAnswers = () => {
    setEx1Answers(['', '', '', '']);
    setEx2Answers(Array(18).fill(''));
    setEx3CurrentIndex(0);
    setEx3TensBalls([]);
    setEx3OnesBalls([]);
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
        totalQuestions={36}
        levelName="Nivel 3"
        onRetry={resetAnswers}
        nextLevelPath="/matematica/nivel-4"
        menuPath="/matematica/menu"
      />
    );
  }

  // Функция для отрисовки шариков
  const renderBalls = (count: number, color: string) => {
    return Array.from({ length: count }).map((_, i) => (
      <Image
        key={i}
        src={`/images/ui/circle-${color}.png`}
        alt={`${color} ball`}
        width={40}
        height={40}
        className="object-contain"
      />
    ));
  };

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
              <h1 className="text-4xl md:text-5xl font-bold text-[#E67E3B] mb-2">Nivel 3</h1>
              <p className="text-xl md:text-2xl text-[#8B7355]">Zeci și unități</p>
            </div>

            <div className="space-y-8">
              {/* Explicația */}
              <div className="bg-[#FFF3D6] p-6 rounded-xl border-2 border-[#F4D35E]">
                <h2 className="text-2xl font-bold text-[#E67E3B] mb-4">📚 Ce vei învăța:</h2>
                <p className="text-lg text-gray-700">
                  Învățăm să numărăm zecile și unitățile! Bilele dintr-o parte reprezintă zecile (Z), iar bilele din cealaltă parte reprezintă unitățile (U). De exemplu: 2 bile + 5 bile = 25!
                </p>
              </div>

              {/* Exercițiul 1 */}
              <div className="bg-[#E8F4F8] p-8 rounded-2xl border-4 border-[#95C9DD]">
                <h3 className="text-2xl font-bold text-[#5A8FA8] mb-6">Exercițiul 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises1.map((exercise, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      {/* Шарики */}
                      <div className="flex justify-center gap-8 mb-6">
                        {/* Десятки */}
                        <div className="flex flex-col items-center gap-2">
                          {renderBalls(exercise.tens, exercise.tensColor)}
                        </div>
                        {/* Единицы */}
                        <div className="flex flex-col items-center gap-2">
                          {renderBalls(exercise.ones, exercise.onesColor)}
                        </div>
                      </div>

                      {/* Таблица Z и U */}
                      <div className="flex justify-center gap-2 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 border-4 border-gray-800 bg-white flex items-center justify-center">
                            <span className="text-3xl font-bold text-gray-800">Z</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 border-4 border-gray-800 bg-white flex items-center justify-center">
                            <span className="text-3xl font-bold text-gray-800">U</span>
                          </div>
                        </div>
                      </div>

                      {/* Синий квадрат для ответа */}
                      <div className="flex justify-center">
                        <div className="w-32 h-24 bg-[#5A8FA8] flex items-center justify-center rounded-lg">
                          <input
                            type="text"
                            value={ex1Answers[index]}
                            onChange={(e) => handleEx1Change(index, e.target.value)}
                            maxLength={2}
                            disabled={isChecked}
                            className={`w-24 h-16 text-center text-4xl font-bold bg-white rounded-md ${getInputClass(ex1Answers[index], exercise.correct)}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercițiul 2 */}
              <div className="bg-[#F5E8F5] p-8 rounded-2xl border-4 border-[#D4A5D4]">
                <h3 className="text-2xl font-bold text-[#9B6B9B] mb-6">Exercițiul 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exercises2Data.map((exercise, index) => {
                    const tensIndex = index * 2;
                    const onesIndex = index * 2 + 1;

                    return (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                        {/* Число вверху */}
                        <div
                          className="mb-4 p-4 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: exercise.color }}
                        >
                          <span className="text-5xl font-bold text-white">{exercise.number}</span>
                        </div>

                        {/* Таблица Z и U */}
                        <div className="flex justify-center gap-2 mb-4">
                          <div className="w-20 h-20 border-4 border-gray-800 bg-white flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">Z</span>
                          </div>
                          <div className="w-20 h-20 border-4 border-gray-800 bg-white flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">U</span>
                          </div>
                        </div>

                        {/* Квадраты для ответов */}
                        <div className="flex justify-center gap-2">
                          {/* Желтый квадрат для десятков */}
                          <div className="w-24 h-24 bg-[#FFC107] flex items-center justify-center rounded-lg border-4 border-gray-800">
                            <input
                              type="text"
                              value={ex2Answers[tensIndex]}
                              onChange={(e) => handleEx2Change(tensIndex, e.target.value)}
                              maxLength={1}
                              disabled={isChecked}
                              className={`w-16 h-16 text-center text-4xl font-bold bg-white rounded-md ${getInputClass(ex2Answers[tensIndex], exercise.tens)}`}
                            />
                          </div>

                          {/* Синий квадрат для единиц */}
                          <div className="w-24 h-24 bg-[#5A8FA8] flex items-center justify-center rounded-lg border-4 border-gray-800">
                            <input
                              type="text"
                              value={ex2Answers[onesIndex]}
                              onChange={(e) => handleEx2Change(onesIndex, e.target.value)}
                              maxLength={1}
                              disabled={isChecked}
                              className={`w-16 h-16 text-center text-4xl font-bold bg-white rounded-md ${getInputClass(ex2Answers[onesIndex], exercise.ones)}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exercițiul 3 - Мини-игра */}
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6">Exercițiul 3: Jocul cu bile</h3>

                {ex3CurrentIndex < exercises3Data.length ? (
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    {/* Прогресс */}
                    <div className="mb-6 text-center">
                      <p className="text-xl font-bold text-gray-700">
                        Nivel {ex3CurrentIndex + 1} din {exercises3Data.length}
                      </p>
                    </div>

                    {/* Число */}
                    <div
                      className="mb-8 p-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: exercises3Data[ex3CurrentIndex].color }}
                    >
                      <span className="text-7xl font-bold text-white">
                        {exercises3Data[ex3CurrentIndex].number}
                      </span>
                    </div>

                    <p className="text-xl text-center mb-6 text-gray-700 font-semibold">
                      Pune bilele pe masă! Stânga = Zeci (Z), Dreapta = Unități (U)
                    </p>

                    {/* Стол с двумя сторонами */}
                    <div className="grid grid-cols-2 gap-4 mb-8 bg-[#8B7355] p-6 rounded-xl">
                      {/* Левая сторона - Десятки */}
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDropOnTens}
                        className="bg-yellow-200 p-4 rounded-lg border-4 border-gray-800 min-h-[200px] transition-all hover:bg-yellow-300"
                      >
                        <div className="text-center mb-4">
                          <span className="text-3xl font-bold text-gray-800">Z (Zeci)</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center min-h-[100px]">
                          {ex3TensBalls.map((color, i) => (
                            <div
                              key={i}
                              onClick={() => removeBallFromTens(i)}
                              className="cursor-pointer hover:scale-110 transition-transform"
                            >
                              <Image
                                src={`/images/ui/circle-${color}.png`}
                                alt="ball"
                                width={40}
                                height={40}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-center mt-2 text-sm text-gray-600">Trage bilele aici sau apasă să ștergi</p>
                      </div>

                      {/* Правая сторона - Единицы */}
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDropOnOnes}
                        className="bg-blue-200 p-4 rounded-lg border-4 border-gray-800 min-h-[200px] transition-all hover:bg-blue-300"
                      >
                        <div className="text-center mb-4">
                          <span className="text-3xl font-bold text-gray-800">U (Unități)</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center min-h-[100px]">
                          {ex3OnesBalls.map((color, i) => (
                            <div
                              key={i}
                              onClick={() => removeBallFromOnes(i)}
                              className="cursor-pointer hover:scale-110 transition-transform"
                            >
                              <Image
                                src={`/images/ui/circle-${color}.png`}
                                alt="ball"
                                width={40}
                                height={40}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-center mt-2 text-sm text-gray-600">Trage bilele aici sau apasă să ștergi</p>
                      </div>
                    </div>

                    {/* Коробка с шариками */}
                    <div className="bg-gradient-to-r from-[#8B7355] to-[#6B5345] p-6 rounded-xl border-4 border-gray-800">
                      <p className="text-center text-2xl font-bold text-white mb-4">Cutia cu bile</p>
                      <p className="text-center text-lg text-white/90 mb-4">Trage bilele pe masă</p>
                      <div className="flex flex-wrap justify-center gap-6">
                        {availableBallColors.map((color) => (
                          <div
                            key={color}
                            draggable={!isChecked}
                            onDragStart={(e) => handleDragStart(e, color)}
                            className="cursor-move hover:scale-110 transition-transform active:scale-95"
                          >
                            <Image
                              src={`/images/ui/circle-${color}.png`}
                              alt={`${color} ball`}
                              width={60}
                              height={60}
                              draggable={false}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Кнопка проверки текущего уровня */}
                    {!isChecked && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={checkEx3Current}
                          className="px-8 py-4 bg-[#5A9C5C] hover:bg-[#4A8C4C] text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                        >
                          Verifică răspunsul
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-3xl font-bold text-[#5A9C5C] mb-4">
                      Felicitări! Ai terminat toate nivelurile!
                    </h3>
                    <p className="text-xl text-gray-700">
                      Apasă pe "Verifică răspunsurile" pentru a vedea rezultatul final!
                    </p>
                  </div>
                )}
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

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`
            transform transition-all duration-300 ease-out
            ${showFeedback ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
            bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md mx-4
            ${feedbackType === 'correct' ? 'border-8 border-green-400' : ''}
            ${feedbackType === 'partial' ? 'border-8 border-yellow-400' : ''}
            ${feedbackType === 'incorrect' ? 'border-8 border-orange-400' : ''}
          `}>
            <div className="text-center">
              {/* Emoji */}
              <div className="text-8xl mb-4 animate-bounce">
                {feedbackType === 'correct' && '🎉'}
                {feedbackType === 'partial' && '⚠️'}
                {feedbackType === 'incorrect' && '💪'}
              </div>

              {/* Сообщение */}
              <h3 className={`text-3xl font-bold mb-4 ${
                feedbackType === 'correct' ? 'text-green-600' :
                feedbackType === 'partial' ? 'text-yellow-600' :
                'text-orange-600'
              }`}>
                {feedbackType === 'correct' && 'Corect!'}
                {feedbackType === 'partial' && 'Aproape!'}
                {feedbackType === 'incorrect' && 'Încearcă din nou!'}
              </h3>

              <p className="text-xl text-gray-700">
                {feedbackType === 'correct' && 'Mergi la următorul nivel!'}
                {feedbackType === 'partial' && 'Verifică din nou numărul de bile.'}
                {feedbackType === 'incorrect' && 'Numără bilele corect.'}
              </p>

              {/* Звездочки для правильного ответа */}
              {feedbackType === 'correct' && (
                <div className="mt-6 flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="text-4xl animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
