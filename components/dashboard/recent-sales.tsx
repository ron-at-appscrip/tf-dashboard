import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Miller</p>
          <p className="text-sm text-muted-foreground">jackson.m@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$249.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sophia Davis</p>
          <p className="text-sm text-muted-foreground">s.davis@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$399.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>OL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Lee</p>
          <p className="text-sm text-muted-foreground">olivia.lee@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ethan Martinez</p>
          <p className="text-sm text-muted-foreground">ethan.m@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$149.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ava Johnson</p>
          <p className="text-sm text-muted-foreground">ava.j@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$89.00</div>
      </div>
    </div>
  );
}