import { Hono } from "hono";
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from "hono/jwt"
import {signupInput,signinInput} from "@titan_108/medium-common"
export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables : {
      userId:string,
    },
  }>();
userRouter.post('/signup',async (c) => {
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     try{
    const body=await c.req.json()
    const a=signupInput.safeParse(body)
    if(!a.success){
        return c.json({
            message:"Invalid inputs"
        })
    }
    const user=await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(user){
      return c.json({
        message:"User already exists"
      })
    }
   const user1= await prisma.user.create({
      data:{
        email:body.email,
        name:body.name,
        password:body.password
      }
    })
  
    return c.json({
    message:"User created successfully"
    })}catch(error){
      return c.json({
        message:"Internal Server error"
      })
    }
  })
  
  
  
  userRouter.post('/signin', async (c) => {
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
    const body=await c.req.json()
    const a=signinInput.safeParse(body)
    if(!a.success){
        return c.json({
            message:"Invalid inputs"
        })
    }
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
      return c.json({
        message:"Either email or password is incorrect"
      })
    }
    const token=await sign({id:user.id},c.env.JWT_SECRET)
  
    return c.json({
    token:token
    })}catch(error){
      return c.json({
        message:"Internal server error"
      })
    }
  })