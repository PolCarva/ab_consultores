import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

export default async function NuevaNoticiaPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  return (
    <div>
      <h1 className="mb-8 font-sans-custom text-3xl font-bold text-moss">Nueva noticia</h1>
      <NewsForm mode="create" />
    </div>
  );
}
