import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    List,
    EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColumns,ruRU,getGridStringOperators  } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate,useGetLocale } from "@refinedev/core";
import { Checkbox, Box} from "@mui/material";


export const UserList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();
    const locale = useGetLocale();
    const currentLocale = locale();
    const filterOperators = getGridStringOperators().filter(({ value }) =>['contains'].includes(value));

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "email",
                flex: 1,
                headerName: translate("UserAuth.fields.email"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
                sortable:false,
                filterable:false
            },
            {
                field: "firstName",
                flex: 1,
                headerName: translate("UserAuth.fields.firstName"),
                minWidth: 200,
                sortable:false,
                filterable:false
            },
            {
                field: "lastName",
                flex: 1,
                headerName: translate("UserAuth.fields.lastName"),
                minWidth: 200,
                sortable:false,
                filterable:true,
                filterOperators: filterOperators,
            },
            {
                field: "middleName",
                flex: 1,
                headerName: translate("UserAuth.fields.middleName"),
                minWidth: 200,
                sortable:false,
                filterable:false
            },
            {
                field: "iin",
                flex: 1,
                headerName: translate("UserAuth.fields.iin"),
                type: "number",
                minWidth: 200,
                sortable:false,
                filterable:false
            },
            {
                field: "department",
                flex: 1,
                headerName: translate("UserAuth.fields.department"),
                valueGetter: ({ row }) => {
                    const value = row?.department?.name;

                    return value;
                },
                minWidth: 200,
                sortable:false,
                filterable:false
            },
              {
                field: "image",
                flex: 1,
                headerName: translate("UserAuth.fields.image"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return (
                        <Box
                          component="img"
                          sx={{
                              maxWidth: 50,
                              maxHeight: 50
                              
                          }}
                          src={value.toString()}
                      />
                    );
                },
                sortable:false,
                filterable:false
            },
            {
                field: "emailConfirmed",
                headerName: translate("UserAuth.fields.emailConfirmed"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
                sortable:false,
                filterable:false
            },
            {
                field: "role",
                flex: 1,
                headerName: translate("UserAuth.fields.role"),
                minWidth: 200,
                sortable:false,
                filterable:false
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
