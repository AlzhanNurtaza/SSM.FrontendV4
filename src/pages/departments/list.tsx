import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColumns,ruRU,getGridStringOperators } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate,useGetLocale } from "@refinedev/core";

export const DepartmentList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const locale = useGetLocale();
    const currentLocale = locale();
    const { dataGridProps } = useDataGrid();
    const filterOperators = getGridStringOperators().filter(({ value }) =>['contains'  ].includes(value));

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "name",
                flex: 1,
                headerName: translate("Department.fields.name"),
                minWidth: 200,
                sortable: false,
                filterable: true,
                filterOperators: filterOperators,
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight 
             localeText={currentLocale==="ru" ? ruRU.components.MuiDataGrid.defaultProps.localeText:
             undefined }
            />
        </List>
    );
};
