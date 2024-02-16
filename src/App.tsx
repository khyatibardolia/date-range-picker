import React, {useState} from 'react';
import {DateRangePicker} from "./components/DateRangePicker/DateRangePicker";
import './App.css';
import {predefinedRanges} from "./utils/date";

export const App: React.FC = () => {
    const [selectedDateRange, setSelectedDateRange] = useState<string[]>([]);
    const [weekendDates, setWeekendDates] = useState<string[]>([]);


    const handleDateRangeChange = (dateRange: string[], weekendDateRange: string[]) => {
        setSelectedDateRange(dateRange);
        setWeekendDates(weekendDateRange);
    };

    return (
        <>
            <header>
                <h1>Date Range Picker</h1>
            </header>
            <main className={'container'}>
                <DateRangePicker onChange={handleDateRangeChange} predefinedRanges={predefinedRanges}/>
                <div className={'dates-info-wrapper'}>
                    {selectedDateRange.length > 1 && (
                        <div className={'selected-date-range'}>
                            <span>Selected date range: </span>
                            {selectedDateRange.join(', ')}
                        </div>
                    )}
                    {weekendDates.length > 0 && (
                        <div className={'weekend-dates'}>
                            <span>Weekend dates: </span>
                            {weekendDates.join(', ')}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};
