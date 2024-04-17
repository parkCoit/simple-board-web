import { useEffect } from "react";
import { kakaoLoginData } from "../api";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export interface AuthPageProps {
}

interface LoginRequest {
    code: string;
}

interface CustomJwtPayload extends JwtPayload {
    id?: string;  // 'id' 필드가 선택적으로 존재할 수 있음을 명시
}

const AuthPage = (props: AuthPageProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        const getData = async (data: LoginRequest) => {
            try {
                const response = await kakaoLoginData(data);
                console.log('then 이에요 ')
                const resData = JSON.stringify(response.data)
                sessionStorage.setItem('token', resData)
                alert(JSON.stringify(resData))
                console.log(resData)

                const decodedToken = jwtDecode<CustomJwtPayload>(resData)
                console.log(decodedToken['id'])
                navigate('/')
            } catch (err: any) {  // Error 타입이 아닌 경우를 위해 any 사용을 추천하지 않지만, API 에러가 다양한 경우에 유연성을 제공
                console.error('catch 에요 ', err)
                alert(err.message || 'An error occurred')
            }
        };

        if (code) {
            getData({ 'code': code });
        }

        
    }, [navigate]);

    return (
        <div className='p-4'>
            a
        </div>
    );
};

export default AuthPage;