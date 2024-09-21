"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImageToIPFS } from "@/lib/api/IPFS";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export default function CompanyRegister() {
  const router = useRouter();
  const { primaryWallet } = useDynamicContext();
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState<Blob | null>(null); // Blob instead of base64
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // For preview
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCompanyLogo(file); // Set file as Blob
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string); // Set base64 for preview only
      };
      reader.readAsDataURL(file); // Preview in base64
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted:", { companyName, companyLogo, tags });
    const key = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
    console.log("Key:", key);

    // Upload Blob to IPFS
    let imageIPFSHash = null;
    if (companyLogo) {
      imageIPFSHash = await uploadImageToIPFS(companyLogo);
    }
    console.log(primaryWallet?.address);
    let result;
    try {
      result = await axios.post("/api/company", { companyName, imageIPFSHash, tags, walletId: primaryWallet?.address });
    } catch (error) {
      console.error("Error creating company", error);
    }

    // Reset form after submission
    setCompanyName("");
    setCompanyLogo(null);
    setLogoPreview(null);
    setTags([]);
    if (result != null) {
      router.push("/dashboard");
    } else {
      console.log("Error creating company");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Company Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Company Logo</Label>
              <div className="flex items-center space-x-2">
                <Input id="companyLogo" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                <Label
                  htmlFor="companyLogo"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
                >
                  {logoPreview ? (
                    <div className="relative w-full h-full">
                      <img src={logoPreview} alt="Company Logo Preview" className="object-contain w-full h-full" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1"
                        onClick={() => {
                          setCompanyLogo(null);
                          setLogoPreview(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload Logo</span>
                    </div>
                  )}
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Custom Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-primary text-primary-foreground rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 focus:outline-none"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Register Company
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
