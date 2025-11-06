export const getAllGoods = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get all goods endpoint',
    data: [],
  });
};

export const getGoodById = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get good by id endpoint',
  });
};

export const createGood = async (req, res) => {
  // TODO
  res.status(201).json({
    success: true,
    message: 'Create good endpoint',
  });
};

export const updateGood = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Update good endpoint',
  });
};

export const deleteGood = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Delete good endpoint',
  });
};
