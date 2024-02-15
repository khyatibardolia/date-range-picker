export const formattedDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
}

export const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date.getUTCDay();
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


