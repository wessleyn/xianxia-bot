import ThemeProvider from "@repo/ui/components/ThemeProvider";
import ToastContainer from "@repo/ui/components/ToastContainer";
import "./_styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <ThemeProvider>
          <ToastContainer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
