import { ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";
import { AuthPage } from "../../components/pages/auth";

export const UpdatePassword = () => {
  return (
    <AuthPage
      type="updatePassword"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="SSM Project"
          icon={<AppIcon />}
        />
      }
    />
  );
};
