import { Create,useAutocomplete } from "@refinedev/mui";
import { Box, TextField,Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  Controller } from "react-hook-form";
import React, { useEffect } from 'react';


export const EnrollmentCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
        watch,
        setValue
    } = useForm();
    const { autocompleteProps: courseAutocompleteProps } = useAutocomplete({
        resource: "Course",
      });
      const { autocompleteProps: instructorAutocompleteProps } = useAutocomplete({
        resource: "UserAuth",
        filters: [
            {
                field: "role",
                operator: "eq",
                value: "Instructor",
            },
        ],
      });
      const { autocompleteProps: groupAutocompleteProps } = useAutocomplete({
        resource: "Group",
      });

    const courseValue=watch('course');
    const startDateValue=watch('startDate');
    const termValue=watch('term');

    const textFieldValue = courseValue?.code +'-'+(new Date(startDateValue)).getFullYear() +'-'+ termValue;

    useEffect(() => {
            setValue('name', textFieldValue); // Set the value manually
        }, [textFieldValue, setValue]);

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("term", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.term}
                    helperText={(errors as any)?.term?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("Enrollment.fields.term")}
                    name="term"
                    inputProps={{min:1}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field }) =>
                        <DatePicker
                            {...field}
                            slotProps={{
                                textField: {
                                    error: !!(errors as any)?.startDate,
                                    helperText: (errors as any)?.startDate?.message,
                                    label:translate("Enrollment.fields.startDate"),
                                    InputLabelProps:{ shrink: true },
                                    fullWidth:true,
                                    margin:"normal"
                                }
                            }}
                        />
                    }
                />
                </LocalizationProvider>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field }) =>
                        <DatePicker
                            {...field}
                            slotProps={{
                                textField: {
                                    error: !!(errors as any)?.endDate,
                                    helperText: (errors as any)?.endDate?.message,
                                    label:translate("Enrollment.fields.endDate"),
                                    InputLabelProps:{ shrink: true },
                                    fullWidth:true,
                                    margin:"normal"
                                }
                            }}
                        />
                    }
                />
                </LocalizationProvider>
                <Controller
                    control={control}
                    name="course"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...courseAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            
                            getOptionLabel={(item) => {
                                return (
                                    courseAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.name ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate(
                                        "Enrollment.fields.course",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.course?.id}
                                    helperText={
                                        (errors as any)?.course?.id?.message
                                    }
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="groups"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[]}
                    render={({ field }) => (
                        <Autocomplete
                            multiple
                            {...groupAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    groupAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.name
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate(
                                        "Enrollment.fields.groups",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.groups?.id}
                                    helperText={
                                        (errors as any)?.groups?.id?.message
                                    }
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="instructor"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...instructorAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                  instructorAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.lastName + " " + item.firstName ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate(
                                        "Enrollment.fields.instructor",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.instructor?.id}
                                    helperText={
                                        (errors as any)?.instructor?.id?.message
                                    }
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    )}
                />




               
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("Enrollment.fields.name")}
                    name="name"
                    disabled
                    value={textFieldValue}
                />
            </Box>
        </Create>
    );
};
