import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="text-center">
        <p className="text-2xl my-8 mx-0">페이지를 찾을 수 없습니다.</p>
        <Button
          onClick={handleRedirect}
          className="text-lg text-sky-400 bg-inherit "
        >
          게시글로 이동
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
