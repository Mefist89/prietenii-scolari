'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type ChallengeData = {
  id: number;
  titleKey: string;
  descKey: string;
  goalKey: string;
  emoji: string;
  blockKeys: { id: string; codeKey: string; color: string }[];
  correctSequence: string[];
};

const challenges: ChallengeData[] = [
  {
    id: 1,
    titleKey: 'c1title',
    descKey: 'c1desc',
    goalKey: 'c1goal',
    emoji: '🐰',
    blockKeys: [
      { id: 'forward', codeKey: 'blockForward', color: 'bg-blue-400' },
      { id: 'back', codeKey: 'blockBack', color: 'bg-red-400' },
      { id: 'jump', codeKey: 'blockJump', color: 'bg-green-400' },
    ],
    correctSequence: ['forward', 'forward', 'forward'],
  },
  {
    id: 2,
    titleKey: 'c2title',
    descKey: 'c2desc',
    goalKey: 'c2goal',
    emoji: '🐰',
    blockKeys: [
      { id: 'forward', codeKey: 'blockForward', color: 'bg-blue-400' },
      { id: 'collect', codeKey: 'blockCollect', color: 'bg-orange-400' },
      { id: 'turn', codeKey: 'blockTurn', color: 'bg-purple-400' },
    ],
    correctSequence: ['forward', 'collect', 'forward', 'collect'],
  },
  {
    id: 3,
    titleKey: 'c3title',
    descKey: 'c3desc',
    goalKey: 'c3goal',
    emoji: '🐰',
    blockKeys: [
      { id: 'forward', codeKey: 'blockForward', color: 'bg-blue-400' },
      { id: 'jump', codeKey: 'blockJump', color: 'bg-green-400' },
      { id: 'back', codeKey: 'blockBack', color: 'bg-red-400' },
    ],
    correctSequence: ['forward', 'jump', 'forward'],
  },
  {
    id: 4,
    titleKey: 'c4title',
    descKey: 'c4desc',
    goalKey: 'c4goal',
    emoji: '🔁',
    blockKeys: [
      { id: 'loop3', codeKey: 'blockLoop3', color: 'bg-yellow-400' },
      { id: 'forward', codeKey: 'blockForward', color: 'bg-blue-400' },
      { id: 'collect', codeKey: 'blockCollect', color: 'bg-orange-400' },
      { id: 'end', codeKey: 'blockEnd', color: 'bg-gray-400' },
    ],
    correctSequence: ['loop3', 'forward', 'collect', 'end'],
  },
];

export default function InformaticaNivel5() {
  const t = useTranslations();
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
            {t('Info.level5Game.congratsProgrammer')}
          </h2>
          <p className="text-2xl text-indigo-600 mb-8">
            {t('Info.level5Game.solvedAllChallenges')}
          </p>

          <div className="bg-indigo-50 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-indigo-800 mb-3">
              {t('Info.level5Game.youLearned')}
            </h3>
            <ul className="text-left text-indigo-700 space-y-2">
              <li>{t('Info.level5Game.skill1')}</li>
              <li>{t('Info.level5Game.skill2')}</li>
              <li>{t('Info.level5Game.skill3')}</li>
              <li>{t('Info.level5Game.skill4')}</li>
              <li>{t('Info.level5Game.skill5')}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/informatica/menu')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.menu')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.tryAgain')}
            </button>
            <button
              onClick={() => router.push('/informatica/sef-final')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-full shadow-lg transition-all"
            >
              {t('Info.level5Game.finalBossBtn')}
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
            {t('Info.level5Game.title')}
          </h1>
          <p className="text-xl text-indigo-100 mb-4">
            {t('Info.level5Game.subtitle')}
          </p>
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-lg font-bold text-indigo-800">
              {t('Info.level5Game.challengeOf', { current: currentChallenge + 1, total: challenges.length })}
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
                {t(`Info.level5Game.${challenge.titleKey}`)}
              </h2>
              <p className="text-lg text-indigo-600 mb-4">
                {t(`Info.level5Game.${challenge.descKey}`)}
              </p>
              <div className="bg-yellow-100 p-4 rounded-xl border-2 border-yellow-400">
                <p className="text-yellow-800 font-bold">
                  🎯 {t(`Info.level5Game.${challenge.goalKey}`)}
                </p>
              </div>
            </div>

            {/* Available Blocks */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                {t('Info.level5Game.availableBlocks')}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {challenge.blockKeys.map((block) => (
                  <motion.button
                    key={block.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addBlock(block.id)}
                    disabled={isRunning}
                    className={`p-4 ${block.color} text-white font-bold text-lg rounded-xl shadow-lg cursor-pointer transition-all hover:shadow-xl disabled:opacity-50`}
                  >
                    {t(`Info.level5Game.${block.codeKey}`)}
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
              <span>💻</span> {t('Info.level5Game.yourProgram')}
            </h3>

            {/* Code Area */}
            <div className="bg-gray-800 rounded-2xl p-4 mb-4 min-h-[300px]">
              {userSequence.length === 0 ? (
                <div className="text-gray-500 text-center py-12">
                  {t('Info.level5Game.clickBlocksToCreate')}
                </div>
              ) : (
                <div className="space-y-2">
                  {userSequence.map((blockId, index) => {
                    const block = challenge.blockKeys.find((b) => b.id === blockId);
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
                        <span>{index + 1}. {block ? t(`Info.level5Game.${block.codeKey}`) : ''}</span>
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
                {isRunning ? t('Info.level5Game.executing') : t('Info.level5Game.execute')}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={removeLastBlock}
                  disabled={userSequence.length === 0 || isRunning}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {t('Info.level5Game.deleteLast')}
                </button>
                <button
                  onClick={clearSequence}
                  disabled={userSequence.length === 0 || isRunning}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {t('Info.level5Game.deleteAll')}
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
                {showFeedback === 'correct' ? t('Info.level5Game.perfectProgram') : t('Info.level5Game.notWorking')}
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
            {t('Info.backToMenu')}
          </button>
        </div>
      </div>
    </div>
  );
}
