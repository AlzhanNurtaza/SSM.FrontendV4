import { ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";
import { AuthPage } from "../../components/pages/auth";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="SSM Project"
          icon={<AppIcon />}
        />
      }
      formProps={{
        defaultValues: { email: "student@gmail.com", password: "password" },
      }}
    />
  );
};
