const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add bcrypt for hashing passwords
const jwt = require('jsonwebtoken');

const { User, Team, Task } = require('./models');

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userData');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                role: user.role,
                team_id: user.team_id,
            }, 'secret123');
            res.json({ status: 'ok', user: token });
        } else {
            res.status(401).json({ status: 'error', user: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// User sign-up endpoint
app.post('/api/sign-up', async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            name: fullName,
            email,
            password: hashedPassword,
            role
        });

        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// API endpoint to get user role based on token
app.get('/api/user-role', async (req, res) => {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret123');
        const { name, email, role } = decoded;
        const user = await User.findOne({email: email})
        
        res.json({ status: 'ok', user:{ name, email, role, team_id: user.team_id} });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
});

// Get emails of all employees endpoint
app.get('/api/employees/emails', async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('email');
        const employeeEmails = employees.map(user => user.email);
        res.json({ status: 'ok', employees: employeeEmails });
    } catch (err) {
        console.error('Error fetching employee emails:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

app.get('/api/peopleDetails', async (req, res) => {
    try {
        const roles = ['employee', 'manager'];
        const users = await User.find({ role: { $in: roles } });
        res.json({ status: 'ok', users: users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});


// Assign task to a user
app.post('/api/tasks', async (req, res) => {
    console.log("here")
    const { title, description, status, due_date, assigned_to_email, team_id } = req.body;

    try {
        // Find the team by name
        // const team = await Team.findOne({ name: team_name });
        if (!team_id) {
            return res.status(404).json({ status: 'error', message: 'Team not found' });
        }

        const assignedTo = await User.findOne({ email: assigned_to_email });
        if (!assignedTo) {
            return res.status(404).json({ status: 'error', message: 'Assigned user not found' });
        }


        const task = new Task({
            title,
            description,
            status,
            due_date,
            assigned_to: assigned_to_email,
            // created_by: createdBy._id,
            team_id: team_id
        });

        await task.save();
        res.status(201).json({ status: 'ok', task });
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Get tasks endpoint
app.get('/api/tasks', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const { role, team_id, email  } = decoded;

        let tasks;

        if (role === 'admin') {
            tasks = await Task.find();
        } else if (role === 'manager') {
            tasks = await Task.find({ team_id });
        } else {
            tasks = await Task.find({ assigned_to: email });
        }

        res.json({ status: 'ok', tasks });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 'error', error: 'Invalid token' });
    }
});

// Endpoint to change the status of a task to "completed"
app.put('/api/tasks/complete/:title', async (req, res) => {
    const { title } = req.params;
    const { assigned_to } = req.body;

    if (!assigned_to) {
        return res.status(400).json({ status: 'error', message: 'assigned_to field is required' });
    }

    try {
        const task = await Task.findOneAndUpdate(
            { title, assigned_to },
            { status: 'completed' },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }

        res.json({ status: 'ok', task });
    } catch (err) {
        console.error('Error updating task status:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Assign user to a team
app.post('/api/teams', async (req, res) => {
    const { teamName, members } = req.body;
    console.log(req.body);
    console.log(teamName, members);

    try {
        console.log("Creating a new team");

        // Prepare the members array
        const memberObjects = [];
        const userEmails = [];

        for (const email of members) {
            console.log(`Processing member: ${email}`);
            const user = await User.findOne({ email: email });
            console.log(`Found user: ${user}`);

            if (!user) {
                return res.status(404).json({ status: 'error', message: `User not found: ${email}` });
            }

            memberObjects.push({ user_email: user.email, role: user.role });
            userEmails.push(user.email);
        }

        // Create the new team
        const team = await Team.create({ name: teamName, members: memberObjects });
        console.log("Team created:", team);

        await User.updateMany(
            { email: { $in: userEmails } },
            { $set: { team_id: team._id } }
        );

        res.status(201).json({ status: 'ok', team });
    } catch (err) {
        console.log("Error encountered while creating the team");
        console.error('Error creating team:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});


app.delete('/api/users', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Remove user from their team
        // console.log(user)
        try{
            if (user.team_id) {
                console.log(`Removing ${email} from team ${user.team_id}`);
                const result = await Team.findByIdAndUpdate(
                    user.team_id,
                    { $pull: { members: { user_email: email } } },
                    { new: true } // Return the updated document
                );
                console.log('Updated team:', result);
            }
        }catch{
            console.log("No team_id")
        }

        // Delete the user
        await User.deleteOne({ email });

        res.json({ status: 'ok', message: 'User deleted' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ status: 'error', error: err.message });

    }
});

// app.delete('/api/managers/:email', async (req, res) => {
//     const { email } = req.params;

//     try {
//         const user = await User.findOne({ email: email, role: 'manager' });
//         if (!user) {
//             return res.status(404).json({ status: 'error', message: 'Manager not found' });
//         }

//         await user.remove();
//         res.json({ status: 'ok', message: 'Manager deleted' });
//     } catch (err) {
//         console.error('Error deleting manager:', err);
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// });

app.delete('/api/tasks/title/:title', async (req, res) => {
    const { title } = req.params;
    const { assigned_to } = req.query;

    if (!assigned_to) {
        return res.status(400).json({ status: 'error', message: 'assigned_to parameter is required' });
    }

    try {
        const task = await Task.findOneAndDelete({ title, assigned_to });
        if (!task) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }

        res.json({ status: 'ok', message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});




app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        await User.updateOne({ email }, { $set: { quote: req.body.quote } });

        res.json({ status: 'ok', quote: req.body.quote });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 'error', error: 'Invalid token' });
    }
});

app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.findOne({ email });
        res.json({ status: 'ok', quote: user.quote });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 'error', error: 'Invalid token' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
