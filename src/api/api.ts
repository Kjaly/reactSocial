import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../Types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7e073583-d588-4a18-9136-9563b0d73e68',
    },
})





export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCapthca {
    CapthaIsRequired = 10,
}

type MeResponseType = {
    data: { id:number,email:string, login:string }
    resultCode:ResultCodeEnum
    messages:Array<string>
}

type LoginResponseType = {
    data: { userId:number }
    resultCode:ResultCodeEnum | ResultCodeForCapthca
    messages:Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data);
    },
    login(email:string,password:string,rememberMe = false,captcha:string | null) {
        return instance.post<LoginResponseType>(`auth/login`, {email,password,rememberMe,captcha})
        .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

export const profileAPI = {
    getProfile(userId = 11251) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`, {status:status})
            .then(response => response.data)
    },
    savePhoto(photoFile:any){
        const formData= new FormData();
        formData.append("image",photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile:ProfileType){
        return instance.put(`profile`,  profile)
            .then(response => response.data)
    }
}


