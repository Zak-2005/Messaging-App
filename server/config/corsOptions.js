const whitelist = [

    'http://localhost:5173'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            res.header
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable sending cookies and credentials
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;