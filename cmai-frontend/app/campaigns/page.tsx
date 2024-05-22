"use client";

import { useState } from "react";
import { Lead } from "../../types/types";

cons const [campaigns, setCampaigns] = useState([
   {
     id: 1,
     name: "Summer Sale",
     leads: [
       { name: "John Doe", email: "john@example.com", url: "ht       { name: "Jane Smith", email: "jane@example.com", url: "https://example.com" },
     ],
   },
   {
     id: 2,
     name: "Black Friday",
     leads: [
       { name: "Bob Johnson", email: "bob@example.com",       { name: "Alice Williams", email: "alice@example.com", url: "https://example.com" },
     ],
   },
 ]);

 const handleDeleteCampaign = (id: number) => {
   const updatedCampaigns = campaigns.fi   setCampaigns(updatedCampaigns);
 };

 return (
   <div>
     <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
     <table className="table-auto">
       <thead>
         <tr>
           <th className="px-4 py-2">Name</th>
           <th className="px-4 py-2">Leads</th>
           <th className="px-4 py-2">Actions</th>
         </tr>
       </thead>
       <tbody>
         {campaigns.map((campaign) => (
           <tr key={campaign.id}>
             <td className="border px-4 py-2">{campaign.name}</td>
             <td className="border px-4 py-2">
               {campaign.leads.map((lead, index) => (
                 <div key={index}>
                   <span>{lead.name}</span>
                   <span> ({lead.email})</span>
                 </div>
               ))}
             </td>
             <td className="border px-4 py-2">
               <button
                 onClick={() => handleDeleteCampaign(campaign.id)}
                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
               >
                 Delete
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
};

export default Campaigns;