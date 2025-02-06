import { requestData as APIRequestData } from "../src/data/index.js";
import { getNbRowCount as APIGetCount } from "../src/data/index.js";

import routes from "../src/data/APIRoute.js";


export const fetchData = async (componentKey,pagination) => {
    try {
        const size = pagination.state.size;
        const page = pagination.state.page + 1;

        const data = await APIRequestData({
            route: `${routes[componentKey].nbElem}page=${page}&perPage=${size}`,
        });

        const count = await APIGetCount({
            route: `${routes[componentKey].totalCount}`,
        });

        return {
            data: data || [],
            rowCount: Number(count || 0),
        };
    } catch (error) {
        throw new Error(error);
    }
};
