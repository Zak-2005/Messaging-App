const whitelist = [
    'https://messagingapp-j8d3.onrender.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable sending cookies and credentials
    optionsSuccessStatus: 200
}

module.exports = corsOptions;