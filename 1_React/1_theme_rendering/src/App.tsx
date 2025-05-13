import { Layout } from "@/components/layout";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const isDark = theme === "dark";

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center mt-[30vh]">

        {/* Câu hỏi: trượt lên trên và mờ khi dark */}
        <p
          className={
            `text-center text-xl font-bold tracking-tight mb-8 sm:text-lg md:text-xl ` +
            (isDark
              ? "transform -translate-y-full opacity-0"
              : "transform translate-y-0 opacity-100") +
            " transition-all duration-500"
          }
        >
          When does React update the view?
          <br />
          <span className="italic text-center block">
            (khi nào React cập nhật giao diện)
          </span>
        </p>

        <div className="w-full flex justify-center mb-8">
          <ThemeToggle />
        </div>

        {/* Đáp án: trượt lên từ dưới và hiện khi dark */}
        <p
          className={
            `mt-10 text-center text-xl font-bold tracking-tight mb-8 sm:text-lg md:text-xl ` +
            (isDark
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-full opacity-0") +
            " transition-all duration-500"
          }
        >
          React will only re-render when the state of a component changes
          <br />
          <span className="italic text-center block">
            (Khi "State" của component thay đổi)
          </span>
        </p>
      </div>
    </Layout>
  );
}

export default App;
