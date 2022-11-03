import { axiosWithoutAuth } from '../axios';
import { IndexesResponse, IndexesRequest } from './types';
//import useSWR from 'swr';

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getAllIndexes = async (): Promise<IndexesResponse[]> => {
    const { data } = await axiosWithoutAuth().get(
      `${base}/?name=&skip=0&limit=100`
    );
    //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
    return data.data;
};

export const createIndex = async(req: IndexesRequest): Promise<IndexesResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `${base}/`, req
  );
  return data;
}

let base = "/index";