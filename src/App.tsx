import React, {useState} from 'react';
import {DateRangePicker} from "./components/DateRangePicker/DateRangePicker";
import './App.css';
import {formattedDate} from "./utils/date";

export const App: React.FC = () => {
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    const handleDateRangeChange = (startDate: Date, endDate: Date) => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
    };

    return (
        <div className={'container'}>
            <h1>Date Range Picker</h1>
            <DateRangePicker onChange={handleDateRangeChange}/>
            {selectedStartDate && selectedEndDate && (
                <div className={'selected-date-range'}>
                    <span>Selected Date Range: </span>
                    {formattedDate(selectedStartDate)} -
                    {formattedDate(selectedEndDate)}
                </div>
            )}
        </div>
    );
};
