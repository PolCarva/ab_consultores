"use client";

import { useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeXml,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
  Youtube as YoutubeIcon,
} from "lucide-react";

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function ToolbarDivider() {
  return <div className="mx-0.5 hidden h-6 w-px self-center bg-moss/15 sm:block" aria-hidden />;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg p-2 transition-colors disabled:opacity-40 ${
        active
          ? "bg-green-accent text-cream"
          : "text-charcoal/70 hover:bg-moss/10 hover:text-moss"
      }`}
    >
      {children}
    </button>
  );
}

function setLink(editor: Editor) {
  const previous = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("URL del enlace", previous ?? "https://");
  if (url === null) return;
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
}

function addImageFromUrl(editor: Editor) {
  const previous = editor.getAttributes("image").src as string | undefined;
  const url = window.prompt("URL de la imagen (https://…)", previous ?? "https://");
  if (url === null) return;

  const trimmed = url.trim();
  if (!trimmed) {
    if (editor.isActive("image")) {
      editor.chain().focus().deleteSelection().run();
    }
    return;
  }

  if (!isValidHttpUrl(trimmed)) {
    window.alert("Ingresá una URL válida que empiece con http:// o https://");
    return;
  }

  const alt = window.prompt("Texto alternativo (opcional)", "") ?? "";

  if (editor.isActive("image")) {
    editor
      .chain()
      .focus()
      .updateAttributes("image", { src: trimmed, alt: alt || null })
      .run();
    return;
  }

  editor.chain().focus().setImage({ src: trimmed, alt: alt || undefined }).run();
}

function addYoutubeVideo(editor: Editor) {
  const url = window.prompt(
    "URL del video de YouTube",
    "https://www.youtube.com/watch?v=",
  );
  if (url === null) return;
  const trimmed = url.trim();
  if (!trimmed) return;
  if (!isValidHttpUrl(trimmed)) {
    window.alert("Ingresá una URL válida de YouTube");
    return;
  }
  editor.commands.setYoutubeVideo({ src: trimmed });
}

function toggleHighlightMark(editor: Editor) {
  editor.commands.focus();
  if (typeof editor.commands.toggleHighlight === "function") {
    editor.commands.toggleHighlight();
    return;
  }
  editor.chain().focus().toggleMark("highlight").run();
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Escribí el contenido de la noticia…",
}: RichTextEditorProps) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      TextStyle,
      Highlight.configure({
        HTMLAttributes: {
          class: "rounded-sm bg-green-accent/25 px-0.5",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto my-6 max-w-full rounded-xl",
          loading: "lazy",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "mx-auto my-6 aspect-video w-full max-w-full rounded-xl",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose-noticias min-h-[280px] max-w-none px-4 py-3 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-moss/20 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-moss/10 bg-cream/50 p-2">
        {/* Historial */}
        <ToolbarButton label="Deshacer" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Rehacer" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Texto */}
        <ToolbarButton
          label="Negrita"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Cursiva"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Subrayado"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Tachado"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Resaltar"
          onClick={() => toggleHighlightMark(editor)}
          active={editor.isActive("highlight")}
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Código en línea"
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Títulos */}
        <ToolbarButton
          label="Título grande"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Título mediano"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Párrafo"
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
        >
          <span className="font-mono-custom text-xs font-bold">P</span>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Alineación */}
        <ToolbarButton
          label="Alinear izquierda"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Centrar"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Alinear derecha"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Listas y bloques */}
        <ToolbarButton
          label="Lista con viñetas"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Cita"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Separador"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bloque de código"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <CodeXml className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Medios y enlaces */}
        <ToolbarButton
          label="Enlace"
          onClick={() => setLink(editor)}
          active={editor.isActive("link")}
        >
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Imagen por URL"
          onClick={() => addImageFromUrl(editor)}
          active={editor.isActive("image")}
        >
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Video de YouTube"
          onClick={() => addYoutubeVideo(editor)}
          active={editor.isActive("youtube")}
        >
          <YoutubeIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
