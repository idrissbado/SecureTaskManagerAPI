// Task Controller
const Task = require('../models/taskModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  if (!title) return next(new AppError('Task title required', 400));
  const task = await Task.create({ title, owner: req.user._id });
  res.status(201).json({ status: 'success', data: { task } });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ owner: req.user._id });
  res.status(200).json({ status: 'success', data: { tasks } });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!task) return next(new AppError('Task not found or not authorized', 404));
  res.status(204).json({ status: 'success', data: null });
});
