"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button onClick={() => window.print()} size="sm" variant="secondary">
      <Printer size={15} aria-hidden="true" />
      Print / Save as PDF
    </Button>
  );
}
