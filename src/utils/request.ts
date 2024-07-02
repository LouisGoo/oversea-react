import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import Router from "next/router";
import { message as AntdMessage } from "antd";

interface AxiosInstanceType extends AxiosInstance {
    get<T =any>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T =any>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T =any>(url: string, config?: AxiosRequestConfig): Promise<T>
    options<T =any>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T =any>(url: string, data?:any, config?: AxiosRequestConfig): Promise<T>
    put<T =any>(url: string, data?:any, config?: AxiosRequestConfig): Promise<T>
    patch<T =any>(url: string, data?:any, config?: AxiosRequestConfig): Promise<T>
}
export const CreateAxiosInstance = (config?: any): AxiosInstanceType => {
    const instance = axios.create({
        timeout: 5000,
        ...config,
    });

    instance.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function (response) {
            const {status, data, message} = response as any;
            if(status === 200){
                return data;
            }else if (status === 401){
                return Router.push('/login');
            }else{
                AntdMessage.error(message || '服务端异常');
            }
        },
        function (error) {
            if(error.response && error.response.status === 401){
                return Router.push('/login');
            }
            AntdMessage.error(error?.response?.data?.message || '服务端异常');
            return Promise.reject(error);
        }
    )
    return instance
}

export default CreateAxiosInstance({});