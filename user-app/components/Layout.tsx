import "../globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Trading View",
  description: "Track your trading insights",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* ⬅ Header shows on every page */}
        <main>{children}</main>
      </body>
    </html>
  );
}
