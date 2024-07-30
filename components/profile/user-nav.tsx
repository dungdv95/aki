import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Dương Văn Dũng</p>
            <p className="text-xs leading-none text-muted-foreground">
              dungdv@pvcombank.com.vn
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="my-2">
          <DropdownMenuItem>
            Thông tin cá nhân
            <DropdownMenuShortcut>
              <ArrowRight className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>
              <ArrowRight className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
