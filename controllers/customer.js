const Customer = require('../models/customer');
const Location = require('../models/location');

// Retrieves all chat history records for the current user
const get = async (req, res) => {
  const { currentUser } = req;
  const _customers = await Customer.find({
    client_id: currentUser.id
  });

  if (_customers.length == 0) {
    return res.status(400).json({
      status: false,
      error: 'Customer doesn`t exist',
    });
  }

  const query = [{
    $lookup: {
      from: 'locations',
      let: { locationId: { $toObjectId: '$location_id' } },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$locationId'] } } }
      ],
      as: 'location',
    },
  }];

  const customers = await Customer.aggregate(query).exec();

  return res.send({
    status: true,
    customers,
  });
};

// Retrieves a specific chat history record by its ID for the current user
const getById = async (req, res) => {
  const { currentUser } = req;
  const _customer = await Customer.findOne({
    client_id: currentUser.id,
    _id: req.params.id,
  });

  if (!_customer) {
    return res.status(400).json({
      status: false,
      error: 'Customer doesn`t exist',
    });
  }

  const query = [{
    $lookup: {
      from: 'locations',
      let: { locationId: { $toObjectId: '$location_id' } },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$locationId'] } } }
      ],
      as: 'location',
    },
  }];

  const customers = await Customer.aggregate(query).exec();
  const customer = customers.filter(item => item._id == req.params.id)

  return res.send({
    status: true,
    customer,
  });
};

// Creating new customer by its ID for the current user
const create = async (req, res) => {
  const { currentUser } = req;
  const customer = new Customer({
    ...req.body,
    client_id: currentUser.id,
  });
  customer.save().catch((err) => {
    console.log('customer save err', err.message);
  });

  return res.send({
    status: true,
  });
};

// Updating customer by its ID for the current user
const update = async (req, res) => {
  const { currentUser } = req;

  Customer.updateOne(
    {
      client_id: currentUser.id,
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
        error: err.message || 'Customer Update Error',
      });
    });
};

// Removing  customer by its ID for the current user
const remove = (req, res) => {
  const { currentUser } = req;

  Customer.deleteOne({
    client_id: currentUser.id,
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
        error: err.message || 'Customer Delete Error',
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
