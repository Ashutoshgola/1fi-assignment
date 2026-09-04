import './globals.css';

export const metadata = {
  title: '1Fi SDE1 Assignment',
  description: 'Mutual fund backed EMI product page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
