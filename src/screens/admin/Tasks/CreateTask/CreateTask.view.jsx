import SectionLayout from "@/components/layout/SectionLayout";
import CreateTaskForm from "./components/CreateTaskForm";

export default function CreateTaskView() {
  return (
    <SectionLayout
      title="Create task"
      subtitle="Add a task and assign it to a user."
      backHref="/admin/tasks"
    >
      <CreateTaskForm />
    </SectionLayout>
  );
}
