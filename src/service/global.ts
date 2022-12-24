import { axiosWithoutAuth } from './axios';

export interface DataLength {
    index_length: number,
    model_length: number,
    record_length: number
}

export const getLengths = async (): Promise<DataLength> => {
    const { data } = await axiosWithoutAuth().get(
        `/allItemsLength`
    );
    return data.data;
};