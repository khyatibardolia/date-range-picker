export const formattedDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
}

export const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date?.getUTCDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
};

export const getWeekendDates = (startDate: Date | null, endDate: Date | null): string[] => {
    if (!startDate || !endDate) return [];
    const weekendDates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (isWeekend(currentDate)) {
            weekendDates.push(formattedDate(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekendDates;
};

export const today = new Date();

export const subDays = (date, days) => new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

export const startOfWeek = date => {
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay()); // set to sunday of the current week
    return sunday;
};

export const endOfWeek = date => {
    const saturday = new Date(date);
    saturday.setDate(date.getDate() + (6 - date.getDay())); // set to saturday of the current week
    return saturday;
};

export const startOfMonth = date => new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const predefinedRanges = [
    {
        label: 'Today',
        value: [today, today]
    },
    {
        label: 'Yesterday',
        value: [subDays(today, 1), subDays(today, 1)]
    },
    {
        label: 'This week',
        value: [startOfWeek(today), endOfWeek(today)]
    },
    {
        label: 'Last 7 days',
        value: [subDays(today, 6), today]
    },
    {
        label: 'Last 30 days',
        value: [subDays(today, 29), today]
    },
    {
        label: 'This month',
        value: [startOfMonth(today), today]
    },
    {
        label: 'Last month',
        value: [startOfMonth(subDays(today, today.getDate())), endOfMonth(subDays(today, today.getDate()))]
    },
    {
        label: 'This year',
        value: [new Date(today.getFullYear(), 0, 1), today]
    },
    {
        label: 'Last year',
        value: [new Date(today.getFullYear() - 1, 0, 1), new Date(today.getFullYear(), 0, 0)]
    },
    {
        label: 'All time',
        value: [new Date(today.getFullYear() - 1, 0, 1), today]
    }
];
