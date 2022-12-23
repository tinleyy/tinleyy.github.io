import { axiosWithoutAuth } from '../axios';
import { TagsRequest, TagsResponse } from './types';
//import useSWR from 'swr';
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getAllTags = async (keyword: string, skip: number, limit: number | any): Promise<TagsResponse[]> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/?name=${keyword}&skip=${skip}${limit ? `&limit=${limit}` : ""}`
  );
  //const { data, error } = useSWR(`${base}/?name=str&skip=0&limit=100`, fetcher)
  return data.data;
};

export const createTag = async (req: TagsRequest): Promise<TagsResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `${base}/`, req
  );
  return data;
}

export const getOneTag = async (id: number): Promise<TagsResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `${base}/${id}`
  );
  return data.data;
};

export const updateOneTag = async (id: number, req: TagsRequest): Promise<TagsResponse> => {
  const { data } = await axiosWithoutAuth().put(
    `${base}/${id}`, req
  );
  return data.data;
};

export const deleteOneTag = async (id: number): Promise<TagsResponse> => {
  const { data } = await axiosWithoutAuth().delete(
    `${base}/${id}`
  );
  return data.data;
};

let base = "/tag";