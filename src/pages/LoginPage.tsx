
import React from 'react';
import { Button } from "@/components/ui/button"

import secrets from "@/secret.json";


export interface LoginPageProps {
}

const LoginPage = (props: LoginPageProps) => {
    const { REST_API_KEY, REDIRECT_URI } = secrets;
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
