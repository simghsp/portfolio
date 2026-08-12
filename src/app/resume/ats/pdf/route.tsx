import { renderToBuffer } from "@react-pdf/renderer";
import { AtsResumeDocument } from "@/lib/resume-pdf-ats";
import { profile } from "@/lib/data";

export async function GET() {
  const buffer = await renderToBuffer(<AtsResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${profile.name.replace(/\s+/g, "-")}-Resume-ATS.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
