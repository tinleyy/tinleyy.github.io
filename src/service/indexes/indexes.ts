import { axiosWithoutAuth } from '../axios';
import { IndexesResponse, IndexesRequest } from './types';
//import useSWR from 'swr';
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getAllIndexes = async (keyword: string, skip: number, limit: number | any): Promise<IndexesResponse[]> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/?name=${keyword}&skip=${skip}${limit ? `&limit=${limit}` : ""}`
  );
  //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
  return data.data;
};

export const createIndex = async (req: IndexesRequest): Promise<IndexesResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `${base}/`, req
  );
  return data;
}

export const getOneIndex = async (id: number): Promise<IndexesResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/${id}`
  );
  return data.data;
};

export const updateOneIndex = async (id: number, req: IndexesRequest): Promise<IndexesResponse> => {
  const { data } = await axiosWithoutAuth().put(
    `${base}/${id}`, req
  );
  return data.data;
};

export const deleteOneIndex = async (id: number): Promise<IndexesResponse> => {
  const { data } = await axiosWithoutAuth().delete(
    `${base}/${id}`
  );
  return data.data;
};

let base = "/index";