import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./menu";
import { useWindowSize } from "../hooks/use-window-size";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ChevronDown, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function NavHeader({ links }: { links: SidebarItem[] }) {
  const { width, height } = useWindowSize();
  const pathName = usePathname();

  return (
    <>
      {width && width > 1370 ? (
        <div className="flex gap-3">
          {links.map((link) => (
            <div key={link.url}>
              {link.items.length > 0 ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-8 text-slate-50 hover:text-slate-50 hover:bg-blue-400",
                        pathName.includes(link.url)
                          ? "bg-blue-400"
                          : "bg-blue-600"
                      )}
                    >
                      {link.title}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className={cn(
                      "p-0 bg-blue-500 border-none",
                      link.items.length > 1 ? "w-[450px]" : "w-[250px]"
                    )}
                    align="start"
                  >
                    <ul
                      className={cn(
                        "grid gap-3 p-4",
                        link.items.length > 1 ? "grid-cols-2" : "grid-cols-1"
                      )}
                    >
                      {link.items.map((item) => (
                        <li key={item.url}>
                          <Link
                            href={item.url}
                            className={cn(
                              buttonVariants({
                                variant: pathName.includes(item.url)
                                  ? "default"
                                  : "ghost",
                                size: "sm",
                              }),

                              getIncludes(pathName, item.url),
                              "justify-start w-full gap-2"
                            )}
                          >
                            <div className="text-sm font-medium leading-none text-white">
                              {item.title}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <Link
                  href={link.url}
                  className={cn(
                    buttonVariants({
                      variant: pathName === link.url ? "default" : "ghost",
                      size: "sm",
                    }),
                    "h-8 text-slate-50 hover:text-slate-50 hover:bg-blue-400 px-4 py-2",
                    pathName.includes(link.url) ? "bg-blue-400" : "bg-blue-600"
                  )}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* {pathName !== "/" && ( */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-blue-600 border-none text-slate-50 focus:ring-0 focus-visible:ring-0 hover:bg-blue-600 hover:text-slate-50"
              >
                <List className="h-[28px] w-[28px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[230px] p-3 bg-blue-500 border-none space-y-2"
              align="start"
            >
              {links.map((link) => (
                <DropdownMenuGroup key={link.url}>
                  {link.items.length > 0 ? (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                        className={cn(
                          "text-slate-50 hover:text-slate-50 hover:!bg-blue-400",
                          pathName.includes(link.url)
                            ? "!bg-blue-400"
                            : "!bg-blue-500"
                        )}
                      >
                        <span>{link.title}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-[230px] p-3 !bg-blue-500 border-none">
                          {link.items.map((item) => (
                            <DropdownMenuItem
                              key={item.url}
                              className="p-0 rounded-none !bg-blue-500"
                            >
                              {/* <span>{item.title}</span> */}
                              <Link
                                href={item.url}
                                className={cn(
                                  "px-2 py-1.5 rounded-md w-full text-slate-50 hover:text-slate-50 hover:bg-blue-400",
                                  pathName === item.url ? "bg-blue-400" : ""
                                )}
                              >
                                {item.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ) : (
                    <DropdownMenuItem className="p-0 rounded-none !bg-blue-500">
                      <Link
                        href={link.url}
                        className={cn(
                          "px-2 py-1.5 rounded-md w-full text-slate-50 hover:text-slate-50 hover:bg-blue-400",
                          pathName === link.url ? "bg-blue-400" : ""
                        )}
                      >
                        {link.title}
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* )} */}
        </>
      )}
    </>
  );
}

const getIncludes = (path: string, url: string) => {
  if (path === url) {
    return "bg-blue-600 hover:bg-blue-400";
  }
  if (path.includes(url)) {
    return "bg-gray-200 text-[rgb(2, 8, 23)] hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white";
  }
  return "bg-blue-500 hover:bg-blue-400";
};
