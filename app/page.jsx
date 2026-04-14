'use client';

import { useState, useEffect } from 'react';

const countryOptions = [
  { code: '+998', label: 'O‘zbekiston', placeholder: '90 123 45 67', length: 9, regions: ['Andijon', 'Buxoro', 'Farg‘ona', 'Jizzax', 'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo', 'Qoraqalpog‘iston Respublikasi', 'Samarqand', 'Sirdaryo', 'Surxondaryo', 'Toshkent'] },
  { code: '+992', label: 'Tojikiston', placeholder: '92 123 45 67', length: 9, regions: ['Dushanbe', 'Khujand', 'Kulob', 'Kurgan-Tyube', 'Isfara', 'Bokhtar', 'Danghara', 'Fayzobod', 'Gissar', 'Istaravshan', 'Konibodom', 'Norak', 'Panjakent', 'Rog‘un', 'Taboshar', 'Tursunzoda', 'Vahdat', 'Vose'] },
  { code: '+996', label: 'Qirg‘iziston', placeholder: '555 123 456', length: 9, regions: ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol', 'Naryn', 'Batken', 'Talas', 'Issyk-Kul', 'Chuy', 'Toktogul', 'Kant', 'Kara-Balta', 'Tokmok', 'Uzgen', 'Balykchy'] }
];

export default function Home() {
  const [country, setCountry] = useState(countryOptions[0]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitButtonClass = isFormValid && !isSubmitting
    ? 'w-full rounded-3xl px-4 py-2.5 text-sm font-semibold transition bg-gradient-to-r from-gold via-[#d8b65a] to-[#f5da8b] text-slate-950 hover:brightness-110'
    : 'w-full rounded-3xl px-4 py-2.5 text-sm font-semibold transition bg-gray-600 text-gray-400 cursor-not-allowed';

  useEffect(() => {
    const isNameValid = name.trim().length > 0;
    const isPhoneValid = phone.length === country.length && /^\d+$/.test(phone.replace(/\s/g, ''));
    const isEmailValid = /^[^\s@]+@gmail\.(com|ru)$/.test(email);
    const isRegionValid = region !== '';
    const isPrivacyValid = privacy;

    setIsFormValid(isNameValid && isPhoneValid && isEmailValid && isRegionValid && isPrivacyValid);

    if (phone && phone.replace(/\s/g, '').length !== country.length) {
      setPhoneError(`Telefon raqami ${country.length} raqamdan iborat bo'lishi kerak`);
    } else {
      setPhoneError('');
    }

    if (email && !isEmailValid) {
      setEmailError('Email manzili faqat @gmail.com yoki @gmail.ru formatida bo\'lishi kerak');
    } else {
      setEmailError('');
    }
  }, [name, phone, email, region, privacy, country]);

  const handleCountryChange = (event) => {
    const selected = countryOptions.find(c => c.code === event.target.value);
    setCountry(selected);
    setPhone('');
    setRegion('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setStatusMessage('Yuborilmoqda...');
    setSubmitStatus('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: `${country.code} ${phone}`,
          email,
          region
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Yuborishda xato');

      setStatusMessage('Ma’lumotlar muvaffaqiyatli yuborildi.');
      setSubmitStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setRegion('');
      setPrivacy(false);
    } catch (error) {
      setStatusMessage(error.message || 'Server bilan muammo bo‘ldi.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="h-screen min-h-screen bg-midnight flex items-center justify-center px-2 py-2 sm:px-4 sm:py-4 overflow-hidden">
      <div className="w-full max-w-[420px] max-h-[calc(100vh-12px)] overflow-hidden rounded-[26px] border border-white/10 bg-[#091024]/95 p-4 sm:p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl mx-auto">
        <div className="mb-5 text-center">
          <span className="inline-flex rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-gold shadow-sm shadow-gold/10">
            GB Seasonal Work 2026
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">Ariza qoldiring</h1>
          <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm">
            Barcha ma’lumotlar maxfiy saqlanadi · Aloqa 24 soat ichida
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.27em] text-slate-400">
              Ism va familiya *</label>
            <input
              type="text"
              placeholder="Masalan: Alisher Karimov"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.27em] text-slate-400">
              Telefon raqami *</label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                value={country.code}
                onChange={handleCountryChange}
                className="h-10 w-full rounded-2xl border border-border bg-[#0f1c38] px-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20 sm:w-[150px]"
              >
                {countryOptions.map((item) => (
                  <option key={item.code} value={item.code} className="bg-[#0f1c38] text-white">
                    {item.label} ({item.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, country.length))}
                placeholder={country.placeholder}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.27em] text-slate-400">
              Email manzili</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
            {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.27em] text-slate-400">
              Viloyat *</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option value="">— Tanlang —</option>
              {country.regions.map((reg) => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl border border-gold/20 bg-white/5 p-3 text-sm text-slate-300 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 rounded-sm border border-slate-500 bg-transparent"
              />
              <div className="space-y-1 text-[13px] leading-5">
                <p>Ma’lumotlarimni qayta ishlashga roziman. Arizam koʻrib chiqilishi uchun bogʻlanishi mumkin.</p>
                <p className="text-gold font-semibold">Maxfiylik siyosati</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={submitButtonClass}
          >
            {isSubmitting ? 'Yuborilmoqda…' : 'Ariza yuborish →'}
          </button>

          {submitStatus === 'success' && (
            <div className="mt-4 rounded-[30px] border border-gold/30 bg-white/10 p-5 text-white shadow-[0_30px_80px_rgba(249,198,75,0.16)] backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-[#f7e18a] text-slate-950 shadow-lg shadow-gold/20 animate-pulse">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold">Sizning arizangiz muvaffaqiyatli yuborildi</p>
                  <p className="mt-1 text-xs text-slate-300">Tez orada siz bilan bog‘lanamiz.</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && statusMessage && (
            <p className="text-center text-xs text-red-300 mt-2">{statusMessage}</p>
          )}
        </form>

        <div className="mt-4 flex flex-col gap-1 text-[10px] text-slate-400 sm:flex-row sm:justify-center sm:gap-4">
          <span className="text-center sm:text-left">Yashirin to‘lovlar yo‘q</span>
          <span className="text-center sm:text-left">24 soat ichida javob</span>
          <span className="text-center sm:text-left">Ma’lumotlar maxfiy</span>
        </div>
      </div>
    </main>
  );
}
