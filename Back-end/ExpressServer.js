const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')
const cors=require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
const uri = "mongodb+srv://syedsumeera92:<sumeera123>@cluster0.igubn4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(cors());
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
app.listen(3008, () => {


  app.get('/login/:Email/:password', (req, res) => {
    const { Email, password } = req.params;
    const Login = async () => {
      await client.connect();
      const database = client.db("ExpenseTraker");
      const result = await database.collection("users").findOne({ Email, password });
      if (result) {
        const output = { status: 'success', userId: result._id, data: result };
        res.send(output);
      } else {
        const output = { status: 'error', data: null };
        res.send(output);
      }
    };
    Login();
  });

  

 app.post('/signup/:first_name/:last_name/:Email/:Username/:Mobile/:password', (req, res) => {
  const data = req.params;
  const Signup = async () => {
    await client.connect();
    const database = client.db("ExpenseTraker");
    const result = await database.collection("users").insertOne(data);
    if (result) {
      const output = { status: 'success', userId: result.insertedId, data: result };
      res.send(output);
    } else {
      const output = { status: 'failed', data: null };
      res.send(output);
    }
  };
  Signup();
});




app.post("/display/:userId/:Balance", (req, res) => {
  const userId = req.params.userId;
  const newBalance = parseFloat(req.params.Balance);

  const Wallet = async () => {
    await client.connect();
    const database = client.db("ExpenseTraker");
    const collection = database.collection("users");
    const filter = { _id: new ObjectId(userId) }; 
    const update = { $inc: { wallet: newBalance, Balance: newBalance } };

    const options = { returnDocument: 'after' };
    const result = await collection.findOneAndUpdate(filter, update, options);
    if (result) {
      res.send({ status: 'success', wallet: result.wallet, Balance:result.Balance});
    } else {
      res.send({ status: 'failed', data: null });
    }
  };
  Wallet();
});




app.post("/addtransaction/:userId/:Amount/:Place/:Month/:Category", (req, res) => {
  const { userId, Amount, Place, Month, Category } = req.params;
  const Expenses = async () => {
    await client.connect();
    const database = client.db("ExpenseTraker");

    const userCollection = database.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    const currentBalance = user.Balance;
    const newBalance = currentBalance -parseFloat(Amount);
    await userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { Balance: newBalance } });

    const transaction = {
      userId: new ObjectId(userId),
      amount: parseFloat(Amount),
      place: Place,
      month: Month,
      category: Category,
      // date: new Date()
    };


    const result=await database.collection("Expenses").insertOne(transaction);
    const totalExpenses = await database.collection("Expenses").aggregate([
      { $match: { userId: new ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]).toArray();

    const currentExpenses = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
    if (result) {
      const output = { status: 'success', data: result, updatedBalance:newBalance, Expenses:currentExpenses};
      console.log(output)
      res.send(output);
    } else {
      const output = { status: 'failed', data: null };
      res.send(output);
    }
  };
  Expenses();
});




app.post('/Budjet/:userId/:Month', (req, res) => {
  const { userId, Month } = req.params;
  const Budget = async () => {
    await client.connect();
    const database = client.db("ExpenseTraker");
    const result = await database.collection("Expenses").find({
      userId: new ObjectId(userId),
      month: Month
    }).toArray();

    if (result) {
      const output = { status: 'success', data: result };
      res.send(output);
    } else {
      const output = { status: 'error', data: null };
      res.send(output);
    }
  };
  Budget();
});



app.get('/display/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await client.connect();
    const database = client.db("ExpenseTraker");
    const result = await database.collection("Expenses").aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $group: {
          _id: "$month",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $addFields: {
          monthNumber: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "January"] }, then: 1 },
                { case: { $eq: ["$_id", "February"] }, then: 2 },
                { case: { $eq: ["$_id", "March"] }, then: 3 },
                { case: { $eq: ["$_id", "April"] }, then: 4 },
                { case: { $eq: ["$_id", "May"] }, then: 5 },
                { case: { $eq: ["$_id", "June"] }, then: 6 },
                { case: { $eq: ["$_id", "July"] }, then: 7 },
                { case: { $eq: ["$_id", "August"] }, then: 8 },
                { case: { $eq: ["$_id", "September"] }, then: 9 },
                { case: { $eq: ["$_id", "October"] }, then: 10 },
                { case: { $eq: ["$_id", "November"] }, then: 11 },
                { case: { $eq: ["$_id", "December"] }, then: 12 }
              ],
              default: 0 
            }
          }
        }
      },
      { $sort: { monthNumber: 1 } }, 
      {
        $project: {
          month: "$_id",
          Amount: "$totalAmount",
          _id: 0
        }
      }
    ]).toArray();

    res.send({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


})
