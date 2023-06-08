import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const GroupShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("Group.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Group.fields.name")}
              </Typography>
              <TextField value={record?.name} />
          </Stack>
      </Show>
  );
};
