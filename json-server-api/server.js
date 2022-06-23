const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// 在 JSON Server 路由器之前添加自定义路由
// server.post("/login", (req, res) => {
//   console.log("+++++++++++++++++", req.body);
//   console.log("=================", res.locals.data);
//   res.status(200).jsonp({
//     data: res.locals.data,
//     code: 200,
//     message: "请求成功",
//   });
// });

// 自定义中间件
// server.use((req, res, next) => {
//   console.log(req.url.includes("/users"));
//   if (req.url.includes("/users")) {
//     next();
//   } else {
//     console.log('不让过~~');
//     res.sendStatus(401);
//   }
//   // if (isAuthorized(req)) {
//   //   // add your authorization logic here
//   //   next(); // continue to JSON Server router
//   // } else {
//   //   res.sendStatus(401);
//   // }
// });

// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

// In this example, returned resources will be wrapped in a body property
// router.render = (req, res) => {
//   res.jsonp({
//     body: res.locals.data
//   })
// }

// In this example we simulate a server side error response
router.render = (req, res) => {
  res.status(200).jsonp({
    data: res.locals.data,
    code: 200,
    message: "请求成功",
  });
  // res.status(500).jsonp({
  //   error: "error message here"
  // })
};

// Use default router
server.use(router);
server.listen(3005, () => {
  console.log("JSON Server is running，http://localhost:3005");
});
