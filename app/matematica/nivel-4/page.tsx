'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ResultsPage from '@/components/ResultsPage';

export default function Nivel4Page() {
  // Exercițiul 1: Două table de adunare (Termen + Termen = Sumă)
  // Каждая таблица имеет 3 строки, в каждой строке 3 значения (termen1, termen2, suma)
  // answerIndex указывает какое поле нужно заполнить (0 - termen1, 1 - termen2, 2 - suma)
  const [ex1Answers, setEx1Answers] = useState(Array(6).fill('')); // 2 tables × 3 rows = 6 answers

  // Exercițiul 2: Două table de scădere (Descăzut - Scăzător = Diferență)
  const [ex2Answers, setEx2Answers] = useState(Array(6).fill('')); // 2 tables × 3 rows = 6 answers

  // Exercițiul 3: Задача с животными (2 таблицы × 3 животных = 6 ответов)
  const [ex3Answers, setEx3Answers] = useState(Array(6).fill('')); // 2 tables × 3 animals = 6 answers

  // Exercițiul 4: Таблица с птицами и черепахой (2 таблицы, 4+4 = 8 пропущенных значений)
  const [ex4Answers, setEx4Answers] = useState(Array(8).fill('')); // 8 missing values

  // Проверка ответов
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Exercițiul 1: Două table de adunare
  // Table 1
  const table1Data = [
    { termen1: '4', termen2: '6', suma: '10', answerIndex: 2 }, // заполняем сумму
    { termen1: '7', termen2: '', suma: '9', answerIndex: 1 }, // заполняем termen2
    { termen1: '', termen2: '4', suma: '8', answerIndex: 0 }, // заполняем termen1
  ];

  // Table 2
  const table2Data = [
    { termen1: '3', termen2: '5', suma: '', answerIndex: 2 }, // заполняем сумму
    { termen1: '6', termen2: '', suma: '10', answerIndex: 1 }, // заполняем termen2
    { termen1: '', termen2: '3', suma: '7', answerIndex: 0 }, // заполняем termen1
  ];

  // Правильные ответы для таблиц адунării
  const table1Correct = ['10', '2', '4']; // сумма для 1й строки, termen2 для 2й, termen1 для 3й
  const table2Correct = ['8', '4', '4'];

  // Exercițiul 2: Două table de scădere
  // Table 1 (scădere)
  const subtractTable1Data = [
    { descazut: '9', scazator: '', diferenta: '5', answerIndex: 1 }, // заполняем scăzător
    { descazut: '7', scazator: '', diferenta: '4', answerIndex: 1 }, // заполняем scăzător
    { descazut: '', scazator: '5', diferenta: '3', answerIndex: 0 }, // заполняем descăzut
  ];

  // Table 2 (scădere)
  const subtractTable2Data = [
    { descazut: '10', scazator: '3', diferenta: '', answerIndex: 2 }, // заполняем diferență
    { descazut: '8', scazator: '', diferenta: '5', answerIndex: 1 }, // заполняем scăzător
    { descazut: '', scazator: '4', diferenta: '2', answerIndex: 0 }, // заполняем descăzut
  ];

  // Правильные ответы для таблиц scăderii
  const subtractTable1Correct = ['4', '3', '8']; // scăzător для 1й, scăzător для 2й, descăzut для 3й
  const subtractTable2Correct = ['7', '3', '6'];

  // Exercițiul 3: Задача с животными (Erau + Au venit = În total)
  // Table 1
  const animalsTable1Data = [
    { animal: 'gepard', image: '/images/ui/animals/gepard.png', erau: 5, auVenit: 2, total: 7 },
    { animal: 'kenguru', image: '/images/ui/animals/kenguru.png', erau: 3, auVenit: 2, total: 5 },
    { animal: 'snake', image: '/images/ui/animals/snake.png', erau: 2, auVenit: 4, total: 6 },
  ];

  // Table 2
  const animalsTable2Data = [
    { animal: 'lion', image: '/images/ui/animals/lion.png', erau: 4, auVenit: 3, total: null, answerIndex: 2 }, // заполняем În total (4+3=7)
    { animal: 'zebra', image: '/images/ui/animals/zebra.png', erau: 6, auVenit: null, total: 9, answerIndex: 1 }, // заполняем Au venit (9-6=3)
    { animal: 'straus', image: '/images/ui/animals/straus.png', erau: null, auVenit: 5, total: 6, answerIndex: 0 }, // заполняем Erau (6-5=1)
  ];

  // Правильные ответы для Exercițiul 3
  const animalsTable1Correct = ['7', '5', '6'];
  const animalsTable2Correct = ['7', '3', '1'];

  // Exercițiul 4: Таблица с птицами и черепахой
  // Erau - Au plecat = Au rămas
  // Table 1
  const birdsTable1Data = [
    { animal: 'yellow-bird', image: '/images/ui/animals/yellow-bird.png', erau: 5, auPlecat: null, auRamas: 2 }, // заполняем Au plecat (5-2=3)
    { animal: 'turtle', image: '/images/ui/animals/turtle.png', erau: 3, auPlecat: 2, auRamas: null }, // заполняем Au rămas (3-2=1)
    { animal: 'straus', image: '/images/ui/animals/straus.png', erau: null, auPlecat: null, auRamas: 4 }, // заполняем Erau и Au plecat
  ];

  // Table 2
  const birdsTable2Data = [
    { animal: 'Bird-red', image: '/images/ui/animals/Bird-red.png', erau: 6, auPlecat: null, auRamas: 3 }, // заполняем Au plecat (6-3=3)
    { animal: 'koala', image: '/images/ui/animals/koala.png', erau: 4, auPlecat: 1, auRamas: null }, // заполняем Au rămas (4-1=3)
    { animal: 'dog', image: '/images/ui/animals/dog.png', erau: null, auPlecat: null, auRamas: 5 }, // заполняем Erau и Au plecat
  ];

  // Правильные ответы для Exercițiul 4
  // Table 1: [yellow-bird.auPlecat, turtle.auRamas, straus.erau, straus.auPlecat]
  const birdsTable1Correct = ['3', '1', '2', '1'];
  // Table 2: [Bird-red.auPlecat, koala.auRamas, dog.erau, dog.auPlecat]
  const birdsTable2Correct = ['3', '3', '2', '1'];

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

  const handleEx3Change = (index: number, value: string) => {
    if (isChecked) return;
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex3Answers];
      newAnswers[index] = value;
      setEx3Answers(newAnswers);
    }
  };

  const handleEx4Change = (index: number, value: string) => {
    if (isChecked) return;
    if (value === '' || /^\d+$/.test(value)) {
      const newAnswers = [...ex4Answers];
      newAnswers[index] = value;
      setEx4Answers(newAnswers);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;

    // Проверка Exercițiul 1 - Adunare (2 таблицы × 3 строки = 6 ответов)
    // Table 1 (индексы 0-2)
    table1Correct.forEach((correct, i) => {
      if (ex1Answers[i] === correct) correctCount++;
    });

    // Table 2 (индексы 3-5)
    table2Correct.forEach((correct, i) => {
      if (ex1Answers[i + 3] === correct) correctCount++;
    });

    // Проверка Exercițiul 2 - Scădere (2 таблицы × 3 строки = 6 ответов)
    // Table 1 (индексы 0-2)
    subtractTable1Correct.forEach((correct, i) => {
      if (ex2Answers[i] === correct) correctCount++;
    });

    // Table 2 (индексы 3-5)
    subtractTable2Correct.forEach((correct, i) => {
      if (ex2Answers[i + 3] === correct) correctCount++;
    });

    // Проверка Exercițiul 3 - Animale (2 таблицы × 3 животных = 6 ответов)
    // Table 1 (индексы 0-2)
    animalsTable1Correct.forEach((correct, i) => {
      if (ex3Answers[i] === correct) correctCount++;
    });

    // Table 2 (индексы 3-5)
    animalsTable2Correct.forEach((correct, i) => {
      if (ex3Answers[i + 3] === correct) correctCount++;
    });

    // Проверка Exercițiul 4 - Птицы и черепаха (2 таблицы × 4 ответа = 8 ответов)
    // Table 1 (индексы 0-3)
    birdsTable1Correct.forEach((correct, i) => {
      if (ex4Answers[i] === correct) correctCount++;
    });

    // Table 2 (индексы 4-7)
    birdsTable2Correct.forEach((correct, i) => {
      if (ex4Answers[i + 4] === correct) correctCount++;
    });

    setScore(correctCount);
    setIsChecked(true);
    setShowResults(true);
  };

  const resetAnswers = () => {
    setEx1Answers(Array(6).fill(''));
    setEx2Answers(Array(6).fill(''));
    setEx3Answers(Array(6).fill(''));
    setEx4Answers(Array(8).fill(''));
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
        totalQuestions={26}
        levelName="Nivel 4"
        onRetry={resetAnswers}
        nextLevelPath="/matematica/nivel-5"
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
              <h1 className="text-4xl md:text-5xl font-bold text-[#E67E3B] mb-2">Nivel 4</h1>
              <p className="text-xl md:text-2xl text-[#8B7355]">Adunare și Scădere</p>
            </div>

            <div className="space-y-8">
              {/* Explicația */}
              <div className="bg-[#FFF3D6] p-6 rounded-xl border-2 border-[#F4D35E]">
                <h2 className="text-2xl font-bold text-[#E67E3B] mb-4">📚 Ce vei învăța:</h2>
                <p className="text-lg text-gray-700">
                  Învățăm adunarea și scăderea! Vei completa tabele de adunare, tabele de scădere și vei rezolva probleme cu animale.
                </p>
              </div>

              {/* Exercițiul 1 */}
              <div className="bg-[#E8F4F8] p-8 rounded-2xl border-4 border-[#95C9DD]">
                <h3 className="text-2xl font-bold text-[#5A8FA8] mb-6">Exercițiul 1: Completează tabelele</h3>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  Completează căsuțele goale din tabelele de adunare!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Table 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#5A8FA8] mb-4 text-center">Tabel 1</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#5A8FA8] text-white">
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Termen</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Termen</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Sumă</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table1Data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="border-4 border-gray-800 p-3">
                                {row.answerIndex === 0 ? (
                                  <input
                                    type="text"
                                    value={ex1Answers[rowIndex]}
                                    onChange={(e) => handleEx1Change(rowIndex, e.target.value)}
                                    maxLength={2}
                                    disabled={isChecked}
                                    className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex1Answers[rowIndex], table1Correct[rowIndex])}`}
                                  />
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                    {row.termen1}
                                  </div>
                                )}
                              </td>
                              <td className="border-4 border-gray-800 p-3">
                                {row.answerIndex === 1 ? (
                                  <input
                                    type="text"
                                    value={ex1Answers[rowIndex]}
                                    onChange={(e) => handleEx1Change(rowIndex, e.target.value)}
                                    maxLength={2}
                                    disabled={isChecked}
                                    className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex1Answers[rowIndex], table1Correct[rowIndex])}`}
                                  />
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                    {row.termen2}
                                  </div>
                                )}
                              </td>
                              <td className="border-4 border-gray-800 p-3">
                                {row.answerIndex === 2 ? (
                                  <input
                                    type="text"
                                    value={ex1Answers[rowIndex]}
                                    onChange={(e) => handleEx1Change(rowIndex, e.target.value)}
                                    maxLength={2}
                                    disabled={isChecked}
                                    className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex1Answers[rowIndex], table1Correct[rowIndex])}`}
                                  />
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                    {row.suma}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table 2 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#5A8FA8] mb-4 text-center">Tabel 2</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#5A8FA8] text-white">
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Termen</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Termen</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Sumă</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table2Data.map((row, rowIndex) => {
                            const answerIndex = rowIndex + 3; // Table 2 uses indices 3-5
                            return (
                              <tr key={rowIndex}>
                                <td className="border-4 border-gray-800 p-3">
                                  {row.answerIndex === 0 ? (
                                    <input
                                      type="text"
                                      value={ex1Answers[answerIndex]}
                                      onChange={(e) => handleEx1Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex1Answers[answerIndex], table2Correct[rowIndex])}`}
                                    />
                                  ) : (
                                    <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                      {row.termen1}
                                    </div>
                                  )}
                                </td>
                                <td className="border-4 border-gray-800 p-3">
                                  {row.answerIndex === 1 ? (
                                    <input
                                      type="text"
                                      value={ex1Answers[answerIndex]}
                                      onChange={(e) => handleEx1Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex1Answers[answerIndex], table2Correct[rowIndex])}`}
                                    />
                                  ) : (
                                    <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                      {row.termen2}
                                    </div>
                                  )}
                                </td>
                                <td className="border-4 border-gray-800 p-3">
                                  {row.answerIndex === 2 ? (
                                    <input
                                      type="text"
                                      value={ex1Answers[answerIndex]}
                                      onChange={(e) => handleEx1Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex1Answers[answerIndex], table2Correct[rowIndex])}`}
                                    />
                                  ) : (
                                    <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                      {row.suma}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercițiul 2 */}
              <div className="bg-[#F5E8F5] p-8 rounded-2xl border-4 border-[#D4A5D4]">
                <h3 className="text-2xl font-bold text-[#9B6B9B] mb-6">Exercițiul 2: Completează tabelele de scădere</h3>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  Completează căsuțele goale din tabelele de scădere!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Subtract Table 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#9B6B9B] mb-4 text-center">Tabel 1</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#9B6B9B] text-white">
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Descăzut</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Scăzător</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Diferență</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subtractTable1Data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="border-4 border-gray-800 p-3">
                                {row.answerIndex === 0 ? (
                                  <input
                                    type="text"
                                    value={ex2Answers[rowIndex]}
                                    onChange={(e) => handleEx2Change(rowIndex, e.target.value)}
                                    maxLength={2}
                                    disabled={isChecked}
                                    className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex2Answers[rowIndex], subtractTable1Correct[rowIndex])}`}
                                  />
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                    {row.descazut}
                                  </div>
                                )}
                              </td>
                              <td className="border-4 border-gray-800 p-3">
                                {row.answerIndex === 1 ? (
                                  <input
                                    type="text"
                                    value={ex2Answers[rowIndex]}
                                    onChange={(e) => handleEx2Change(rowIndex, e.target.value)}
                                    maxLength={2}
                                    disabled={isChecked}
                                    className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex2Answers[rowIndex], subtractTable1Correct[rowIndex])}`}
                                  />
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                    {row.scazator}
                                  </div>
                                )}
                              </td>
                              <td className="border-4 border-gray-800 p-3">
                                {row.answerIndex === 2 ? (
                                  <input
                                    type="text"
                                    value={ex2Answers[rowIndex]}
                                    onChange={(e) => handleEx2Change(rowIndex, e.target.value)}
                                    maxLength={2}
                                    disabled={isChecked}
                                    className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex2Answers[rowIndex], subtractTable1Correct[rowIndex])}`}
                                  />
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                    {row.diferenta}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Subtract Table 2 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#9B6B9B] mb-4 text-center">Tabel 2</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#9B6B9B] text-white">
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Descăzut</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Scăzător</th>
                            <th className="border-4 border-gray-800 p-4 text-xl font-bold">Diferență</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subtractTable2Data.map((row, rowIndex) => {
                            const answerIndex = rowIndex + 3; // Table 2 uses indices 3-5
                            return (
                              <tr key={rowIndex}>
                                <td className="border-4 border-gray-800 p-3">
                                  {row.answerIndex === 0 ? (
                                    <input
                                      type="text"
                                      value={ex2Answers[answerIndex]}
                                      onChange={(e) => handleEx2Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex2Answers[answerIndex], subtractTable2Correct[rowIndex])}`}
                                    />
                                  ) : (
                                    <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                      {row.descazut}
                                    </div>
                                  )}
                                </td>
                                <td className="border-4 border-gray-800 p-3">
                                  {row.answerIndex === 1 ? (
                                    <input
                                      type="text"
                                      value={ex2Answers[answerIndex]}
                                      onChange={(e) => handleEx2Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex2Answers[answerIndex], subtractTable2Correct[rowIndex])}`}
                                    />
                                  ) : (
                                    <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                      {row.scazator}
                                    </div>
                                  )}
                                </td>
                                <td className="border-4 border-gray-800 p-3">
                                  {row.answerIndex === 2 ? (
                                    <input
                                      type="text"
                                      value={ex2Answers[answerIndex]}
                                      onChange={(e) => handleEx2Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-full h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex2Answers[answerIndex], subtractTable2Correct[rowIndex])}`}
                                    />
                                  ) : (
                                    <div className="h-16 flex items-center justify-center text-3xl font-bold text-gray-800">
                                      {row.diferenta}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercițiul 3 - Tabel cu animale */}
              <div className="bg-[#FFE8D6] p-8 rounded-2xl border-4 border-[#FFA94D]">
                <h3 className="text-2xl font-bold text-[#E67E3B] mb-6">Exercițiul 3: Numără animalele</h3>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  Rezolvă problemele cu animale! Erau + Au venit = În total
                </p>

                <div className="space-y-8">
                  {/* Table 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#E67E3B] mb-4 text-center">Tabel 1</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#5A8FA8] text-white">
                            <th className="border-4 border-gray-800 p-4"></th>
                            {animalsTable1Data.map((animal, i) => (
                              <th key={i} className="border-4 border-gray-800 p-4">
                                <div className="flex justify-center">
                                  <Image
                                    src={animal.image}
                                    alt={animal.animal}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Erau */}
                          <tr>
                            <td className="border-4 border-gray-800 p-4 bg-[#5A8FA8] text-white font-bold text-xl">
                              Erau
                            </td>
                            {animalsTable1Data.map((animal, i) => (
                              <td key={i} className="border-4 border-gray-800 p-4 text-center">
                                <div className="text-3xl font-bold text-gray-800">{animal.erau}</div>
                              </td>
                            ))}
                          </tr>

                          {/* Au venit */}
                          <tr>
                            <td className="border-4 border-gray-800 p-4 bg-[#5A8FA8] text-white font-bold text-xl">
                              Au venit
                            </td>
                            {animalsTable1Data.map((animal, i) => (
                              <td key={i} className="border-4 border-gray-800 p-4 text-center">
                                <div className="text-3xl font-bold text-gray-800">{animal.auVenit}</div>
                              </td>
                            ))}
                          </tr>

                          {/* În total */}
                          <tr>
                            <td className="border-4 border-gray-800 p-4 bg-[#5A8FA8] text-white font-bold text-xl">
                              În total
                            </td>
                            {animalsTable1Data.map((animal, i) => (
                              <td key={i} className="border-4 border-gray-800 p-4 text-center">
                                <input
                                  type="text"
                                  value={ex3Answers[i]}
                                  onChange={(e) => handleEx3Change(i, e.target.value)}
                                  maxLength={2}
                                  disabled={isChecked}
                                  className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex3Answers[i], animalsTable1Correct[i])}`}
                                />
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table 2 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#E67E3B] mb-4 text-center">Tabel 2</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#5A8FA8] text-white">
                            <th className="border-4 border-gray-800 p-4"></th>
                            {animalsTable2Data.map((animal, i) => (
                              <th key={i} className="border-4 border-gray-800 p-4">
                                <div className="flex justify-center">
                                  <Image
                                    src={animal.image}
                                    alt={animal.animal}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Erau */}
                          <tr>
                            <td className="border-4 border-gray-800 p-4 bg-[#5A8FA8] text-white font-bold text-xl">
                              Erau
                            </td>
                            {animalsTable2Data.map((animal, i) => {
                              const answerIndex = i + 3;
                              return (
                                <td key={i} className="border-4 border-gray-800 p-4 text-center">
                                  {animal.answerIndex === 0 ? (
                                    <input
                                      type="text"
                                      value={ex3Answers[answerIndex]}
                                      onChange={(e) => handleEx3Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex3Answers[answerIndex], animalsTable2Correct[i])}`}
                                    />
                                  ) : (
                                    <div className="text-3xl font-bold text-gray-800">{animal.erau}</div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          {/* Au venit */}
                          <tr>
                            <td className="border-4 border-gray-800 p-4 bg-[#5A8FA8] text-white font-bold text-xl">
                              Au venit
                            </td>
                            {animalsTable2Data.map((animal, i) => {
                              const answerIndex = i + 3;
                              return (
                                <td key={i} className="border-4 border-gray-800 p-4 text-center">
                                  {animal.answerIndex === 1 ? (
                                    <input
                                      type="text"
                                      value={ex3Answers[answerIndex]}
                                      onChange={(e) => handleEx3Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex3Answers[answerIndex], animalsTable2Correct[i])}`}
                                    />
                                  ) : (
                                    <div className="text-3xl font-bold text-gray-800">{animal.auVenit}</div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          {/* În total */}
                          <tr>
                            <td className="border-4 border-gray-800 p-4 bg-[#5A8FA8] text-white font-bold text-xl">
                              În total
                            </td>
                            {animalsTable2Data.map((animal, i) => {
                              const answerIndex = i + 3; // Table 2 uses indices 3-5
                              return (
                                <td key={i} className="border-4 border-gray-800 p-4 text-center">
                                  {animal.answerIndex === 2 ? (
                                    <input
                                      type="text"
                                      value={ex3Answers[answerIndex]}
                                      onChange={(e) => handleEx3Change(answerIndex, e.target.value)}
                                      maxLength={2}
                                      disabled={isChecked}
                                      className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex3Answers[answerIndex], animalsTable2Correct[i])}`}
                                    />
                                  ) : (
                                    <div className="text-3xl font-bold text-gray-800">{animal.total}</div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercițiul 4 - Tabel cu păsări și broască țestoasă */}
              <div className="bg-[#E8F5E8] p-8 rounded-2xl border-4 border-[#A8D5A8]">
                <h3 className="text-2xl font-bold text-[#5A9C5C] mb-6">Exercițiul 4: Completează tabelul</h3>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  Erau - Au plecat = Au rămas. Găsește valorile lipsă!
                </p>

                <div className="space-y-8">
                  {/* Table 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-[#5A9C5C] mb-4 text-center">Tabel 1</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#5A9C5C] text-white">
                            <th className="border-4 border-gray-800 p-4"></th>
                            {birdsTable1Data.map((bird, i) => (
                            <th key={i} className="border-4 border-gray-800 p-4">
                              <div className="flex justify-center">
                                <Image
                                  src={bird.image}
                                  alt={bird.animal}
                                  width={80}
                                  height={80}
                                  className="object-contain"
                                />
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Erau */}
                        <tr>
                          <td className="border-4 border-gray-800 p-4 bg-[#5A9C5C] text-white font-bold text-xl">
                            Erau
                          </td>
                          {birdsTable1Data.map((bird, i) => (
                            <td key={i} className="border-4 border-gray-800 p-4 text-center">
                              {bird.erau !== null ? (
                                <div className="text-3xl font-bold text-gray-800">{bird.erau}</div>
                              ) : (
                                <input
                                  type="text"
                                  value={ex4Answers[2]}
                                  onChange={(e) => handleEx4Change(2, e.target.value)}
                                  maxLength={2}
                                  disabled={isChecked}
                                  className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[2], birdsTable1Correct[2])}`}
                                />
                              )}
                            </td>
                          ))}
                        </tr>

                        {/* Au plecat */}
                        <tr>
                          <td className="border-4 border-gray-800 p-4 bg-[#5A9C5C] text-white font-bold text-xl">
                            Au plecat
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <input
                              type="text"
                              value={ex4Answers[0]}
                              onChange={(e) => handleEx4Change(0, e.target.value)}
                              maxLength={2}
                              disabled={isChecked}
                              className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[0], birdsTable1Correct[0])}`}
                            />
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <div className="text-3xl font-bold text-gray-800">{birdsTable1Data[1].auPlecat}</div>
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <input
                              type="text"
                              value={ex4Answers[3]}
                              onChange={(e) => handleEx4Change(3, e.target.value)}
                              maxLength={2}
                              disabled={isChecked}
                              className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[3], birdsTable1Correct[3])}`}
                            />
                          </td>
                        </tr>

                        {/* Au rămas */}
                        <tr>
                          <td className="border-4 border-gray-800 p-4 bg-[#5A9C5C] text-white font-bold text-xl">
                            Au rămas
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <div className="text-3xl font-bold text-gray-800">{birdsTable1Data[0].auRamas}</div>
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <input
                              type="text"
                              value={ex4Answers[1]}
                              onChange={(e) => handleEx4Change(1, e.target.value)}
                              maxLength={2}
                              disabled={isChecked}
                              className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[1], birdsTable1Correct[1])}`}
                            />
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <div className="text-3xl font-bold text-gray-800">{birdsTable1Data[2].auRamas}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2 */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-bold text-[#5A9C5C] mb-4 text-center">Tabel 2</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#5A9C5C] text-white">
                          <th className="border-4 border-gray-800 p-4"></th>
                          {birdsTable2Data.map((bird, i) => (
                            <th key={i} className="border-4 border-gray-800 p-4">
                              <div className="flex justify-center">
                                <Image
                                  src={bird.image}
                                  alt={bird.animal}
                                  width={80}
                                  height={80}
                                  className="object-contain"
                                />
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Erau */}
                        <tr>
                          <td className="border-4 border-gray-800 p-4 bg-[#5A9C5C] text-white font-bold text-xl">
                            Erau
                          </td>
                          {birdsTable2Data.map((bird, i) => (
                            <td key={i} className="border-4 border-gray-800 p-4 text-center">
                              {bird.erau !== null ? (
                                <div className="text-3xl font-bold text-gray-800">{bird.erau}</div>
                              ) : (
                                <input
                                  type="text"
                                  value={ex4Answers[6]}
                                  onChange={(e) => handleEx4Change(6, e.target.value)}
                                  maxLength={2}
                                  disabled={isChecked}
                                  className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[6], birdsTable2Correct[2])}`}
                                />
                              )}
                            </td>
                          ))}
                        </tr>

                        {/* Au plecat */}
                        <tr>
                          <td className="border-4 border-gray-800 p-4 bg-[#5A9C5C] text-white font-bold text-xl">
                            Au plecat
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <input
                              type="text"
                              value={ex4Answers[4]}
                              onChange={(e) => handleEx4Change(4, e.target.value)}
                              maxLength={2}
                              disabled={isChecked}
                              className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[4], birdsTable2Correct[0])}`}
                            />
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <div className="text-3xl font-bold text-gray-800">{birdsTable2Data[1].auPlecat}</div>
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <input
                              type="text"
                              value={ex4Answers[7]}
                              onChange={(e) => handleEx4Change(7, e.target.value)}
                              maxLength={2}
                              disabled={isChecked}
                              className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[7], birdsTable2Correct[3])}`}
                            />
                          </td>
                        </tr>

                        {/* Au rămas */}
                        <tr>
                          <td className="border-4 border-gray-800 p-4 bg-[#5A9C5C] text-white font-bold text-xl">
                            Au rămas
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <div className="text-3xl font-bold text-gray-800">{birdsTable2Data[0].auRamas}</div>
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <input
                              type="text"
                              value={ex4Answers[5]}
                              onChange={(e) => handleEx4Change(5, e.target.value)}
                              maxLength={2}
                              disabled={isChecked}
                              className={`w-20 h-16 text-center text-3xl font-bold rounded-md ${getInputClass(ex4Answers[5], birdsTable2Correct[1])}`}
                            />
                          </td>
                          <td className="border-4 border-gray-800 p-4 text-center">
                            <div className="text-3xl font-bold text-gray-800">{birdsTable2Data[2].auRamas}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
