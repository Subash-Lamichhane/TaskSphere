// models.js
const mongoose = require('mongoose');

// User schema and model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
        required: true
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

const User = mongoose.model('User', userSchema);

// Team schema and model
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [
        {
            user_email: {
                type: String,
                ref: 'User'
            },
            role: {
                type: String,
                enum: ['manager', 'employee']
            }
        }
    ]
});

const Team = mongoose.model('Team', teamSchema);

// Task schema and model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed'],
        default: 'not started'
    },
    due_date: {
        type: Date
    },
    assigned_to: {
        type: String,
        ref: 'User'
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
    User,
    Team,
    Task
};
