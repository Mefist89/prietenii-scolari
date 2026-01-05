import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-4">
          Prietenii Școlari
        </h1>
        <p className="text-2xl text-green-700 mb-12">
          Alege materia ta preferată!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {/* Математика - Жужа */}
          <Link href="/matematica">
            <div className="bg-yellow-100 hover:bg-yellow-200 p-8 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg">
              <div className="text-6xl mb-4">🐝</div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-2">Matematică</h2>
              <p className="text-yellow-700">cu Juja</p>
            </div>
          </Link>

          {/* Информатика - Кролик */}
          <Link href="/informatica">
            <div className="bg-blue-100 hover:bg-blue-200 p-8 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg">
              <div className="text-6xl mb-4">🐰</div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Informatică</h2>
              <p className="text-blue-700">cu Iepurașul</p>
            </div>
          </Link>

          {/* Румынский - Лиса */}
          <Link href="/limba-romana">
            <div className="bg-orange-100 hover:bg-orange-200 p-8 rounded-3xl cursor-pointer transition-all hover:scale-105 shadow-lg">
              <div className="text-6xl mb-4">🦊</div>
              <h2 className="text-2xl font-bold text-orange-800 mb-2">Limba Română</h2>
              <p className="text-orange-700">cu Vulpița</p>
            </div>
          </Link>
        </div>

        {/* Menu Buttons */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link
            href="/cum-sa-joci"
            className="px-8 py-3 bg-white hover:bg-green-50 text-green-800 font-semibold rounded-full shadow-md hover:shadow-lg transition-all border-2 border-green-200"
          >
            📖 Cum să joci
          </Link>
          <Link
            href="/contacte"
            className="px-8 py-3 bg-white hover:bg-green-50 text-green-800 font-semibold rounded-full shadow-md hover:shadow-lg transition-all border-2 border-green-200"
          >
            ✉️ Contacte
          </Link>
          <Link
            href="/creatori"
            className="px-8 py-3 bg-white hover:bg-green-50 text-green-800 font-semibold rounded-full shadow-md hover:shadow-lg transition-all border-2 border-green-200"
          >
            👥 Creatori
          </Link>
        </div>
      </div>
    </div>
  );
}