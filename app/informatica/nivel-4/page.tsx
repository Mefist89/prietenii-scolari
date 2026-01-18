'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type Scenario = {
  id: number;
  situation: string;
  emoji: string;
  options: { text: string; safe: boolean; explanation: string }[];
};

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: 'Un străin pe internet îți cere adresa de acasă. Ce faci?',
    emoji: '🏠',
    options: [
      { text: 'Nu îi dau și spun părinților', safe: true, explanation: 'Corect! Nu dai niciodată informații personale străinilor.' },
      { text: 'Îi dau adresa', safe: false, explanation: 'Periculos! Nu împărtășim niciodată adresa cu străini pe internet.' },
      { text: 'Îi dau adresa, dar nu și numărul casei', safe: false, explanation: 'Tot este periculos! Nicio informație despre locuință nu trebuie împărtășită.' },
    ],
  },
  {
    id: 2,
    situation: 'Primești un email cu un link de la un expeditor necunoscut. Ce faci?',
    emoji: '📧',
    options: [
      { text: 'Șterg emailul fără să deschid linkul', safe: true, explanation: 'Corect! Linkurile necunoscute pot fi periculoase.' },
      { text: 'Deschid linkul să văd ce este', safe: false, explanation: 'Periculos! Linkurile pot conține viruși sau site-uri rele.' },
      { text: 'Întreb părinții înainte', safe: true, explanation: 'Foarte bine! Întotdeauna consultă un adult de încredere.' },
    ],
  },
  {
    id: 3,
    situation: 'Cineva pe internet îți oferă cadouri dacă dai parola. Ce faci?',
    emoji: '🎁',
    options: [
      { text: 'Nu dau parola și blochez persoana', safe: true, explanation: 'Excelent! Parola este secretă și nu se împărtășește niciodată.' },
      { text: 'Dau parola pentru cadou', safe: false, explanation: 'Foarte periculos! Nimeni nu trebuie să știe parola ta.' },
      { text: 'Schimb parola și apoi o dau', safe: false, explanation: 'Tot este greșit! Nicio parolă nu trebuie împărtășită.' },
    ],
  },
  {
    id: 4,
    situation: 'Găsești o fotografie urâtă pe internet. Ce faci?',
    emoji: '😟',
    options: [
      { text: 'Închid pagina și spun părinților', safe: true, explanation: 'Perfect! Adulții de încredere te pot ajuta.' },
      { text: 'O arăt prietenilor', safe: false, explanation: 'Nu este o idee bună. Spune părinților în loc.' },
      { text: 'Continui să mă uit', safe: false, explanation: 'Greșit! Închide pagina și anunță un adult.' },
    ],
  },
  {
    id: 5,
    situation: 'Cineva online vrea să te întâlnești cu el în parc. Ce faci?',
    emoji: '🤝',
    options: [
      { text: 'Nu accept și spun părinților imediat', safe: true, explanation: 'Corect! Nu te întâlni niciodată cu străini de pe internet.' },
      { text: 'Accept întâlnirea', safe: false, explanation: 'Foarte periculos! Nu merge niciodată la întâlniri cu străini.' },
      { text: 'Îl întreb mai întâi câți ani are', safe: false, explanation: 'Nu contează! Nu te întâlni cu nimeni de pe internet fără părinți.' },
    ],
  },
  {
    id: 6,
    situation: 'Vrei să descarci un joc gratuit de pe un site necunoscut. Ce faci?',
    emoji: '🎮',
    options: [
      { text: 'Întreb părinții înainte să descarc', safe: true, explanation: 'Foarte bine! Adulții pot verifica dacă este sigur.' },
      { text: 'Descarc direct jocul', safe: false, explanation: 'Periculos! Poate conține viruși sau programe rele.' },
      { text: 'Caut jocul pe un magazin oficial', safe: true, explanation: 'Excelent! Magazinele oficiale sunt mult mai sigure.' },
    ],
  },
];

export default function InformaticaNivel4() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;

    setSelectedOption(index);
    setShowFeedback(true);

    if (scenario.options[index].safe) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setGameFinished(true);
      }
    }, 4000);
  };

  if (gameFinished) {
    const percentage = (score / scenarios.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
        >
          <div className="text-8xl mb-6">
            {passed ? '🛡️' : '💪'}
          </div>
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            {passed ? 'Bravo!' : 'Bine încercat!'}
          </h2>
          <p className="text-2xl text-green-600 mb-6">
            Ai făcut {score} alegeri sigure din {scenarios.length}!
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

          <div className="bg-green-50 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              Amintește-ți mereu:
            </h3>
            <ul className="text-left text-green-700 space-y-2">
              <li>🔒 Nu împărtăși niciodată informații personale</li>
              <li>👨👩👧 Spune părinților dacă ceva te deranjează</li>
              <li>🚫 Nu te întâlni cu străini de pe internet</li>
              <li>🔑 Păstrează parolele secrete</li>
              <li>⚠️ Fii atent la linkuri și descărcări</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              ← Meniu
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              🔄 Încearcă din nou
            </button>
            {passed && (
              <button
                onClick={() => router.push('/informatica/nivel-5')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🛡️ Siguranța pe Internet
          </h1>
          <p className="text-xl text-green-100 mb-4">
            Alege varianta cea mai sigură!
          </p>
          <div className="flex justify-center gap-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-lg font-bold text-green-800">
                Scenariul {currentScenario + 1}/{scenarios.length}
              </span>
            </div>
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-lg font-bold text-blue-800">
                Scor: {score}/{scenarios.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scenario Card */}
        <motion.div
          key={currentScenario}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Scenario */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-6">{scenario.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800">
              {scenario.situation}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {scenario.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                onClick={() => handleOptionClick(index)}
                disabled={showFeedback}
                className={`w-full p-6 rounded-2xl font-bold text-lg transition-all border-4 text-left ${
                  showFeedback
                    ? option.safe
                      ? 'bg-green-500 text-white border-green-600'
                      : selectedOption === index
                      ? 'bg-red-500 text-white border-red-600'
                      : 'bg-gray-200 text-gray-500 border-gray-300'
                    : 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300 cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">
                    {showFeedback ? (option.safe ? '✅' : selectedOption === index ? '❌' : '⚪') : '⚪'}
                  </span>
                  <span>{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          {showFeedback && selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-6 rounded-2xl ${
                scenario.options[selectedOption].safe ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <p className={`font-bold text-lg ${
                scenario.options[selectedOption].safe ? 'text-green-800' : 'text-red-800'
              }`}>
                {scenario.options[selectedOption].explanation}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-green-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            ← Înapoi la meniu
          </button>
        </div>
      </div>
    </div>
  );
}
