import LeadDatabasePage from "../../components/LeadDatabasePage";

export default function LeadDatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <LeadDatabasePage />
      {children}
    </div>
  );
}