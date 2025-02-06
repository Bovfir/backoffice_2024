import axios from 'axios';
import routes from "./APIRoute.js";
import foreignKeyEditable from "./IndexKey.js";
import {errorToString} from "../../util/ErrorIndex.js";

const URL = "http://192.168.0.37:3001/api/v1";
const token = localStorage.getItem('token');

const logUser = async (email, password) => {
    const token =  await axios.post(`${URL}/admin/login`, {
        email: email,
        password: password
    });
    return token.data
};

const sendImage = async (formData) => {

    const response = await axios.post(`${URL}/uploadImage`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    return response.data.imagePath;
};

const updateData = async({route, data}) => {

    await axios.patch(`${URL}${route}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const sendData = async({route, data}) => {

    await axios.post(`${URL}${route}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

};

const requestData = async({route}) => {

    const response = await axios.get(`${URL}${route}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

const deleteNbData = async({data, route}) => {
    await axios.delete(`${URL}${route}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: data,
    });
};

const chargeKeys = async({ keys, routesKey }) => {

    const requests = Object.keys(keys).map(async (key) => {
        const route = keys[key];

        try {
            const response = await axios.get(`${URL}/${route}${routesKey}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return { key, data: response.data };
        } catch (error) {
            throw new Error(error);
        }
    });

    try {
        const results = await Promise.all(requests);

        const resultsWithKeys = results.reduce((acc, { key, data }) => {
            acc[key] = data;
            return acc;
        }, {});

        return resultsWithKeys;
    } catch (error) {
        throw new Error(error);
    }
};

const loadValuesForeignKeys = async ({componentKey}) => {
    const valuesForeignKeys = await chargeKeys({
        keys: foreignKeyEditable[componentKey],
        routesKey: routes[componentKey].keys
    });

    return valuesForeignKeys;
};


const getNbRowCount = async ({route}) => {
    const response = await axios.get(`${URL}${route}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


const testToken = async (tToken) => {
    await axios.get(`${URL}/user/me`, {
        headers: {
            Authorization: `Bearer ${tToken}`,
        },
    });
    return true;
};


export {logUser,sendImage,sendData, updateData, requestData, getNbRowCount,chargeKeys ,deleteNbData, loadValuesForeignKeys, testToken};