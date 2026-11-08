import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtemikDLC — клиент для Minecraft Java",
  description: "ArtemikDLC для Minecraft Java Edition 1.21.4 и 26.3. Ключ на FunPay, лаунчер и интерактивное демо ClickGUI.",
  icons: { icon: "/media/artemik-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
