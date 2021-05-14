import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full dark:bg-gray-800 dark:text-white">
      <div className="max-w-screen-md w-full px-4 py-8 mx-auto antialiased flex-grow font-body">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
