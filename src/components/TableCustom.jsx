import React from "react";
import customTableStyle from "../styles/customTableStyle.js";
import { CompactTable } from "@table-library/react-table-library/compact";

const TableCustom = ({ columnsNames, datas, toggleTableVisibility, theme, select }) => {
    const columnsGeneral = columnsNames["general"];

    const columns = datas.length > 0
        ? Object.keys(datas[0]).filter(key => key in columnsGeneral).map((key) => {
            return {
                key: `column-${key}`,
                label: columnsGeneral[key] || key.charAt(0).toUpperCase() + key.slice(1),
                resize: true,
                renderCell: (item) => {
                    if (typeof item[key] === "boolean") {
                        return (
                            <label htmlFor={item.id}>
                                <input
                                    id={item.id}
                                    type="checkbox"
                                    title={item}
                                    checked={item[key]}
                                    disabled
                                />
                            </label>
                        );
                    } else {
                        return (
                            <span onClick={() => toggleTableVisibility()} style={customTableStyle.text}>
                                {item[key] || "-"}
                            </span>
                        );
                    }
                },
            };
        })
        : [
            {
                key: "no-data",
                label: "No Data",
                renderCell: () => "No data available",
            },
        ];

    const tableData = {
        nodes: datas,
    };

    return (
        <CompactTable
            columns={columns}
            data={tableData}
            theme={theme}
            layout={{ custom: true }}
            select={select}
        />
    );
};

export default TableCustom;
