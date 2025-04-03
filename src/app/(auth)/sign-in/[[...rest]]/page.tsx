import { Metadata } from "next";
import SignInForm from "@/components/components/auth/signin-form";
export const metadata: Metadata = {
  title: "Đăng nhập - KoKoTravel",
};
const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
