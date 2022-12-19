import { axiosWithoutAuth } from '../axios';
import { SensorsResponse, SensorsRequest } from './types';
//import useSWR from 'swr';
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getAllSensors = async (keyword: string, skip: number, limit: number | any): Promise<SensorsResponse[]> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/?name=${keyword}&skip=${skip}${limit ? `&limit=${limit}` : ""}`
  );
  //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
  return data.data;
};

export const createSensor = async (req: SensorsRequest): Promise<SensorsResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `${base}/`, req
  );
  return data;
}

export const getOneSensor = async (id: number): Promise<SensorsResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/${id}`
  );
  return data.data;
};

export const updateOneSensor = async (id: number, req: SensorsRequest): Promise<SensorsResponse> => {
  const { data } = await axiosWithoutAuth().put(
    `${base}/${id}`, req
  );
  return data.data;
};

export const deleteOneSensor = async (id: number): Promise<SensorsResponse> => {
  const { data } = await axiosWithoutAuth().delete(
    `${base}/${id}`
  );
  return data.data;
};

let base = "/sensor";