import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import {
  saveFileToCloudinary,
  deleteFileFromCloudinary,
} from '../utils/saveFileToCloudinary.js';

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const updateProfile = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Update profile endpoint',
  });
};

export const deleteProfile = async (req, res) => {
  // TODO
  res.status(200).json({
    success: true,
    message: 'Delete profile endpoint',
  });
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  if (req.user.avatar_id != '') {
    await deleteFileFromCloudinary(req.user.avatar_id);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: result.secure_url,
      avatar_id: result.public_id,
    },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
};
