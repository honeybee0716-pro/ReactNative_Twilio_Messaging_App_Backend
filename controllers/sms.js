const SMS = require('../models/sms');
const Customer = require('../models/customer')
const Holiday = require('../models/holiday');
const dotenv = require('dotenv');
dotenv.config();

// Setting Twilio account SID, Token and Phone number

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Creating a Twilio client instance
const client = require('twilio')(accountSid, authToken);


// Function to send a scheduled message
const sendMessage = async (currentUser, customer, holiday) => {
  
  // console.log(currentUser.id, currentUser.firstName , currentUser.lastName , currentUser.email);
  // console.log(customer.id, customer.firstName, customer.lastName, customer.phone);
  // console.log(holiday.title, holiday.description);
  const message_string=`Hi ${customer.firstName +' '+ customer.lastName}, \n${holiday.description} \nFrom ${currentUser.firstName +' '+ currentUser.lastName}`

  console.log("===MSG===>",message_string , new Date());

  try {
    const message = await client.messages.create({
      to: customer.phone,
      from: myPhoneNumber,
      body: message_string
    });

    console.log('Message SID', message.sid);

    const sms = new SMS({
      client_id: currentUser.id,
      customer_id: customer.id,
      message: message_string,
      send_time: new Date().toISOString(),
      status: false
    });
  
    // Saving the chat history to the database and handling any error that may occur
    sms.save().catch((err) => {
      console.log('SMS save err', err.message);
    });
  } catch (error) {
    console.log(error);
  }
};


const equalTime = (date1, date2) =>{
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  if(d1.getMonth() != d2.getMonth()) return false;
  if(d1.getDate() != d2.getDate()) return false;
  if(d1.getHours() != d2.getHours()) return false;
  if(d1.getMinutes() != d2.getMinutes()) return false;
  return true;
}

const automation = async (req) => {
  console.log('Starting automation api...')
  const { currentUser } = req;
  const holiday_data = await Holiday.find({});
  const customer_data = await Customer.find({ client_id: currentUser.id });

  holiday_data.map(holiday => {
    try {
      const schDate = new Date(holiday.date).toISOString();
      const locationIdToFind = holiday.location_id;
  
      if (equalTime(schDate, new Date())) {
        if (holiday.location_id == "everyone") {
          if (customer_data.length > 0) {
            customer_data.map(customer => {
              sendMessage(currentUser, customer, holiday);
            });
          }
        } else {
          const customersToNotify = customer_data.filter(customer => customer.location_id == locationIdToFind);
          if (customersToNotify.length > 0) {
            customersToNotify.map(customer => {
              sendMessage(currentUser, customer, holiday);
            });
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while processing holiday:", holiday, error);
      // Handle or log the error as per your requirement
    }
  });
};

const create = (req, res) => {
  setInterval(() => automation(req), 1000 * 60);
  res.send('Automation is working now...');
};
// Retrieves all chat history records for the current user
const get = async (req, res) => {
  const { currentUser } = req;
  const sms = await SMS.find({
    client_id: currentUser.id,
  });

  if (!sms) {
    return res.status(400).json({
      status: false,
      error: 'SMS doesn`t exist',
    });
  }

  return res.send({
    status: true,
    sms,
  });
};

// Retrieves a specific chat history record by its ID for the current user
const getById = async (req, res) => {
  const { currentUser } = req;
  const sms = await SMS.findOne({
    client_id: currentUser.id,
    _id: req.params.id,
  });

  if (!sms) {
    return res.status(400).json({
      status: false,
      error: 'SMS doesn`t exist',
    });
  }

  return res.send({
    status: true,
    sms,
  });
};

// Removes a specific chat history record by its ID for the current user
const remove = (req, res) => {
  const { currentUser } = req;

  SMS.deleteOne({
    _id: req.params.id,
    client_id: currentUser.id,
  })
    .then(() => {
      return res.send({
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        error: err.message || 'SMS Delete Error',
      });
    });
};

module.exports = {
  create,
  get,
  getById,
  remove
};
