
import React from 'react';
import { Button } from "@/components/ui/button"

export interface LoginPageProps {
}

const LoginPage = (props: LoginPageProps) => {
    const REST_API_KEY = '83737e699fa7fe760ecf8b866a016030';
    const REDIRECT_URI = 'http://localhost:3000/auth';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const loginHandler = () => {
        alert(link)
        window.location.href = link;
    };

    return <div>
        <Button type='button' onClick={loginHandler}>
                        카카오 로그인
                    </Button>
    </div>;
};

export default LoginPage;
