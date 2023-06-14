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

export const ClassroomShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("Classroom.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Classroom.fields.name")}
              </Typography>
              <TextField value={record?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Classroom.fields.seats")}
              </Typography>
              <NumberField value={record?.seats ?? ""} />
          </Stack>
      </Show>
  );
};
