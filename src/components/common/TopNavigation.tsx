import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom"

export default function TopNavigation() {

  const navigate = useNavigate()

  const location = useLocation();

  const [token, setToken] = useState(sessionStorage.getItem('token'));



  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, [location]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    alert('로그아웃 완료')
    navigate('/');
  };

    return(
        <div className="flex w-full border-b-2 p-4">
            <h1 className='text-3xl cursor-pointer' onClick={() => {navigate('/')}}>게시판</h1>
            {token ? (
            <Button className='ml-auto' onClick={handleLogout}> 로그아웃 </Button>
          ) : (
            <Button className='ml-auto' onClick={handleLogin}> 로그인 </Button>
          )
          }
        </div>
    )
}