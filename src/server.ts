import { assetsMiddleware, prerenderedMiddleware, kitMiddleware } from '../build/middlewares.js';

import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(assetsMiddleware, prerenderedMiddleware, kitMiddleware)

app.listen(port);