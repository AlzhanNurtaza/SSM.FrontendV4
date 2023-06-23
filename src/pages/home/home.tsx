import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useTranslate } from "@refinedev/core";

export const HomePage: React.FC= () => {
    const translate = useTranslate();
    return (
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">
                <AlertTitle>{translate("homePage.fields.title")}</AlertTitle>
                {translate("homePage.fields.content")}
            </Alert>
            </Stack>
        </>
 
    );
};
