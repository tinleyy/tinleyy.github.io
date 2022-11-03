import { axiosWithoutAuth } from '../axios';
import { ModelsResponse, ModelsRequest } from './types';

export const getAllModels = async (): Promise<ModelsResponse[]> => {
    const { data } = await axiosWithoutAuth().get(
      `${base}/?name=&skip=0&limit=100`
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

let base = "/model";