import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const CourseShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("Course.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Course.fields.name")}
              </Typography>
              <TextField value={record?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Course.fields.creditCount")}
              </Typography>
              <NumberField value={record?.creditCount ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Course.fields.department")}
              </Typography>
              <TextField value={record?.department?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Course.fields.code")}
              </Typography>
              <TextField value={record?.code} />
          </Stack>
      </Show>
  );
};
