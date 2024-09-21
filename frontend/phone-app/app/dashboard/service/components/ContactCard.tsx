// components/ContactCard.js

type ContactCardProps = {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };

export default function ContactCard({ name, email, phone, avatar }:ContactCardProps) {
    return (
      <div className="flex items-center p-4 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md max-w-md">
        {/* Avatar Section */}
        <div className="mr-4">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={avatar || "https://via.placeholder.com/150"}
            alt={`${name}'s avatar`}
          />
        </div>
  
        {/* Contact Info Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold">{name}</h2>
          {email && <p className="text-sm text-gray-400">{email}</p>}
          {phone && <p className="text-sm text-gray-400">{phone}</p>}
        </div>
      </div>
    );
  }
  