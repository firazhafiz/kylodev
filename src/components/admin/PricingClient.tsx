"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, GripVertical } from "lucide-react";

interface AddOn {
  name: string;
  price: string;
  description: string;
}

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  tagline?: string;
  category?: string;
  badge?: string;
  features: string[];
  add_ons?: AddOn[];
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PricingPlan | null>(null);

  useEffect(() => {
    if (isModalOpen || deleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, deleteModalOpen]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    tagline: "",
    category: "Web Solution",
    badge: "",
    features: "",
    popular: false,
    icon_name: "Star",
    sort_order: 0,
    add_ons: [] as AddOn[],
  });

  const openModal = (item?: PricingPlan) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        price: item.price,
        description: item.description || "",
        tagline: item.tagline || "",
        category: item.category || "Web Solution",
        badge: item.badge || "",
        features: item.features.join("\n"),
        popular: item.popular || false,
        icon_name: item.icon_name || "Star",
        sort_order: item.sort_order || 0,
        add_ons: item.add_ons || [],
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        tagline: "",
        category: "Web Solution",
        badge: "",
        features: "",
        popular: false,
        icon_name: "Star",
        sort_order: data.length + 1,
        add_ons: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleAddOnAdd = () => {
    setFormData({
      ...formData,
      add_ons: [...formData.add_ons, { name: "", price: "", description: "" }],
    });
  };

  const handleAddOnRemove = (index: number) => {
    const newAddOns = [...formData.add_ons];
    newAddOns.splice(index, 1);
    setFormData({ ...formData, add_ons: newAddOns });
  };

  const handleAddOnChange = (index: number, field: keyof AddOn, value: string) => {
    const newAddOns = [...formData.add_ons];
    newAddOns[index][field] = value;
    setFormData({ ...formData, add_ons: newAddOns });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      badge: "", // Clear badge since it's no longer used
      tagline: formData.description, // Synchronize tagline with description so public site renders description correctly
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

  const confirmDelete = (item: PricingPlan) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    const id = itemToDelete.id;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/pricing/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) throw new Error("Failed");
      setData(data.filter((d) => d.id !== id));
      toast.success("Deleted");
      router.refresh();
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      toast.error("Error deleting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pricing Plans</h2>
        <Button
          onClick={() => openModal()}
          className="bg-(--color-navy) text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...data].sort((a, b) => a.sort_order - b.sort_order).map((item) => (
          <Card
            key={item.id}
            className={`p-6 bg-white relative ${
              item.popular || item.badge ? "border-2 border-navy" : ""
            }`}
          >
            {(item.popular || item.badge) && (
              <div className="absolute top-0 right-0 bg-navy text-xs font-bold px-3 py-1.5 rounded-bl-lg text-white">
                {item.badge || "Popular"}
              </div>
            )}
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.category || "Uncategorized"}</span>
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-(--color-navy) font-bold text-lg">
                  {item.price}
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg text-xs font-mono">
                {item.icon_name}
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-4 h-10 line-clamp-2 italic">
              "{item.description}"
            </p>

            <ul className="text-xs text-gray-600 space-y-1 mb-6 list-disc list-inside h-24 overflow-hidden">
              {item.features.slice(0, 4).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
              {item.features.length > 4 && <li>+ {item.features.length - 4} more</li>}
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
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white border-0"
                onClick={() => confirmDelete(item)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b shrink-0">
              <h3 className="text-xl font-bold">
                {editingItem ? "Edit Plan" : "New Plan"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Category</Label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] focus:ring-offset-2"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Web Solution">Web Solution</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Popular Status</Label>
                  <div className="flex items-center justify-between border rounded-md px-3 h-10 bg-gray-50/50">
                    <span className="text-sm font-medium text-gray-700">Set as Popular</span>
                    <button
                      type="button"
                      id="popular"
                      role="switch"
                      aria-checked={formData.popular}
                      onClick={() => setFormData({ ...formData, popular: !formData.popular })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] focus:ring-offset-2 ${
                        formData.popular ? "bg-navy" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.popular ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Icon Name (Lucide React)</Label>
                <Input
                  value={formData.icon_name}
                  onChange={(e) =>
                    setFormData({ ...formData, icon_name: e.target.value })
                  }
                  placeholder="e.g. Star, Check, etc"
                  required
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
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Features (One per line)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  rows={6}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  required
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-bold">Add-Ons</Label>
                  <Button type="button" onClick={handleAddOnAdd} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" /> Add Item
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.add_ons.map((addon, index) => (
                    <div key={index} className="flex gap-2 items-start bg-gray-50 p-4 rounded-lg border">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Add-on Name (e.g. Maintenance Pro)"
                            value={addon.name}
                            onChange={(e) => handleAddOnChange(index, "name", e.target.value)}
                          />
                          <Input
                            placeholder="Price (e.g. Rp 500.000/bln)"
                            value={addon.price}
                            onChange={(e) => handleAddOnChange(index, "price", e.target.value)}
                          />
                        </div>
                        <Input
                          placeholder="Description / Benefits"
                          value={addon.description}
                          onChange={(e) => handleAddOnChange(index, "description", e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                        onClick={() => handleAddOnRemove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.add_ons.length === 0 && (
                    <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg border border-dashed">
                      Tidak ada add-ons. Klik "Add Item" untuk menambahkan.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex justify-end gap-2 bg-gray-50 rounded-b-xl shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-(--color-navy) text-white"
              >
                {isLoading ? "Saving..." : "Save Plan"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Delete Plan?</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Are you sure you want to delete "{itemToDelete?.name}"? This
              cannot be undone.
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={executeDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
