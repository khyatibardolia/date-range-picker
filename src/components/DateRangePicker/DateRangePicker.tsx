import {ChangeEvent, FC, useState} from 'react';
import './DateRangePicker.css';
import {formattedDate, getWeekendDates, isValidDate, isWeekend} from "../../utils/date";

interface PredefinedRanges {
    label: string;
    value: [Date, Date];
}


interface DateRangePickerProps {
    onChange: (selectedDateRange: string[], weekendsDateRange: string[]) => void;
    predefinedRanges: PredefinedRanges[];
}

export const DateRangePicker: FC<DateRangePickerProps> = ({onChange, predefinedRanges}: DateRangePickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>, isStartDate?: boolean) => {
        const selectedDate = new Date(e.target.value);

        if (!selectedDate) return;

        // if selected date is a weekend
        if (isWeekend(selectedDate)) return;

        const newStartDate: Date | null = isStartDate ? selectedDate : startDate;
        const newEndDate: Date | null = isStartDate ? endDate : selectedDate;

        // if start date is greater than end date or end date is less than start date, keep selected date in both
        if (newStartDate && newEndDate && (newStartDate > newEndDate || newEndDate < newStartDate)) {
            setStartDate(selectedDate);
            setEndDate(selectedDate);
            onChange([formattedDate(selectedDate), formattedDate(selectedDate)], []);
            return;
        }

        const selectedDateRange: string[] = [];
        if (isValidDate(newStartDate)) {
            selectedDateRange.push(formattedDate(newStartDate));
        }
        if (isValidDate(newEndDate)) {
            selectedDateRange.push(formattedDate(newEndDate));
        }

        const weekendsDateRange = getWeekendDates(newStartDate, newEndDate);

        if (newStartDate && newEndDate) {
            onChange(selectedDateRange, weekendsDateRange);
        }

        isStartDate ? setStartDate(selectedDate) : setEndDate(selectedDate);
    };

    const handlePredefinedRangeClick = (value: [Date, Date]) => {
        const [startDate, endDate] = value;
        setStartDate(startDate);
        setEndDate(endDate);
        onChange([formattedDate(startDate), formattedDate(endDate)], getWeekendDates(startDate, endDate));
    };

    return (
        <>
            <div className={'date-range-picker-section'}>
                <div className={'date-picker'}>
                    <label htmlFor="start-date">Start date</label>
                    <input type="date"
                           id="start-date"
                           name="start-date"
                           value={formattedDate(startDate)}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleDateChange(e, true)}
                    />
                </div>
                <div className={'date-picker'}>
                    <label htmlFor="end-date">End date</label>
                    <input type="date"
                           id="end-date"
                           name="end-date"
                           value={formattedDate(endDate)}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleDateChange(e)}
                    />
                </div>
            </div>
            <div className="predefined-ranges">
                {predefinedRanges.map((range: PredefinedRanges, index: number) => (
                    <button key={index} onClick={() => handlePredefinedRangeClick(range.value)}>
                        {range.label}
                    </button>
                ))}
            </div>
        </>
    );
};
