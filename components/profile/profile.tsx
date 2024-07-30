import { useState } from "react";
// import { FlagItem, flagItems } from "../nav/store";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserNav } from "./user-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LayoutGrid } from "lucide-react";
import { Separator } from "../ui/separator";
import { match } from "ts-pattern";

export default function Profile() {
  return (
    <div className="flex items-center space-x-4">
      {/* <Search /> */}
      {/* <Flags /> */}
      <Notification />
      <UserNav />
    </div>
  );
}

function Notification() {
  const [tab, setTab] = useState<"notification" | "logs" | "settings">(
    "notification"
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="h-8 w-8 border-0">
          <LayoutGrid className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <div className="flex flex-col">
          <div className="p-4 flex gap-6">
            <button
              type="button"
              className="group relative border-b-[1px] border-b-white dark:border-b-[#020817] inline-flex -mb-px items-center font-semibold focus:z-10 text-sm pb-1"
              onClick={() => {
                setTab("notification");
              }}
            >
              <div
                className={`${
                  tab === "notification" ? "text-[#0772bc]" : ""
                } group-hover:text-[#0772bc]`}
              >
                Notification
              </div>
              <div
                className={`${tab === "notification" ? "block" : "hidden"} 
                  left-1/2 transform  -translate-x-1/2  group-hover:block w-full absolute bottom-0 h-[2px] bg-[#FFD143]`}
              ></div>
            </button>
            <button
              type="button"
              className="group relative border-b-[1px] border-b-white dark:border-b-[#020817] inline-flex -mb-px items-center font-semibold focus:z-10 text-sm pb-1"
              onClick={() => {
                setTab("logs");
              }}
            >
              <div
                className={`${
                  tab === "logs" ? "text-[#0772bc]" : ""
                } group-hover:text-[#0772bc]`}
              >
                Audit Logs
              </div>
              <div
                className={`${tab === "logs" ? "block" : "hidden"} 
                  left-1/2 transform  -translate-x-1/2  group-hover:block w-full absolute bottom-0 h-[2px] bg-[#FFD143]`}
              ></div>
            </button>
            <button
              type="button"
              className="group relative border-b-[1px] border-b-white dark:border-b-[#020817] inline-flex -mb-px items-center font-semibold focus:z-10 text-sm pb-1"
              onClick={() => {
                setTab("settings");
              }}
            >
              <div
                className={`${
                  tab === "settings" ? "text-[#0772bc]" : ""
                } group-hover:text-[#0772bc]`}
              >
                Settings
              </div>
              <div
                className={`${tab === "settings" ? "block" : "hidden"} 
                  left-1/2 transform  -translate-x-1/2  group-hover:block w-full absolute bottom-0 h-[2px] bg-[#FFD143]`}
              ></div>
            </button>
          </div>
          <Separator className="mb-2" />
          <div className="px-4">
            {match(tab)
              .with("notification", () => <NotificationTab />)
              .with("logs", () => <AuditlogTab />)
              .with("settings", () => <SettingTab />)
              .exhaustive()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NotificationTab() {
  return <div>NotificationTab</div>;
}

function AuditlogTab() {
  return <div>AuditlogTab</div>;
}

function SettingTab() {
  return <div>SettingTab</div>;
}

// function Flags() {
//   const [selectedLanguage, setSelectedLanguage] = useState<FlagItem>(
//     flagItems[0]
//   );
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           className="h-8 w-8 min-w-8 focus-visible:ring-0 focus-visible:ring-offset-0"
//           size="icon"
//         >
//           <selectedLanguage.icon className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {flagItems.map((flag) => (
//           <DropdownMenuItem
//             onClick={() => {
//               setSelectedLanguage(flag);
//             }}
//           >
//             <flag.icon className="mr-2 h-4 w-4" />
//             {flag.title}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
