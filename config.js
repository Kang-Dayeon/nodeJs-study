require('dotenv').config()
const { MONGO_URI } = process.env
module.exports = {
  'secret': 'SeCrEtKeYfOrHaShInG',
  'mongodbUri': MONGO_URI
}