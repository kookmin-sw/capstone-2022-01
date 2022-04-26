const jwt = require('jsonwebtoken');
const APP_SECRET = 'TEMP_SECRET_CODE';


function getUserIdByToken(bearer_token) {
    const token = bearer_token.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    if (!userId) {
        throw new Error("Not authenticated");
    }
    return userId
}

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
    getUserIdByToken
};