import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-24 p-6">
      <Link href="/futureme">
        <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          FutureMe
        </h1>
      </Link>
    </header>
  );
};
