import { SidebarItem } from "./menu";
import Link from "next/link";
import {
  Bell,
  ChevronRightIcon,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Minus,
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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
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
          <nav className="grid gap-1 items-start text-sm font-medium px-2">
            {links.map((link) => {
              return (
                <Fragment key={link.url}>
                  <NavContent isCollapsed={isCollapsed} item={link} />
                </Fragment>
              );
            })}
          </nav>
        </div>
        <ScrollBar orientation="vertical" className="bg-[#a2adb7] opacity-50" />
      </ScrollArea>
      <div className="h-12 p-2 flex items-center justify-center">
        {!isCollapsed ? (
          <Button
            className={cn(
              "h-9 w-full justify-start",
              "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
              "hover:bg-[#151529] dark:hover:bg-[#212529]"
            )}
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
                className={cn(
                  "h-9 w-9",
                  "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                  "hover:bg-[#151529] dark:hover:bg-[#212529]"
                )}
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
                  "flex flex-col gap-1",
                  !isCollapsed ? "px-3" : "px-0"
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
                      variant: "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                    "hover:bg-[#151529] dark:hover:bg-[#212529]",
                    pathName.includes(item.url) && "text-white dark:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="min-w-56 gap-4 bg-[#151529] dark:bg-[#212529] border-0 py-2"
                align="start"
              >
                <div
                  className={cn(
                    "flex justify-start gap-2 relative mb-3",
                    "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                    "hover:bg-[#151529] dark:hover:bg-[#212529]",
                    pathName.includes(item.url) && "text-white dark:text-white"
                  )}
                >
                  {item.title}
                  <ChevronRightIcon
                    className={cn(
                      "rotate-90 ",
                      "h-4 w-4 shrink-0 absolute right-[8px] top-[2px]"
                    )}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.url}
                      href={subItem.url}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "sm",
                        }),
                        getIncludes(pathName, subItem.url),
                        "text-[13px]",
                        "justify-start w-full gap-2 px-2",
                        "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                        "hover:bg-[#151529] dark:hover:bg-[#212529]"
                      )}
                    >
                      <Minus className="h-3 w-2 mr-[2px]" />
                      {/* <subItem.icon className="h-4 w-4" /> */}
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
          {!isRoot && item.level < 1 && (
            <Link
              href={item.url}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
                "h-9 w-9",
                "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                pathName.includes(item.url) && "text-white dark:text-white",
                "hover:bg-[#151529] dark:hover:bg-[#212529]"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="sr-only">{item.title}</span>
            </Link>
          )}
        </>
      ) : (
        <>
          {isRoot && item.level < 1 ? (
            <Disclosure.Button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                // item.url === pathName &&
                //   "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                // isRoot && pathName.includes(item.url)
                //   ? "bg-gray-200 dark:bg-gray-900"
                //   : "",
                "justify-start w-full gap-2 relative px-2",
                "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                "hover:bg-[#151529] dark:hover:bg-[#212529]",
                pathName.includes(item.url) && "text-white dark:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
              <ChevronRightIcon
                className={cn(
                  open && "rotate-90 ",
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
                  variant: "ghost",
                  size: "sm",
                }),
                // pathName.includes(item.url) &&
                //   "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                getIncludes(pathName, item.url),
                // pathName.includes(item.url)
                //   ? "bg-gray-200 dark:bg-gray-900"
                //   : "",
                "text-[13px]",
                "justify-start w-full gap-2 px-2",
                "text-[#a3a6b7] dark:text-[#7c7f90] hover:text-white dark:hover:text-white",
                "hover:bg-[#151529] dark:hover:bg-[#212529]"
              )}
            >
              {item.level === 0 ? (
                <item.icon className="h-4 w-4" />
              ) : (
                <Minus className="h-3 w-2 mr-[2px]" />
              )}
              {item.title}
            </Link>
          )}
        </>
      )}
    </>
  );
};

const getIncludes = (path: string, url: string) => {
  if (path.includes(url) || path === url) {
    return "!text-white bg-[#151529] dark:bg-[#212529]";
  }
  return "";
};
