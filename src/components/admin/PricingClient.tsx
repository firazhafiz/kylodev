"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, GripVertical } from "lucide-react";

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  icon_name: string;
  sort_order: number;
}

export default function PricingClient({
  initialData,
  secret,
}: {
  initialData: PricingPlan[];
  secret: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<PricingPlan[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    popular: false,
    icon_name: "Star",
    sort_order: 0,
  });

  const openModal = (item?: PricingPlan) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        price: item.price,
        description: item.description,
        features: item.features.join("\n"),
        popular: item.popular,
        icon_name: item.icon_name || "Star",
        sort_order: item.sort_order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        features: "",
        popular: false,
        icon_name: "Star",
        sort_order: data.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      features: formData.features.split("\n").filter((f) => f.trim() !== ""),
    };

    try {
      const url = editingItem
        ? `/api/pricing/${editingItem.id}`
        : "/api/pricing";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      const savedItem = await res.json();

      if (editingItem) {
        setData(data.map((d) => (d.id === savedItem.id ? savedItem : d)));
        toast.success("Updated successfully");
      } else {
        setData([...data, savedItem]);
        toast.success("Created successfully");
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this plan?")) return;
    try {
      const res = await fetch(`/api/pricing/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) throw new Error("Failed");
      setData(data.filter((d) => d.id !== id));
      toast.success("Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pricing Plans</h2>
        <Button onClick={() => openModal()} className="bg-(--color-navy)">
          <Plus className="mr-2 h-4 w-4" /> Add Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card
            key={item.id}
            className={`p-6 bg-white relative ${
              item.popular ? "border-2 border-yellow-400" : ""
            }`}
          >
            {item.popular && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-lg">
                POPULAR
              </div>
            )}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-(--color-navy) font-bold text-lg">
                  {item.price}
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg text-xs font-mono">
                {item.icon_name}
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-4 h-10 line-clamp-2">
              {item.description}
            </p>

            <ul className="text-xs text-gray-600 space-y-1 mb-6 list-disc list-inside h-24 overflow-hidden">
              {item.features.slice(0, 4).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openModal(item)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-bold">
                {editingItem ? "Edit Plan" : "New Plan"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plan Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon Name (Lucide/React Icon)</Label>
                  <Input
                    value={formData.icon_name}
                    onChange={(e) =>
                      setFormData({ ...formData, icon_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="popular"
                  className="w-4 h-4"
                  checked={formData.popular}
                  onChange={(e) =>
                    setFormData({ ...formData, popular: e.target.checked })
                  }
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-(--color-navy)"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
