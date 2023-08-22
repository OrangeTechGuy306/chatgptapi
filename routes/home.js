const express= require("express")
const axios = require("axios")
const  { Configuration, OpenAIApi } = require("openai")


const route = express.Router()


route.post("/chat", async (req, res)=>{
  const msg = req.body.message
  // console.log(msg)
  try {
 
      const configuration = new Configuration({
          apiKey: process.env.KEY,
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: msg ? msg : "hi" }],
        });
        console.log(completion.data.choices[0].message.content)
        res.render(`chat`,{
          chat:completion.data.choices[0].message.content, 
          message:msg})
  
  } catch (error) {
    console.log(error.message)
  }

      // console.log(completion.data.choices[0].message)
})

route.get("", async (req, res)=>{
  res.render(`home`)
})

route.get("/chat", async (req, res)=>{
  const msg = req.body.message
  res.render(`chat`,{chat:"Hello! How may I help you?", message:msg})
})


module.exports = route