import '../styles/globals.css';

export const metadata = {
  title: 'UK Seasonal Work 2026',
  description: 'Ariza qoldirish formasi',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
