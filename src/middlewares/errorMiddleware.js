const middleWare = (err, req, res, next) => {
  const { status = 500, message = "Interval server error" } = err;
  res.status(status).send({
    message,
    success: false,
  });
};

export default middleWare;
