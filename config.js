module.exports = {
  dev: {
    DB_URI: 'mongodb://localhost:27017/message-logger'
  },
  prod: {
    DB_URI: 'mongodb+srv://user1:user1pass@cluster0-1rdbl.mongodb.net/message-logger',
  },
};
