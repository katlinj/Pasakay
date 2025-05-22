
export function getTimeSlotFromString(timestampString) {
        const timePart = timestampString.split('_')[1];
        const [hour, minute] = timePart.split('-').map(part => parseInt(part, 10));

        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

export function getLocationData(snapshot) {
    return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.lastUpdated.toMillis() - a.lastUpdated.toMillis());
        //.filter(doc => doc.location === locationName)
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

// export function computeQuarterlyAverages(data) {
//     const labels = {};
//     let hour = 9;
//     let minute = 15;

//     // Generate column labels for graph (15 min intervals)
//     let columnLabels = [];
//     while (hour < 18 || (hour === 18 && minute === 0)) {
//         const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
//         columnLabels.push(label);
//         labels[label] = [];
//         minute += 15;
//         if (minute === 60) {
//             minute = 0;
//             hour++;
//         }
//     }
//     columnLabels = to12HourLabels(columnLabels);

//     /// Assign each entry to the correct 15-min slot
//     data.forEach(entry => {
//         const timeSlot = getTimeSlotFromString(entry.timestamp);
//         const [h, m] = timeSlot.split(':').map(Number);
//         // Find the nearest upper 15-min slot (e.g., 09:01-09:15 -> 09:15)
//         let slotHour = h;
//         let slotMinute = 15;
//         if (m > 0 && m <= 15) slotMinute = 15;
//         else if (m > 15 && m <= 30) slotMinute = 30;
//         else if (m > 30 && m <= 45) slotMinute = 45;
//         else if (m > 45 && m <= 59) {
//             slotMinute = 0;
//             slotHour = h + 1;
//         } else if (m === 0) slotMinute = 15;

//         const label = `${slotHour.toString().padStart(2, '0')}:${slotMinute.toString().padStart(2, '0')}`;
//         if (labels[label]) labels[label].push(entry.personCount);
//     });
    
//     // Compute averages
//     const  quarterlyAvg = [];
//     Object.keys(labels).forEach(key => {
//         if (labels[key].length === 0) {
//             quarterlyAvg.push(0);
//         } else {
//             const sum = labels[key].reduce((a, b) => a + b, 0);
//             quarterlyAvg.push(Math.ceil(sum / labels[key].length));
//         }
//     });

//     return { columnLabels, quarterlyAvg };
// }

export function to12HourLabels(columnLabels: string[]): string[] {
    return columnLabels.map(label => {
        let [hour, minute] = label.split(':').map(Number);
        const ampm = hour >= 12 ? 'pm' : 'am';
        let hour12 = hour % 12;
        if (hour12 === 0) hour12 = 12;
        return `${hour12}:${minute.toString().padStart(2, '0')}${ampm}`;
    });
}

export function sortJeepStopList(jeepStopList) {
    const priorityOrder = [
        "AECH Conference",
        "Vinzons Hall",
        "AECH Lobby",
        "AECH"
    ];

    jeepStopList.sort((a, b) => {
        const aName = a[0].location;
        const bName = b[0].location;

        const aIndex = priorityOrder.indexOf(aName);
        const bIndex = priorityOrder.indexOf(bName);

        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
        } else if (aIndex !== -1) {
            return -1;
        } else if (bIndex !== -1) {
            return 1;
        } else {
            return aName.toLowerCase().localeCompare(bName.toLowerCase());
        }
    });
}


export function generateQuarterHourLabels(startHour = 9, startMinute = 15, endHour = 18, endMinute = 0): { labels: Record<string, number[]>, columnLabels: string[] } {
    const labels: Record<string, number[]> = {};
    let hour = startHour;
    let minute = startMinute;

    // Generate column labels for graph (15 min intervals)
    let columnLabels: string[] = [];
    while (hour < endHour || (hour === endHour && minute === endMinute)) {
        const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        columnLabels.push(label);
        labels[label] = [];
        minute += 15;
        if (minute === 60) {
            minute = 0;
            hour++;
        }
    }
    return { labels, columnLabels: to12HourLabels(columnLabels) };
}


export function computeQuarterlyAverages(labels) {
    // Compute averages
    const  quarterlyAvg = [];
    Object.keys(labels).forEach(key => {
        if (labels[key].length === 0) {
            quarterlyAvg.push(0);
        } else {
            const sum = labels[key].reduce((a, b) => a + b, 0);
            quarterlyAvg.push(Math.ceil(sum / labels[key].length));
        }
    });

    return quarterlyAvg;
}


//Example: "09:01" -> "09:15", "09:16" -> "09:30", "09:46" -> "10:00"
export function getQuarterHourLabelFromTimeSlot(timeSlot: string): string {
    const [h, m] = timeSlot.split(':').map(Number);
    let slotHour = h;
    let slotMinute = 15;
    if (m > 0 && m <= 15) slotMinute = 15;
    else if (m > 15 && m <= 30) slotMinute = 30;
    else if (m > 30 && m <= 45) slotMinute = 45;
    else if (m > 45 && m <= 59) {
        slotMinute = 0;
        slotHour = h + 1;
    } else if (m === 0) slotMinute = 15;

    return `${slotHour.toString().padStart(2, '0')}:${slotMinute.toString().padStart(2, '0')}`;
}