import { SchoolType } from "@/type/school";
import request from "@/utils/request";

export async function getSchoolList() {
    return request.get('https://mock.apipark.cn/m2/4037335-3674408-default/152074765');
    // return res.data.data.list;
}

export async function schoolAdd(params: SchoolType) {
    return request.post('https://mock.apipark.cn/m1/4037335-3674408-default/college/info',params);
    // return res.data.data.list;
}