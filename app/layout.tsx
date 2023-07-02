import "./globals.css";

export const metadata = {
  title: "RIFAS",
  description: "ECHO BY PAREDES",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-red-500 ">{children}</body>
      {/* <Footer /> */}
    </html>
  );
}
