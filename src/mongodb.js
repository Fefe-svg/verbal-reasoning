const mongoose = require("mongoose");

// Connect to the database
mongoose.connect("mongodb://localhost:27017/SituationalJudgementLoginSignup")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Failed to connect to MongoDB");
    });

// Define the schema
const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        lowercase: true, // Store email in lowercase
    },
    password: {
        type: String,
        required: true
    },
    results: [{
        scoresituational1: {
            type: Number,
            default: 0 // Default value if not provided
        },
        scoresituational2: {
            type: Number,
            default: 0 // Default value if not provided
        },
        scoresituational3: {
            type: Number,
            default: 0 // Default value if not provided
        },
        date: {
            type: Date,
            default: Date.now // Default to the current date
        }
    }]
});

// Create the model
const collection = mongoose.model("LogInConnection", LogInSchema);

module.exports = collection;
