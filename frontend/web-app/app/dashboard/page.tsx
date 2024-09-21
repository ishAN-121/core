"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MessageSquare, Search } from "lucide-react";
import Link from "next/link";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { testContract1, testContract2 } from "@/lib/api/contractApi";
import { useIDKit } from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import AutocompleteField from "../components/AutocompleteField";
import AddService from "./components/AddService";
import WorldIdPopup from "./components/WorldId";

export default function Dashboard() {
  const [verify, setVerify] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    async function callContract() {
      const result1 = await testContract1();
      const result2 = await testContract2();

      console.log("result1", result1);
      console.log("result2", result2);
    }

    callContract();
  }, []);

  const { open, setOpen } = useIDKit();

  useEffect(() => {
    if (verify) {
      setDialogOpen(true);
    }
  }, [verify]);

  return (
    <>
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mt-2">Dashboard</h1>
            <p className="text-gray-500">An easy way to manage services securely.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AutocompleteField />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>

            <Button onClick={() => setOpen(true)}>
              Add new customer service <span className="ml-2">+</span>
            </Button>
            {open ? <WorldIdPopup setVerify={setVerify} /> : null}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <AddService setDialogOpen={setDialogOpen} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <tbody>
                  {[{ name: "{product name} customer service", status: "Completed", date: "Jul 12th 2024" }].map(
                    (item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded mr-2"></div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <Link href={"dashboard/123"}>
                            <Button variant="outline" size="sm" className="bg-[#0A3622] text-white">
                              view
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card className="col-span-3 row-span-2 bg-[#0A3622] text-[#e3e3d0]">
            <CardHeader>
              <CardTitle>Kuch statistical</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4 text-center">
                <p className="text-5xl font-bold">565K</p>
                <p className="text-sm text-gray-500">Total Count</p>
              </div>
              {/* <p className="mt-4 text-sm ">Here are some tips on how to improve your score.</p> */}
              <Button className="w-full mt-4 bg-[#e3e3d0] text-[#0A3622]" variant="outline">
                View Statisctics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
