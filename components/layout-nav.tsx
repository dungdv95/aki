"use client";
import { HomeIcon, Menu, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";

import { useLoginStore } from "@/app/login/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import apiAuth from "@/lib/apis/auth";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "next-themes";
import * as React from "react";
import { navItems } from "./nav/menu";
import NavClosed from "./nav/nav-closed";
import NavOpen from "./nav/nav-open";
import { useNotice } from "./notice/confirm-error";
import { UserNav } from "./profile/user-nav";
import { ScrollArea } from "./ui/scroll-area";
import { useWindowSize } from "./hooks/use-window-size";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutLeft({ children }: LayoutProps) {
  const { setOpenDialog } = useNotice();
  const [reLoad, setReLoad] = React.useState(true);
  const { setTheme } = useTheme();
  const { width, height } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (width && width < 1150) {
      setIsCollapsed(true);
    }
    if (width && width > 1150) {
      setIsCollapsed(false);
    }
  }, [width]);

  //   const refresh = useMutation({
  //     mutationFn: apiAuth.tokenRefresh,
  //     onSuccess: (data: any) => {
  //       setReLoad(true);
  //       useLoginStore.getState().refresh(data?.access_token, data?.refresh_token);
  //     },
  //     onError: (error: any) => {
  //       setOpenDialog(error);
  //     },
  //   });

  //   React.useEffect(() => {
  //     async function actionRefresh() {
  //       let accessToken = useLoginStore.getState().accessToken;
  //       let refreshToken = useLoginStore.getState().refreshToken;

  //       if (!refreshToken) {
  //         setOpenDialog({ code: "401", message: "Phiên đăng nhập hết hạn" });
  //       } else {
  //         const infoRefreshToken = jwtDecode(refreshToken);
  //         const isExpRefresh =
  //           dayjs.unix(infoRefreshToken.exp!).diff(dayjs()) < 1;

  //         if (!isExpRefresh) {
  //           refresh.mutateAsync({
  //             refreshToken,
  //           });
  //         } else {
  //           setOpenDialog({ code: "401", message: "Phiên đăng nhập hết hạn" });
  //         }
  //       }
  //     }

  //     actionRefresh();

  //     const intervalId = setInterval(() => {
  //       actionRefresh();
  //     }, 250000);
  //     return () => clearInterval(intervalId);
  //   }, []);
  return (
    <>
      {/* {refresh.isLoading && (
        <>
          <div className="h-full flex fixed inset-0 g-background/80 backdrop-blur-sm z-[60]"></div>
          <div className="fixed left-[50%] top-[50%] z-[70] text-base opacity-80">
            Đang đồng bộ dữ liệu...
          </div>
        </>
      )} */}
      {reLoad ? (
        <div className="flex h-full">
          <div
            className={cn(
              "border-r bg-muted/40",
              !isCollapsed && "min-w-[255px]"
            )}
          >
            <div className="flex h-full w-full flex-col gap-2">
              <div className="flex min-h-[60px] items-center justify-center border-b px-2 lg:h-[60px] ">
                {isCollapsed ? (
                  <div
                    className={cn("flex h-[52px] items-center justify-center")}
                  >
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto"
                        src={`/assets/logo.png`}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <HomeIcon className="h-6 w-6" />
                      <span className="">Home</span>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-7 w-7 min-w-7 ml-auto"
                          size="icon"
                        >
                          <SunIcon className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <MoonIcon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>

              <NavOpen isCollapsed={isCollapsed} links={navItems} />
              {/* <ScrollArea className="h-full flex-auto">
                <div className="flex-1">
                  <nav className="grid gap-2 items-start text-sm font-medium px-4">
                    <NavOpen isCollapsed={isCollapsed} links={navItems} />
                  </nav>
                </div>
              </ScrollArea> */}
            </div>
          </div>
          {/* <div className="flex flex-col flex-auto overflow-hidden">
            <header className="flex min-h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between lg:justify-end">
              <Sheet modal={true}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col w-[300px]">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription></SheetDescription>
                  <ScrollArea className="h-full">
                    <nav className="grid gap-2 text-lg font-medium">
                      <NavClosed links={navItems} />
                    </nav>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              <UserNav />
            </header>
            <main className="flex flex-auto flex-col gap-3 p-3 lg:gap-5 lg:p-5 overflow-hidden">
              {children}
            </main>
          </div> */}
          <main className="flex flex-auto flex-col gap-3 p-3 lg:gap-5 lg:p-5 overflow-hidden">
            {children}
          </main>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
