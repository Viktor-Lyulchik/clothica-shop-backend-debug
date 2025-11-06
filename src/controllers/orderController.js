export const getAllOrders = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get all orders endpoint',
    data: [],
  });
};

export const getOrderById = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Get order by id endpoint',
  });
};

export const createOrder = async (req, res) => {
  // TODO
  res.status(201).json({
    success: true,
    message: 'Create order endpoint',
  });
};

export const updateOrder = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Update order endpoint',
  });
};

export const deleteOrder = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Delete order endpoint',
  });
};
