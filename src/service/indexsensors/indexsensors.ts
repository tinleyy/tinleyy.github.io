import { axiosWithoutAuth } from '../axios';
import { IndexSensorsResponse, IndexSensorsRequest, ChartDataResponse, IndexSensorsEditRequest } from './types';
//import useSWR from 'swr';
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getAllIndexSensors = async (index_id: number, skip: number, limit: number | any): Promise<IndexSensorsResponse[]> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/?index_id=${index_id}&skip=${skip}${limit ? `&limit=${limit}` : ""}`
  );
  //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
  return data?.data ?? [];
};

export const createIndexSensor = async (req: IndexSensorsRequest): Promise<IndexSensorsResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `${base}/`, req
  );
  return data ?? [];
}

export const getOneIndexSensor = async (id: number): Promise<IndexSensorsResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/${id}`
  );
  return data?.data ?? [];
};

export const updateOneIndexSensor = async (id: number, req: IndexSensorsEditRequest): Promise<IndexSensorsResponse> => {
  const { data } = await axiosWithoutAuth().put(
    `${base}/${id}`, req
  );
  return data ?? [];
};

export const deleteOneIndexSensor = async (id: number): Promise<IndexSensorsResponse> => {
  const { data } = await axiosWithoutAuth().delete(
    `${base}/${id}`
  );
  return data ?? [];
};

export const getIndexsensorsGraphdata = async (index_id: number, sensor_id: number|null, start_date: string, end_date: string): Promise<ChartDataResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/graphdata/?index_id=${index_id}${sensor_id ? `&sensor_id=${sensor_id}` : ""}&start_date=${start_date}&end_date=${end_date}`
  );
  //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
  return {
    data: data?.data ?? [],
    math: data?.math ?? []
  };
};

let base = "/indexsensor";