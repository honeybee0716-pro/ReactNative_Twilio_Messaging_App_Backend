const Location = require('../models/location');

// Retrieves all chat history records for the current user
const get = async (req, res) => {
  const { currentUser } = req;
  const locations = await Location.find({});

  if (locations.length == 0) {
    return res.status(400).json({
      status: false,
      error: 'Location doesn`t exist',
    });
  }

  return res.send({
    status: true,
    locations,
  });
};

// Retrieves a specific chat history record by its ID for the current user
const getById = async (req, res) => {
  const { currentUser } = req;
  const location = await Location.findOne({
    _id: req.params.id,
  });

  if (!location) {
    return res.status(400).json({
      status: false,
      error: 'Location doesn`t exist',
    });
  }

  return res.send({
    status: true,
    location,
  });
};

// Retrieves a specific chat history record by its ID for the current user
const getByLocationId = async (req, res) => {
  const { currentUser } = req;
  const location = await Location.findOne({
    location_id: req.params.id,
  });

  if (!location) {
    return res.status(400).json({
      status: false,
      error: 'Location doesn`t exist',
    });
  }

  return res.send({
    status: true,
    location,
  });
};

// Creating new location by its ID for the current user
const create = async (req, res) => {
  const { currentUser } = req;
  const location = new Location({
    ...req.body
  });
  location.save().catch((err) => {
    console.log('location save err', err.message);
  });

  return res.send({
    status: true,
  });
};

// Updating location by its ID for the current user
const update = async (req, res) => {
  const { currentUser } = req;

  Location.updateOne(
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
        error: err.message || 'Location Update Error',
      });
    });
};

// Removing  location by its ID for the current user
const remove = (req, res) => {
  const { currentUser } = req;

  Location.deleteOne({
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
        error: err.message || 'Location Delete Error',
      });
    });
};

module.exports = {
  get,
  getById,
  getByLocationId,
  create,
  update,
  remove,
};
