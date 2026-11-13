import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin-editor";

export const metadata: Metadata = {
  title: "Admin Panel | Local CMS",
  description: "Local Markdown CMS for writing and previewing blog posts.",
};

export default function AdminPage() {
  return <AdminEditor />;
}
