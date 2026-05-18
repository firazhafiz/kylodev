"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  photo: string;
  review: string;
}

export default function TestimonialsClient({
  initialData,
  secret,
}: {
  initialData: Testimonial[];
  secret: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<Testimonial[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    review: "",
  });

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        photo: item.photo,
        review: item.review,
      });
    } else {
      setEditingItem(null);
      setFormData({ name: "", photo: "", review: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingItem
        ? `/api/testimonials/${editingItem.id}`
        : "/api/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      const savedItem = await res.json();

      if (editingItem) {
        setData(data.map((d) => (d.id === savedItem.id ? savedItem : d)));
        toast.success("Updated successfully");
      } else {
        setData([savedItem, ...data]); // Add to top
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

  const confirmDelete = (item: Testimonial) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    const id = itemToDelete.id;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });

      if (!res.ok) throw new Error("Failed to delete");

      setData(data.filter((d) => d.id !== id));
      toast.success("Deleted successfully");
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
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Button
          onClick={() => openModal()}
          className="bg-(--color-navy) text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card
            key={item.id}
            className="p-6 bg-white flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>
                <h3 className="font-bold">{item.name}</h3>
              </div>
              <p className="text-gray-600 text-sm italic">"{item.review}"</p>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">
                {editingItem ? "Edit Testimonial" : "New Testimonial"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Photo URL</Label>
                <Input
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                  placeholder="/images/photo.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Review</Label>
                <Textarea
                  value={formData.review}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                  required
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
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
                  className="bg-(--color-navy) text-white"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Delete Testimonial?</h3>
              <p className="text-gray-500">
                Are you sure you want to delete <strong>{itemToDelete.name}</strong>'s review? This action cannot be undone.
              </p>
            </div>
            <div className="p-6 pt-0 flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={executeDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Testimonial"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
