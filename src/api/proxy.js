// import * as express from 'express';
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
// "proxy": "https://www.okx.com",
// "homepage": "http://localhost:3000",

// const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();
const BASEURLokx = "https://www.okx.com";

// app.use('/api/v5/account/balance', createProxyMiddleware({ target: BASEURLokx, changeOrigin: true }));

// app.listen(3000);



// module.exports = app =>{
//     app.use('/api/v5/account/balance', createProxyMiddleware({ target: BASEURLokx, changeOrigin: true }));
// }



// const proxy = require("http-proxy-middleware");
// module.exports = function(app) {
//     app.use(proxy("/api/**", { // https://github.com/chimurai/http-proxy-middleware
//       target: BASEURLokx,
//       secure: false
//     }));
//   };