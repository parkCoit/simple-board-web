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
      <div className="container  relative flex h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            로그인
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <footer className="text-sm">park</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                <span> 카카오 로그인 </span>
              </h1>
            </div>
            <div className={cn("grid gap-6")}>
              <Button
                type="button"
                onClick={loginHandler}
                className="bg-yellow-300 text-black hover:bg-yellow-300"
              >
                <img
                  src="https://sso.prod.bznav.com/_next/static/media/kakao.eb88ad1c.svg"
                  alt="카카오 로그인"
                />
                <span className="ml-2"> 카카오로 시작하기 </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
