import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const EnrollmentShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.term")}
              </Typography>
              <NumberField value={record?.term ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.startDate")}
              </Typography>
              <DateField value={record?.startDate} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.endDate")}
              </Typography>
              <DateField value={record?.endDate} />

              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.groups")}
              </Typography>
              <Stack direction="row" spacing={1}>
                  {record?.groups?.map((item: any) => (
                       <span style={{
                        border: '1px solid rgba(25, 118, 210, 0.2)',
                        backgroundColor:'aliceblue',
                        margin:'2px',
                        padding:'2px',
                        borderRadius:'8px'
                    }} key={item?.id}>{item?.name}</span>
                  ))}
              </Stack>
              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.course")}
              </Typography>
              <TextField value={record?.course?.name} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.instructor")}
              </Typography>
              <TextField
                  value={
                      record?.instructor?.firstName +
                      " " +
                      record?.instructor?.lastName
                  }
              />
              

              <Typography variant="body1" fontWeight="bold">
                  {translate("Enrollment.fields.name")}
              </Typography>
              <TextField value={record?.name} />
          </Stack>
      </Show>
  );
};
