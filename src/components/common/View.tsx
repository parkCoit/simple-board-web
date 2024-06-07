
import { useEffect, useState } from "react";
import { boardData, deleteBoard } from "../../api";
import { useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"

interface BoardDetails {
  title: string;
  content: string;
  author: {
    id : string;
    nickname : string;
  }
  time?: string;
  modification_time: string;
}

interface DecodedToken {
  id?: string;
}

export default function View() {

  const [boardDetail, setBoardDetail] = useState<BoardDetails | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  

  useEffect(() => {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      boardData({ 'customId': numericId })
        .then(res => {
            setBoardDetail(res.data);
            const token = sessionStorage.getItem('token');
            if(token) {
              const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
              setIsAuthor(decoded.id === res.data.author.id);
            }
        })
        .catch(err => {
            console.error("게시물 로딩 실패:", err);
        });
    }
}, [id]); 

const handleEdit = () => {
  navigate(`/Edit/${id}`)
}

const handleDelete = () => {

  const isConfirmed = window.confirm("이 게시물을 삭제하시겠습니까?");
  if (isConfirmed) {
      deleteBoard({'customId' : id}) 
          .then(() => {
              alert("게시물이 삭제되었습니다.");
              navigate('/')
          })
          .catch((err) => {
              console.error("게시물 삭제 실패:", err);
              alert("게시물을 삭제하는 데 실패했습니다.");
          });
  }
  else {
      alert('삭제 취소')
  }

}

const handleList = () => {
  navigate('/')
}

  return (
    <>
      
      <div className="h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <div>
            <h2 className="text-2xl font-semibold"> {boardDetail?.title} </h2>
            <p className="text-xs">
              {boardDetail?.author.nickname}({boardDetail?.author.id})
            </p>
          </div>
          <p> 수정시간 : {boardDetail?.modification_time} </p>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6">
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0 ">
                  <div className="flex h-full flex-col space-y-4">
                    <Card
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    >
                      <pre> {boardDetail?.content} </pre>
                    </Card>
                    <div className="flex items-center space-x-2 ml-auto ">
                      {
                        isAuthor && (
                          <>
                            <Button onClick={handleEdit} >수정하기</Button>
                            <Button variant="destructive" onClick={handleDelete}>삭제하기</Button>
                          </>
                        )
                      }
                      <Button variant="secondary" onClick={handleList}>
                        리스트로
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}