import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import apis from "@/lib/apis/system";
import ErrorNotice from "../notice/error-notice";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface SelectProps {
  code: string;
  label: string;
}

interface UnCodeProps {
  value: string | undefined;
  disable: boolean;
  onChange: (value: string) => void;
}
export default function UnusedCode({ value, disable, onChange }: UnCodeProps) {
  const [open, setOpen] = useState(false);

  const {
    data: data,
    error,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["/master-merchant/get-unusecode"],
    queryFn: () => apis.getUnuseCode(),
    retry: 0,
    // keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <FormFieldLoading />;
  }
  if (isError) {
    return <ErrorNotice error={error as Error} />;
  }

  if (data === undefined || data === null) {
    return null;
  }

  const codes = data?.unusedCodes ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disable}
          type="button"
        >
          <span className="truncate">
            {value
              ? codes?.find((item: string) => item === value) ?? ""
              : "Lựa chọn code..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[415px]">
        <Command className="max-w-[450px] max-h-[250px] p-0 ">
          <CommandInput placeholder="Tìm kiếm..." />
          <ScrollArea className="h-40">
            <CommandEmpty>Không tìm thấy</CommandEmpty>
            <CommandGroup>
              {codes?.map((item: string, index: number) => (
                <CommandItem
                  key={index}
                  value={item}
                  onSelect={() => {
                    onChange(item ? (item !== value ? item : "") : "");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate w-[90%]">{item}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function FormFieldLoading() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="space-y-2 w-full">
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
