import axios from "axios";
let request =axios.create({
    baseURL:'https://apifoxmock.com/m1/5748444-5431348-default' ,
    withCredentials: true,
    onUploadProgress:(progressEvent)=>{
        console.log(progressEvent,"worker");
        
    }
})
export const getCountData=(data)=>{
    return request.post('/kkk',data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }})
}
export const webSocket=(fn:Function)=>{
    console.log('webSocket',fn);
    let ws=[]
    ws.push(fn)
    ws[0]()
}