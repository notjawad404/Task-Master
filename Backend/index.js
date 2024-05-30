const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const URL = 'mongodb+srv://jawad404:Jawad818@myhub.7k4rzfk.mongodb.net/?retryWrites=true&w=majority&appName=myhub';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log("Error Connecting to MongoDB: ", error.message);
});

// Define Task Schema and Model
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', async (req, res) => {
    try {
        const { name, description } = req.body;
        const task = new Task({ name, description });
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error saving task', error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server has started on port 5000!');
});
