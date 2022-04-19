import mongoose from 'mongoose';

const readyStates = {
    disconnected: 0, connected: 1, connecting: 2, disconnecting: 3,
};

let pendingPromise = null;

const withDb = (fn) => async (req, res) => {
    const next = () => {
        return fn(req, res);
    };

    const {readyState} = mongoose.connection;

    // TODO: May need to handle concurrent requests
    // with a little bit more details (disconnecting, disconnected etc).
    if (readyState === readyStates.connected) {
        return next();
    } else if (pendingPromise) {
        // Wait for the already pending promise if there is one.
        await pendingPromise;
        return next();
    }

    pendingPromise = mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    try {
        await pendingPromise;
    } finally {
        pendingPromise = null;
    }
    return next();
};

export default withDb;

