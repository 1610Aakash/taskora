import SectionLayout from "@/components/layout/SectionLayout";
import EditTaskForm from "./components/EditTaskForm";

export default function EditTaskView({ taskId }) {
  return (
    <SectionLayout title="Edit task" backHref={`/admin/tasks/${taskId}`}>
      <EditTaskForm taskId={taskId} />
    </SectionLayout>
  );
}
