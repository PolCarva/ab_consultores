import { EyeOff } from "lucide-react";

export default function PreviewBanner() {
  return (
    <div
      role="status"
      className="mb-8 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950"
    >
      <EyeOff className="h-5 w-5 shrink-0" aria-hidden />
      <div>
        <p className="font-sans-custom font-semibold">Vista previa — borrador</p>
        <p className="text-sm text-amber-900/80">
          Solo vos podés ver esta página. No está publicada en el listado.
        </p>
      </div>
    </div>
  );
}
