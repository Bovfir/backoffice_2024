import { deleteNbData as APIDeleteData } from "../src/data/index.js";
import {errorToString} from "./ErrorIndex.js";
import {fetchData} from "./FetchData.js";

export const deleteData = async (idDelete, componentKey, routes, setError, setData, setNbRow, pagination) => {
    try {
        let ids = [];

        if (idDelete?.ids?.length > 0) {
            ids = idDelete.ids;
        } else if (idDelete?.id) {
            ids = [idDelete.id];
        }
        const dataToDelete = { ids };

        await APIDeleteData({ data: dataToDelete, route: `${routes[componentKey].delete}` });

        const result = await fetchData(componentKey, pagination);
        setData(result.data);
        setNbRow(result.rowCount);

    } catch (error) {
        setError(errorToString(error));
    }
};