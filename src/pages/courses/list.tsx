import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "name",
                flex: 1,
                headerName: translate("Course.fields.name"),
                minWidth: 200,
            },
            {
                field: "creditCount",
                flex: 1,
                headerName: translate("Course.fields.creditCount"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "department",
                flex: 1,
                headerName: translate("Course.fields.department"),
                valueGetter: ({ row }) => {
                    const value = row?.department?.name;

                    return value;
                },
                minWidth: 200,
            },
            {
                field: "instructor",
                flex: 1,
                headerName: translate("Course.fields.instructor"),
                minWidth: 200,
                renderCell: function render({ row }) {
                    return (
                        <>
                            {row?.instructor?.firstName +
                                " " +
                                row?.instructor?.lastName}
                        </>
                    );
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
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
