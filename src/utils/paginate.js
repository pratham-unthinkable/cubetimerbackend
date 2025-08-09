export const paginate = async (model, filter = {}, {
  page = 1,
  limit = 10,
  sort = { createdAt: -1 },
  projection = null,
  populate = null
} = {}) => {
  const skip = (page - 1) * limit;

  let query = model.find(filter, projection).sort(sort).skip(skip).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const [data, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter)
  ]);

  return {
    success: true,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalRecords: total,
    data
  };
};
