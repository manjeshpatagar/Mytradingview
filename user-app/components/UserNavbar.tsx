// components/Navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Intraday Picks", path: "/intraday" },
    { name: "Results", path: "/result" },
    { name: "News", path: "/news" },
    { name: "Future Stocks", path: "/future-stocks" },
    { name: "Trade Plan", path: "/trade-plan" },
    { name: "Stock News", path: "/stock-news" },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">MyTradingView</div>
        <ul className="flex gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                } hover:text-blue-500`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
