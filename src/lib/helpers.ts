
export function getTimeSlotFromString(timestampString) {
        const timePart = timestampString.split('_')[1];
        const [hour, minute] = timePart.split('-').map(part => parseInt(part, 10));

        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

export function getLocationData(snapshot, locationName) {
    return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => doc.location === locationName)
        .sort((a, b) => b.lastUpdated.toMillis() - a.lastUpdated.toMillis());
}

export function computeHourlyAverages(data) {
    const hourlyLabels = {};

    for (let hour = 5; hour <= 20; hour++) {
        const key = `${hour.toString().padStart(2, '0')}:00`;
        hourlyLabels[key] = [];
    }

    // Fill labels with personCount
    data.forEach(entry => {
        const timeSlot = getTimeSlotFromString(entry.timestamp);
        const hourOnly = timeSlot.split(':')[0];
        const roundedTimeSlot = `${hourOnly}:00`;
        if (hourlyLabels[roundedTimeSlot]) hourlyLabels[roundedTimeSlot].push(entry.personCount);
    });

    // Compute averages
    const hourlyAvg = [];
    Object.keys(hourlyLabels).forEach(key => {
        if (hourlyLabels[key].length === 0) {
            hourlyAvg.push(0);
        } else {
            const sum = hourlyLabels[key].reduce((a, b) => a + b, 0);
            hourlyAvg.push(Math.ceil(sum / hourlyLabels[key].length));
        }
    });

    return hourlyAvg;
}