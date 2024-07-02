import { ProgramType } from "@/type";
import request from "@/utils/request";

export async function getProgramList() {
    return request.get('http://127.0.0.1:4523/m2/4037335-3674408-default/148591994');
    // return res.data.data.list;
}

export async function programAdd(params: ProgramType) {
    return request.post('https://mock.apipark.cn/m2/4037335-3674408-default/148592077',params);
    // return res.data.data.list;
}

export async function programDelete(id: number) {
    return request.delete(`https://mock.apipark.cn/m1/4037335-3674408-default/program/${id}`);
    // return res.data.data.list;
}