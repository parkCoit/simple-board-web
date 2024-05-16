
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { boardData, boardUpdate, addBoard } from "../../api";

import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function Edit() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            boardData({ 'customId': id })
                .then(res => {
                    setTitle(res.data.title);
                    setContent(res.data.content);
                })
                .catch(err => {
                    console.error("게시물 로딩 실패:", err);
                });
        }
    }, [id]);

    const handleSubmitButton = (e: any) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해 주세요.');
            return;
        }

        if (id) {
            boardUpdate({ 'title': title, 'content': content, 'customId': id })
                .then(res => {
                    alert('수정 완료!');
                    navigate(`/`);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            const token = sessionStorage.getItem('token');
            if (!token) {
                alert('로그인 먼저 해주세요');
                return;
            }

            const decodedToken: any = jwtDecode(token);
            addBoard({ 'title': title, 'content': content, 'author': decodedToken.id })
                .then(res => {
                    alert('게시글이 작성되었습니다!');
                    navigate(`/`);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    const handleCancelButton = () => {
        const confirmCancel = window.confirm('취소하시겠습니까?');
        if (confirmCancel) {
            navigate(`/`);
        }
    }

    
  return (
    <>
      
      <div className="h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">글쓰기</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6">
              <div className="md:order-1">
                <form id="form" onSubmit={handleSubmitButton}>
                    <TabsContent value="complete" className="mt-0 border-0 p-0 ">
                    <div className="flex h-full flex-col space-y-4 mb-4">
                        <Label htmlFor="title">제목</Label>
                        <Input id="title" type="text" className="bg-white" value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="flex h-full flex-col space-y-4">
                        <Label htmlFor="content">내용</Label>
                        <Textarea
                        placeholder="Write a tagline for an ice cream shop"
                        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                        id="content"
                        value={content}
                        onChange={(e) => {e.preventDefault();
                            setContent(e.target.value)}}
                        />
                        <div className="flex items-center space-x-2 ml-auto">
                        <Button type="submit" > {id ? '수정하기' : '작성하기'} </Button>
                        <Button type="button" variant="secondary" onClick={handleCancelButton}> 취소 </Button>
                        </div>
                    </div>
                    </TabsContent>
                </form>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}