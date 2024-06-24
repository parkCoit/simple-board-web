import Login from "@/components/common/Login";

export interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  return (
    <div className="p-4">
      <Login />
    </div>
  );
};

export default LoginPage;
