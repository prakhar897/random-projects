"use client";

import { useState } from "react";
import { Lead } from "../../../types/types";

const NewCampaign = () => {
 const [campaignName, setCampaignName] = useState("");
 const [leads, setLeads] = useState<Lead[]>([]);
 const [newLead, setNewLead] = useState<Lead>({ name: "", email: "", url: "" });

 const handleAddLead = () => {
   setLeads([...leads, newLead]);
   setNewLead({ name: "", email: "", url: "" });
 };

 const handleDeleteLead = (index: number) => {
   const updatedLeads = [...leads];
   updatedLeads.splice(index, 1);
   setLeads(updatedLeads);
 };

 const handleCreateCampaign = () => {
   // Create a new campaign with the provided name and leads
   console.log("New Campaign:", campaignName);
   console.log("Leads:", leads);
   // Add code to save the campaign to the database or API
 };

 return (
   <div>
     <h1 className="text-2xl font-bold mb-4">New Campaign</h1>
     <div className="mb-4">
       <label htmlFor="campaignName" className="block font-bold mb-2">
         Campaign Name
       </label>
       <input
         type="text"
         id="campaignName"
         value={campaignName}
         onChange={(e) => setCampaignName(e.target.value)}
         className="border border-gray-300 px-3 py-2 rounded-md"
       />
     </div>
     <div className="mb-4">
       <h2 className="text-xl font-bold mb-2">Add Leads</h2>
       <input
         type="text"
         placeholder="Name"
         value={newLead.name}
         onChange={(e) =>
           setNewLead({ ...newLead, name: e.target.value })
         }
         className="border border-gray-300 px-3 py-2 rounded-md mr-2"
       />
       <input
         type="email"
         placeholder="Email"
         value={newLead.email}
         onChange={(e) =>
           setNewLead({ ...newLead, email: e.target.value })
         }
         className="border border-gray-300 px-3 py-2 rounded-md mr-2"
       />
       <input
         type="text"
         placeholder="URL"
         value={newLead.url}
         onChange={(e) =>
           setNewLead({ ...newLead, url: e.target.value })
         }
         className="border border-gray-300 px-3 py-2 rounded-md mr-2"
       />
       <button
         onClick={handleAddLead}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       >
         Add Lead
       </button>
     </div>
     <table className="table-auto">
       <thead>
         <tr>
           <th className="px-4 py-2">Name</th>
           <th className="px-4 py-2">Email</th>
           <th className="px-4 py-2">URL</th>
           <th className="px-4 py-2">Actions</th>
         </tr>
       </thead>
       <tbody>
         {leads.map((lead, index) => (
           <tr key={index}>
             <td className="border px-4 py-2">{lead.name}</td>
             <td className="border px-4 py-2">{lead.email}</td>
             <td className="border px-4 py-2">{lead.url}</td>
             <td className="border px-4 py-2">
               <button
                 onClick={() => handleDeleteLead(index)}
                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
               >
                 Delete
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     <button
       onClick={handleCreateCampaign}
       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
     >
       Create Campaign
     </button>
   </div>
 );
};

export default NewCampaign;