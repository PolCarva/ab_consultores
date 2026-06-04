import EditorClient from "@/components/admin/editor/EditorClient";
import { getDraftContent } from "@/lib/site-content.server";

export const dynamic = "force-dynamic";

export default async function EditorPage() {
  const initialContent = await getDraftContent();
  return <EditorClient initialContent={initialContent} />;
}
