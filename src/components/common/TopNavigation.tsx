import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  nickname?: string;
}

export default function TopNavigation() {
  const navigate = useNavigate();

  const location = useLocation();

  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );
  const [decoded, setDecoded] = useState<{ id?: string; nickname?: string }>(
    {}
  );

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      const decodedToken = jwtDecode<CustomJwtPayload>(storedToken);
      setDecoded({ id: decodedToken.id, nickname: decodedToken.nickname });
    } else {
      setDecoded({});
    }
  }, [location]);

  const handleBoardClick = () => {
    navigate("/");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    alert("로그아웃 완료");
    navigate("/");
  };

  return (
    <div className="flex w-full border-b-2 p-4">
      <h1 className="text-3xl cursor-pointer" onClick={handleBoardClick}>
        게시판
      </h1>
      {token ? (
        <div className="ml-auto flex items-center space-x-2">
          <span className="mr-2">{decoded.nickname}님</span>
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
      ) : (
        <Button className="ml-auto" onClick={handleLogin}>
          로그인
        </Button>
      )}
    </div>
  );
}
