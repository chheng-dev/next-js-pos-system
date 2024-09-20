"use client"
import '../styles/main.scss';
import { AuthProvider } from "./Provider";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
