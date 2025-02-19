"use client";
import React, { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { sendEmailConfirm } from "@/api/api-email";
import { createRequestPayment } from "@/api/api-payment";
import { sendReqBooked } from "@/api/api-booking";
import { removeDots } from "@/utils/constants";
import ModalConfirmCode from "./pay-modal/modal-verify-code";
import ModalPayCreditCard from "./pay-modal/modal-pay-credit-card";
import ModalBankTransfer from "./pay-modal/modal-pay-bank-transfer";
import BookingSuccessModal from "./pay-modal/display-notify-booking";
import Icon from "./icon";
import iconPayLater from "@/assets/icons/icon-pay-1.png";
import iconPayZaloPay from "@/assets/icons/icon-pay-zalopay.webp";
import iconPayBank from "@/assets/icons/icon-pay-bank.png";
import iconPayCod from "@/assets/icons/icon-pay-code.png";

interface PayListWrapProps {
  totalBooking: string;
  data: any;
  category: string;
  childrenNumber: number;
  adult: number;
  numberRoom?: number;
  dateFrom?: string;
  dateTo?: string;
  hour?: string;
  roomHotelBooking?: any;
}

const paymentMethods = [
  { id: "credit-card", label: "Thẻ tín dụng/Ghi nợ", icon: iconPayLater },
  { id: "zalopay", label: "ZaloPay", icon: iconPayZaloPay },
  { id: "bank-transfer", label: "Chuyển khoản ngân hàng", icon: iconPayBank },
  { id: "cod", label: "Thanh toán trực tiếp", icon: iconPayCod },
];

const PayListWrap: React.FC<PayListWrapProps> = ({
  totalBooking,
  data,
  category,
  childrenNumber,
  adult,
  numberRoom,
  dateFrom,
  dateTo,
  roomHotelBooking,
}) => {
  const { user } = useAuthenticatedStore();
  const router = useRouter();

  const [modalState, setModalState] = useState({
    openConfirm: false,
    openCreditCard: false,
    openBankTransfer: false,
    openBookingSuccess: false,
    method: "",
  });
  const [confirm, setConfirm] = useState({
    code: "",
    idEmail: "",
  });
  const dataInfoBooked = {
    amount: parseFloat(removeDots(totalBooking)),
    infoUser: { idUser: user?._id, email: user?.email },
    tripId: data._id,
    unitCode: data.unitCode,
    startDate: data.startDate,
    category,
    img: data.images[0],
    numberTicketAdult: Number(childrenNumber),
    numberTicketChildren: Number(adult),
    numberRoom,
    dateFrom,
    dateTo,
    infoAttraction: { name: data.name, address: data.city },
    infoHotel: { name: data.name, address: data.city },
    infoHotelRoom: roomHotelBooking,
  };

  const mutationSendInfoBooked = useMutation({ mutationFn: sendReqBooked });

  const handleSendBookingRequest = useCallback(
    ({
      paymentMethod,
      isSuccess,
    }: {
      paymentMethod: string;
      isSuccess: boolean;
    }) => {
      mutationSendInfoBooked.mutate(
        { ...dataInfoBooked, paymentMethod, isSuccess },
        {
          onSuccess: (res) =>
            res.status === 200 &&
            setModalState((prev) => ({ ...prev, openBookingSuccess: true })),
          onError: (err) => console.error(err),
        }
      );
    },
    [dataInfoBooked]
  );

  const handleSendEmailConfirm = async () => {
    try {
      if (user) {
        const data = await sendEmailConfirm(user.email);
        if (data) {
          setConfirm(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentRequest = useCallback(async () => {
    if (!modalState.method)
      return toast.error("Vui lòng chọn phương thức thanh toán");

    switch (modalState.method) {
      case "credit-card":
        setModalState((prev) => ({ ...prev, openCreditCard: true }));
        break;
      case "zalopay":
        const result = await createRequestPayment(dataInfoBooked);
        result?.data && router.push(result.data.order_url);
        break;
      case "bank-transfer":
        setModalState((prev) => ({ ...prev, openBankTransfer: true }));
        break;
      case "cod":
        await handleSendEmailConfirm();
        setModalState((prev) => ({ ...prev, openConfirm: true }));
        break;
    }
  }, [modalState.method, dataInfoBooked, router]);
  const handleClose = () => {
    setModalState((prev) => ({ ...prev, openCreditCard: false }));
  };
  return (
    <div className="posing-vertical-4">
      <h3 className="text-medium font-semibold">Chọn phương thức thanh toán</h3>
      <p className="text-smallest text-black_sub">
        Chọn ít nhất 1 phương thức thanh toán dưới đây để tiếp tục
      </p>
      <ul className="space-y-4">
        {paymentMethods.map(({ id, label, icon }) => (
          <li key={id}>
            <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value={id}
                onChange={() =>
                  setModalState((prev) => ({ ...prev, method: id }))
                }
              />
              <span className="ml-3 space-x-2">
                <Icon className="mr-2" tooltip={`Thanh toán qua ${label}`}>
                  <Image
                    alt="icon-pay"
                    width={40}
                    height={40}
                    className="w-8 h-8"
                    src={icon}
                  />
                </Icon>
                {label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <Button
        onClick={handlePaymentRequest}
        disabled={!modalState.method}
        className="bg-bg_primary_blue_sub hover:bg-bg_primary_active mt-4 text-white w-full py-6"
      >
        Tiếp tục <ChevronRight className="size-5" />
      </Button>

      <ModalConfirmCode
        code={confirm.code}
        email={user?.email ?? ""}
        lastName={user?.lastname ?? "" + " " + user?.firstname ?? ""}
        setOpenModalSuccesBooking={(val: any) =>
          setModalState((prev) => ({ ...prev, openBookingSuccess: val }))
        }
        open={modalState.openConfirm}
        setOpen={(val) =>
          setModalState((prev) => ({ ...prev, openConfirm: val }))
        }
        handleSendReqBooked={handleSendBookingRequest}
      />
      <ModalBankTransfer
        open={modalState.openBankTransfer}
        setOpen={(val) =>
          setModalState((prev) => ({ ...prev, openBankTransfer: val }))
        }
      />
      <ModalPayCreditCard
        open={modalState.openCreditCard}
        setOpen={(val) =>
          setModalState((prev) => ({ ...prev, openCreditCard: val }))
        }
      />
      <BookingSuccessModal
        model="hotel"
        handleClose={handleClose}
        open={modalState.openBookingSuccess}
        setOpen={(val) =>
          setModalState((prev) => ({ ...prev, openBookingSuccess: val }))
        }
      />
    </div>
  );
};

export default PayListWrap;
