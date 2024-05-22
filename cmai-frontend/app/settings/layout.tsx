import SettingsPage from "../../components/SettingsPage";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SettingsPage />
      {children}
    </div>
  );
}