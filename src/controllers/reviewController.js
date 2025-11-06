export const getAllReviews = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get all reviews endpoint',
    data: [],
  });
};

export const getReviewById = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get review by id endpoint',
  });
};

export const createReview = async (req, res) => {
  // TODO
  res.status(201).json({
    success: true,
    message: 'Create review endpoint',
  });
};

export const updateReview = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Update review endpoint',
  });
};

export const deleteReview = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Delete review endpoint',
  });
};
