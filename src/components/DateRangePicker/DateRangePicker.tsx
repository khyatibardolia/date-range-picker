import {ChangeEvent, FC, useState} from 'react';
import './DateRangePicker.css';
import {formattedDate} from "../../utils/date";

interface DateRangePickerProps {
    onChange: (startDate: Date | null, endDate: Date | null) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({onChange}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>, isStartDate?: boolean) => {
        const selectedDate = new Date(e.target.value);

        if (!selectedDate) return;

        // check if selected date is a weekend
        if (selectedDate.getUTCDay() === 0 || selectedDate.getUTCDay() === 6) return;

        if (isStartDate) {
            setStartDate(selectedDate);
            if (endDate && selectedDate > endDate) {
                // If the selected start date is after the end date, update end date
                setEndDate(selectedDate);
                onChange(selectedDate, selectedDate);
            } else {
                onChange(selectedDate, endDate);
            }
        } else {
            setEndDate(selectedDate);
            if (startDate && selectedDate < startDate) {
                // If the selected end date is before the start date, update start date
                setStartDate(selectedDate);
                onChange(selectedDate, selectedDate);
            } else {
                onChange(startDate, selectedDate);
            }
        }
    };


    return (
        <div className={'date-range-picker-section'}>
            <div className={'date-picker'}>
                <h5>Start date</h5>
                <input type="date"
                       value={formattedDate(startDate)}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => handleDateChange(e, true)}/>
            </div>
            <div className={'date-picker'}>
                <h5>End date</h5>
                <input type="date"
                       value={formattedDate(endDate)}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => handleDateChange(e)}/>
            </div>

        </div>
    );
};
