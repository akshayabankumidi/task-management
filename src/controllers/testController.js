exports.sayHello = async (req, res, next) => {
    try {

      res.status(201).json({message: 'hello '});
    } catch (err) {
      next(err);
    }
  };