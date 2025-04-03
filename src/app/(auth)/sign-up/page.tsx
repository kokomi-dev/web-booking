import { Metadata } from "next";

import SignUpForm from "@/components/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Đăng ký - KoKoTravel",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
