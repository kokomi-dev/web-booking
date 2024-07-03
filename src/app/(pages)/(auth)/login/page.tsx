import LoginForm from "./login-form";
import Link from "next/link";
export default function Login() {
  return (
    <div className="container mt-20 flex items-center justify-center">
      <div className="max-w-[400px] w-full ">
        <h2 className="text-center font-[600] text-[1.4rem] py-10">
          Đăng Nhập
        </h2>
        <LoginForm />
        <div className="w-full flex items-center justify-between pt-4 text-[#888]">
          <h4 className="text-blue-500 underline">Quên mật khẩu ?</h4>
          <h4>
            Bạn chưa có tài khoản !{" "}
            <Link href="/register" className="text-blue-500 underline">
              Đăng ký
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
