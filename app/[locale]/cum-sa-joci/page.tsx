'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CumSaJociPage() {
  const t = useTranslations('HowToPlay');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center p-8">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-12">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-colors"
        >
          {t('back')}
        </Link>

        <h1 className="text-5xl font-bold text-purple-800 mb-8 text-center">
          📖 {t('title')}
        </h1>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            {t.rich('welcome', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>

          <div className="bg-purple-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">🎯 {t('howItWorksTitle')}</h2>
            <ol className="list-decimal list-inside space-y-3">
              <li>{t('step1')}</li>
              <li>{t('step2')}</li>
              <li>{t('step3')}</li>
              <li>{t('step4')}</li>
            </ol>
          </div>

          <div className="bg-pink-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">✨ {t('tipsTitle')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('tip1')}</li>
              <li>{t('tip2')}</li>
              <li>{t('tip3')}</li>
              <li>{t('tip4')}</li>
            </ul>
          </div>

          <p className="text-center text-xl font-semibold text-purple-800 mt-8">
            {t('goodLuck')} 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
