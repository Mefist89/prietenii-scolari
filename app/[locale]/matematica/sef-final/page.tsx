'use client';

import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import BattleGame from './components/BattleGame';

export default function SefFinalPage() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <IntroScreen onStartGame={() => setGameStarted(true)} />;
  }

  return <BattleGame onBackToIntro={() => setGameStarted(false)} />;
}
