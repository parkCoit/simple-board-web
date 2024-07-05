import secrets from "@/secret.json";
import axios from "axios";
const { SERVER } = secrets;

export const kakaoLoginData = (req) => axios.post(`${SERVER}/kakao/login`, req);

export const addBoard = (req) => axios.post(`${SERVER}/board/`, req);
export const boardUpdate = (req) => axios.put(`${SERVER}/board/`, req);
export const boardData = (req) => {
  return axios.get(`${SERVER}/board/`, {
    params: req,
  });
};

export const deleteBoard = (req) => {
  return axios.delete(`${SERVER}/board/`, {
    params: req,
  });
};
