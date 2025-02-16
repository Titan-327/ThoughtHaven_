import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from "hono/jwt"
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

import { serve } from '@hono/node-server'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_PASSWORD:string
  },
  Variables : {
    userId:string,
  },
}>();
app.use("/*",cors())
app.route("/api/v1/blog",blogRouter)
app.route("/api/v1/user",userRouter)



export default app
