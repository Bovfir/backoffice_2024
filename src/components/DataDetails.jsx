import { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import detailsTableStyles from "../styles/detailsTableStyles.js";
import { loadValuesForeignKeys as APILoadValuesForeignKeys } from "../data/index.js";
import foreignKeyEditable from "../data/IndexKey.js";
import InputField from "./InputField.jsx";
import { typeDectector } from "../../util/utils.js";
import {manipulateData} from "../../util/ManipulateData.js";
import {initValues} from "../../util/utils.js";
import {errorToString} from "../../util/ErrorIndex.js";

const DataDetails = ({ columnsNames, type, event, componentKey, theme, setTableVisible, setTableAddVisible, setData, setNbRow,pagination }) => {
    const image = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const columnsAdd = columnsNames?.["add"] || {};
    const columnsTitle = columnsNames?.["details"] || {};
    const columnsDetails = type === "Add" ? columnsAdd : columnsTitle;
    const columnsIgnore = columnsNames?.["ignore"] || {};
    const [valuesForeignKeys, setValuesForeignKeys] = useState(null);

    let eventUpdated = initValues(event,type,columnsAdd);

    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: eventUpdated || {},
    });

    useEffect(() => {
        const fetchForeignKeys = async () => {
            if (foreignKeyEditable[componentKey] !== undefined) {
                try {
                    const values = await APILoadValuesForeignKeys({ componentKey });
                    setValuesForeignKeys(values);
                } catch (error) {
                    setUploadError(errorToString(error));
                }
            }
        };

        fetchForeignKeys();
    }, [componentKey]);

    useEffect(() => {
        if (valuesForeignKeys) {
            Object.keys(valuesForeignKeys).forEach((key) => {
                if (!eventUpdated[key] && valuesForeignKeys[key]?.length > 0) {
                    const defaultValue = parseInt(valuesForeignKeys[key][0]?.id, 10);
                    setValue(key, defaultValue);
                }
            });
        }
    }, [valuesForeignKeys, setValue, eventUpdated]);

    const onSubmit = (data) => {
        manipulateData(event, data, columnsNames, componentKey, setUploadError, setIsUploading, setTableVisible, setTableAddVisible,setData,setNbRow,pagination, image, type);
    };

    if (!eventUpdated || !columnsDetails) {
        return <div>No event data available.</div>;
    }

    return (
        <form style={detailsTableStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(eventUpdated).filter((key) => key in columnsDetails).map((key, index) => {
                let valueElement;

                if (valuesForeignKeys && Object.keys(valuesForeignKeys).includes(key)) {
                    valueElement = (
                        <Controller name={key} control={control} render={({ field }) => (
                                <select {...field} value={field.value ?? ""} style={detailsTableStyles.select} >
                                    {Array.isArray(valuesForeignKeys[key]) && valuesForeignKeys[key].length > 0 ? (
                                        valuesForeignKeys[key].map((fk) => (
                                            <option key={`fk-${fk.id}`} value={fk.id}>
                                                {Object.keys(fk).filter((subKey) => subKey !== "id")
                                                    .map((subKey) => fk[subKey])
                                                    .join(" || ")}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Aucune donnée disponible</option>
                                    )}
                                </select>
                            )}
                        />
                    );
                } else {
                    if (key === "picture_path") {
                        valueElement = (
                            <input
                                id={key}
                                type="file"
                                accept="image/*"
                                onChange={(e) => (image.current = e.target.files[0])}
                                style={detailsTableStyles.input}
                            />
                        );
                    } else {
                        let typeInput = typeDectector(eventUpdated[key]);
                        valueElement = (
                            <Controller name={key} control={control} render={({ field }) => (
                                    <InputField
                                        id={index}
                                        type={typeInput}
                                        value={field.value ?? ""}
                                        placeholder={`Enter a ${columnsTitle[key] || [key]}`}
                                        onChange={field.onChange}
                                        disabled={Object.keys(columnsIgnore).includes(key)}
                                        style={detailsTableStyles.input}
                                    />
                                )}
                            />
                        );
                    }
                }

                return (
                    <div key={key} style={detailsTableStyles.formField}>
                        <label style={detailsTableStyles.label}>
                            {columnsTitle[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        {valueElement}
                    </div>
                );
            })}
            <br />
            {uploadError && <p style={detailsTableStyles.error}>{uploadError}</p>}
            <button type="submit" style={detailsTableStyles.button} disabled={isUploading}>
                {isUploading ? `${type === "Add" ? "Adding" : "Updating"}...` : type}
            </button>
        </form>
    );
};

export default DataDetails;
