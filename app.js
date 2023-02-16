//Setup express
const express = require("express")
const app = express()

//Tell express to parse incoming requests with JSON
app.use(express.json())

//Create some birds
const dove = {
    name: 'Dove',
    amount: 15
}
const sparrow = {
    name: 'Sparrow',
    amount: 20
}
const blueJay = {
    name: 'Blue Jay',
    amount: 40
}
const hummingbird = {
    name: 'Hummingbird',
    amount: 82
}
const chickadee = {
    name: 'Chickadee',
    amount: 5
}

const birds = []
birds.push(dove, sparrow, blueJay, hummingbird, chickadee)


//Default get endpoint
app.get('/', (req, res) => {
    res.send(`
        <h3>This is just the default endpoint. Try /birds or /birds/id</h3>`)
})

//Get birds endpoint
app.get('/birds', (req, res) => {
    res.send(birds)
})

//Get specific bird endpoint, index 0-4 exist.
app.get('/birds/:id', (req, res) => {
    res.send(birds[req.params.id])
})



//Bind and listen the connection to port 8080
app.listen(8080)