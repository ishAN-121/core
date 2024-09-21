"use client";
import { useState } from "react";

export default function Call() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([
    "John Doe",
  ]);

  const filteredContacts = contacts.filter((contact) =>
    contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Numpad values for the phone input
  const numpad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <div className="flex flex-col justify-between h-screen p-4 bg-primaryGreen text-white border-2 border-white rounded-lg">
      {/* Results Section */}
      <div className="flex-1 mb-2 flex flex-col items-center justify-center rounded-lg p-5">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <div key={index} className="py-2 text-lg text-white">
              {contact}
            </div>
          ))
        ) : (
          <div className="text-lg text-gray-400">No Results</div>
        )}
      </div>

      {/* Input Section */}
      <div className="border-2 border-white rounded-lg p-2 text-center">
        <input
          className="w-full p-2 text-lg rounded-lg border-none outline-none bg-secondaryGreen text-white"
          type="text"
          placeholder="Type Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Phone Numpad */}
      {/* <div className="grid grid-cols-3 gap-4 pt-4">
        {numpad.map((num, index) => (
          <button
            key={index}
            className="h-16 w-16 bg-secondaryGreen border-2 border-white rounded-lg text-xl text-white"
          >
            {num}
          </button>
        ))}
      </div> */}
    </div>
  );
}
