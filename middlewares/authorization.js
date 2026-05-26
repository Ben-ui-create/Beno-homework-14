import jwt from 'jsonwebtoken';
import HttpErrors from 'http-errors';

const {JWT_SECRET} = process.env;

export default function authorization(req, res, next) {
  try {
    const token = req.signedCookies.token;

    if (!token) {
      throw new HttpErrors(401, 'Missing or tampered cookie');
    }

    const payload = jwt.verify(token, JWT_SECRET);

    req.userId = payload.userId;

    next();
  } catch (e) {
    console.error(e);

    next(new HttpErrors(401, 'Invalid session'));
  }
}