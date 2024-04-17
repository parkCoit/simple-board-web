import axios from "axios"
const server = `http://localhost:8000`

export const kakaoLoginData = req =>  axios.post(`${server}/kakao/login`, req)

export const summonerData = req => {
    console.log('req : ',req)
    return axios.get(`${server}/gameList/users/`, {
        params : req
    })
}

export const historyData = req => axios.post(`${server}/gameList/history/`, req)
export const historyUpdate = req => axios.put(`${server}/gameList/history/`, req)

export const addPost = req => axios.post(`${server}/post/`, req)
export const postUpdate = req => axios.put(`${server}/post/`, req)
export const postData = req => {
    console.log('req : ',req)
    return axios.get(`${server}/post/`, {
        params : req
    })
}

export const deletePost = req => {
    console.log('req : ',req)
    return axios.delete(`${server}/post/`, {
        params : req
    })
}




