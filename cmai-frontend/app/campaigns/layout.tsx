import CampaignsPage from "../../components/CampaignsPage";

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      <CampaignsPage />
      {children}
    </div>
  );
}