import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  doctorEmail: string;
  doctorId: string;
}

export const DeleteDoctorModal: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  doctorEmail,
  doctorId,
}) => {
  const [confirmEmail, setConfirmEmail] = useState("");

  const isMatch = confirmEmail === doctorEmail;

  const handleDelete = async () => {
    // API Call here
    console.log("Deleting:", doctorId);
    setConfirmEmail(""); // reset input
    setIsOpen(false); // close modal after delete
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>Confirm Deletion</DialogHeader>
        <p className="text-sm">
          Please type <b className="text-red-500">{doctorEmail}</b> to confirm.
        </p>
        <Input
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Enter email here..."
        />
        <Button
          variant="destructive"
          disabled={!isMatch}
          onClick={handleDelete}
        >
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};