const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errors");
const connectDB = require("./config/db");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");

// connect to DataBase
connectDB();

// init app
const app = express();

// apply middleware
app.use(express.json());

// helmet
app.use(helmet());

// cors policy
app.use(cors({ origin: "http://localhost:5173" }));

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/password", require("./routes/passwordRoute"));

//  error handler middleware
app.use(notFound);
app.use(errorHandler);

// run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT} (^_^)`
  )
);
