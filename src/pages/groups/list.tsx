import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColumns,ruRU,getGridStringOperators  } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate,useGetLocale } from "@refinedev/core";

export const GroupList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();
    const locale = useGetLocale();
    const currentLocale = locale();
    const filterOperators = getGridStringOperators().filter(({ value }) =>['contains'].includes(value));

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "startYear",
                flex: 1,
                headerName: translate("Group.fields.startYear"),
                //type: "number",
                minWidth: 200,
            },
            {
                field: "speciality",
                flex: 1,
                headerName: translate("Group.fields.speciality"),
                valueGetter: ({ row }) => {
                    const value = row?.speciality?.name;

                    return value;
                },
                minWidth: 200,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("Group.fields.name"),
                minWidth: 200,
                sortable: false,
                filterable: true,
                filterOperators: filterOperators,
            },
            {
                field: 'studentsCount', // Calculated field
                headerName: translate("Group.fields.studentsCount"),
                width: 100,
                valueGetter: (params) => {
                  const { students } = params.row;
                  const total = students.length
                  return total;
                },
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
