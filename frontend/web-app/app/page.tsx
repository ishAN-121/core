"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "./components/Navbar";
// import { useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    if (isLoggedIn) {
      const isRegistered = false;

      if (!isRegistered) {
        router.push("/register-company");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isLoggedIn, router]);
  return (
    <div className="bg-[#e3e3d0] min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 pt-20 text-center text-[#0A3622]">
        <h1 className="text-5xl font-bold mb-6">Unlock a safer digital experience with Nori</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Securely Connect with Nori - Protect Your Customers from Phishing with Web3-Powered Service Links!
        </p>
        <div className="relative inline-block">
          <img src="illustration.webp" alt="Financial planning illustration" className="rounded-lg" />
        </div>
      </section>
      <section id="features" className="w-full text-white px-4 py-20 bg-[#0A3622] ">
        <h2 className="text-3xl font-bold mb-12 text-center">Things you will get as our features</h2>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-6">Expand your spendings in a proper way</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <Button className="bg-green-500 hover:bg-green-600">Learn More</Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Card className="w-64 bg-gray-900 text-white">
              <CardHeader>
                <CardTitle>Monthly spendings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-6xl font-bold mb-4">62%</div>
                <p>Total</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Nori.</h3>
              <p>Building financial plans for a better future.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
