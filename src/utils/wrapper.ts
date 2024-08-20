import axios from 'axios';

const checkResponse = (response: any) => response.data;
const catchError = (error: any) => error;

export const wrapper = (method: "post" | "get" | "put" | "delete", url: string, data?: any, headers?: any) => axios.request({method, url, data, headers}).then(checkResponse).catch(catchError);
