import "./styles/globals.css";
import Layout from "../components/Layout";

export const metadata = {
  title: "Campaign Manager",
  description: "Manage your campaigns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}