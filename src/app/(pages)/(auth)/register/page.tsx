import RegisterForm from "./register-form";
import Link from "next/link";
export default function Regiter() {
  return (
    <div className="container mt-20 flex items-center justify-center">
      <div className="max-w-[400px] w-full ">
        <h2 className="text-center font-[600] text-[1.4rem] py-10">Đăng Ký</h2>
        <RegisterForm />
        <div className="w-full flex items-center justify-between pt-4 text-[#888]">
          <h4>
            <Link href="/login" className="text-blue-500 underline">
              Đăng nhập
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
