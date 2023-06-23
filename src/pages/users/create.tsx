import { Create,useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel,Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Typography from "@mui/material/Typography";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
        watch,
        setValue,
        setError
    } = useForm();

    const { autocompleteProps: departmentAutocompleteProps } = useAutocomplete({
      resource: "Department",
    });
  const imageInput = watch("image");
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
      try {
        setIsUploadLoading(true);

        const target = event.target;
        const file: File = (target.files as FileList)[0];

        const base64 = await convertBase64(file);

        setValue("image", base64, { shouldValidate: true });

        setIsUploadLoading(false);
      } catch (error) {
        setError("image", { message: "Upload failed. Please try again." });
        setIsUploadLoading(false);
      }
    };
    const convertBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    const options = ['Admin', 'Editor', 'Instructor', 'Student'];

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.email}
                    helperText={(errors as any)?.email?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    label={translate("UserAuth.fields.email")}
                    name="email"
                />
                
                <TextField
                    {...register("firstName", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.firstName}
                    helperText={(errors as any)?.firstName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("UserAuth.fields.firstName")}
                    name="firstName"
                />
                <TextField
                    {...register("lastName", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.lastName}
                    helperText={(errors as any)?.lastName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("UserAuth.fields.lastName")}
                    name="lastName"
                />
                <TextField
                    {...register("middleName", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.middleName}
                    helperText={(errors as any)?.middleName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("UserAuth.fields.middleName")}
                    name="middleName"
                />
                <TextField
                    {...register("iin", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.iin}
                    helperText={(errors as any)?.iin?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("UserAuth.fields.iin")}
                    name="iin"
                />
                <Controller
                    control={control}
                    name="department"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...departmentAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                  departmentAutocompleteProps?.options?.find(
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
                                        "UserAuth.fields.department",
                                    )}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.department?.id}
                                    helperText={
                                        (errors as any)?.department?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Autocomplete
                    {...register('role')} // Register the input with react-hook-form
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} 
                      error={!!(errors as any)?.role}
                      helperText={(errors as any)?.role?.message}
                      margin="normal"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label={translate("UserAuth.fields.role")}
                      name="role"
                      />
                    )}
                  />
                
                <Stack
                  direction="row"
                  gap={4}
                  flexWrap="wrap"
                  sx={{ marginTop: "16px" }}
                >
                  <>
                    <label htmlFor="images-input">
                      <Input
                        id="images-input"
                        type="file"
                        sx={{ display: "none" }}
                        onChange={onChangeHandler}
                      />
                      <input
                        id="file"
                        {...register("image", {
                          required: translate(
                            "pages.register.errors.requiredField",
                            "This field required"
                          ),
                        })}
                        type="hidden"
                      />
                      <LoadingButton
                        loading={isUploadLoading}
                        loadingPosition="end"
                        endIcon={<FileUploadIcon />}
                        variant="contained"
                        component="span"
                      >
                        {translate("pages.register.buttons.upload", "Upload")}
                      </LoadingButton>
                      <br />
                      {errors.image && (
                        <Typography variant="caption" color="#fa541c">
                          {errors.image?.message?.toString()}
                        </Typography>
                      )}
                    </label>
                    {imageInput && (
                      <Box
                        component="img"
                        sx={{
                          maxWidth: 250,
                          maxHeight: 250,
                        }}
                        src={imageInput.toString()}
                      />
                    )}
                  </>
                </Stack>
                <Controller
                    control={control}
                    name="emailConfirmed"
                    // eslint-disable-next-line
                    defaultValue={false}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("UserAuth.fields.emailConfirmed")}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            }
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
