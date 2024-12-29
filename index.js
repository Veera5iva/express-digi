import 'dotenv/config'
import express from "express";

const app = express();

const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("Hello from Veerasiva!");

// })

// app.get("/veerasiva", (req, res) => {
//     res.send("You're now in the Veerasiav profile!");
// })

// app.get("/twitter", (req, res) => {
//     res.send("You will visit the twitter profile");
// })

app.use(express.json());

let teaData = [];
let nextID = 1;

// adding new tea
app.post("/teas", (req, res) => {
    const {name, price} = req.body;
    console.log(req.body);
    
    const newTea = {
        id: nextID++,
        name,
        price
    }
    console.log(newTea);
    
    teaData.push(newTea);
    res.status(201).send(newTea);
})

// get all the teas 
app.get("/teas", (req, res) =>{
    res.status(200).send(teaData);
})

// get a tea with ID
app.get("/teas/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) // extracting from the url will always gives us the string so convert into int
    if(!tea) return res.status(404).send("Error: Tea not found.");
    res.status(200).send(tea);
})

// update tea
app.put("/teas/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea) return res.status(404).send("Error: Tea not found.");
    const {name, price} = req.body
    console.log(req.body);
    tea.name = name;
    tea.price = price;
    res.send(200);
})

// delete tea
app.delete("/teas/:id", (req, res) => {
    const index = teaData.findIndex(i => i.id === parseInt(req.params.id));
    if(index < 0) return res.status(404).send("Tea not found");
    teaData.splice(index, 1);
    return res.status(200).send(`Delete operation completed!`);
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
})
