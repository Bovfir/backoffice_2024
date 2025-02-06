import React from "react";
import detailsTableStyles from "../styles/detailsTableStyles.js";

const InputField = ({ type, value, placeholder, onChange, disabled, id }) => {
    switch (type) {
        case "number":
            return (
                <input
                    id={id}
                    type="number"
                    style={detailsTableStyles.input}
                    value={value || 0}
                    onChange={(e) => onChange(Number(e.target.value))}
                    disabled={disabled}
                />
            );
        case "date":
            return (
                <input
                    id={id}
                    type="date"
                    style={detailsTableStyles.input}
                    value={value}
                    onChange={(e) => onChange(String(e.target.value))}
                    disabled={disabled}
                />
            );
        case "datetime-local":
            const formattedDateTime = value ? value.replace(" ", "T") : "";
            return (
                <input
                    id={id}
                    type="datetime-local"
                    style={detailsTableStyles.input}
                    value={formattedDateTime}
                    placeholder={'Enter a YYYY-MM-DD HH:MM event'}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                />
            );
        case "boolean":
            return (
                <input
                    id={id}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
            );
        default:
            return (
                <input
                    id={id}
                    type="text"
                    style={detailsTableStyles.input}
                    value={value || ""}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                />
            );
    }
};

export default InputField;
