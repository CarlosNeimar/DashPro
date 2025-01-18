import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ModulecardProps {
  id: string;
  name: string;
  path: string;
  Classname: string;
  Classicon: string;
  Classcolor: string;
  status: string;
  isFavorite: boolean;
  description?: string;
}

export const Modulecard: React.FC<ModulecardProps> = ({
  id,
  name,
  path,
  Classname,
  Classicon,
  Classcolor,
  status,
  isFavorite,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{Classname}</p>
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  );
};
