const express = require("express");
const app = express();
const morgan = require("morgan");

// use morgan middlewares

app.use(morgan("dev"));

// const logger = (req, res, next) => {
//   console.log("I am a logger middleware");
//   next();
// };

// app.use(function (req, res, next) {
//   console.log("I am a logger middleware");
//   next();
// });

// app
//   .use((req, res, next) => {
//     console.log("First middleware");
//     // next();
//   })
//   .use((req, res, next) => {
//     console.log("second middleware");
//     // next();
//   })
//   .use((req, res, next) => {
//     console.log("Third middleware");
//     // next();
//   });

//protected route middleware

const protected = (req, res, next) => {
  let useLoginDetails = {
    isLogin: true,
    username: "Mahesh",
  };

  if (useLoginDetails.isLogin) {
    next();
  } else {
    return res.json("You must login first");
  }
  app.use(protected);
};

// isAdmin route middleware
const isAdmin = (req, res, next) => {
  let useLoginDetails = {
    isLogin: false,
    username: "Mahesh",
    isAdmin: true,
  };

  if (useLoginDetails.isAdmin) {
    next();
  } else {
    return res.json("You are not admin");
  }
  app.use(isAdmin);
};

// ------coding challenge 1------
// Create a middleware that will log the request method, url, and date and time of the request.
const logger = (req, res, next) => {
  console.log(req.method, req.url, new Date().toString());
  next();
};

// ------coding challenge 2------
// Create a middleware that will check the number of requests made to the server.
// If the number of requests is greater than 10, return a response with a status code of 429. (Too Many Requests)
// If the number of requests is less than 10, call the next middleware.
let requestCount = 0;

const counter = (req, res, next) => {
  requestCount++;
  console.log(requestCount);
  if (requestCount > 10) {
    return res.status(429).json("Too many request");
  }

  next();
};

//Home route
app.get("/", function (req, res) {
  res.send("Hello world");
});

//Login route
app.post("/login", function (req, res) {
  res.send("Login Successful");
});

app.post("/create-post", (req, res) => {
  res.json({
    message: "Post Created",
  });
});

app.get("/posts", function (req, res) {
  res.json({ message: "Post fetched Successfully" });
});

app.post("/posts", function (req, res) {
  res.send("Create posts");
});

app.put("/posts/:id", function (req, res) {
  const id = req.params;
  console.log(id);
  res.send("Update posts");
});

app.delete(
  "/posts/:id",
  counter,

  function (req, res) {
    res.json({
      message: "Post Deleted",
    });
  }
);

app.listen(5000, function () {
  console.log("Server is up and running");
});
