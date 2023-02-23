//Setup express
const express = require("express")
const app = express()

//Tell express to parse incoming requests with JSON
app.use(express.json())

//Create some birds
const birds = [
    { id: 1, name: 'Dove', amount: 15 },
    { id: 2, name: 'Sparrow', amount: 20 },
    { id: 3, name: 'Blue Jay', amount: 77 },
    { id: 4, name: 'Hummingbird', amount: 4 },
    { id: 5, name: 'Chickadee', amount: 64 }
]

//Variable to keep track of current id
let currentId = birds.length


//Default get endpoint
app.get('/', (req, res) => {
    res.send(`
        <h3>This is just the default endpoint. Try /birds or /birds/:id</h3>`)
})

//Get birds endpoint
app.get('/birds', (req, res) => {
    res.send({ data: birds })
})

//Get specific bird endpoint
app.get('/birds/:id', (req, res) => {
    const foundBird = birds.find(bird => bird.id === Number(req.params.id))

    res.send({ data: foundBird })
})

//Create bird endpoint
app.post('/birds', (req, res) => {
    const newBird = {
        id: ++currentId,
        name: req.body.name,
        amount: req.body.amount
    }

    const existingBird = birds.find(bird => bird.name === newBird.name)

    if (existingBird) {
        res.status(400).send({ message: "Bird name already exists" })
        return
    }

    birds.push(newBird)

    res.send({ data: newBird })
})

//Update bird endpoint
app.put('/birds/:id', (req, res) => {
    const foundBirdIndex = birds.findIndex(bird => bird.id === Number(req.params.id));

    if (foundBirdIndex === -1) {
        res.status(404).send({ message: "Bird not found" });
        return;
    }

    const updatedBird = {
        id: birds[foundBirdIndex].id,
        name: req.body.name || birds[foundBirdIndex].name,
        amount: req.body.amount || birds[foundBirdIndex].amount
    };

    const existingBird = birds.find(bird => bird.id !== updatedBird.id && bird.name === updatedBird.name);

    if (existingBird) {
        res.status(400).send({ message: "Bird name already exists" });
        return;
    }

    birds.splice(foundBirdIndex, 1, updatedBird);

    res.send({ data: updatedBird });
})

//Delete bird endpoint
app.delete('/birds/:id', (req, res) => {
    const foundBirdIndex = birds.findIndex(bird => bird.id === Number(req.params.id))

    if (foundBirdIndex === -1) {
        res.status(404).send({ message: "Bird not found" })
        return
    }

    birds.splice(foundBirdIndex, 1)

    res.send({ message: "Bird deleted successfully" })
})



//Bind and listen the connection to port 8080
app.listen(8080, () => {
    console.log("Server is running on port", 8080);
})
