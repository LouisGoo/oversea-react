import { ApplyType } from "@/type";
import request from "@/utils/request";

export async function getApplyList() {
    return request.get('https://mock.apipark.cn/m1/4037335-3674408-default/apply/list');
}

export async function applyAdd(params: ApplyType) {
    return request.post('https://mock.apipark.cn/m2/4037335-3674408-default/148592077',params);
}

export async function programDelete(id: number) {
    return request.delete(`https://mock.apipark.cn/m1/4037335-3674408-default/program/${id}`);
}