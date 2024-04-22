import { useEffect } from "react";
import { kakaoLoginData } from "../../api";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export interface AuthPageProps {
}

interface LoginRequest {
    code: string;
}

interface CustomJwtPayload extends JwtPayload {
    id?: string;  
}

export function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        const getData = async (data: LoginRequest) => {
            try {
                const response = await kakaoLoginData(data);
                const resData = JSON.stringify(response.data)
                sessionStorage.setItem('token', resData)
                const decodedToken = jwtDecode<CustomJwtPayload>(resData)
                console.log(decodedToken.id)
                
                alert(JSON.stringify(decodedToken))
                navigate('/')
            } catch (err: any) {  
                console.error('catch 에요 ', err)
                alert(err.message || 'An error occurred')
            }
        };

        if (code) {
            getData({ 'code': code });
        }

        
    }, [navigate]);
    return(
        <div className='p-4'>
        a
    </div>
    )
}