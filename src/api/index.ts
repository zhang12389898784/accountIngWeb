import axios from "axios";
let request =axios.create({
    baseURL:'https://apifoxmock.com/m1/4601026-4250636-default' 
})
export const getCountData=()=>{
    return request.get('/m1/4601026-4250636-default/')
}