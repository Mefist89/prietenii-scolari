import Link from 'next/link';

export default function Nivel5Page() {
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
            <h1 className="text-5xl font-bold text-yellow-800 mb-2">Nivel 5</h1>
            <p className="text-2xl text-yellow-600">Operații Combinate</p>
          </div>

          <div className="space-y-8">
            {/* Explicația */}
            <div className="bg-yellow-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">📚 Ce vei învăța:</h2>
              <p className="text-lg text-gray-700">
                În acest nivel vei combina toate operațiile pe care le-ai învățat: adunare, scădere, înmulțire și împărțire! Ești gata pentru provocare?
              </p>
            </div>

            {/* Exercițiul 1 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 1:</h3>
              <p className="text-2xl text-gray-800 mb-2">5 + 3 - 2 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(Calculează de la stânga la dreapta)</p>
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
              <p className="text-2xl text-gray-800 mb-2">2 × 4 + 1 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(Înmulțește mai întâi, apoi adună)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-lg font-bold text-xl transition-colors">
                  7
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

            {/* Exercițiul 3 */}
            <div className="border-4 border-yellow-300 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Exercițiul 3:</h3>
              <p className="text-2xl text-gray-800 mb-2">10 ÷ 2 + 3 = ?</p>
              <p className="text-sm text-gray-600 mb-6">(Împarte mai întâi, apoi adună)</p>
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

            {/* Mesaj Boss */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-8 rounded-xl text-center">
              <p className="text-2xl font-bold text-yellow-900 mb-4">
                🎉 Felicitări! Ai terminat toate nivelurile!
              </p>
              <p className="text-lg text-yellow-800 mb-6">
                Ești gata pentru provocarea finală? Înfruntă Șeful Final și arată tot ce ai învățat!
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link
                href="/matematica/nivel-4"
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full transition-colors"
              >
                ← Nivel Anterior
              </Link>
              <Link
                href="/matematica/sef-final"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all animate-pulse"
              >
                ⚔️ Șef Final →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
