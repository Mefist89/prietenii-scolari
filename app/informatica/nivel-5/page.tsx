'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type CodeChallenge = {
  id: number;
  title: string;
  description: string;
  goal: string;
  emoji: string;
  blocks: { id: string; code: string; color: string }[];
  correctSequence: string[];
};

const challenges: CodeChallenge[] = [
  {
    id: 1,
    title: 'Iepurașul merge înainte',
    description: 'Programează iepurașul să meargă 3 pași înainte',
    goal: 'Ajunge la morcov! 🥕',
    emoji: '🐰',
    blocks: [
      { id: 'forward', code: '▶️ Mergi înainte', color: 'bg-blue-400' },
      { id: 'back', code: '◀️ Mergi înapoi', color: 'bg-red-400' },
      { id: 'jump', code: '⬆️ Sari', color: 'bg-green-400' },
    ],
    correctSequence: ['forward', 'forward', 'forward'],
  },
  {
    id: 2,
    title: 'Adună morcoavele',
    description: 'Programează iepurașul să adune 2 morcovi',
    goal: 'Mergi și adună morcoavele! 🥕🥕',
    emoji: '🐰',
    blocks: [
      { id: 'forward', code: '▶️ Mergi înainte', color: 'bg-blue-400' },
      { id: 'collect', code: '🥕 Adună', color: 'bg-orange-400' },
      { id: 'turn', code: '🔄 Întoarce-te', color: 'bg-purple-400' },
    ],
    correctSequence: ['forward', 'collect', 'forward', 'collect'],
  },
  {
    id: 3,
    title: 'Sari peste obstacol',
    description: 'Programează iepurașul să treacă peste piatră',
    goal: 'Mergi, sari peste piatră, apoi mergi! 🪨',
    emoji: '🐰',
    blocks: [
      { id: 'forward', code: '▶️ Mergi înainte', color: 'bg-blue-400' },
      { id: 'jump', code: '⬆️ Sari', color: 'bg-green-400' },
      { id: 'back', code: '◀️ Mergi înapoi', color: 'bg-red-400' },
    ],
    correctSequence: ['forward', 'jump', 'forward'],
  },
  {
    id: 4,
    title: 'Bucla simplă',
    description: 'Folosește o buclă pentru a repeta acțiuni',
    goal: 'Repetă: Mergi → Adună (de 3 ori)',
    emoji: '🔁',
    blocks: [
      { id: 'loop3', code: '🔁 Repetă 3 ori', color: 'bg-yellow-400' },
      { id: 'forward', code: '▶️ Mergi înainte', color: 'bg-blue-400' },
      { id: 'collect', code: '🥕 Adună', color: 'bg-orange-400' },
      { id: 'end', code: '⏹️ Sfârșit buclă', color: 'bg-gray-400' },
    ],
    correctSequence: ['loop3', 'forward', 'collect', 'end'],
  },
];

