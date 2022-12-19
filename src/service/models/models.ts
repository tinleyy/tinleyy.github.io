import { axiosWithoutAuth } from '../axios';
import { ModelsResponse, ModelsRequest } from './types';

export const getAllModels = async (keyword: string, skip: number, limit: number | any): Promise<ModelsResponse[]> => {
    const { data } = await axiosWithoutAuth().get(
      `${base}/?name=${keyword}&skip=${skip}${limit ? `&limit=${limit}` : ""}`
    );
    //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
    return data.data;
};

export const createModel = async(req: ModelsRequest): Promise<ModelsResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `${base}/`, req
  );
  return data;
}

export const getOneModel = async (id: number): Promise<ModelsResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/${id}`
  );
  return data.data;
};

export const updateOneModel = async (id: number, req: ModelsRequest): Promise<ModelsResponse> => {
  const { data } = await axiosWithoutAuth().put(
    `${base}/${id}`, req
  );
  return data.data;
};

export const deleteOneModel = async (id: number): Promise<ModelsResponse> => {
  const { data } = await axiosWithoutAuth().delete(
    `${base}/${id}`
  );
  return data;
};

let base = "/model";