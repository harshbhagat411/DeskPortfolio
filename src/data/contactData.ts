import instaLogo from "../assets/icon/Instagram_icon.png";
import linkedinLogo from "../assets/icon/LinkedIn_logo.png";
import GithubLogo from "../assets/icon/Github_Logo.png";

export interface ContactDataItem {
  id: string;
  label: string;
  value: string;
  href: string;
  imageIcon?: string;
  iconName?: string;
}

export const contactData: ContactDataItem[] = [
  {
    id: "email",
    label: "Email",
    value: "harshbhagat411@gmail.com",
    href: "mailto:harshbhagat411@gmail.com",
    iconName: "Mail",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "harsh-bhagat-863741356",
    href: "https://www.linkedin.com/in/harsh-bhagat-863741356/",
    imageIcon: linkedinLogo,
  },
  {
    id: "instagram-design",
    label: "Instagram (Design)",
    value: "@harshui.ux",
    href: "https://www.instagram.com/harshui.ux/",
    imageIcon: instaLogo,
  },
  {
    id: "instagram-personal",
    label: "Instagram (Personal)",
    value: "@harsh.bhagat411",
    href: "https://www.instagram.com/harsh.bhagat411/",
    imageIcon: instaLogo,
  },
  {
    id: "Github",
    label: "Github",
    value: "harshbhagat411",
    href: "https://github.com/harshbhagat411",
    imageIcon: GithubLogo,
  },
];
