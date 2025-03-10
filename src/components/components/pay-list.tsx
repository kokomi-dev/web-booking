"use client";
import { sendReqBooked } from "@/api/api-booking";
import { sendEmailConfirm } from "@/api/api-email";
import { createRequestPayment } from "@/api/api-payment";
import LoadingPage from "@/app/loading";
import iconPayLater from "@/assets/icons/icon-pay-1.png";
import iconPayBank from "@/assets/icons/icon-pay-bank.png";
import iconPayCod from "@/assets/icons/icon-pay-code.png";
import iconPayZaloPay from "@/assets/icons/icon-pay-zalopay.webp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeDots } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Icon from "./icon";
import BookingSuccess from "./pay-modal/display-notify-booking";
import ModalBankTransfer from "./pay-modal/modal-pay-bank-transfer";
import ModalPayCreditCard from "./pay-modal/modal-pay-credit-card";
import PayConfirmCode from "./pay-modal/pay-verify-code";

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
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  infoBookingUser: {
    firstname: string;
    lastname: string;
    email: string;
    numberphone: string;
    note?: string;
    pickUpPoint: string;
    idUser: string;
    expectedTime?: string;
  };
}
const stepVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  }),
};

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
  open,
  setOpen,
  infoBookingUser,
}) => {
  const router = useRouter();
  const [modalState, setModalState] = useState({
    openConfirm: false,
    openCreditCard: false,
    openBankTransfer: false,
    openBookingSuccess: false,
    method: "",
  });
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const [confirm, setConfirm] = useState({
    code: "",
    idEmail: "",
  });
  const dataInfoBooked = {
    amount: parseFloat(removeDots(totalBooking)),
    infoUser: {
      idUser: infoBookingUser?.idUser,
      email: infoBookingUser?.email,
      name: infoBookingUser?.firstname + " " + infoBookingUser?.lastname,
    },
    tripId: data._id,
    unitCode: data.unitCode,
    startDate: data.startDate,
    category,
    img: data.images[0],
    numberTicketAdult: Number(adult),
    numberTicketChildren: Number(childrenNumber),
    numberRoom,
    dateFrom,
    dateTo,
    infoAttraction: { name: data.name, address: data.city },
    infoHotel: { name: data.name, address: data.city },
    infoHotelRoom: roomHotelBooking,
    pickUpPoint: infoBookingUser.pickUpPoint,
    expectedTime: infoBookingUser.expectedTime,
    note: infoBookingUser.note,
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
    [dataInfoBooked, mutationSendInfoBooked]
  );
  const mutationSendEmailConfirm = useMutation({
    mutationFn: sendEmailConfirm,
  });

  const [loading, setLoading] = useState(false);
  const nextStep = () => {
    if (step < 3) {
      setLoading(true); // Bắt đầu loading
      setTimeout(() => {
        setStep(step + 1);
        setLoading(false); // Kết thúc loading
      }, 1000); // Giả lập 1 giây loading
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setLoading(true);
      setTimeout(() => {
        setStep(step - 1);
        setLoading(false);
      }, 1000);
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
        nextStep();
        if (infoBookingUser) {
          mutationSendEmailConfirm.mutate(infoBookingUser.email, {
            onSuccess: async (res) => {
              setConfirm(res);
            },
            onError: async (err) => {
              toast.error("Lỗi khi gửi email xác nhận. Liên hệ quản trị viên ");
            },
          });
        }
        break;
    }
  }, [modalState.method, dataInfoBooked, router, mutationSendEmailConfirm]);
  const handleClose = () => {
    setModalState((prev) => ({ ...prev, openCreditCard: false }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="w-[95%] md:w-[80%] lg:w-[70%] xl:w-[65%] rounded-14 bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-y-2">
            {step === 1 && "Chọn phương thức thanh toán"}
            <div className="h-[16px]">
              {modalState?.method === "cod" && (
                <span className="text-blue_main_sub underline font-normal text-smallest">
                  Bước {step}/3
                </span>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            {step === 1 &&
              "Chọn ít nhất 1 phương thức thanh toán dưới đây để tiếp tục"}
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="w-full h-full flex items-center justify-center">
            {loading === true ? (
              <LoadingPage />
            ) : (
              <Fragment>
                {step === 1 && (
                  <div className="w-full posing-vertical-4">
                    <ul className="space-y-4">
                      {paymentMethods.map(({ id, label, icon }) => (
                        <li key={id}>
                          <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-100">
                            <input
                              type="radio"
                              name="payment"
                              value={id}
                              onChange={() =>
                                setModalState((prev) => ({
                                  ...prev,
                                  method: id,
                                }))
                              }
                            />
                            <span className="ml-3 space-x-2 text-small">
                              <Icon
                                className="mr-2"
                                tooltip={`Thanh toán qua ${label}`}
                              >
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
                      Tiếp tục{" "}
                      {mutationSendEmailConfirm.isPending ? (
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue_main_sub rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-2 h-2 lg:w-3 lg:h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green-600 rounded-full animate-bounce"></span>
                        </div>
                      ) : (
                        <ChevronRight size={5} />
                      )}
                    </Button>
                  </div>
                )}
                {step === 2 && (
                  <PayConfirmCode
                    prevStep={prevStep}
                    nextStep={nextStep}
                    code={confirm.code}
                    email={infoBookingUser?.email ?? ""}
                    lastName={
                      infoBookingUser?.lastname ??
                      "" + " " + infoBookingUser?.firstname ??
                      ""
                    }
                    handleSendReqBooked={handleSendBookingRequest}
                  />
                )}
                {step === 3 && (
                  <BookingSuccess model="hotel" handleClose={handleClose} />
                )}
              </Fragment>
            )}
          </div>

          {/* <ModalConfirmCode
            code={confirm.code}
            email={infoBookingUser?.email ?? ""}
            lastName={
              infoBookingUser?.lastname ??
              "" + " " + infoBookingUser?.firstname ??
              ""
            }
            setOpenModalSuccesBooking={(val: any) =>
              setModalState((prev) => ({ ...prev, openBookingSuccess: val }))
            }
            // open={modalState.openConfirm}
            // setOpen={(val) =>
            //   setModalState((prev) => ({ ...prev, openConfirm: val }))
            // }
            handleSendReqBooked={handleSendBookingRequest}
          /> */}
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
        </div>

        <DialogFooter hidden></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayListWrap;
