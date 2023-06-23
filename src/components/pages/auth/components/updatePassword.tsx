import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  UpdatePasswordPageProps,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useTranslate,
  useUpdatePassword,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import { FormPropsType } from "../index";
import { layoutStyles, titleStyles } from "./styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

export interface UpdatePasswordFormTypes {
  password?: string;
  email?:string;
  token?: string;
}

type UpdatePasswordProps = UpdatePasswordPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
    ...useFormProps,
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: update, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

  const translate = useTranslate();

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
          {translate("pages.updatePassword.title", "Set New Password")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return update(data);
          })}
        >
          <TextField
            {...register("email", {
              required: true,
            })}
            id="email"
            margin="normal"
            fullWidth
            label={translate("pages.login.fields.email", "Email")}
            error={!!errors.email}
            name="email"
            type="email"
            autoComplete="email"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register("password", {
              required: true,
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate(
              "pages.updatePassword.fields.password",
              "New Password"
            )}
            helperText={errors?.password?.message}
            error={!!errors?.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              m: 0,
            }}
          />

          <TextField
            {...register("token", {
              required: true,
            })}
            id="token"
            margin="normal"
            fullWidth
            name="token"
            label={translate(
              "pages.updatePassword.fields.token",
              "Token"
            )}
            helperText={errors?.token?.message}
            error={!!errors?.token}
            type="text"
            sx={{
              mb: 0,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: "24px",
            }}
            disabled={isLoading}
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
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
    </>
  );
};
