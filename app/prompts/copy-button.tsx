"use client";

import { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

export function ClientCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm hover:bg-white/10"
      aria-label="Copy prompt"
    >
      {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
