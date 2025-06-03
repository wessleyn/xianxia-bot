"use client";

import { IconBook, IconPresentation, IconTrendingUp } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
  { original: "demo", xianxia: "DEMO", path: "/demo", icon: IconPresentation },
  { original: "dictionary", xianxia: "DICTIONARY", path: "/dictionary", icon: IconBook },
  { original: "trending", xianxia: "TRENDING", path: "/trending", icon: IconTrendingUp },
];

interface NavigationLinksProps {
  mobile?: boolean;
  onMobileItemClick?: () => void;
}

const NavigationLinks = ({ mobile = false, onMobileItemClick }: NavigationLinksProps) => {
  const pathname = usePathname();

  // Check if a link is active
  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <nav aria-label="Global">
      <ul className={`${mobile ? "space-y-3" : "flex items-center gap-8 text-base"}`}>
        {links.map((link) => {
          const active = isActiveLink(link.path);
          return (
            <li key={link.original}>
              <Link
                href={link.path}
                onClick={mobile ? onMobileItemClick : undefined}
                className={`font-medium tracking-wide flex items-center ${mobile ? "justify-center" : ""} gap-2 transition-colors ${mobile ? "py-3 block text-center" : "px-3 py-2"} rounded-lg
                  ${active ? " text-purple-700  dark:text-purple-300" : "text-gray-700 dark:text-gray-300  hover:text-purple-600 dark:hover:text-purple-400"}
                `}
              >
                <link.icon size={20} className={active ? "text-purple-600 dark:text-purple-400" : ""} />
                {link.xianxia}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationLinks;