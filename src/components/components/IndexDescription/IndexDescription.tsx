import { useEffect, useState } from "react";
import { IndexesResponse } from "../../../service/indexes/types";
import { getOneIndex } from "../../../service/indexes";
import { Typography } from "@mui/material";

export default function IndexDescription({ indexId }: { indexId: number }) {
    const [indexDetails, setIndexDetails] = useState<IndexesResponse>();

    const fetchIndexDetails = async (id: number) => {
        const data = await getOneIndex(id);
        setIndexDetails(data);
    };

    useEffect(() => {
        console.log(indexId);
        if(!indexDetails){
            fetchIndexDetails(indexId);
        }
    }, []);

    return (
        <>
            <Typography variant="h5">{indexDetails?.name}</Typography>
            <Typography variant="caption">Index Id: {indexDetails?.id}</Typography>
            <div>{indexDetails?.description}</div>
        </>
    );
}