import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const ClassroomCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
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
                    label={translate("Classroom.fields.name")}
                    name="name"
                />
                <TextField
                    {...register("seats", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.seats}
                    helperText={(errors as any)?.seats?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("Classroom.fields.seats")}
                    name="seats"
                />
            </Box>
        </Create>
    );
};
