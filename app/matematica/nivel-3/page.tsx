import Link from 'next/link';

export default function Nivel3Page() {
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
            <h1 className="text-5xl font-bold text-yellow-800 mb-2">Nivel 3</h1>
            <p className="text-2xl text-yellow-600">Înmulțiri Simple</p>
          </div>

          <div className="space-y-8">
            {/* Explicația */}
            <div className="bg-yellow-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">📚 Ce vei învăța:</h2>
              <p className="text-lg text-gray-700">
                Înmulțirea este ca adunarea repetată! De exemplu, 3 × 2 înseamnă 3 + 3 = 6. Hai să exersăm!
              </p>
            </div>

            {/* Exercițiul 1 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 1:</h3>
              <p className="text-2xl text-gray-800 mb-2">2 × 3 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(Adică: 2 + 2 + 2)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  4
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  5
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  6
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  7
                </button>
              </div>
            </div>

            {/* Exercițiul 2 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 2:</h3>
              <p className="text-2xl text-gray-800 mb-2">4 × 2 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(Adică: 4 + 4)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  6
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  7
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  8
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  9
                </button>
              </div>
            </div>

            {/* Exercițiul 3 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 3:</h3>
              <p className="text-2xl text-gray-800 mb-2">3 × 3 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(Adică: 3 + 3 + 3)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  6
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  8
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  9
                </button>
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  10
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link
                href="/matematica/nivel-2"
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full transition-colors"
              >
                ← Nivel Anterior
              </Link>
              <Link
                href="/matematica/nivel-4"
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
