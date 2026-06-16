import { supabase } from "@/lib/supabase";
import ProjectsClientPage from "@/components/section/ProjectsClientPage";
import BreadCrumb from "@/components/moleculs/BreadCrumb";

export const revalidate = 0;

export default async function AllProjectsSection() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  const visibleProjects = (projects || []).filter((p) => !p.is_hidden);

  return (
    <>
      <BreadCrumb route="Projects" />
      <ProjectsClientPage projects={visibleProjects} />
    </>
  );
}
