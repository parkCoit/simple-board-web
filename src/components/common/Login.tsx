import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import secrets from "@/secret.json";

export default function Login() {
  const { REST_API_KEY, REDIRECT_URI } = secrets;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">게시판</h1>
            <p className="text-sm text-gray-500 mt-2">
              카카오 계정으로 로그인하세요
            </p>
          </div>

          <Button
            type="button"
            onClick={loginHandler}
            className="w-full bg-yellow-300 text-black hover:bg-yellow-400 flex items-center justify-center py-3"
          >
            <img
              src="https://sso.prod.bznav.com/_next/static/media/kakao.eb88ad1c.svg"
              alt="카카오 로그인"
              className="h-5 w-5"
            />
            <span className="ml-2 font-medium">카카오로 시작하기</span>
          </Button>
        </div>
      </div>
    </>
  );
}
