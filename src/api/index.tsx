import secrets from "@/secret.json";
import axios from "axios";
const { SERVER } = secrets;

export const kakaoLoginData = (req: object) =>
  axios.post(`${SERVER}/kakao/login`, req);

export const addBoard = (req: object) => axios.post(`${SERVER}/board/`, req);
export const boardUpdate = (req: object) => axios.put(`${SERVER}/board/`, req);
export const boardData = (req: object) => {
  return axios.get(`${SERVER}/board/`, {
    params: req,
  });
};

export const deleteBoard = (req: object) => {
  return axios.delete(`${SERVER}/board/`, {
    params: req,
  });
};
