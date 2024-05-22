"use client";

import { useState } from "react";
import { Lead } from "../types/types";

const CampaignsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/leads`);
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leads),
      });

      if (response.ok) {
        console.log("Campaign created successfully!");
      } else {
        console.error("Error creating campaign:", response.status);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Select Leads</h2>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchLeads}
        >
          Add New Leads (CSV)
        </button>
        {/* Add functionality to select from existing leads */}
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">URL</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2">{lead.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default CampaignsPage;