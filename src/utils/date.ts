export const formattedDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
}

export const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date.getUTCDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
};


