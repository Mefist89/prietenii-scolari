'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ResultsPage from '@/components/ResultsPage';

export default function Nivel5Page() {
  // Веса фруктов
  const fruitWeights = {
    strawberry: 5,
    apple: 2,
    watermelon: 6,
    raspberry: 7,
    orange: 3,
    cherry: 1,
    banana: 2,
    limon: 1,
    peach: 4,
    pear: 2,
  };

  // Доступные фрукты
  const availableFruits = [
    { name: 'strawberry', image: '/images/ui/fruits/strawberry.png', weight: 5 },
    { name: 'apple', image: '/images/ui/fruits/apple.png', weight: 2 },
    { name: 'watermelon', image: '/images/ui/fruits/watermelon.png', weight: 6 },
    { name: 'raspberry', image: '/images/ui/fruits/raspberry.png', weight: 7 },
    { name: 'orange', image: '/images/ui/fruits/orange.png', weight: 3 },
    { name: 'cherry', image: '/images/ui/fruits/cherry.png', weight: 1 },
    { name: 'banana', image: '/images/ui/fruits/banana.png', weight: 2 },
    { name: 'limon', image: '/images/ui/fruits/limon.png', weight: 1 },
    { name: 'peach', image: '/images/ui/fruits/peach.png', weight: 4 },
    { name: 'pear', image: '/images/ui/fruits/pear.png', weight: 2 },
  ];

  // Nivel 5: сначала балансовые упражнения, затем упражнения с покупкой
  const allExercises = [
    // Балансовые упражнения (1-5)
    { id: 1, type: 'balance' as const, leftFruits: ['strawberry'], rightFruits: [] }, // вес 5
    { id: 2, type: 'balance' as const, leftFruits: ['watermelon'], rightFruits: [] }, // вес 6
    { id: 3, type: 'balance' as const, leftFruits: ['raspberry'], rightFruits: [] }, // вес 7
    { id: 4, type: 'balance' as const, leftFruits: ['apple', 'orange'], rightFruits: [] }, // вес 2+3=5
    { id: 5, type: 'balance' as const, leftFruits: ['banana', 'peach'], rightFruits: [] }, // вес 2+4=6
    // Упражнения с расчетом стоимости (6-10)
    { id: 6, type: 'price' as const, fruits: [{ name: 'cherry', price: 1 }] }, // цена 1
    { id: 7, type: 'price' as const, fruits: [{ name: 'apple', price: 2 }, { name: 'cherry', price: 1 }] }, // цена 3
    { id: 8, type: 'price' as const, fruits: [{ name: 'orange', price: 3 }, { name: 'cherry', price: 1 }] }, // цена 4
    { id: 9, type: 'price' as const, fruits: [{ name: 'peach', price: 4 }, { name: 'apple', price: 2 }] }, // цена 6
    { id: 10, type: 'price' as const, fruits: [{ name: 'strawberry', price: 5 }, { name: 'orange', price: 3 }] }, // цена 8
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [rightSide, setRightSide] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(0);

  // Вычисляем вес стороны
  const calculateWeight = (fruits: string[]) => {
    return fruits.reduce((sum, fruit) => sum + fruitWeights[fruit as keyof typeof fruitWeights], 0);
  };

  // Добавить фрукт на правую сторону
  const addFruitToRight = (fruitName: string) => {
    setRightSide([...rightSide, fruitName]);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, fruitName: string) => {
    e.dataTransfer.setData('fruitName', fruitName);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fruitName = e.dataTransfer.getData('fruitName');
    if (fruitName) {
      addFruitToRight(fruitName);
    }
  };

  // Удалить последний фрукт с правой стороны
  const removeLastFruit = () => {
    if (rightSide.length > 0) {
      setRightSide(rightSide.slice(0, -1));
    }
  };

  // Проверить баланс
  const checkBalance = () => {
    const currentEx = allExercises[currentExercise];
    if (currentEx.type !== 'balance') return;

    const leftWeight = calculateWeight(currentEx.leftFruits);
    const rightWeight = calculateWeight(rightSide);

    if (leftWeight === rightWeight) {
      // Правильно!
      setScore(score + 1);

      if (currentExercise < allExercises.length - 1) {
        // Переходим к следующему упражнению
        setCurrentExercise(currentExercise + 1);
        setRightSide([]);
        setUserAnswer('');
        setCompletedExercises(completedExercises + 1);
      } else {
        // Все упражнения завершены
        setShowResults(true);
      }
    } else {
      // Неправильно - показываем алерт
      alert('Весы не сбалансированы! Попробуй еще раз.');
    }
  };

  // Проверить стоимость
  const checkPriceAnswer = () => {
    const currentEx = allExercises[currentExercise];
    if (currentEx.type !== 'price') return;

    const totalPrice = currentEx.fruits.reduce((sum, fruit) => sum + fruit.price, 0);
    const userPrice = parseInt(userAnswer);

    if (userPrice === totalPrice) {
      // Правильно!
      setScore(score + 1);

      if (currentExercise < allExercises.length - 1) {
        // Переходим к следующему упражнению
        setCurrentExercise(currentExercise + 1);
        setUserAnswer('');
        setRightSide([]);
        setCompletedExercises(completedExercises + 1);
      } else {
        // Все упражнения завершены
        setShowResults(true);
      }
    } else {
      // Неправильно
      alert('Preț incorect! Verifică din nou.');
    }
  };

  const resetGame = () => {
    setCurrentExercise(0);
    setRightSide([]);
    setUserAnswer('');
    setScore(0);
    setShowResults(false);
    setCompletedExercises(0);
  };

  // Определяем состояние весов
  const getBalanceState = () => {
    const currentEx = allExercises[currentExercise];
    if (currentEx.type !== 'balance') return 'equals';

    const leftWeight = calculateWeight(currentEx.leftFruits);
    const rightWeight = calculateWeight(rightSide);

    if (rightWeight === 0) return 'left_is_heavier';
    if (leftWeight > rightWeight) return 'left_is_heavier';
    if (rightWeight > leftWeight) return 'right_is_heavier';
    return 'equals';
  };

  if (showResults) {
    return (
      <ResultsPage
        score={score}
        totalQuestions={allExercises.length}
        levelName="Nivel 5"
        onRetry={resetGame}
        nextLevelPath="/matematica/sef-final"
        menuPath="/matematica/menu"
      />
    );
  }

  const currentEx = allExercises[currentExercise];
  const isBalanceExercise = currentEx.type === 'balance';
  const isPriceExercise = currentEx.type === 'price';

  let leftWeight = 0;
  let rightWeight = 0;
  let balanceState = 'equals';

  if (isBalanceExercise) {
    leftWeight = calculateWeight(currentEx.leftFruits);
    rightWeight = calculateWeight(rightSide);
    balanceState = getBalanceState();
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
              <h1 className="text-4xl md:text-5xl font-bold text-[#E67E3B] mb-2">Nivel 5</h1>
              <p className="text-xl md:text-2xl text-[#8B7355]">
                {isBalanceExercise ? 'Balanța cu Fructe' : 'Calculează Prețul'}
              </p>
              <p className="text-lg text-gray-600 mt-2">Exercițiul {currentExercise + 1} din {allExercises.length}</p>
            </div>

            <div className="space-y-8">
              {/* Explicația */}
              <div className="bg-[#FFF3D6] p-6 rounded-xl border-2 border-[#F4D35E]">
                <h2 className="text-2xl font-bold text-[#E67E3B] mb-4">📚 Ce vei învăța:</h2>
                <p className="text-lg text-gray-700">
                  {isBalanceExercise
                    ? 'Balanțează cântarul! Fiecare fruct are o greutate diferită. Adaugă fructe pe partea dreaptă pentru a echilibra balanța.'
                    : 'Calculează prețul total al fructelor din cutie! Fiecare fruct are un preț diferit.'}
                </p>
              </div>

              {/* Весы - только для балансовых упражнений */}
              {isBalanceExercise && (
              <div className="bg-[#FFE8D6] p-8 rounded-2xl border-4 border-[#FFA94D]">
                <div className="flex items-center justify-center gap-5">
                  {/* Левая чаша */}
                  <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-[#5A8FA8] w-[207px]">
                    <h4 className="text-lg font-bold text-[#5A8FA8] mb-2 text-center">Stânga</h4>
                    <div className="flex flex-wrap gap-1.5 justify-center min-h-[80px] items-center">
                      {currentEx.type === 'balance' && currentEx.leftFruits.map((fruit: string, index: number) => (
                        <div key={index} className="w-[46px] h-[46px] flex items-center justify-center">
                          <Image
                            src={`/images/ui/fruits/${fruit}.png`}
                            alt={fruit}
                            width={46}
                            height={46}
                            className="object-contain max-w-[46px] max-h-[46px]"
                            style={{ width: '46px', height: '46px', objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xl font-bold text-[#E67E3B]">Gr: {leftWeight}</span>
                    </div>
                  </div>

                  {/* Изображение весов */}
                  <div className="relative w-[345px] h-[207px] flex items-center justify-center flex-shrink-0">
                    <Image
                      key={balanceState}
                      src={`/images/ui/balance/${balanceState}.png`}
                      alt="Balance"
                      width={345}
                      height={172}
                      className="object-contain transition-all duration-500 ease-in-out animate-[balance_0.5s_ease-in-out]"
                    />
                  </div>

                  {/* Правая чаша */}
                  <div
                    className="bg-white p-4 rounded-xl shadow-lg border-4 border-[#9C27B0] w-[207px]"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <h4 className="text-lg font-bold text-[#9C27B0] mb-2 text-center">Dreapta</h4>
                    <div className="flex flex-wrap gap-1.5 justify-center min-h-[80px] items-center">
                      {rightSide.map((fruit, index) => (
                        <div
                          key={`${fruit}-${index}`}
                          className="w-[46px] h-[46px] flex items-center justify-center animate-[scaleIn_0.3s_ease-out]"
                        >
                          <Image
                            src={`/images/ui/fruits/${fruit}.png`}
                            alt={fruit}
                            width={46}
                            height={46}
                            className="object-contain max-w-[46px] max-h-[46px]"
                            style={{ width: '46px', height: '46px', objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xl font-bold text-[#E67E3B] transition-all duration-300">Gr: {rightWeight}</span>
                    </div>
                  </div>
                </div>

                {/* Кнопки под весами */}
                <div className="flex flex-col items-center gap-3 mt-6">
                  <p className="text-lg font-bold text-[#8B7355]">
                    Exercițiul {currentExercise + 1}: Verifică balanța
                  </p>
                  <div className="flex justify-center gap-4">
                    {rightSide.length > 0 && (
                      <button
                        onClick={removeLastFruit}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transition-all"
                      >
                        ← Șterge ultimul fruct
                      </button>
                    )}
                    <button
                      onClick={checkBalance}
                      className="px-12 py-3 bg-[#E67E3B] hover:bg-[#D66D2A] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                    >
                      Verifică balanța
                    </button>
                  </div>
                </div>
              </div>
              )}

              {/* Задача с расчетом стоимости */}
              {isPriceExercise && (
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6 text-center">Calculează prețul total!</h3>
                <p className="text-lg font-bold text-[#8B7355] mb-4 text-center">
                  Exercițiul {currentExercise + 1}: Cât costă toate fructele?
                </p>

                {/* Коробка с фруктами */}
                <div className="bg-[#8B4513] p-8 rounded-2xl border-4 border-[#654321] mb-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFF3D6] px-4 py-1 rounded-full border-2 border-[#F4D35E]">
                    <span className="text-lg font-bold text-[#8B7355]">Cutia cu fructe</span>
                  </div>
                  <div className="flex flex-wrap gap-6 justify-center items-center mt-4">
                    {currentEx.type === 'price' && currentEx.fruits.map((fruit, index) => (
                      <div key={index} className="flex flex-col items-center bg-white/20 rounded-lg p-3">
                        <div className="w-[80px] h-[80px] flex items-center justify-center mb-2">
                          <Image
                            src={`/images/ui/fruits/${fruit.name}.png`}
                            alt={fruit.name}
                            width={80}
                            height={80}
                            className="object-contain max-w-[80px] max-h-[80px]"
                            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                          />
                        </div>
                        <span className="text-xl font-bold text-white">{fruit.price} lei</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Поле для ввода ответа */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <label className="text-xl font-bold text-[#5A9C5C]">Preț total:</label>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-32 px-4 py-3 text-2xl font-bold text-center text-black bg-white border-4 border-[#5A9C5C] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#A8D5A8]"
                      placeholder="?"
                    />
                    <span className="text-xl font-bold text-[#5A9C5C]">lei</span>
                  </div>

                  <button
                    onClick={checkPriceAnswer}
                    className="px-12 py-3 bg-[#5A9C5C] hover:bg-[#4A8C4C] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    Verifică răspunsul
                  </button>
                </div>
              </div>
              )}

              {/* Выбор фруктов - только для балансовых упражнений */}
              {isBalanceExercise && (
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6 text-center">Alege fructe pentru partea dreaptă:</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {availableFruits.map((fruit) => (
                    <div
                      key={fruit.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, fruit.name)}
                      onClick={() => addFruitToRight(fruit.name)}
                      className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-[#A8D5A8] hover:border-[#5A9C5C] cursor-grab active:cursor-grabbing"
                    >
                      <div className="w-[60px] h-[60px] flex items-center justify-center mb-2">
                        <Image
                          src={fruit.image}
                          alt={fruit.name}
                          width={60}
                          height={60}
                          className="object-contain max-w-[60px] max-h-[60px] pointer-events-none"
                          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                        />
                      </div>
                      <span className="text-xl font-bold text-[#E67E3B]">{fruit.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Кнопки действий */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="/matematica/menu"
                  className="px-8 py-5 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  ← Înapoi la Matematică
                </Link>
                <button
                  onClick={resetGame}
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
