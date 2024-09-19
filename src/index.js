const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const PDFDocument = require('pdfkit');

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", templatePath);

// Register Handlebars helper function
hbs.registerHelper('formatDate', function(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options); // Change 'en-GB' to your desired locale
});

// Render login page
app.get("/", (req, res) => {
    res.render("login");
});

// Render signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Handle signup form submission
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    await collection.insertMany([data]);
    res.render("login");
});

// Handle login form submission
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name, email: req.body.email });
        if (check.password === req.body.password) {
            res.render("dashboard", { username: req.body.name });
        } else {
            res.send("Wrong password");
        }
    } catch {
        res.send("Wrong details");
    }
});

// Render dashboard page
app.get("/dashboard", (req, res) => {
    const username = req.query.username;
    res.render("dashboard", { username });
});

// POST endpoint to save quiz results
app.post("/save-result", async (req, res) => {
    const { username, setNumber, scoresituational } = req.body;
    console.log(`Saving score for user: ${username}, set: ${setNumber}, score: ${scoresituational}`); // Log for debugging

    try {
        // Define the field for the current test set
        const scoreField = `scoresituational${setNumber}`;

        // Fetch the user's document
        const user = await collection.findOne({ name: username });
        if (!user) {
            console.log(`User '${username}' not found in database`);
            return res.status(404).send("User not found");
        }

        // Find the existing result entry
        const existingResult = user.results.find(result => result.date);

        if (existingResult) {
            // Update existing entry with the maximum score and update the date
            await collection.updateOne(
                { name: username, "results.date": existingResult.date },
                { $set: { 
                    [`results.$.${scoreField}`]: Math.max(existingResult[scoreField] || 0, scoresituational),
                    "results.$.date": new Date() // Update date to the current time
                }}
            );} else {
            // Create a new result entry if no existing results
            await collection.updateOne(
                { name: username },
                { $push: { results: { date: new Date(), [scoreField]: scoresituational } } }
            );
        }

        res.json({ message: 'Score saved successfully' });
    } catch (error) {
        console.error("Error saving result:", error);
        res.status(500).send("Error saving result");
    }
});

// GET endpoint to retrieve results
app.get("/results", async (req, res) => {
    const username = req.query.username;
    console.log(`Retrieving results for user: ${username}`); // Log for debugging

    try {
        const user = await collection.findOne({ name: username });
        if (!user) {
            console.log(`User '${username}' not found in database`);
            return res.status(404).send("User not found");
        }

        console.log(`Results for user ${username}:`, user.results); // Log retrieved results

        // Create an array to store results with dates and max scores
        const resultsWithMaxScores = user.results.map(result => {
            return {
                date: result.date,
                maxScore: Math.max(
                    result.scoresituational1 || 0,
                    result.scoresituational2 || 0,
                    result.scoresituational3 || 0
                )
            };
        });

        res.render("results", { results: resultsWithMaxScores, username });
    } catch (error) {
        console.error("Error retrieving results:", error);
        res.status(500).send("Error retrieving results");
    }
});

// Route to download results as PDF
app.get('/download-results-pdf', async (req, res) => {
    const username = req.query.username;

    try {
        const user = await collection.findOne({ name: username });

        if (!user) {
            console.log(`User '${username}' not found in database`);
            return res.status(404).send("User not found");
        }

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = `${username}_results.pdf`;
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe PDF data to response
        doc.pipe(res);

        // Add content to PDF
        doc.fontSize(20).text('Quiz Results', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Username: ${username}`, { align: 'left' });
        doc.moveDown();

        // Add a header for the table
        doc.fontSize(12).text('Date', { continued: true })
            .text('          Maximum Score'); // Adjust space here
        doc.moveDown();

        // Add results
        user.results.forEach(result => {
            const maxScore = Math.max(
                result.scoresituational1 || 0,
                result.scoresituational2 || 0,
                result.scoresituational3 || 0
            );

            doc.fontSize(12).text(new Date(result.date).toLocaleDateString('en-GB'), { continued: true })
                .text('          ' + maxScore); // Adjust space here
            doc.moveDown();
        });

        // Finalize PDF file
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
    }
});

// Handle user logout
app.get("/logout", (req, res) => {
    res.redirect("/");
});

// Situational Serve QuizTest directory as static content
app.use('/situational', express.static(path.join(__dirname, '../SJ')));

// Situational Serve QuizTest index.html
app.get('/situational', (req, res) => {
    res.sendFile(path.join(__dirname, '../SJ/index.html'));
});

// Situational Serve QuizTest indexset2.html
app.get('/situationalresults', (req, res) => {
    res.sendFile(path.join(__dirname, '../SJ/indexset2.html'));
});

// Situational Serve QuizTest indexset3.html
app.get('/situationalresults', (req, res) => {
    res.sendFile(path.join(__dirname, '../SJ/indexset3.html'));
});

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
