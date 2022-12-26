import { axiosWithoutAuth } from './axios';

export interface RelationshipRequest {
    name: string,
    sensor_id: number,
    start_date: string,
    end_date: string
}

export interface RelationshipResponse {
    amount: number,
    level: number,
    created_at: Date
}

export const getRelationship = async (req: RelationshipRequest): Promise<RelationshipResponse[]> => {
    const { data } = await axiosWithoutAuth().get(
        `${base}/?name=${req.name}&sensor_id=${req.sensor_id}&start_date=${req.start_date}&end_date=${req.end_date}`
    );
    return data.data;
};

export const getUpDownUnchange = async (req: RelationshipRequest): Promise<{
    data: Array<any>,
    index_id: number
}> => {
    const { data } = await axiosWithoutAuth().get(
        `/upDownUnchange?name=${req.name}&sensor_id=${req.sensor_id}&start_date=${req.start_date}&end_date=${req.end_date}`
    );
    return {
        data: data.data,
        index_id: data.index_id
    };
};

interface UDUCIndexesResponse {
    sensor_id: number,
    start_date: Date,
    end_date: Date
}

export const getUpDownUnchangeInSameIndex = async (index_id: number, req: Array<number>): Promise<UDUCIndexesResponse[]> => {
    console.log(req);
    const { data } = await axiosWithoutAuth().post(
        `/upDownUnchangeInSameIndex?index_id=${index_id}`, req
    );
    return data;
};

let base = "/relationship";