import Link from 'next/link';

export default function InformaticaPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-8">
      <div className="text-center">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi
        </Link>
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          🐰 Informatică cu Iepurașul
        </h1>
        <p className="text-xl text-blue-700">
          Bine ai venit la lecțiile de informatică!
        </p>
      </div>
    </div>
  );
}