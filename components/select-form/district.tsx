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
import apis from "@/lib/apis/common";
import ErrorNotice from "../notice/error-notice";
import { ScrollArea } from "../ui/scroll-area";

interface DistrictProps {
  id: string;
  value: string | undefined;
  disable: boolean;
  onChange: (value: string) => void;
}
export default function DistrictSelect({
  id,
  value,
  disable,
  onChange,
}: DistrictProps) {
  const [open, setOpen] = useState(false);

  const {
    data: data,
    error,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["/common/get-district", { id }],

    queryFn: () => apis.getCommonDistrict(id),
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
              ? data?.find((item: any) => item.code === value)?.nameWithType
              : "Lựa chọn Quận/Huyện..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[400px]">
        <Command className="max-w-[450px] max-h-[250px] p-0 ">
          <CommandInput placeholder="Tìm kiếm..." />
          <ScrollArea className="h-40">
            <CommandEmpty>Không tìm thấy</CommandEmpty>
            {data.length > 0 && (
              <CommandGroup>
                {data?.map((item: any, index: number) => (
                  <CommandItem
                    key={index}
                    value={item.nameWithType}
                    onSelect={() => {
                      onChange(
                        item.code ? (item.code !== value ? item.code : "") : ""
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="truncate w-[90%]">
                      {item.nameWithType}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
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
