const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://fullStackRestorentWebsite:1DxlBGLggobLcqTy@cluster0.mzevrg2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const menuCollection = client.db("FullStactRestorentWebsite").collection('Foodcollection')
        const orderCollection = client.db("FullStactRestorentWebsite").collection('orders')
        const userCollection = client.db("FullStactRestorentWebsite").collection('users')


        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray()
            res.send(result)
        })

        app.get("/orders", async (req, res) => {
            const email = req.query.email
            
            if(!email){
                res.send([])
            }
            const result = await orderCollection.find({ userEmail: email }).toArray()

            res.send(result)

        })

        //Post heree 

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result)
        })
        //Delete here

        app.delete('/orders/:id',async(req,res)=>{
            const id = req.params.id
            const query = {_id : new ObjectId(id)}
            const resutl = await orderCollection.deleteOne(query)
            res.send(resutl)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("FullStackRestorentWebsite successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send('fullstactRestorentWebsite is runnig')
})

app.listen(port, () => {
    console.log(`server is runnig on port ${port}`)
})

//1DxlBGLggobLcqTy
//fullStackRestorentWebsite