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
  Power,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { ScrollArea } from "../ui/scroll-area";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: SidebarItem[];
}

export default function NavOpen({ links, isCollapsed }: NavProps) {
  return (
    <>
      <ScrollArea className="h-full flex-auto">
        <div className="flex-1">
          <nav className="grid gap-2 items-start text-sm font-medium px-2">
            {links.map((link) => {
              return (
                <Fragment key={link.url}>
                  <NavContent isCollapsed={isCollapsed} item={link} />
                </Fragment>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
      <div className="h-12 p-2 flex items-center justify-center">
        {!isCollapsed ? (
          <Button
            className="h-9 w-full justify-start dark:hover:bg-muted dark:hover:text-white"
            size={"sm"}
            variant={"ghost"}
            onClick={() => {}}
          >
            <Power className="mr-2 h-4 w-4" /> Đăng xuất
          </Button>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className="h-9 w-9 dark:hover:bg-muted dark:hover:text-white"
                size={"icon"}
                variant={"ghost"}
                onClick={() => {}}
              >
                <Power className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Đăng xuất
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </>
  );
}

const NavContent = ({
  item,
  isCollapsed,
}: {
  item: SidebarItem;
  isCollapsed: boolean;
}) => {
  return (
    <>
      {!(item?.items && item?.items.length > 0) ? (
        <NavItem item={item} isCollapsed={isCollapsed} open={false} />
      ) : (
        <Disclosure as="div" className={""}>
          {({ open }) => (
            <>
              <NavItem
                item={item}
                isCollapsed={isCollapsed}
                isRoot={true}
                open={open}
              />
              <Disclosure.Panel
                as="ul"
                className={cn(
                  "mt-1 flex flex-col gap-2",
                  !isCollapsed ? "px-4" : "px-0"
                )}
              >
                {item.items.map((subItem: SidebarItem) => {
                  return (
                    <Fragment key={subItem.url}>
                      <NavContent item={subItem} isCollapsed={isCollapsed} />
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
  item,
  isCollapsed,
  isRoot,
  open,
}: {
  item: SidebarItem;
  isCollapsed: boolean;
  isRoot?: boolean;
  open: boolean;
}) => {
  const pathName = usePathname();
  return (
    <>
      {isCollapsed ? (
        <>
          {isRoot && item.level < 1 && (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={"#"}
                  className={cn(
                    buttonVariants({
                      variant: pathName.includes(item.url)
                        ? "default"
                        : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    pathName.includes(item.url) &&
                      "bg-gray-200 text-[rgb(2, 8, 23)] hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="w-56 gap-4" align="start">
                <div className="flex flex-col gap-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.url}
                      href={subItem.url}
                      className={cn(
                        buttonVariants({
                          variant: pathName.includes(subItem.url)
                            ? "default"
                            : "ghost",
                          size: "sm",
                        }),
                        getIncludes(pathName, subItem.url),

                        "justify-start w-full gap-2"
                      )}
                    >
                      {/* <subItem.icon className="h-4 w-4" /> */}
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </>
      ) : (
        <>
          {isRoot && item.level < 1 ? (
            <Disclosure.Button
              className={cn(
                buttonVariants({
                  variant: item.url === pathName ? "default" : "ghost",
                  size: "sm",
                }),
                item.url === pathName &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                isRoot && pathName.includes(item.url)
                  ? "bg-gray-200 dark:bg-gray-900"
                  : "",
                "justify-start w-full gap-2 relative"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
              <ChevronRightIcon
                className={cn(
                  open
                    ? "rotate-90 text-gray-500 dark:text-slate-200"
                    : "text-gray-400 dark:text-slate-100",
                  "h-5 w-5 shrink-0 absolute right-[10px]"
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
          ) : (
            <Link
              href={item.url}
              className={cn(
                buttonVariants({
                  variant: pathName.includes(item.url) ? "default" : "ghost",
                  size: "sm",
                }),
                // pathName.includes(item.url) &&
                //   "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                getIncludes(pathName, item.url),
                // pathName.includes(item.url)
                //   ? "bg-gray-200 dark:bg-gray-900"
                //   : "",
                "justify-start w-full gap-2"
              )}
            >
              {/* <item.icon className="h-4 w-4" /> */}
              {item.title}
            </Link>
          )}
        </>
      )}
    </>
  );
};

const getIncludes = (path: string, url: string) => {
  if (path === url) {
    return "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white";
  }
  if (path.includes(url)) {
    return "bg-gray-200 text-[rgb(2, 8, 23)] hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white";
  }
  return "";
};
