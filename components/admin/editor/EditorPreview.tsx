"use client";

import { useEffect, useState } from "react";
import HomeClient from "@/app/home-client";
import type { LatestNewsArticle } from "@/components/home/LatestNewsHome";
import type { SiteContent } from "@/lib/site-content";

/**
 * Página renderizada dentro del iframe del editor.
 * Arranca con el borrador (render del servidor) y se actualiza en vivo
 * con los mensajes que envía el panel del editor (postMessage).
 */
export default function EditorPreview({
  initialContent,
  latestNewsArticles,
}: {
  initialContent: SiteContent;
  latestNewsArticles: LatestNewsArticle[];
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "cms:update" && data.content) {
        setContent(data.content as SiteContent);
      }

      if (data.type === "cms:scrollTo" && data.sectionId) {
        const el = document.querySelector(
          `[data-cms-section="${data.sectionId}"]`,
        );
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("message", onMessage);
    // Avisa al editor que el preview ya está listo.
    window.parent?.postMessage({ type: "cms:ready" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <HomeClient
      content={content}
      latestNewsArticles={latestNewsArticles}
      previewMode
    />
  );
}
