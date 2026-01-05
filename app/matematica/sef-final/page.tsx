import Link from 'next/link';

export default function SefFinalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 via-orange-100 to-yellow-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/matematica"
          className="inline-block mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi la Matematică
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-12 border-8 border-red-400">
          <div className="text-center mb-8">
            <div className="text-9xl mb-4 animate-bounce">👑</div>
            <h1 className="text-6xl font-bold text-red-800 mb-2">ȘEF FINAL</h1>
            <p className="text-3xl text-orange-600 font-bold">Regele Matematicii</p>
            <div className="mt-4 text-8xl">🐲</div>
          </div>

          <div className="space-y-8">
            {/* Mesaj de Introducere */}
            <div className="bg-gradient-to-r from-red-200 to-orange-200 p-8 rounded-xl border-4 border-red-400">
              <h2 className="text-3xl font-bold text-red-900 mb-4 text-center">
                ⚔️ PROVOCAREA SUPREMĂ ⚔️
              </h2>
              <p className="text-xl text-gray-800 text-center leading-relaxed">
                Regele Matematicii te provoacă! Rezolvă toate cele 5 probleme dificile pentru a-l învinge și a deveni Maestru al Matematicii!
              </p>
            </div>

            {/* Exercițiul 1 - Dificultate Mare */}
            <div className="border-8 border-red-400 p-8 rounded-xl bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🔥</span>
                <h3 className="text-2xl font-bold text-red-800">Provocare 1:</h3>
              </div>
              <p className="text-3xl text-gray-900 mb-2 font-bold">15 - 7 + 4 = ?</p>
              <p className="text-sm text-gray-600 mb-6">Calculează cu atenție!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-red-300 hover:bg-red-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  10
                </button>
                <button className="bg-red-300 hover:bg-red-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  11
                </button>
                <button className="bg-red-300 hover:bg-red-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  12
                </button>
                <button className="bg-red-300 hover:bg-red-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  13
                </button>
              </div>
            </div>

            {/* Exercițiul 2 */}
            <div className="border-8 border-orange-400 p-8 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">⚡</span>
                <h3 className="text-2xl font-bold text-orange-800">Provocare 2:</h3>
              </div>
              <p className="text-3xl text-gray-900 mb-2 font-bold">3 × 5 - 7 = ?</p>
              <p className="text-sm text-gray-600 mb-6">Înmulțește mai întâi!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-orange-300 hover:bg-orange-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  6
                </button>
                <button className="bg-orange-300 hover:bg-orange-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  7
                </button>
                <button className="bg-orange-300 hover:bg-orange-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  8
                </button>
                <button className="bg-orange-300 hover:bg-orange-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  9
                </button>
              </div>
            </div>

            {/* Exercițiul 3 */}
            <div className="border-8 border-yellow-400 p-8 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">💥</span>
                <h3 className="text-2xl font-bold text-yellow-800">Provocare 3:</h3>
              </div>
              <p className="text-3xl text-gray-900 mb-2 font-bold">20 ÷ 4 + 6 = ?</p>
              <p className="text-sm text-gray-600 mb-6">Împarte mai întâi!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-300 hover:bg-yellow-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  9
                </button>
                <button className="bg-yellow-300 hover:bg-yellow-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  10
                </button>
                <button className="bg-yellow-300 hover:bg-yellow-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  11
                </button>
                <button className="bg-yellow-300 hover:bg-yellow-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  12
                </button>
              </div>
            </div>

            {/* Exercițiul 4 */}
            <div className="border-8 border-purple-400 p-8 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">⭐</span>
                <h3 className="text-2xl font-bold text-purple-800">Provocare 4:</h3>
              </div>
              <p className="text-3xl text-gray-900 mb-2 font-bold">4 × 3 ÷ 2 = ?</p>
              <p className="text-sm text-gray-600 mb-6">De la stânga la dreapta!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-purple-300 hover:bg-purple-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  4
                </button>
                <button className="bg-purple-300 hover:bg-purple-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  5
                </button>
                <button className="bg-purple-300 hover:bg-purple-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  6
                </button>
                <button className="bg-purple-300 hover:bg-purple-400 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-lg">
                  7
                </button>
              </div>
            </div>

            {/* Exercițiul 5 - Final */}
            <div className="border-8 border-red-600 p-8 rounded-xl bg-gradient-to-r from-red-200 to-orange-200 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">👑</span>
                <h3 className="text-2xl font-bold text-red-900">Provocare FINALĂ:</h3>
              </div>
              <p className="text-4xl text-gray-900 mb-2 font-bold">18 - 6 ÷ 2 + 5 = ?</p>
              <p className="text-sm text-gray-600 mb-6">Atenție la ordinea operațiilor!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-red-400 hover:bg-red-500 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-xl">
                  18
                </button>
                <button className="bg-red-400 hover:bg-red-500 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-xl">
                  19
                </button>
                <button className="bg-red-400 hover:bg-red-500 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-xl">
                  20
                </button>
                <button className="bg-red-400 hover:bg-red-500 p-6 rounded-lg font-bold text-2xl transition-all hover:scale-105 shadow-xl">
                  21
                </button>
              </div>
            </div>

            {/* Mesaj de Victorie (exemplu) */}
            <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 p-8 rounded-xl text-center border-4 border-yellow-500">
              <div className="text-7xl mb-4">🏆</div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                FELICITĂRI, CAMPION!
              </p>
              <p className="text-xl text-gray-800">
                Ai învins Regele Matematicii și ai devenit Maestru al Numerelor! Juja este mândră de tine! 🐝
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link
                href="/matematica/nivel-5"
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full transition-colors"
              >
                ← Nivel Anterior
              </Link>
              <Link
                href="/matematica"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors"
              >
                Înapoi la Matematică ✓
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
