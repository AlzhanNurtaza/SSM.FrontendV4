import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  EmailField,
  NumberField,
  MarkdownField,
  BooleanField,
} from "@refinedev/mui";
import { Typography, Stack ,Box} from "@mui/material";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.email")}
              </Typography>
              <EmailField value={record?.email} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.firstName")}
              </Typography>
              <TextField value={record?.firstName} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.lastName")}
              </Typography>
              <TextField value={record?.lastName} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.middleName")}
              </Typography>
              <TextField value={record?.middleName} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.iin")}
              </Typography>
              <NumberField value={record?.iin ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.department")}
              </Typography>
              <TextField value={record?.department?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.image")}
              </Typography>
              <Box
                        component="img"
                        sx={{
                          maxWidth: 150,
                        }}
                        src={record?.image.toString()}
                      />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.emailConfirmed")}
              </Typography>
              <BooleanField value={record?.emailConfirmed} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("UserAuth.fields.role")}
              </Typography>
              <TextField value={record?.role} />
          </Stack>
      </Show>
  );
};
