import { axiosWithoutAuth } from './axios';

interface CorrRequest {
    "A": Array<number>,
    "B": Array<number>
}

export const getCorr = async (req: CorrRequest): Promise<number> => {
    console.log(req);
    const { data } = await axiosWithoutAuth().post(
        `${base}`, req
    );
    return data;
};

let base = "/corr";