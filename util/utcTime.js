module.exports.utcTime = (now) => {
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();
    const milliseconds = now.getUTCMilliseconds();

    const utc = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`

    return utc;
}

