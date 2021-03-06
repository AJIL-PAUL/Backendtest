const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const gold = require("./routes/api/gold");
const users = require("./routes/api/users");
const { Box } = require('./models/box');
const { Coordinate } = require('./models/coordinate');
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// var box = new Box({
//   racket_id: 00,
//   total_weight: 100,
//   rem_weight: 100,
//   no_of_items: 0,
//   status: "NotFull"
// });
// box.save();

for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    console.log("x:", i);
    console.log("y:", j);
    const coordinate = new Coordinate(
      {
        y_cord: j,
        x_cord: i
      }
    );
    const box = new Box({
      racket_id: [coordinate],
      total_weight: 100,
      rem_weight: 100,
      no_of_items: 0,
      status: "NotFull"
    });
    box.save();
  }
}
// Routes
app.use("/api/users", users);
app.use('/api/gold', gold);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
