"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ReceiveFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted");
    setIsOpen(false);
  };

  return (
    <section className="container xl:px-0">
      <div className="gap-x-2 p-4 rounded-14 border-0.5 border-black_sub">
        <p className="text-xs text-black">
          Hãy cho chúng tôi biết phản hồi và góp ý của bạn về chất lượng dịch vụ
          của chúng tôi
        </p>
        <h6
          className="text-blue_sub text-sm font-medium cursor-pointer"
          onClick={handleOpen}
        >
          Gửi ý kiến
        </h6>

        {/* Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-green text-lg font-semibold">
                Gửi phản hồi
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black_sub"
                >
                  Tên của bạn
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black_sub"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-black_sub"
                >
                  Phản hồi
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Nhập phản hồi của bạn"
                  rows={4}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Hủy
                </Button>
                <Button type="submit" className="px-4">
                  Gửi
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ReceiveFeedback;
