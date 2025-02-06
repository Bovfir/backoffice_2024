import { getTheme } from "@table-library/react-table-library/baseline";

export const tableTheme = [
    getTheme(),
    {
        HeaderRow: `background-color: #8947B8;`,
        Row: `
            color: black;
            &:nth-of-type(odd) {
                background-color: #B292CA;
            }
            &:nth-of-type(even) {
                background-color: #9E71BF;
            }
            &:hover {
                color: #FFFFFF;
                background-color: #6A3E9D;
            }
            &:hover .cell-content, 
            &:hover input {
                color: #FFFFFF; 
                background-color: #B292CA; 
            }
        `,
    },
];
