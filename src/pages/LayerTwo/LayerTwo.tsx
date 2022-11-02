import { useState } from "react";
import SearchIndexModel from "../SearchIndexModel/SearchIndexModel";

export default function Layer2() {
    const [page, setPage] = useState(0);

    if (page === 0) {
        return <SearchIndexModel/>;
    }

    return <></>
}