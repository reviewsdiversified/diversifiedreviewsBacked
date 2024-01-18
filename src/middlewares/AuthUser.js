import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const AuthUser = asyncHandler(async (request, response, next) => {
    let token;
    let authHeader = request.headers.Authorization || request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCCES_TOKEN_SECRET);
            request.user = decoded.user;
            next();
        } catch (err) {
            response.status(401).json({ error: 'User is not authorized | Please login again ' });
        }
    } else {
        response.status(401).json({ error: 'User is not authorized | Please login first ' });
    }
});

export default AuthUser;
