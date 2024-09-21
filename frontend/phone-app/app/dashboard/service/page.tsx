"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronDown } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import ValidationCard from "./components/ValidationCard";

const fetchSearchResults = async (query: string, type: string) => {
  // Simulating a delay with setTimeout wrapped in a Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        results: [{ 
          company_name: "Amazon" ,
          is_scam_percentage: 78,
        }],
      });
    }, 1000); // 1 second delay
  });
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("phone number");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["search", searchTerm, searchType],
    queryFn: () => fetchSearchResults(searchTerm, searchType),
    enabled: !!searchTerm,
  });

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Service</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        {/* Dropdown for 'phone number' or 'link' */}
        <Select
          onValueChange={(value) => setSearchType(value)}
          value={searchType}
        >
          <SelectTrigger className="w-40">
            <SelectValue>{searchType}</SelectValue>
            <ChevronDown className="ml-2 h-4 w-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phone number">Phone Number</SelectItem>
            <SelectItem value="link">Link</SelectItem>
          </SelectContent>
        </Select>

        {/* Text input for the search term */}
        <Input
          type="text"
          placeholder={`Enter ${searchType}...`}
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />

        {/* Submit button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            "Search"
          )}
        </Button>
      </form>

      {/* Error message */}
      {isError && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <p className="text-red-500">
              Error fetching data. Please try again.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search results */}
      {data && (
        // <Card>
        //   <CardHeader>
        //     <CardTitle>Results</CardTitle>
        //   </CardHeader>
        //   <CardContent>
        //     {data.results && data.results.length > 0 ? (
        //       <ul className="list-disc pl-5">
        //         {data.results.map((item: { name: string }, index: number) => (
        //           <li key={index} className="mb-2">
        //             {item.name}
        //           </li>
        //         ))}
        //       </ul>
        //     ) : (
        //       <p>No results found.</p>
        //     )}
        //   </CardContent>
        // </Card>
        <ValidationCard data={data.results[0]} />
      )}
    </div>
  );
}
