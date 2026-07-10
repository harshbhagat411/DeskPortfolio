import React from "react";
import { Mail } from "lucide-react";
import instaLogo from "../assets/icon/Instagram_icon.png";
import linkedinLogo from "../assets/icon/LinkedIn_logo.png";

interface ContactItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}

const LinkedinIcon = ({ className }: { className?: string }) => (
  <img
    src={linkedinLogo}
    className={`${className} rounded-md object-contain`}
    alt="LinkedIn"
    draggable={false}
  />
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <img
    src={instaLogo}
    className={`${className} rounded-md object-contain`}
    alt="Instagram"
    draggable={false}
  />
);

const ContactWindow = () => {
  const contactItems: ContactItem[] = [
    {
      icon: Mail,
      label: "Email",
      value: "harshbhagat411@gmail.com",
      href: "mailto:harshbhagat411@gmail.com",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "harsh-bhagat-863741356",
      href: "https://www.linkedin.com/in/harsh-bhagat-863741356/",
    },
    {
      icon: InstagramIcon,
      label: "Instagram (Design)",
      value: "@harshui.ux",
      href: "https://www.instagram.com/harshui.ux/",
    },
    {
      icon: InstagramIcon,
      label: "Instagram (Personal)",
      value: "@harsh.bhagat411",
      href: "https://www.instagram.com/harsh.bhagat411/",
    },
  ];

  return (
    <div
      className="w-full h-full px-8 py-7 text-[var(--theme-text-main)] select-none"
      style={{ padding: "10px" }}
    >
      {/* Header */}

      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
          Contact
        </p>

        <h1 className="mt-2 text-[34px] font-semibold tracking-tight text-white">
          Let's Connect
        </h1>

        <p
          className="mt-2 max-w-lg text-[15px] leading-6 text-zinc-400"
          style={{ paddingBottom: "10px" }}
        >
          Open to collaborations, freelance work, internship opportunities, or
          simply having a conversation.
        </p>
      </div>

      {/* Contact List */}

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-sm">
        {contactItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-between
              px-6 py-5
              transition-all duration-200
              hover:bg-white/[0.05]
              active:scale-[0.995]
              group
              ${
                index !== contactItems.length - 1
                  ? "border-b border-white/6"
                  : ""
              }
            `}
            style={{ padding: "10px", paddingBottom: "10px" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white/[0.04]
                group-hover:bg-white/[0.08]
                transition-colors
              "
              >
                <item.icon className="w-5 h-5 text-zinc-300" />
              </div>

              <div>
                <div className="text-[15px] font-medium text-white">
                  {item.label}
                </div>

                <div className="text-[13px] text-zinc-500">Click to open</div>
              </div>
            </div>

            <div
              className="
              text-right
              text-[14px]
              text-zinc-400
              group-hover:text-white
              transition-colors
            "
            >
              {item.value}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactWindow;
