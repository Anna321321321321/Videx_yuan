export default passport => {
  return (req, res, next) => {
    req.locals = {
      ...req.locals,
      passport
    };
    return next();
  };
};
