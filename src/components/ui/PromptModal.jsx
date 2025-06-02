// components/ConfirmDeleteModal.tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
  export function ConfirmDeleteModal({ onConfirm, children }) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}  className="p-0">{children}</Button>
        </DialogTrigger>
  
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. Do you want to continue?</p>
          <DialogFooter className="mt-4">
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive" onClick={onConfirm}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  