import { supabase } from "@/lib/supabase";
import ProjectsClient from "@/components/admin/ProjectsClient";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  return <ProjectsClient initialProjects={projects || []} secret={secret} />;
}
