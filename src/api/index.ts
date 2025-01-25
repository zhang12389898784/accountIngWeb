import axios from "axios";
let request =axios.create({
    baseURL:'http://127.0.0.1:4523/m1/4601026-4250636-default' ,
    withCredentials: true,
})
export const getCountData=()=>{
    return request.get('/m1/4601026-4250636-default/')
}