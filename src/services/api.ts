import axios from 'axios';
import { stringify } from 'qs';

export default class Api<T> {
    constructor(model?: Partial<T>){
        if(model) {
            Object.assign(this, model);
        }
    }
    baseUrl = 'http://localhost:4000/';

    public async post(url: string, payload: T): Promise<T> {
        const { data } = await axios.post(`${this.baseUrl}${url}`, payload);
        return data;
    }

    public async get(url: string, query?: object): Promise<T[]> {
        const { data } = await axios.get(`${this.baseUrl}${url}?${stringify(query)}`);
        return data;
    }

    public async getById(url: string, query?: object): Promise<T> {
        const { data } = await axios.get(`${this.baseUrl}${url}?${stringify(query)}`);
        return data;
    }

    public async put(url: string, id: number, payload?: object): Promise<object> {
        const { data } = await axios.put(`${this.baseUrl}${url}/${id}`, payload);
        return data;
    }

    public async delete(url: string, id: number): Promise<boolean> {
        const { data } = await axios.delete(`${this.baseUrl}${url}/${id}`);
        return data;
    }

}
