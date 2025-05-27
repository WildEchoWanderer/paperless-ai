class TimeWindowService {
    /**
     * Check if current time is within the processing window
     * @param {string} timeWindow - Time window in format "HH:MM-HH:MM"
     * @returns {boolean} - True if current time is within window
     */
    isWithinProcessingWindow(timeWindow) {
        if (!timeWindow) return false;

        const [start, end] = timeWindow.split('-');
        if (!start || !end) return false;

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);

        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;

        // Handle cases where the window crosses midnight
        if (startTime > endTime) {
            return currentTime >= startTime || currentTime <= endTime;
        }

        return currentTime >= startTime && currentTime <= endTime;
    }
}

module.exports = new TimeWindowService();
