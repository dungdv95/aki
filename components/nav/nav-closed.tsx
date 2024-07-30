import { SidebarItem } from "./menu";
import Link from "next/link";
import {
  Bell,
  ChevronRightIcon,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { buttonVariants } from "../ui/button";

export default function NavClosed({ links }: { links: SidebarItem[] }) {
  console.log("links", links);
  return (
    <>
      {links.map((link) => {
        return (
          <Fragment key={link.url}>
            <NavContent itemLink={link} />
          </Fragment>
        );
      })}
    </>
  );
}

const NavContent = ({ itemLink }: { itemLink: SidebarItem }) => {
  return (
    <>
      {!(itemLink?.items && itemLink?.items.length > 0) ? (
        <NavItem itemLink={itemLink} open={false} />
      ) : (
        <Disclosure as="div" className={""}>
          {({ open }) => (
            <>
              <NavItem itemLink={itemLink} isRoot={true} open={open} />
              <Disclosure.Panel
                as="ul"
                className={cn("flex flex-col px-3 pt-2 gap-2")}
              >
                {itemLink.items.map((subItem: SidebarItem) => {
                  return (
                    <Fragment key={subItem.url}>
                      <NavContent itemLink={subItem} />
                    </Fragment>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
};

const NavItem = ({
  itemLink,
  isRoot,
  open,
}: {
  itemLink: SidebarItem;
  isRoot?: boolean;
  open: boolean;
}) => {
  const pathName = usePathname();

  return (
    <>
      {isRoot ? (
        <Disclosure.Button
          className={cn(
            "flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathName.includes(itemLink.url) ? "bg-muted text-foreground" : "",
            "text-[13px] leading-4 w-full hover:bg-muted hover:text-foreground"
          )}
        >
          {itemLink.title}

          <ChevronRightIcon
            className={cn(
              "ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              open ? "rotate-90" : ""
            )}
          />
        </Disclosure.Button>
      ) : (
        <Link
          href={itemLink.url}
          className={cn(
            "flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathName.includes(itemLink.url) ? "bg-muted text-foreground" : "",
            "text-[13px] leading-4 hover:bg-muted hover:text-foreground"
          )}
        >
          {itemLink.title}
        </Link>
      )}
    </>
  );
};
