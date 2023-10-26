const Holiday = require('../models/holiday');

// Retrieves all chat history records for the current user
const get = async (req, res) => {
  const { currentUser } = req;
  const holidays = await Holiday.find({});

  if (holidays.length == 0) {
    return res.status(400).json({
      status: false,
      error: 'Holiday doesn`t exist',
    });
  }

  return res.send({
    status: true,
    holidays,
  });
};

// Retrieves a specific chat history record by its ID for the current user
const getById = async (req, res) => {
  const { currentUser } = req;
  const holiday = await Holiday.findOne({
    _id: req.params.id,
  });

  if (!holiday) {
    return res.status(400).json({
      status: false,
      error: 'Holiday doesn`t exist',
    });
  }

  return res.send({
    status: true,
    holiday,
  });
};

// Creating new holiday by its ID for the current user
const create = async (req, res) => {
  const { currentUser } = req;
  const holiday = new Holiday({
    ...req.body,
  });
  holiday.save().catch((err) => {
    console.log('holiday save err', err.message);
  });

  return res.send({
    status: true,
  });
};

// Updating holiday by its ID for the current user
const update = async (req, res) => {
  const { currentUser } = req;

  Holiday.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        ...req.body,
      },
    }
  )
    .then(() => {
      res.send({
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        error: err.message || 'Holiday Update Error',
      });
    });
};

// Removing  holiday by its ID for the current user
const remove = (req, res) => {
  const { currentUser } = req;

  Holiday.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      return res.send({
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        error: err.message || 'Holiday Delete Error',
      });
    });
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
