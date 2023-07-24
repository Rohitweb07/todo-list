const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todaylist_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successflly connection with database");
});