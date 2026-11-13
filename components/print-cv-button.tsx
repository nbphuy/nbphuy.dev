"use client";

import { Printer } from "lucide-react";

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-primary no-print"
    >
      <Printer className="size-4" />
      Print / Save as PDF
    </button>
  );
}
