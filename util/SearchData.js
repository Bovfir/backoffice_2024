import { requestData as APIRequestData } from "../src/data/index.js";
import routes from "../src/data/APIRoute.js";

export const searchCombine = async (componentKey, search, pagination) => {
    try {
        const size = pagination.state.size;
        const page = pagination.state.page + 1;
        const response = await APIRequestData({
            route: `${routes[componentKey].searchCombinePublicEvent}page=${page}&perPage=${size}&search=${search}`
        });

        const nbRowsSearch = await APIRequestData({
            route: `${routes[componentKey].countRowsGetCombineSearchPublicTotalCount}search=${search}`
        });

        return {
            data: response,
            rowCount: Number(nbRowsSearch),
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const searchData = async (componentKey, search, pagination) => {
    try {
        const size = pagination.state.size;
        const page = pagination.state.page + 1;
        const response = await APIRequestData({
            route: `${routes[componentKey].search}page=${page}&perPage=${size}&search=${search}`
        });

        const responseCount = await APIRequestData({
            route: `${routes[componentKey].searchedTotalCount}search=${search}`
        });

        return {
            data: response?.response || [],
            rowCount: Number(responseCount?.response || 0),
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const searchPublicData = async (componentKey, pagination) => {
    try {
        const size = pagination.state.size;
        const page = pagination.state.page + 1;
        const response = await APIRequestData({
            route: `${routes[componentKey].searchedPublicEvents}page=${page}&perPage=${size}`
        });

        const nbRowsPublic = await APIRequestData({
            route: `${routes[componentKey].searchPublicEventTotalCount}`
        });

        return {
            data: response?.response || [],
            rowCount: Number(nbRowsPublic),
        };
    } catch (error) {
        throw new Error(error);
    }
};
