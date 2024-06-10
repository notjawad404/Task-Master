const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const URL = 'mongodb+srv://jawad404:Jawad818@myhub.7k4rzfk.mongodb.net/TaskMaster?retryWrites=true&w=majority&appName=myhub';

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

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/auth/signup', async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, username, password });
        // const newUser = new User({ name, email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error: error.message });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = password;
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Task Schema
const taskSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    status1: { type: String, required: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', async (req, res) => {
    try {
        const { username, name, description, priority, status1, dueDate, createdAt } = req.body;
        const task = new Task({ username, name, description, priority, status1, dueDate, createdAt });

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error saving task', error: error.message });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tasks', error: error.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, name, description, priority, status1, dueDate, createdAt } = req.body;
        const task = await Task.findByIdAndUpdate(
            id,
            { name, description, priority, status1, dueDate, createdAt },
            { new: true } // This option returns the updated document
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server has started on port 5000!');
});
