import { useState, useEffect } from "react";

export default function useFilter({jsonResult, filters, workbook}){
    const [filteredJsonResult, setFilteredJsonResult] = useState([]);

    useEffect(() => {
    if(workbook.length !== 0){
        if (jsonResult.length !== 0) {
            const filteredResult = jsonResult.filter((item) => {
            let includeItem = true;
            filters.forEach((filter, index) => {
                if (filter !== '') {
                const value = Object.values(item)[index]
                    .toString()
                    .toLowerCase();
                if (!value.includes(filter.toLowerCase())) {
                    includeItem = false;
                }
                }
            });
            return includeItem;
            });
            setFilteredJsonResult(filteredResult);
        } else {
            setFilteredJsonResult([]);
        }
    }
    
    }, [jsonResult, filters]);

    return {filteredJsonResult}
}

