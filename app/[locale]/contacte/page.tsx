'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ContactePage() {
  const t = useTranslations('Contacts');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 flex items-center justify-center p-8">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-12">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
        >
          {t('back')}
        </Link>

        <h1 className="text-5xl font-bold text-blue-800 mb-8 text-center">
          ✉️ {t('title')}
        </h1>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p className="text-center text-xl">
            {t('intro')}
          </p>

          <div className="bg-blue-50 p-8 rounded-xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">{t('email')}</h3>
                <p className="text-gray-700">contact@prietenii-scolari.ro</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">📱</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">{t('phone')}</h3>
                <p className="text-gray-700">+40 123 456 789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">🏢</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">{t('address')}</h3>
                <p className="text-gray-700">
                  {t('addressLine1')}<br />
                  {t('addressLine2')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">⏰</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">{t('schedule')}</h3>
                <p className="text-gray-700">
                  {t('weekdays')}<br />
                  {t('weekend')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 p-6 rounded-xl text-center">
            <p className="font-semibold text-cyan-800">
              {t('responseTime')} 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
