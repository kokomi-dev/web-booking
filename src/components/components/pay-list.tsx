"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import ModalConfirmCode from "./pay-modal/modal-verify-code";
import { IPayListWrap } from "@/types/component-types";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { z } from "zod";
import { sendEmailConfirm } from "@/api/api-email";
import iconPayLater from "@/assets/icons/icon-pay-1.png";
import iconPayZaloPay from "@/assets/icons/icon-pay-zalopay.webp";
import iconPayBank from "@/assets/icons/icon-pay-bank.png";
import iconPayCod from "@/assets/icons/icon-pay-code.png";
import Icon from "./icon";
import Image from "next/image";
import { toast } from "react-toastify";
import ModalPayCreditCard from "./pay-modal/modal-pay-credit-card";
import ModalBankTransfer from "./pay-modal/modal-pay-bank-transfer";
import BookingSuccessModal from "./pay-modal/display-notify-booking";
import { createRequestPayment } from "@/api/api-payment";
import { removeDots } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendReqBooked } from "@/api/api-booking";

const PayListWrap = ({
  infoBooking,
  totalBooking,
  data,
  category,
  hour,
  childrenNumber,
  adult,
  numberRoom,
  dateFrom,
  dateTo,
}: IPayListWrap) => {
  type InfoBooking = z.infer<typeof infoBooking>;
  const [confirm, setConfirm] = useState({
    idEmail: "",
    code: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreditCard, setOpenModalCreditCard] = useState(false);
  const [openModalBankTransfer, setOpenModalBankTransfer] = useState(false);
  const [openModalBookingSucess, setOpenModalBookingSucess] = useState(false);

  const [method, setMothodPay] = useState("");
  const { user } = useAuthenticatedStore();
  const router = useRouter();

  const dataInfoBooked = {
    amount: parseFloat(removeDots(totalBooking)),
    userId: user?._id,
    tripId: data._id,
    unitCode: data.unitCode,
    startDate: data.startDate,
    category,
    img: data.images[0],
    numberTicketAdult: Number(childrenNumber),
    numberTicketChildren: Number(adult),
    hour: hour,
    paymentMethod: "",
    numberRoom,
    dateFrom,
    dateTo,
  };
  const mutationSendInfoBooked = useMutation({
    mutationFn: sendReqBooked,
  });
  const handleSenReqBookd = async (paymentMethod: string) => {
    mutationSendInfoBooked.mutate(
      { ...dataInfoBooked, paymentMethod },
      {
        onSuccess: async (res) => {
          if (res.status === 200) {
            setOpenModalBookingSucess(true);
          }
        },
        onError: async (err) => {
          console.log(err);
        },
      }
    );
  };
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
  const handleReqPayZaloPay = async () => {
    if (user) {
      const result = await createRequestPayment(dataInfoBooked);

      if (result && result.data) {
        return router.push(result.data.order_url);
      }
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleButton = async (value: InfoBooking) => {
    if (!value) {
      toast.error("Vui lòng nhấp đầy đủ thông tin");
    }
    switch (method) {
      case "credit-card":
        setOpenModalCreditCard(true);
        break;
      case "zalopay":
        await handleReqPayZaloPay();
        break;
      case "bank-transfer":
        setOpenModalBankTransfer(true);
        break;
      case "cod":
        // await handleSendEmailConfirm();
        setOpenModal(true);
        break;

      default:
        break;
    }
  };
  return (
    <div className="posing-vertical-4">
      <h3 className="text-medium font-semibold">Chọn phương thức thanh toán</h3>
      <p className="text-smallest text-black_sub !mt-0">
        Chọn ít nhất 1 phương thức thanh toán dưới đây để tiếp tục
      </p>
      <ul className="space-y-4">
        <li className="">
          <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="payment"
              onChange={(e) => {
                setMothodPay(e.target.value);
              }}
              value="credit-card"
            />
            <span className="ml-3 space-x-2">
              <Icon
                className="mr-2"
                tooltip="Thanh toán qua thẻ tín dụng, ghi nợ"
              >
                <Image
                  alt="icon-pay"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                  src={iconPayLater}
                />
              </Icon>
              Thẻ tín dụng/Ghi nợ
            </span>
          </label>
        </li>

        <li className="">
          <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="payment"
              onChange={(e) => {
                setMothodPay(e.target.value);
              }}
              value="zalopay"
            />
            <span className="ml-3 space-x-2">
              <Icon className="mr-2" tooltip="Thanh toán qua ZaloPay">
                <Image
                  alt="icon-pay"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                  src={iconPayZaloPay}
                />
              </Icon>
              ZaloPay
            </span>
          </label>
        </li>
        <li className="">
          <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="payment"
              onChange={(e) => {
                setMothodPay(e.target.value);
              }}
              value="bank-transfer"
            />
            <span className="ml-3 space-x-2">
              <Icon
                className="mr-2"
                tooltip="Thanh toán chuyển khoản ngân hàng"
              >
                <Image
                  alt="icon-pay"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                  src={iconPayBank}
                />
              </Icon>
              Chuyển khoản ngân hàng
            </span>
          </label>
        </li>
        <li className="">
          <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="payment"
              onChange={(e) => {
                setMothodPay(e.target.value);
              }}
              value="cod"
            />
            <span className="ml-3 space-x-2">
              <Icon className="mr-2" tooltip="Thanh toán trực tiếp tại nơi">
                <Image
                  alt="icon-pay"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                  src={iconPayCod}
                />
              </Icon>
              Thanh toán trực tiếp
            </span>
          </label>
        </li>
      </ul>
      <div className="h-[24px] flex items-center justify-start">
        {method === "cod" && (
          <span className="text-small text-black_sub">
            Xác thực email của bạn - tiếp tục
          </span>
        )}
      </div>

      <Button
        onClick={handleButton}
        disabled={!method}
        type="button"
        className="bg-bg_primary_blue_sub hover:bg-bg_primary_active !mt-4 text-white w-full py-6"
      >
        Tiếp tục <ChevronRight className="size-5" />
      </Button>

      <ModalConfirmCode
        open={openModal}
        setOpen={setOpenModal}
        setOpenModalSuccesBooking={setOpenModalBookingSucess}
        code={confirm?.code}
        lastName={user ? user.lastname : ""}
        email={user ? user.email : ""}
        handleSendReqBooked={handleSenReqBookd}
      />
      <ModalBankTransfer
        open={openModalBankTransfer}
        setOpen={setOpenModalBankTransfer}
      />
      <ModalPayCreditCard
        open={openModalCreditCard}
        setOpen={setOpenModalCreditCard}
      />
      <BookingSuccessModal
        open={openModalBookingSucess}
        setOpen={setOpenModalBookingSucess}
        model="attraction"
        handleClose={handleClose}
      />
    </div>
  );
};

export default PayListWrap;
