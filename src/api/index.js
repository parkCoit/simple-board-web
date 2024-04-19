import axios from "axios"
const server = `http://localhost:8000`

export const kakaoLoginData = req =>  axios.post(`${server}/kakao/login`, req)


export const addBoard = req => axios.post(`${server}/board/`, req)
export const boardUpdate = req => axios.put(`${server}/board/`, req)
export const boardData = req => {
    console.log('req : ',req)
    return axios.get(`${server}/board/`, {
        params : req
    })
}

export const deleteBoard = req => {
    console.log('req : ',req)
    return axios.delete(`${server}/board/`, {
        params : req
    })
}




