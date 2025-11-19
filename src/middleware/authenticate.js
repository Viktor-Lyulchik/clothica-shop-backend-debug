import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, req.t('auth.missingToken'));
  }

  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  });
  if (!session) {
    throw createHttpError(401, req.t('auth.sessionNotFound'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError(401, req.t('auth.sessionExpired'));
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;
  next();
};
