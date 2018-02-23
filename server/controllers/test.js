const myTest = "WORKS!!!!!!";

module.exports = {
  test: (req, res, next) => {
    res.status(200).send(myTest);
  }
};
