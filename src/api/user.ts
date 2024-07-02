import { UserLoginType, UserType } from "@/type";
import request from "@/utils/request";

export async function getUserList() {
    return request.get('https://mock.apipark.cn/m1/4037335-3674408-default/user/list');
}

export async function userAdd(params: UserType) {
    return request.post('https://mock.apipark.cn/m2/4037335-3674408-default/148592077',params);
}

export async function userDelete(id: number) {
    return request.delete(`https://mock.apipark.cn/m1/4037335-3674408-default/program/${id}`);
}

export async function userLogin(params: UserLoginType) {
    return request.post('https://mock.apipark.cn/m2/4037335-3674408-default/148591070',params);

}