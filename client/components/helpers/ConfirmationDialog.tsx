import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const ConfirmationDialog = ({
  open,
  setOpen,
  alertType,
}: {
  open: boolean;
  setOpen: any;
  alertType: string;
}) => {
  const handleAction = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="dark:bg-neutral-900 dark:hover:bg-neutral-950"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            className="bg-red-500 hover:bg-red-600 text-darkText"
          >
            {alertType === "delete" ? "Delete" : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