export default function InformaticaNivel5() {
  const router = useRouter();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const challenge = challenges[currentChallenge];
  const gameFinished = completedChallenges === challenges.length;

  const addBlock = (blockId: string) => {
    if (isRunning) return;
    setUserSequence([...userSequence, blockId]);
  };

  const removeLastBlock = () => {
    if (isRunning) return;
    setUserSequence(userSequence.slice(0, -1));
  };

  const clearSequence = () => {
    if (isRunning) return;
    setUserSequence([]);
    setShowFeedback(null);
  };

  const runCode = () => {
    setIsRunning(true);
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(challenge.correctSequence);

    setTimeout(() => {
      setShowFeedback(isCorrect ? 'correct' : 'wrong');
      setIsRunning(false);

      if (isCorrect) {
        setTimeout(() => {
          if (currentChallenge < challenges.length - 1) {
            setCurrentChallenge(currentChallenge + 1);
            setUserSequence([]);
            setShowFeedback(null);
          }
          setCompletedChallenges(completedChallenges + 1);
        }, 2000);
      }
    }, 1500);
  };

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
        >
          <div className="text-8xl mb-6">🎓</div>
          <h2 className="text-4xl font-bold text-indigo-800 mb-4">
            Felicitări, Programator!
          </h2>
          <p className="text-2xl text-indigo-600 mb-8">
            Ai rezolvat toate provocările de programare!
          </p>

          <div className="bg-indigo-50 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-indigo-800 mb-3">
              Ai învățat:
            </h3>
            <ul className="text-left text-indigo-700 space-y-2">
              <li>⬆️ Comenzi simple (înainte, înapoi, sari)</li>
              <li>📝 Secvențe de instrucțiuni</li>
              <li>🔁 Bucle (repetare)</li>
              <li>🎯 Gândire algoritmică</li>
              <li>💻 Bazele programării</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              ← Meniu
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              🔄 Joacă din nou
            </button>
            <button
              onClick={() => router.push('/informatica/sef-final')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-full shadow-lg transition-all"
            >
              Șef Final! 👑
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⌨️ Primii Pași în Programare
          </h1>
          <p className="text-xl text-indigo-100 mb-4">
            Creează secvențe de comenzi!
          </p>
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-lg font-bold text-indigo-800">
              Provocare {currentChallenge + 1}/{challenges.length}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Challenge Info */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{challenge.emoji}</div>
              <h2 className="text-3xl font-bold text-indigo-800 mb-2">
                {challenge.title}
              </h2>
              <p className="text-lg text-indigo-600 mb-4">
                {challenge.description}
              </p>
              <div className="bg-yellow-100 p-4 rounded-xl border-2 border-yellow-400">
                <p className="text-yellow-800 font-bold">
                  🎯 {challenge.goal}
                </p>
              </div>
            </div>

            {/* Available Blocks */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                Blocuri disponibile:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {challenge.blocks.map((block) => (
                  <motion.button
                    key={block.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addBlock(block.id)}
                    disabled={isRunning}
                    className={`p-4 ${block.color} text-white font-bold text-lg rounded-xl shadow-lg cursor-pointer transition-all hover:shadow-xl disabled:opacity-50`}
                  >
                    {block.code}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Code Editor */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-gray-900 rounded-3xl p-6 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>💻</span> Programul tău:
            </h3>

            {/* Code Area */}
            <div className="bg-gray-800 rounded-2xl p-4 mb-4 min-h-[300px]">
              {userSequence.length === 0 ? (
                <div className="text-gray-500 text-center py-12">
                  Apasă pe blocuri pentru a crea programul...
                </div>
              ) : (
                <div className="space-y-2">
                  {userSequence.map((blockId, index) => {
                    const block = challenge.blocks.find((b) => b.id === blockId);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: isRunning ? [1, 1.1, 1] : 1
                        }}
                        transition={isRunning ? {
                          delay: index * 0.3,
                          duration: 0.3
                        } : {}}
                        className={`p-3 ${block?.color} text-white font-mono rounded-lg flex items-center justify-between`}
                      >
                        <span>{index + 1}. {block?.code}</span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={runCode}
                disabled={userSequence.length === 0 || isRunning}
                className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? '▶️ Se execută...' : '▶️ Execută Programul'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={removeLastBlock}
                  disabled={userSequence.length === 0 || isRunning}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  ⬅️ Șterge Ultimul
                </button>
                <button
                  onClick={clearSequence}
                  disabled={userSequence.length === 0 || isRunning}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  🗑️ Șterge Tot
                </button>
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-4 p-4 rounded-xl text-center font-bold text-lg ${
                  showFeedback === 'correct'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {showFeedback === 'correct' ? '✅ Perfect! Programul merge!' : '❌ Nu funcționează. Încearcă din nou!'}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/informatica/menu')}
            className="px-8 py-3 bg-white/90 hover:bg-white text-indigo-600 font-bold text-lg rounded-full shadow-lg transition-all backdrop-blur-sm"
          >
            ← Înapoi la meniu
          </button>
        </div>
      </div>
    </div>
  );
}
