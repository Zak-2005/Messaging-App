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
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false, 
    optionsSuccessStatus: 204, 
    credentials: true, 
}

module.exports = corsOptions;