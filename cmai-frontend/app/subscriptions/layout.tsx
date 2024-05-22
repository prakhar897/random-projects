import SubscriptionPage from "../../components/SubscriptionPage";

export default function SubscriptionLayout({
    children,
   }: {
    children: React.ReactNode;
   }) {
    return (
      <div>
        <SubscriptionPage />
        {children}
      </div>
    );
   }
   