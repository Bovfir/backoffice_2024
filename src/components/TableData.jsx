import * as React from "react";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaSearch } from 'react-icons/fa';
import { useTheme } from "@table-library/react-table-library/theme";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Stack, TablePagination } from "@mui/material";
import TableCustom from "../components/TableCustom.jsx";
import {tableTheme} from "../../theme/Theme.jsx";
import DataDetails from "./DataDetails.jsx";
import tableStyles from "../styles/tableStyles.js";
import routes from "../data/APIRoute.js";
import { useRowSelect } from "@table-library/react-table-library/select";
import { deleteData } from "../../util/DeleteData.js";
import { searchCombine, searchData, searchPublicData } from "../../util/SearchData.js";
import { fetchData } from "../../util/FetchData.js";
import { errorToString } from "../../util/ErrorIndex.js";
import detailsTableStyles from "../styles/detailsTableStyles.js";

const TableData = ({ columnsNames, componentKey }) => {
    const [search, setSearch] = useState("");
    const [isHide, setHide] = useState(false);
    const [data, setData] = useState([]);
    const theme = useTheme(tableTheme);
    const [isTableVisible, setTableVisible] = useState(false);
    const [error, setError] = useState(null);
    const [isTableAddVisible, setTableAddVisible] = useState(false);
    const [nbRow, setNbRow] = useState(0);
    const [dataSelected, setDataSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [searchForEvents, setSearchForEvents] = useState(false);

    const select = useRowSelect({ nodes: data }, {
        onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
        setIdDelete(state);
        const dataSelected = data.find(item => item.id === state.id);
        setDataSelected(dataSelected);
    }

    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 5,
        },
    });


    useEffect(() => {
        if (componentKey === "event") {
            setSearchForEvents(true);
        }
        searchManager();
    }, [componentKey, pagination.state.size,pagination.state.page, isHide]);

    const handleSearch = (data) => {
        setSearch(data.target.value);
    };

    const handleHidePrivateChange = () => {
        setHide(!isHide);
    };

    const searchManager = async () => {
        try {
            let result;
            if (search && isHide) {
                result = await searchCombine(componentKey, search, pagination);
            } else if (search) {
                result = await searchData(componentKey, search, pagination);
            } else if (isHide) {
                result = await searchPublicData(componentKey, pagination);
            } else {
                const result = await fetchData(componentKey, pagination);
                setData(result.data);
                setNbRow(result.rowCount);
                return;
            }
            setData(result.data);
            setNbRow(result.rowCount);
        } catch (err) {
            setError(errorToString(err));
        }
    };

    const handleDelete = async () => {
        await deleteData(idDelete, componentKey, routes,setError,setData,setNbRow,pagination);
    };

    const toggleTableVisibility = () => {
        setTableVisible(true);
        if (isTableAddVisible) {
            setTableAddVisible(false);
        }
    };

    {isLoading && <div>Loading...</div>}

    return (
        <div style={tableStyles.container}>
            {searchForEvents && (
                <div>
                    <label htmlFor="searchInput" style={tableStyles.searchLabel}>
                        Search an event :&nbsp;
                        <div style={tableStyles.searchInputContainer}>
                            <input
                                id="searchInput"
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder={"Enter a title..."}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") searchManager();
                                }}
                                style={tableStyles.searchInput}
                            />
                            <button onClick={searchManager} style={tableStyles.searchIconButton}>
                                :<FaSearch size={16} />
                            </button>
                        </div>
                    </label>
                    <label htmlFor="complete" style={tableStyles.checkBoxLabel}>
                        Hide Private Events:&nbsp;
                        <input
                            id="complete"
                            type="checkbox"
                            checked={isHide}
                            onChange={handleHidePrivateChange}
                        />
                    </label>
                </div>
            )}
            <br />
            <div style={tableStyles.tableContainer}>
                <TableCustom
                    columnsNames={columnsNames}
                    datas={data}
                    toggleTableVisibility={toggleTableVisibility}
                    theme={theme}
                    select={select}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <button style={tableStyles.buttonAdd}
                        onClick={() => {
                            setTableAddVisible(!isTableAddVisible);
                            setTableVisible(false);
                        }}>
                    Add <FaPlus style={tableStyles.icon} />
                </button>
                <button style={tableStyles.buttonAdd} onClick={handleDelete}>
                    Delete <FaTrash style={tableStyles.icon} />
                </button>
            </div>
            {error && <p style={detailsTableStyles.error}>{error}</p>}
            <br />
            <Stack spacing={2}>
                <TablePagination
                    id="search"
                    count={nbRow}
                    page={pagination.state.page}
                    rowsPerPage={pagination.state.size}
                    rowsPerPageOptions={[1, 5, 10]}
                    onRowsPerPageChange={(event) => pagination.fns.onSetSize(parseInt(event.target.value, 10))}
                    onPageChange={(event, newPage) => pagination.fns.onSetPage(newPage)}
                />
            </Stack>
            <br />
            {isTableAddVisible && (
                <>
                    <h1>Add {componentKey}</h1>
                    <div style={tableStyles.detailsContainer}>
                        <DataDetails columnsNames={columnsNames} event={{}} type={"Add"} componentKey={componentKey} theme={theme} key={"add"} setTableVisible={setTableVisible} setTableAddVisible={setTableAddVisible} setData={setData} setNbRow={setNbRow} pagination={pagination}  />
                    </div>
                </>
            )}
            {isTableVisible && dataSelected && (
                <>
                    <h1>Details of {componentKey}</h1>
                    <div style={tableStyles.detailsContainer}>
                        <DataDetails columnsNames={columnsNames} event={dataSelected} type={"Update"} componentKey={componentKey} theme={theme} key={dataSelected?.id || "default-key"} setTableVisible={setTableVisible} setTableAddVisible={setTableAddVisible} setData={setData} setNbRow={setNbRow} pagination={pagination}/>
                    </div>
                </>
            )}
        </div>
    );
}

export default TableData;
