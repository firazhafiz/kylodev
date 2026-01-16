"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
}

export default function SettingsClient({
  initialContact,
  secret,
}: {
  initialContact: ContactInfo | null;
  secret: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactInfo>(
    initialContact || {
      phone: "+62 823-3267-6848",
      email: "kylodev@gmail.com",
      address: "Surabaya, Indonesia",
      mapUrl: "https://www.google.com/maps/embed?pb=...",
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          key: "contact",
          value: formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Settings saved");
      router.refresh();
    } catch (error) {
      toast.error("Error saving settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Site Settings</h2>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-bold mb-4">Contact Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Input
              value={formData.mapUrl}
              onChange={(e) =>
                setFormData({ ...formData, mapUrl: e.target.value })
              }
              className="font-mono text-xs"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-(--color-navy)"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
