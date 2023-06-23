import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  RegisterPageProps,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useRegister,
} from "@refinedev/core";
import { FormPropsType } from "../index";
import { layoutStyles, titleStyles } from "./styles";
import { ThemedTitleV2 } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import { Controller } from "react-hook-form";
import {Autocomplete} from "@mui/material";
import { useAutocomplete } from "@refinedev/mui";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {Header} from "../../../../components/header";

export interface RegisterFormTypes {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  iin?: string;
  department?:string;
  providerName?: string;
  image?: any;
  
}

type RegisterProps = RegisterPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  providers,
  formProps,
  title,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    watch,
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: registerMutate, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? (
          <ThemedTitleV2
            collapsed={false}
            wrapperStyles={{
              gap: "8px",
            }}
          />
        )}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    registerMutate({
                      providerName: provider.name,
                    })
                  }
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          <Divider sx={{ fontSize: 12, marginY: "16px" }}>
            {translate("pages.login.divider", "or")}
          </Divider>
        </>
      );
    }
    return null;
  };


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

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
        >
          {translate("pages.register.title", "Sign up for your account")}
        </Typography>
        {renderProviders()}
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return registerMutate(data);
          })}
        >
          <TextField
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate(
                  "pages.register.errors.validEmail",
                  "Invalid email address"
                ),
              },
            })}
            id="email"
            margin="normal"
            fullWidth
            label={translate("pages.register.email", "Email")}
            error={!!errors.email}
            helperText={errors["email"] ? errors["email"].message : ""}
            name="email"
            autoComplete="email"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register("firstName", {
              required: true,
            })}
            id="firstName"
            margin="normal"
            fullWidth
            label={translate("pages.register.fields.firstName", "First Name")}
            error={!!errors.firstName}
            helperText={errors["firstName"] ? errors["firstName"].message : ""}
            name="firstName"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register("lastName", {
              required: true,
            })}
            id="lastName"
            margin="normal"
            fullWidth
            label={translate("pages.register.fields.lastName", "Last Name")}
            error={!!errors.lastName}
            helperText={errors["lastName"] ? errors["lastName"].message : ""}
            name="lastName"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register("middleName", {
              required: true,
            })}
            id="middleName"
            margin="normal"
            fullWidth
            label={translate("pages.register.fields.middleName", "Middle Name")}
            error={!!errors.middleName}
            helperText={
              errors["middleName"] ? errors["middleName"].message : ""
            }
            name="middleName"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register("iin", {
              required: true,
              pattern: {
                value: /^\d{12}$/i,
                message: translate(
                  "pages.register.errors.IINNotCorrent",
                  "Invalid IIN"
                ),
              },
            })}
            id="iin"
            margin="normal"
            fullWidth
            label={translate("pages.register.fields.iin", "IIN")}
            error={!!errors.iin}
            helperText={errors["iin"] ? errors["iin"].message : ""}
            name="iin"
            sx={{
              mt: 0,
            }}
          />
          <Controller
            control={control}
            name="department"
            rules={{
              required: translate("pages.register.errors.requiredField"),
            }}
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
                  (p) => p?.id?.toString() === item?.id?.toString()
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
                  "pages.register.fields.department",
                  "Department"
                )}
                margin="normal"
                variant="outlined"
                error={!!(errors as any)?.department?.id}
                helperText={(errors as any)?.department?.id?.message}
                required
                sx={{
                  mt: 0,
                }}
                />
              )}
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
          <TextField
            {...register("password", {
              required: true,
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate("pages.register.fields.password", "Password")}
            helperText={errors["password"] ? errors["password"].message : ""}
            error={!!errors.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              mb: 0,
            }}
          />
          
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: "24px",
            }}
          >
            {translate("pages.register.signup", "Sign up")}
          </Button>
          {loginLink ?? (
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              sx={{
                mt: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" component="span" fontSize="12px">
                {translate(
                  "pages.login.buttons.haveAccount",
                  "Have an account?"
                )}
              </Typography>
              <MuiLink
                ml="4px"
                variant="body2"
                color="primary"
                component={ActiveLink}
                underline="none"
                to="/login"
                fontSize="12px"
                fontWeight="bold"
              >
                {translate("pages.login.signin", "Sign in")}
              </MuiLink>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {renderContent ? (
          renderContent(Content, PageTitle)
        ) : (
          <>
            {PageTitle}
            {Content}
          </>
        )}
      </Container>
    </Box>
  );
};
