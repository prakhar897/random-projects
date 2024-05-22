"use client";

import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("Campaigns");

  return (
    <aside className="bg-gray-800 text-white p-4 min-h-screen">
      <nav>
        <ul>
          <li
            className={`mb-2 ${active === "Campaigns" ? "font-bold" : ""}`}
            onClick={() => setActive("Campaigns")}
          >
            <Link href="/campaigns">Campaigns</Link>
          </li>
          <li
            className={`mb-2 ${active === "Settings" ? "font-bold" : ""}`}
            onClick={() => setActive("Settings")}
          >
            <Link href="/settings">Settings</Link>
          </li>
          <li
            className={`mb-2 ${active === "LoadDatabase" ? "font-bold" : ""}`}
            onClick={() => setActive("LoadDatabase")}
          >
            <Link href="/lead-database">Load Database</Link>
          </li>
          <li
            className={`mb-2 ${active === "Subscription" ? "font-bold" : ""}`}
            onClick={() => setActive("Subscription")}
          >
            <Link href="/subscription">Subscription</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
