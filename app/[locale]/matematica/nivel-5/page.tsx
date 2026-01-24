'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ResultsPage from '@/components/ResultsPage';

export default function Nivel5Page() {
  const t = useTranslations();
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

  // Nivel 5: четыре типа упражнений
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
    // Упражнения с деньгами (11-15)
    { id: 11, type: 'money' as const, fruit: 'cherry', price: 1 },
    { id: 12, type: 'money' as const, fruit: 'apple', price: 2 },
    { id: 13, type: 'money' as const, fruit: 'orange', price: 3 },
    { id: 14, type: 'money' as const, fruit: 'peach', price: 4 },
    { id: 15, type: 'money' as const, fruit: 'strawberry', price: 5 },
    // Упражнения со сдачей (16-20)
    { id: 16, type: 'change' as const, fruit: 'cherry', price: 1, givenMoney: 1 }, // сдача 0
    { id: 17, type: 'change' as const, fruit: 'apple', price: 2, givenMoney: 5 }, // сдача 3
    { id: 18, type: 'change' as const, fruit: 'orange', price: 3, givenMoney: 5 }, // сдача 2
    { id: 19, type: 'change' as const, fruit: 'peach', price: 4, givenMoney: 10 }, // сдача 6
    { id: 20, type: 'change' as const, fruit: 'strawberry', price: 5, givenMoney: 10 }, // сдача 5
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [rightSide, setRightSide] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(0);

  // Для третьего задания с деньгами
  const [showFruit, setShowFruit] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  const [selectedMoney, setSelectedMoney] = useState<number[]>([]);

  // Для четвертого задания со сдачей
  const [selectedChange, setSelectedChange] = useState<number[]>([]);

  // Для уведомлений
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  // Показать уведомление
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: 'success', message: '' });
    }, 2500);
  };

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
      showNotification('success', t('Math.level5.balanceSuccess'));

      setTimeout(() => {
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
      }, 1500);
    } else {
      // Неправильно - показываем уведомление
      showNotification('error', t('Math.level5.balanceFail'));
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
      showNotification('success', t('Math.level5.priceSuccess'));

      setTimeout(() => {
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
      }, 1500);
    } else {
      // Неправильно
      showNotification('error', t('Math.level5.priceFail'));
    }
  };

  // Проверить оплату деньгами
  const checkMoneyAnswer = () => {
    const currentEx = allExercises[currentExercise];
    if (currentEx.type !== 'money') return;

    const totalMoney = selectedMoney.reduce((sum, value) => sum + value, 0);
    const requiredPrice = currentEx.price;

    if (totalMoney >= requiredPrice) {
      // Правильно - достаточно денег!
      setScore(score + 1);
      showNotification('success', t('Math.level5.moneySuccess'));

      setTimeout(() => {
        if (currentExercise < allExercises.length - 1) {
          // Переходим к следующему упражнению
          setCurrentExercise(currentExercise + 1);
          setSelectedMoney([]);
          setRightSide([]);
          setUserAnswer('');
          setCompletedExercises(completedExercises + 1);
          setShowFruit(false);
          setShowMoney(false);
        } else {
          // Все упражнения завершены
          setShowResults(true);
        }
      }, 1500);
    } else {
      // Неправильно - недостаточно денег
      showNotification('error', t('Math.level5.moneyFail'));
    }
  };

  const addMoney = (value: number) => {
    setSelectedMoney([...selectedMoney, value]);
  };

  const removeLastMoney = () => {
    if (selectedMoney.length > 0) {
      setSelectedMoney(selectedMoney.slice(0, -1));
    }
  };

  // Проверить сдачу
  const checkChangeAnswer = (noChange: boolean = false) => {
    const currentEx = allExercises[currentExercise];
    if (currentEx.type !== 'change') return;

    const requiredChange = currentEx.givenMoney - currentEx.price;
    const userChange = selectedChange.reduce((sum, value) => sum + value, 0);

    // Если нажата кнопка "Без сдачи"
    if (noChange) {
      if (requiredChange === 0) {
        // Правильно - сдачи действительно нет
        setScore(score + 1);
        showNotification('success', t('Math.level5.noChangeSuccess'));
        setTimeout(() => moveToNextExercise(), 1500);
      } else {
        showNotification('error', t('Math.level5.noChangeFail'));
      }
      return;
    }

    // Проверка выбранной сдачи
    if (userChange === requiredChange) {
      // Правильно!
      setScore(score + 1);
      showNotification('success', t('Math.level5.changeSuccess'));
      setTimeout(() => moveToNextExercise(), 1500);
    } else {
      showNotification('error', t('Math.level5.changeFail'));
    }
  };

  const addChange = (value: number) => {
    setSelectedChange([...selectedChange, value]);
  };

  const removeLastChange = () => {
    if (selectedChange.length > 0) {
      setSelectedChange(selectedChange.slice(0, -1));
    }
  };

  const moveToNextExercise = () => {
    if (currentExercise < allExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedMoney([]);
      setSelectedChange([]);
      setRightSide([]);
      setUserAnswer('');
      setCompletedExercises(completedExercises + 1);
      setShowFruit(false);
      setShowMoney(false);
    } else {
      setShowResults(true);
    }
  };

  const resetGame = () => {
    setCurrentExercise(0);
    setRightSide([]);
    setUserAnswer('');
    setSelectedMoney([]);
    setSelectedChange([]);
    setScore(0);
    setShowResults(false);
    setCompletedExercises(0);
    setShowFruit(false);
    setShowMoney(false);
  };

  // Анимация появления фрукта и денег для money и change упражнений
  useEffect(() => {
    const currentEx = allExercises[currentExercise];
    if (currentEx.type === 'money' || currentEx.type === 'change') {
      // Сбрасываем состояние
      setShowFruit(false);
      setShowMoney(false);

      // Показываем фрукт через 1 секунду
      const fruitTimer = setTimeout(() => {
        setShowFruit(true);
      }, 1000);

      // Показываем деньги через 2 секунды (1 сек + 1 сек)
      const moneyTimer = setTimeout(() => {
        setShowMoney(true);
      }, 2000);

      return () => {
        clearTimeout(fruitTimer);
        clearTimeout(moneyTimer);
      };
    } else {
      // Для других типов упражнений сбрасываем
      setShowFruit(false);
      setShowMoney(false);
    }
  }, [currentExercise]);

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
  const isMoneyExercise = currentEx.type === 'money';
  const isChangeExercise = currentEx.type === 'change';

  let leftWeight = 0;
  let rightWeight = 0;
  let balanceState = 'equals';

  if (isBalanceExercise) {
    leftWeight = calculateWeight(currentEx.leftFruits);
    rightWeight = calculateWeight(rightSide);
    balanceState = getBalanceState();
  }

  const totalMoney = selectedMoney.reduce((sum, value) => sum + value, 0);
  const totalChange = selectedChange.reduce((sum, value) => sum + value, 0);

  // Доступные купюры
  const availableMoney = [
    { value: 1, image: '/images/ui/money/MD_1.jpg' },
    { value: 5, image: '/images/ui/money/MD_5.jpg' },
    { value: 10, image: '/images/ui/money/MD_10.jpg' },
    { value: 20, image: '/images/ui/money/MD_20.jpg' },
  ];

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
              <h1 className="text-4xl md:text-5xl font-bold text-[#E67E3B] mb-2">{t('Math.level5.title')}</h1>
              <p className="text-xl md:text-2xl text-[#8B7355]">
                {isBalanceExercise ? t('Math.level5.fruitBalance') : t('Math.level5.calculatePrice')}
              </p>
              <p className="text-lg text-gray-600 mt-2">{t('Common.exercise')} {currentExercise + 1} {t('Common.levelOf')} {allExercises.length}</p>
            </div>

            <div className="space-y-8">
              {/* Explicația */}
              <div className="bg-[#FFF3D6] p-6 rounded-xl border-2 border-[#F4D35E]">
                <h2 className="text-2xl font-bold text-[#E67E3B] mb-4">📚 {t('Common.whatYouLearn')}</h2>
                <p className="text-lg text-gray-700">
                  {isBalanceExercise
                    ? t('Math.level5.whatYouLearnBalance')
                    : t('Math.level5.whatYouLearnPrice')}
                </p>
              </div>

              {/* Весы - только для балансовых упражнений */}
              {isBalanceExercise && (
              <div className="bg-[#FFE8D6] p-8 rounded-2xl border-4 border-[#FFA94D]">
                <div className="flex items-center justify-center gap-5">
                  {/* Левая чаша */}
                  <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-[#5A8FA8] w-[207px]">
                    <h4 className="text-lg font-bold text-[#5A8FA8] mb-2 text-center">{t('Math.level5.left')}</h4>
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
                      <span className="text-xl font-bold text-[#E67E3B]">{t('Math.level5.weight')}: {leftWeight}</span>
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
                    <h4 className="text-lg font-bold text-[#9C27B0] mb-2 text-center">{t('Math.level5.right')}</h4>
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
                      <span className="text-xl font-bold text-[#E67E3B] transition-all duration-300">{t('Math.level5.weight')}: {rightWeight}</span>
                    </div>
                  </div>
                </div>

                {/* Кнопки под весами */}
                <div className="flex flex-col items-center gap-3 mt-6">
                  <p className="text-lg font-bold text-[#8B7355]">
                    {t('Common.exercise')} {currentExercise + 1}: {t('Math.level5.checkBalance')}
                  </p>
                  <div className="flex justify-center gap-4">
                    {rightSide.length > 0 && (
                      <button
                        onClick={removeLastFruit}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transition-all"
                      >
                        {t('Math.level5.deleteLastFruit')}
                      </button>
                    )}
                    <button
                      onClick={checkBalance}
                      className="px-12 py-3 bg-[#E67E3B] hover:bg-[#D66D2A] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                    >
                      {t('Math.level5.checkBalance')}
                    </button>
                  </div>
                </div>
              </div>
              )}

              {/* Задача с расчетом стоимости */}
              {isPriceExercise && (
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6 text-center">{t('Math.level5.calculateTotalPrice')}</h3>
                <p className="text-lg font-bold text-[#8B7355] mb-4 text-center">
                  {t('Common.exercise')} {currentExercise + 1}: {t('Math.level5.whatIsPrice')}
                </p>

                {/* Коробка с фруктами */}
                <div className="bg-[#8B4513] p-8 rounded-2xl border-4 border-[#654321] mb-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFF3D6] px-4 py-1 rounded-full border-2 border-[#F4D35E]">
                    <span className="text-lg font-bold text-[#8B7355]">{t('Math.level5.fruitBox')}</span>
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
                        <span className="text-xl font-bold text-white">{fruit.price} {t('Math.level5.currency')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Поле для ввода ответа */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <label className="text-xl font-bold text-[#5A9C5C]">{t('Math.level5.totalPrice')}</label>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-32 px-4 py-3 text-2xl font-bold text-center text-black bg-white border-4 border-[#5A9C5C] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#A8D5A8]"
                      placeholder="?"
                    />
                    <span className="text-xl font-bold text-[#5A9C5C]">{t('Math.level5.currency')}</span>
                  </div>

                  <button
                    onClick={checkPriceAnswer}
                    className="px-12 py-3 bg-[#5A9C5C] hover:bg-[#4A8C4C] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    {t('Math.level5.checkAnswer')}
                  </button>
                </div>
              </div>
              )}

              {/* Задание 3 с деньгами */}
              {isMoneyExercise && (
              <div className="bg-[#FFE8D6] p-8 rounded-2xl border-4 border-[#FFA94D]">
                <h3 className="text-2xl font-bold text-[#E67E3B] mb-6 text-center">{t('Math.level5.payForFruit')}</h3>
                <p className="text-lg font-bold text-[#8B7355] mb-4 text-center">
                  {t('Common.exercise')} {currentExercise + 1}: {t('Math.level5.selectBanknotes')}
                </p>

                {/* Стол с фруктом */}
                <div className="bg-[#8B4513] p-8 rounded-2xl border-4 border-[#654321] mb-6 relative min-h-[200px] flex items-center justify-center">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFF3D6] px-4 py-1 rounded-full border-2 border-[#F4D35E]">
                    <span className="text-lg font-bold text-[#8B7355]">{t('Math.level5.fruitTable')}</span>
                  </div>

                  {/* Фрукт появляется через 1 секунду */}
                  {showFruit && currentEx.type === 'money' && (
                    <div className="flex flex-col items-center gap-4 animate-[scaleIn_0.5s_ease-out]">
                      <div className="w-[120px] h-[120px] flex items-center justify-center bg-white/20 rounded-lg p-2">
                        <Image
                          src={`/images/ui/fruits/${currentEx.fruit}.png`}
                          alt={currentEx.fruit}
                          width={120}
                          height={120}
                          className="object-contain max-w-[120px] max-h-[120px]"
                          style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="text-3xl font-bold text-white bg-black/30 px-6 py-2 rounded-lg">
                        {t('Math.level5.price')} {currentEx.price} {t('Math.level5.currency')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Деньги появляются через 2 секунды */}
                {showMoney && (
                  <>
                    {/* Выбранные деньги */}
                    <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-[#E67E3B] mb-6 animate-[scaleIn_0.5s_ease-out]">
                      <h4 className="text-lg font-bold text-[#E67E3B] mb-3 text-center">{t('Math.level5.selectedMoney')}</h4>
                      <div className="flex flex-wrap gap-2 justify-center min-h-[60px] items-center">
                        {selectedMoney.map((value, index) => (
                          <div key={index} className="text-xl font-bold text-white bg-[#E67E3B] px-4 py-2 rounded-lg shadow-md">
                            {value} {t('Math.level5.currency')}
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-2xl font-bold text-[#E67E3B]">{t('Math.level5.total')} {totalMoney} {t('Math.level5.currency')}</span>
                      </div>
                    </div>

                    {/* Выбор купюр */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-[scaleIn_0.5s_ease-out]">
                      {availableMoney.map((money) => (
                        <button
                          key={money.value}
                          onClick={() => addMoney(money.value)}
                          className="flex flex-col items-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-[#FFA94D] hover:border-[#E67E3B]"
                        >
                          <div className="w-full h-[80px] flex items-center justify-center mb-2">
                            <Image
                              src={money.image}
                              alt={`${money.value} lei`}
                              width={120}
                              height={60}
                              className="object-contain max-w-full max-h-[80px]"
                            />
                          </div>
                          <span className="text-lg font-bold text-[#E67E3B]">{money.value} {t('Math.level5.currency')}</span>
                        </button>
                      ))}
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex justify-center gap-4">
                        {selectedMoney.length > 0 && (
                          <button
                            onClick={removeLastMoney}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transition-all"
                          >
                            {t('Math.level5.deleteLastBanknote')}
                          </button>
                        )}
                        <button
                          onClick={checkMoneyAnswer}
                          className="px-12 py-3 bg-[#E67E3B] hover:bg-[#D66D2A] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                        >
                          {t('Math.level5.checkPayment')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              )}

              {/* Задание 4 со сдачей */}
              {isChangeExercise && (
              <div className="bg-[#E8E8FF] p-8 rounded-2xl border-4 border-[#9494FF]">
                <h3 className="text-2xl font-bold text-[#5A5AE6] mb-6 text-center">{t('Math.level5.giveChange')}</h3>
                <p className="text-lg font-bold text-[#8B7355] mb-4 text-center">
                  {t('Common.exercise')} {currentExercise + 1}: {t('Math.level5.calculateChange')}
                </p>

                {/* Стол с фруктом */}
                <div className="bg-[#8B4513] p-8 rounded-2xl border-4 border-[#654321] mb-6 relative min-h-[200px] flex items-center justify-center">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFF3D6] px-4 py-1 rounded-full border-2 border-[#F4D35E]">
                    <span className="text-lg font-bold text-[#8B7355]">{t('Math.level5.fruitTable')}</span>
                  </div>

                  {/* Фрукт появляется через 1 секунду */}
                  {showFruit && currentEx.type === 'change' && (
                    <div className="flex flex-col items-center gap-4 animate-[scaleIn_0.5s_ease-out]">
                      <div className="w-[120px] h-[120px] flex items-center justify-center bg-white/20 rounded-lg p-2">
                        <Image
                          src={`/images/ui/fruits/${currentEx.fruit}.png`}
                          alt={currentEx.fruit}
                          width={120}
                          height={120}
                          className="object-contain max-w-[120px] max-h-[120px]"
                          style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="text-3xl font-bold text-white bg-black/30 px-6 py-2 rounded-lg">
                        {t('Math.level5.price')} {currentEx.price} {t('Math.level5.currency')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Деньги покупателя появляются через 2 секунды */}
                {showMoney && (
                  <>
                    {/* Деньги от покупателя */}
                    <div className="bg-green-100 p-4 rounded-xl shadow-lg border-4 border-green-400 mb-6 animate-[scaleIn_0.5s_ease-out]">
                      <h4 className="text-lg font-bold text-green-700 mb-3 text-center">{t('Math.level5.buyerGave')}</h4>
                      <div className="flex justify-center items-center gap-4">
                        <div className="text-4xl font-bold text-green-700">{currentEx.givenMoney} {t('Math.level5.currency')}</div>
                      </div>
                      {currentEx.price < currentEx.givenMoney && (
                        <div className="text-center mt-3">
                          <span className="text-xl font-bold text-green-700">
                            {t('Math.level5.changeNeeded')} {currentEx.givenMoney - currentEx.price} {t('Math.level5.currency')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Выбранная сдача */}
                    <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-[#5A5AE6] mb-6 animate-[scaleIn_0.5s_ease-out]">
                      <h4 className="text-lg font-bold text-[#5A5AE6] mb-3 text-center">{t('Math.level5.selectedChange')}</h4>
                      <div className="flex flex-wrap gap-2 justify-center min-h-[60px] items-center">
                        {selectedChange.map((value, index) => (
                          <div key={index} className="text-xl font-bold text-white bg-[#5A5AE6] px-4 py-2 rounded-lg shadow-md">
                            {value} {t('Math.level5.currency')}
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-2xl font-bold text-[#5A5AE6]">{t('Math.level5.total')} {totalChange} {t('Math.level5.currency')}</span>
                      </div>
                    </div>

                    {/* Выбор купюр для сдачи */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-[scaleIn_0.5s_ease-out]">
                      {availableMoney.map((money) => (
                        <button
                          key={money.value}
                          onClick={() => addChange(money.value)}
                          className="flex flex-col items-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-[#9494FF] hover:border-[#5A5AE6]"
                        >
                          <div className="w-full h-[80px] flex items-center justify-center mb-2">
                            <Image
                              src={money.image}
                              alt={`${money.value} lei`}
                              width={120}
                              height={60}
                              className="object-contain max-w-full max-h-[80px]"
                            />
                          </div>
                          <span className="text-lg font-bold text-[#5A5AE6]">{money.value} {t('Math.level5.currency')}</span>
                        </button>
                      ))}
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex justify-center gap-4 flex-wrap">
                        {selectedChange.length > 0 && (
                          <button
                            onClick={removeLastChange}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transition-all"
                          >
                            {t('Math.level5.deleteLastBanknote')}
                          </button>
                        )}
                        <button
                          onClick={() => checkChangeAnswer(true)}
                          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                        >
                          {t('Math.level5.noChange')}
                        </button>
                        <button
                          onClick={() => checkChangeAnswer(false)}
                          className="px-12 py-3 bg-[#5A5AE6] hover:bg-[#4A4AD6] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                        >
                          {t('Math.level5.checkChange')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              )}

              {/* Выбор фруктов - только для балансовых упражнений */}
              {isBalanceExercise && (
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6 text-center">{t('Math.level5.chooseFruitsForRight')}</h3>
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
                  ← {t('Math.backToMath')}
                </Link>
                <button
                  onClick={resetGame}
                  className="px-12 py-5 bg-[#8B7355] hover:bg-[#7A6449] text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  {t('Common.reset')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Уведомление */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <motion.div
              animate={
                notification.type === 'error'
                  ? { x: [-10, 10, -10, 10, 0] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`rounded-3xl p-6 shadow-2xl border-4 ${
                notification.type === 'success'
                  ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-500'
                  : 'bg-gradient-to-r from-red-100 to-red-200 border-red-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-5xl"
                >
                  {notification.type === 'success' ? '🎉' : '😢'}
                </motion.div>
                <div className="flex-1">
                  <p
                    className={`text-xl font-bold ${
                      notification.type === 'success'
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
