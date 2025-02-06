import { sendImage as APISendImage } from "../src/data/index.js"
import { updateData as APIUpdateData } from "../src/data/index.js"
import { sendData as APISendData } from "../src/data/index.js"
import { errorToString } from "./ErrorIndex.js";
import {exponentialRetry} from "./ExponentialRetry.js";
import {validation} from "../src/validator/validation.js";
import {fetchData} from "./FetchData.js";

const manipulateData = async (data, dataUpdated, columnsNames, componentKey, setUploadError, setIsUploading,
    setTableVisible, setTableAddVisible,setData,setNbRow,pagination, image, type) => {

    setUploadError(null);
    setIsUploading(true);
    let imagePath = null;

    const retryWrapper = async (fn) => {
        return await exponentialRetry(fn, 3, 500, 2);
    };

    try {
        const modifiedValues = getModifiedValues(data, dataUpdated);

        if (image.current) {
            const formData = new FormData();
            formData.append("image", image.current);
            imagePath = await APISendImage(formData);
            modifiedValues.picture_path = imagePath;
        }

        const onlyPrimaryKeys = Object.keys(modifiedValues).every((key) =>
            (["id"]).includes(key)
        );

        if (onlyPrimaryKeys) {
            setUploadError("No changes detected. Update operation aborted.");
            return;
        }

        if (type === "Add") {
            const data = await validation[componentKey].add(modifiedValues);
            await retryWrapper(() => APISendData({ route: `/${componentKey}/`, data: data })); // Retry sur APISendData
        } else {
            const data = await validation[componentKey].update(modifiedValues);

            await retryWrapper(() => APIUpdateData({
                route: `/${componentKey}/`,
                data: data,
            }));
        }
        setTableVisible(false);
        setTableAddVisible(false);

        const result = await fetchData(componentKey, pagination);
        setData(result.data);
        setNbRow(result.rowCount);
        setUploadError(null);

    } catch (error) {
        const errorMessage = errorToString(error);
        setUploadError(errorMessage);

        if (error.message.includes("Validation failed")) {
            const validationErrors = JSON.parse(error.message).errors;
            const errorMessages = validationErrors.map((err) => `${err.field}: ${err.message}`).join("; ");
            setUploadError(`Validation errors : ${errorMessages}`);
        }
    } finally {
        setIsUploading(false);
    }
};

const getModifiedValues = (original, updated) => {
    const modified = {};
    modified.id = original.id;

    Object.keys(updated).forEach((key) => {
         if (updated[key] !== original[key]) {
            modified[key] = updated[key];
        }
    });

    return modified;
};


export {manipulateData};
