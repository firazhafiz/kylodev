"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Star, X } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  description: string;
  features: string[];
  preview: string;
  image: string;
  priority: boolean;
}

export default function ProjectsClient({
  initialProjects,
  secret,
}: {
  initialProjects: Project[];
  secret: string;
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
    preview: "",
    image: "",
    priority: false,
  });

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        features: project.features.join("\n"),
        preview: project.preview,
        image: project.image,
        priority: project.priority,
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: "",
        description: "",
        features: "",
        preview: "",
        image: "",
        priority: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...formData,
      features: formData.features.split("\n").filter((f) => f.trim() !== ""),
    };

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save project");
      }

      const savedProject = await res.json();

      if (editingProject) {
        setProjects(
          projects.map((p) => (p.id === savedProject.id ? savedProject : p))
        );
        toast.success("Project updated");
      } else {
        setProjects([...projects, savedProject]);
        toast.success("Project created");
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error saving project"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (project: Project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!projectToDelete) return;
    const id = projectToDelete.id;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete");
      }

      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted");
      router.refresh();
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error deleting project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePriority = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ priority: !project.priority }),
      });

      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      toast.success(`Priority ${updated.priority ? "enabled" : "disabled"}`);
    } catch (error) {
      toast.error("Error updating priority");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => openModal()} className="bg-(--color-navy)">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden bg-white">
            <div className="relative h-48 w-full bg-gray-100">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
              {project.priority && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
                  <Star className="w-3 h-3 mr-1 fill-black" /> Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{project.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {project.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePriority(project)}
                  className={
                    project.priority
                      ? "text-yellow-600 border-yellow-200 bg-yellow-50"
                      : "text-gray-500"
                  }
                >
                  <Star
                    className={`h-4 w-4 ${
                      project.priority ? "fill-yellow-600" : ""
                    }`}
                  />
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white border-0"
                    onClick={() => confirmDelete(project)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">
                {editingProject ? "Edit Project" : "New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="/images/project.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preview">Preview URL</Label>
                  <Input
                    id="preview"
                    value={formData.preview}
                    onChange={(e) =>
                      setFormData({ ...formData, preview: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  rows={5}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="priority"
                  className="w-4 h-4"
                  checked={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.checked })
                  }
                />
                <Label htmlFor="priority">
                  Set as Priority (Featured on Home)
                </Label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
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
                  {isLoading ? "Saving..." : "Save Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Delete Project?</h3>
              <p className="text-gray-500">
                Are you sure you want to delete{" "}
                <strong>{projectToDelete.name}</strong>? This action cannot be
                undone.
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
                {isLoading ? "Deleting..." : "Delete Project"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
