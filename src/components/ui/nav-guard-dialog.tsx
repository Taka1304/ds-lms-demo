"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";

type NavGuardProps = {
  open: boolean;
  onCancel: () => void;
  onAccept: () => void;
};

const NavGuardDialog = ({ open, onCancel, onAccept }: NavGuardProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>このページを離れますか？</DialogTitle>
        <DialogDescription>行った変更が保存されない可能性があります。</DialogDescription>
        <DialogFooter>
          <Button variant={"ghost"} onClick={onCancel}>
            キャンセル
          </Button>
          <Button variant={"default"} onClick={onAccept}>
            ページを離れる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NavGuardDialog;
