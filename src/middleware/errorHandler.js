export const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }

  if (err.name === 'ValidationError') {
    if (process.env.NODE_ENV === 'production') {
      return res.status(400).json({
        success: false,
        message: req.t('errors.validationError'),
      });
    }
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({
      success: false,
      message: req.t('errors.validationError'),
      errors,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = req.t('errors.alreadyExists', {
      field: field.charAt(0).toUpperCase() + field.slice(1),
    });
    return res.status(409).json({
      success: false,
      message,
    });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: req.t('errors.invalidToken'),
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({
      success: false,
      message: req.t('errors.internal'),
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
