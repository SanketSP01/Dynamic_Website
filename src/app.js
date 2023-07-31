import Express  from "express";
import "./db/conn.js"
import User from "./models/userMesaage.js"
import path from "node:path"
import { fileURLToPath } from 'url';
import  handlebars  from "hbs";

const app = Express();
const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(Express.static('public'));


//middelware

app.use('/css', Express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use('/js', Express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
// app.use('/jq', Express.static(path.join(__dirname, "../node_modules/jQuery")))

// Assuming the jQuery file is located in the "public" directory
app.use('/jq', Express.static(path.join(__dirname, "../node_modules/jQuery")));

// Additional middleware for setting the MIME type for .js files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('text/javascript');
  }
  next();
});



// const staticPath = path.join(__dirname, "../public")
// console.log(path.join(__dirname, "../public"))
// app.use(Express.static(staticPath))

const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// console.log(path.join(__dirname, "../templates/views"));

app.use(Express.urlencoded({extended:false}))
app.set('view engine', "hbs");
app.set("views" , viewPath )
handlebars.registerPartials(partialsPath)


//Routing
app.get("/", (req, res) => {
      res.render('index')

})

app.get("/contact", (req, res) => {
      res.render('/contact')

})

app.post("/contact", async (req, res) => {
      try{
            // res.send(req.body);
            const userData = new User(req.body);
            await userData.save();
            res.status(201).render("index")
      }catch (err) {
            res.status(500).send(err)
      }
})


app.listen(PORT, ()=> {
    console.log(`Server is Running on Port ${PORT}`);
})