import apiClient from "../context/axios";

export const getAllCountry = async () => {
    const res = await apiClient.get('/all');
    return res.data;
}

export const getCountryName = async (name: string = 'usa') => {
    const res = await apiClient.get(`/name/${name}`);
    return res.data;
}