import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume-pdf";
import { profile } from "@/lib/data";

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${profile.name.replace(/\s+/g, "-")}-Resume.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
