import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Checkicon from "@/ui/assets/icons/Check.json";
import Error from "@/ui/assets/icons/Error.json";
import LordIcon from "../lordicons/Lordi";

interface Alertreturnprops {
  Title: string;
  description: string;
  redirect?: boolean;
  status?: "success" | "error";
  okButton?: boolean;
  cancelButton?: string;
  destruct?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: () => void; // Função para deletar
  onRedirect?: () => void; // Função para redirecionar
}

export const Alertreturn = ({
  Title,
  description,
  redirect,
  status,
  okButton,
  cancelButton,
  destruct,
  isOpen,
  onOpenChange,
  onDelete,
  onRedirect,
}: Alertreturnprops) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{Title}</AlertDialogTitle>
          <div className="flex justify-center">
            {status && (
              <LordIcon
                icon={status === "error" ? Error : Checkicon}
                size={150}
                trigger="none"
                colors={`secondary:${status === "error" ? "red" : "green"}`}
              />
            )}
          </div>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {destruct && (
            <AlertDialogCancel onClick={onDelete}>Apagar</AlertDialogCancel>
          )}
          {cancelButton && <AlertDialogCancel>{cancelButton}</AlertDialogCancel>}
          {okButton && <AlertDialogAction>OK</AlertDialogAction>}
          {redirect && (
            <AlertDialogAction onClick={onRedirect}>Redirecionar</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};