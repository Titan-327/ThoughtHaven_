import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { postInput,updatePostInput } from '@titan_108/medium-common';
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { encodeBase64 } from 'hono/utils/encode';
export const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>()
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const blogs = await prisma.post.findMany({
        where:{
published:true
        },
        select : {
            title : true,
            content : true ,
            id : true,
            createdAt:true,
            imageLink:true,
            author : {
                select: {
                    name : true
                }
            }
        }
    })

    return c.json({posts:blogs});    
})
blogRouter.use( "/*" , async (c, next) => {
        const authHeader = c.req.header("Authorization") || "" ;  
        try {
            const user = await verify(authHeader , c.env.JWT_SECRET) as { id: string };
            if(user){
                c.set("userId", user.id );
                await next();  
            }else{
                return c.text("Unauthorized");
            }
        } catch (error) {
            return c.text("Breaking")
        }
})
blogRouter.get('/check',async function(c){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId=c.get("userId")
    try{
    const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
    })
    if(!user){
        return c.json({
            message:"User not found"
        })
    }
    return c.json({
        message:"User found"
    })
}catch(error){
        return c.json({
            message:"Invalid"
        })
    }
})
blogRouter.post('/', async (c) => {
   
    const file = await c.req.parseBody();
    const { success,error } = postInput.safeParse(file);
    if (!success) {
        c.status(411);
        console.log(error)
        return c.json({
            message: "Invalid inputs"
        });
    }

    const image = file["image"] as File;
    if (!image) {
        return c.json({
            message: "No image uploaded"
        });
    }

    try {
        const arrayBuffer = await image.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "For Blog App");
        formData.append("cloud_name", "dcnjpygqu");
        

        const response = await fetch("https://api.cloudinary.com/v1_1/dcnjpygqu/image/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            return c.json({
                message:"Clouidnary error"
            })
        }

        const data = await response.json() as { secure_url: string };
        const authorId = c.get("userId");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        let h=false;
            if(file.status==="public"){
h=true
            }    
        const blog = await prisma.post.create({
            data: {
                title: file.title as string,
                content: file.content as string,
                imageLink: data.secure_url as string,
                published:h as boolean,
                authorId: authorId,
            }
        });

        return c.json({
            message:"Blog added successfully",
            id:blog.id
        });

    } catch (error) {
        console.error(error);
        return c.json({
            message: "Something went wrong",
            error:error
        });
    }
});


blogRouter.put('/update', async function (c) {
  // Parse the request body
  const file = await c.req.parseBody();
  
  // Validate input using the Zod schema
  const { success, error } = updatePostInput.safeParse(file);
  
  // If validation fails, return error response
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid inputs",
      errors: error.errors, // Include validation errors in the response
    });
  }

  // Extract the image from the request body
  const image = file["image"] as File;

  // Initialize Prisma Client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
const status = file.status === "public"
  try {
    if (!image) {
      // Update blog without image
      const blog = await prisma.post.update({
        where: {
          id: file.id as string,
        },
        data: {
          title: file.title as string,
          content: file.content as string,
          published:status
        },
      });
      return c.json({
        id: blog.id,
        message: "Blog updated successfully",
      });
    }

    // Handle image upload to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "For Blog App");
    formData.append("cloud_name", "dcnjpygqu");

    const response = await fetch("https://api.cloudinary.com/v1_1/dcnjpygqu/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return c.json({
        message: `Cloudinary upload failed: ${response.statusText}`,
      });
    }

    const data = await response.json() as { secure_url: string };

    // Update the blog with the new image URL
    const blog = await prisma.post.update({
      where: {
        id: file.id as string,
      },
      data: {
        title: file.title as string,
        content: file.content as string,
        imageLink: data.secure_url, // Save the Cloudinary image URL
        published:status
      },
    });

    return c.json({
      id: blog.id,
      message: "Blog updated successfully",
    });
  } catch (error) {
    // Catch any other unexpected errors and return a message
    console.error(error);
    return c.json({
      message: "Invalid",
    });
  }
});

blogRouter.delete('/delete', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    // Accessing the id from the query parameters correctly
    const { id } = c.req.query(); // c.req.query is an object with key-value pairs
  
    // Check if the id is provided and is a string
    if (!id || typeof id !== 'string') {
      return c.json({
        message: "Invalid inputs", // Return an error if id is missing or not a string
      });
    }
  
    try {
      // Attempt to delete the blog post using the id
      await prisma.post.delete({
        where: {
          id: id, // Use the id directly since it's a valid string
        },
      });
  
      return c.json({
        message: "Blog deleted", // Success message after deletion
      });
    } catch (error) {
      console.error("Error deleting blog:", error); // Log error details
      return c.json({
        message: "Internal Server Error", // Server error message
      });
    }
  });
  
//Pagination ................... to show only 10 random output
// blogRouter.get('/bulk', async(c) => {
//         const prisma = new PrismaClient({
//                 datasourceUrl: c.env.DATABASE_URL,
//         }).$extends(withAccelerate())


//         const blogs = await prisma.post.findMany({
//             select : {
//                 title : true,
//                 content : true ,
//                 id : true,
//                 createdAt:true,
//                 author : {
//                     select: {
//                         name : true
//                     }
//                 }
//             }
//         })

//         return c.json({posts:blogs});    
// })
blogRouter.get("/userBlogs" , async(c)=>{
    const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id =c.get("userId")
    try {
        const blogs = await prisma.post.findMany({
            where : {
                authorId:id
            },
            select : {
                id : true,
                title : true,
                content : true,
                createdAt:true,
                imageLink:true,
                published:true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json({posts:blogs});
        
    } catch (error) {
        c.status(411);
        return c.json({
            msg : "Invalid"
        })
    }
})
blogRouter.get("/:id" , async(c)=>{
        const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const id : string =  c.req.param("id")
        try {
            const blog = await prisma.post.findFirst({
                where : {
                    id : id  
                },
                select : {
                    id : true,
                    title : true,
                    content : true,
                    createdAt:true,
                    imageLink:true,
                    published:true,
                    author : {
                        select : {
                            name : true
                        }
                    }
                }
            })
            return c.json({post:blog});
            
        } catch (error) {
            c.status(411);
            return c.json({
                msg : "Invalid"
            })
        }
})
