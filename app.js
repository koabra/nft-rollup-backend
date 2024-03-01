var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var logger = require("morgan");

// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

// ------------ START: Public routes ------------ //
var indexRouter = require("./routes/index");
var getFaucetToken = require("./routes/get-faucet-token");
// ------------ END: Public routes ------------ //

// ------------ START: Admin routes ------------ //
var verifyUser = require("./routes/admin/admin-verify-user");
// ------------ END: Admin routes ------------ //

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//----- CORS options for API server access -----//
const cors = require("cors");

// Define an array of allowed domains
let allowedOrigins;
if (process.env.DEPLOYMENT_MODE == "PRODUCTION") {
  allowedOrigins = [""];
} else {
  allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
  ];
}

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));
//--------------------------------------------------------------------------//

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/get-faucet-token", getFaucetToken);

// Admin routes
app.use("/admin-verify-user", verifyUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
