/* // [for Frontend setup]
1. install hbs (handlebars) module for developing dynamic page like index.hbs rather than static page index.html
2. for creating dynamic templates create a folder in root directory and name it as 'views'
or to create custom folder like templates/views use ->1 and then ->2 

3. for creating static templates like index.html,images,css and store it in public directory
4. when using hbs template engine customize nodemon cmd as [nodemon src/app.js -e js,hbs]
*/
const express=require("express")
const path=require('path')
const hbs=require('hbs')
const temp = require("./utils/service")

const app=express()

const PublicDirectoryPath=path.join(__dirname,"../public")     //locate to directory of style.css,img to use them (__dirname=/user/node.js projects/web-server/src)
const viewsPath=path.join(__dirname,"../templates/views")                        //change views direcotry name to custom name ->1
const partialPath=path.join(__dirname,"../templates/partials")

app.set('view engine','hbs')                                     //configures hbs template engine
app.set('views',viewsPath)                                       //change views direcotry location to custom location ->2
hbs.registerPartials(partialPath)                                //register the partials file that is header, footer

app.use(express.static(PublicDirectoryPath))                  // register public folder. to load static files like css, images etc
 
// app.get("",(req,res)=>{                                       //routing
//     res.send("<h2>hello world</h2>")                         //sends a response to the script or browser that made the request to route

// })

app.get("",(req,res)=>{
    res.render("index",{                                         //res.render is used to render dynamic index.hbs page
        title:"Weather App",
        name:"Aayush Pandey" 
    })
    // res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Aayush Pandey"
    })
})


app.get("/weather",(req,res)=>{
    res.render("weather",{title:"weather forecaster"})

     
})

app.get("/weather/weather2",(req,res)=>{
    var add=req.query.address
    temp(add,(err,data)=>{
        if(err){
            return res.send(err)
        }
        res.send(data)
    })
    
})

app.get('*',(req,res)=>{
    res.render("error")
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})