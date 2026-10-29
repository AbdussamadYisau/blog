import './style.css';
import DirectionShell from '../components/DirectionShell';
export const metadata = {
  title: 'Sammie — Notes & Fieldwork',
  description:
    'Notes on building for the web, going the distance, and everything in between. By Abdussamad Yisau.',
};
export default function Layout({ children }) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <body className="m-0 bg-paper font-sans text-[14px] text-ink">
        <DirectionShell>{children}</DirectionShell>
      </body>
    </html>
  );
}
