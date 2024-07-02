import request from "@/utils/request";
import axios from "axios";

export async function getSchoolList() {
    return request.get('https://mock.apipark.cn/m2/4037335-3674408-default/152074765');
    // return res.data.data.list;
}