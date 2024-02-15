import React, {useState} from 'react';
import {DateRangePicker} from "./components/DateRangePicker/DateRangePicker";
import './App.css';

export const App: React.FC = () => {
    const [selectedDateRange, setSelectedDateRange] = useState<string[]>([]);
    const [weekendDates, setWeekendDates] = useState<string[]>([]);


    const handleDateRangeChange = (dateRange: string[], weekendDateRange: string[]) => {
        setSelectedDateRange(dateRange);
        setWeekendDates(weekendDateRange);
    };

    return (
        <div className={'container'}>
            <header>
                <h1>Date Range Picker</h1>
            </header>
            <main>
                <DateRangePicker onChange={handleDateRangeChange}/>
                <div>
                    {selectedDateRange.length > 0 && (
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

        </div>
    );
};
