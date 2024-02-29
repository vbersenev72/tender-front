import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

export interface IDatePickerProps {
}

export function DatePickerCustom({date, setDate}:any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={setDate} value={date ? dayjs(date) : null} slotProps={{ textField: { size: 'small' } }} label="" />
            </DemoContainer>
        </LocalizationProvider>
    );
}
