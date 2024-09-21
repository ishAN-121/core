"use client";
import { useState } from "react";

export default function Call() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([
    "John Doe",
  ]);

  return (
    <div className="flex flex-col justify-between p-4 bg-primaryGreen text-white border-2 border-white rounded-lg">
      {/* Results Section */}
      <div className="text-black">
        Results
      </div>

      {/* Input Section */}
      <div className="rounded-lg p-2 text-center">
      <input
          className="w-full p-2 text-lg rounded-lg border-none outline-none bg-secondaryGreen text-white"
          type="text"
          placeholder="Select Service"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="w-full p-2 text-lg rounded-lg border-none outline-none bg-secondaryGreen text-white"
          type="text"
          placeholder="Type Service Link"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
