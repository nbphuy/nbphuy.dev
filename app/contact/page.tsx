import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { PROFILE_DATA } from "@/lib/portfolio-data";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nguyen Binh Phuong Huy.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[80px]">
      <div className="mx-auto max-w-[600px]">
        <h1 className="section-title">Get In Touch</h1>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#8b949e]">
          <div className="flex flex-col gap-1.5">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-[#00cfff]"
            >
              <Mail className="size-4 text-[#00cfff]" />
              {PROFILE_DATA.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-[#00cfff]" />
              {PROFILE_DATA.location}
            </span>
          </div>
          <SocialLinks />
        </div>
      </div>

      <ContactForm />
    </main>
  );
}
