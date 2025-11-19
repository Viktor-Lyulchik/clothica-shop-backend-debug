import { Feedback } from '../models/feedback.js';

export const createFeedback = async (req, res, next) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json({
    success: true,
    message: req.t('feedback.created'),
    data: feedback,
  });
};

export const getAllFeedbacks = async (req, res, next) => {
  const { page = 1, perPage = 3, good, category, rate } = req.query;

  const filter = {};
  if (good) filter.good = good;
  if (category) filter.category = category;
  if (rate) filter.rate = Number(rate);

  const feedbackQuery = Feedback.find(filter);

  const lang = req.i18n.language;
  Feedback.schema.path('good').schema.options.lang = lang;
  Feedback.schema.path('category').schema.options.lang = lang;

  feedbackQuery.populate({
    path: 'good',
    select: 'name localizedName',
  });

  feedbackQuery.populate({
    path: 'category',
    select: 'name localizedName',
  });

  const [feedbacks, total] = await Promise.all([
    feedbackQuery
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean({ virtuals: true }),
    feedbackQuery.clone().countDocuments(),
  ]);
  const totalPages = Math.ceil(total / perPage);

  res.status(200).json({
    success: true,
    message: req.t('feedback.retrieved'),
    data: {
      feedbacks,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
      },
    },
  });
};
