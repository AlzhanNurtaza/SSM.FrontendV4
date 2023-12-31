import { Create,useAutocomplete } from "@refinedev/mui";
import { Box, TextField,Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import React, { useEffect } from 'react';
import { Controller } from "react-hook-form";
import { Query } from "@syncfusion/ej2-data";

export const GroupCreate: React.FC<IResourceComponentsProps> = () => {
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
    const { autocompleteProps: specialityAutocompleteProps } = useAutocomplete({
        resource: "Speciality",
      });
    const { autocompleteProps: studentAutocompleteProps } = useAutocomplete({
        resource: "UserAuth",
        filters: [
            {
                field: "role",
                operator: "eq",
                value: "Student",
            },
        ],
     });
  

    const startYearValue=watch('startYear');
    const groupNumberValue=watch('groupNumber');
    const specialityCode=watch('speciality');


    
    const textFieldValue = specialityCode?.code +'-'+startYearValue +'-'+ groupNumberValue;


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
                <Controller
                    control={control}
                    name="speciality"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...specialityAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    specialityAutocompleteProps?.options?.find(
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
                                        "Group.fields.speciality",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.speciality?.id}
                                    helperText={
                                        (errors as any)?.speciality?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("startYear", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.startYear}
                    helperText={(errors as any)?.startYear?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("Group.fields.startYear")}
                    name="startYear"
                />
                <TextField
                    {...register("groupNumber", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.groupNumber}
                    helperText={(errors as any)?.groupNumber?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("Group.fields.groupNumber")}
                    name="groupNumber"
                    inputProps={{min:1}}
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
                    label={translate("Group.fields.name")}
                    name="name"
                    disabled
                    value={textFieldValue}
                />
                <Controller
                    control={control}
                    name="students"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[]}
                    render={({ field }) => (
                        <Autocomplete
                            {...studentAutocompleteProps}
                            {...field}
                            multiple
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    studentAutocompleteProps?.options?.find(
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
                                        "Group.fields.students",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.students?.id}
                                    helperText={
                                        (errors as any)?.students?.id?.message
                                    }
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
