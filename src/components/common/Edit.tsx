import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

export function Edit() {
    const navigate = useNavigate();
    const alertShown = useRef(false); 

    useEffect(() => {
        if (!alertShown.current) {
            const token = sessionStorage.getItem('token');
            if (!token) {
                alert('로그인 먼저 해주세요!');
                navigate('/login');
                alertShown.current = true; 
            }
        }
    }, [navigate]);

    return (
        <div> Edit Page </div>
    )
}