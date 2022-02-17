export function formatTime(time) {
    const timeDate = new Date(time)

    let hours = timeDate.getHours()
    if (hours < 10) hours = '0' + hours
    let minutes = timeDate.getMinutes()
    if (minutes < 10) minutes = '0' + minutes

    const formatted = `${hours}:${minutes}`
    return formatted
}