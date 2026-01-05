import Link from 'next/link';

export default function Nivel4Page() {
  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/matematica"
          className="inline-block mb-8 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi la Matematică
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🐝</div>
            <h1 className="text-5xl font-bold text-yellow-800 mb-2">Nivel 4</h1>
            <p className="text-2xl text-yellow-600">Împărțiri Simple</p>
          </div>

          <div className="space-y-8">
            {/* Explicația */}
            <div className="bg-yellow-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">📚 Ce vei învăța:</h2>
              <p className="text-lg text-gray-700">
                Împărțirea înseamnă să împarți ceva în părți egale! De exemplu, 6 ÷ 2 înseamnă să împărți 6 în 2 părți egale = 3.
              </p>
            </div>

            {/* Exercițiul 1 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 1:</h3>
              <p className="text-2xl text-gray-800 mb-2">10 ÷ 2 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(10 împărțit în 2 părți)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  3
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  4
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  5
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  6
                </button>
              </div>
            </div>

            {/* Exercițiul 2 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 2:</h3>
              <p className="text-2xl text-gray-800 mb-2">12 ÷ 3 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(12 împărțit în 3 părți)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  2
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  3
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  4
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  5
                </button>
              </div>
            </div>

            {/* Exercițiul 3 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 3:</h3>
              <p className="text-2xl text-gray-800 mb-2">8 ÷ 4 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(8 împărțit în 4 părți)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  1
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  2
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  3
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  4
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link
                href="/matematica/nivel-3"
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full transition-colors"
              >
                ← Nivel Anterior
              </Link>
              <Link
                href="/matematica/nivel-5"
                className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full transition-colors"
              >
                Următorul Nivel →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
