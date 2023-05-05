require('dotenv').config({path: __dirname + '/.env'})

const handler = require("./handler");

// Execute toggl_refresh every 15 minutes from Monday to Friday between 9:00 AM and 6:00 PM
setInterval(() => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hour = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 18) {
        handler.refresh(null, null, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
    }
}, 15 * 60 * 1000);

// Execute toggl_sync every day at midnight
setInterval(() => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour === 0 && minute === 0) {
        handler.sync(null, null, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
    }
}, 24 * 60 * 60 * 1000);

handler.sync(null, null, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }

    handler.refresh(null, null, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

