import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

export const searchRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: (req, res) => ({
    success: false,
    error: req.t('rateLimit.search'),
  }),
  keyGenerator: (req) => req.user?._id?.toString() ?? ipKeyGenerator(req),
  skip: (req) => {
    const { search } = req.query;
    return !search;
  },
});
