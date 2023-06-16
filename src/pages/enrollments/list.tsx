import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef,ruRU,getGridStringOperators  } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate,useGetLocale } from "@refinedev/core";

export const EnrollmentList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();
    const locale = useGetLocale();
    const currentLocale = locale();
    const filterOperators = getGridStringOperators().filter(({ value }) =>['contains'].includes(value));


    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "term",
                flex: 1,
                headerName: translate("Enrollment.fields.term"),
                type: "number",
                minWidth: 50,
                sortable: false,
                filterable: false
            },
            {
                field: "startDate",
                flex: 1,
                headerName: translate("Enrollment.fields.startDate"),
                minWidth: 150,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
                sortable: false,
                filterable: false
            },
            {
                field: "endDate",
                flex: 1,
                headerName: translate("Enrollment.fields.endDate"),
                minWidth: 150,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
                sortable: false,
                filterable: false
            },
            {
                field: "groups",
                flex: 1,
                headerName: translate("Enrollment.fields.groups"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return (
                        <>
                            {value?.map((item: any, index: number) => (
                                <span style={{
                                    border: '1px solid rgba(25, 118, 210, 0.2)',
                                    backgroundColor:'aliceblue',
                                    margin:'2px',
                                    padding:'2px',
                                    borderRadius:'8px'
                                }} key={item?.id}>{item?.name}</span>
                            ))}
                        </>
                    );
                },
                sortable: false,
                filterable: false
            },
            {
                field: "course",
                flex: 1,
                headerName: translate("Enrollment.fields.course"),
                valueGetter: ({ row }) => {
                    const value = row?.course?.name;

                    return value;
                },
                minWidth: 200,
                sortable: false,
                filterable: false
            },
            {
                field: "instructor",
                flex: 1,
                headerName: translate("Enrollment.fields.instructor"),
                minWidth: 150,
                renderCell: function render({ row }) {
                    return (
                        <>
                            {row?.instructor?.firstName +
                                " " +
                                row?.instructor?.lastName}
                        </>
                    );
                },
                sortable: false,
                filterable: false
            },
            
            
            {
                field: "name",
                flex: 1,
                headerName: translate("Enrollment.fields.name"),
                minWidth: 100,
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
