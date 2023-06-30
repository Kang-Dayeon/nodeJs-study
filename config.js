require('dotenv').config()

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  'secret': 'SeCrEtKeYfOrHaShInG',
  'mongodbUri': process.env.MONGO_URI
}