// getting dependencies

const express = require("express");
const compression = require("compression");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");

const app = express();
// compressing the app into smalle chunks
app.use(compression());

// getting the enviroment variables
const port = process.env.PORT || 9002;
const mongo_uri = process.env.MONGO_URI;

// custom middlewares
app.use(bodyParser.json());
app.use(logger("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(
  expressCspHeader({
    directives: {
      "default-src": [NONE],
      "script-src": [SELF, INLINE],
      "style-src": [SELF],
      "img-src": [SELF],
      "worker-src": [NONE],
    },
  })
);

//  Route paths
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const userRoute = require("./routes/user");
const tokenRoute = require("./routes/token");
const adminRoute = require("./routes/admin");
const postRoute = require("./routes/post");
const todoRoute = require("./routes/todo");
const forget_passwordRoute = require("./routes/forget_password");
const registerRoute = require("./routes/register");
const chatgptRoute = require("./routes/chatGPT");

// getting Routes
app.use("/api/signup", signupRoute);
app.use("/api/signin", signinRoute);
app.use("/api/user", userRoute);
app.use("/api/token", tokenRoute);
app.use("/api/admin", adminRoute);
app.use("/api/post", postRoute);
app.use("/api/todo", todoRoute);
app.use("/api/forget_password", forget_passwordRoute);
app.use("/api/register", registerRoute);
app.use("/api/chatgpt", chatgptRoute);

/**
 * for app production
 */

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(__dirname, "/public/"));

//   // handling client page routing
//   app.get(/.*/, (req, res) => {
//     res.sendFile(__dirname, "/public/index.html");
//   });
// }

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(
        `Advanced Tech Academy server up and running on http://localhost:${port}...`
      );
    });
  })
  .catch((err) => console.log(err));
