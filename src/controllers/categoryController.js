export const getAllCategories = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get all categories endpoint',
    data: [],
  });
};

export const getCategoryById = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get category by id endpoint',
  });
};

export const createCategory = async (req, res) => {
  // TODO
  res.status(201).json({
    success: true,
    message: 'Create category endpoint',
  });
};

export const updateCategory = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Update category endpoint',
  });
};

export const deleteCategory = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Delete category endpoint',
  });
};
