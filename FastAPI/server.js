// server.js
const express = require('express');
const cors = require('cors'); // Import CORS
const { exec } = require('child_process');

const app = express();
const PORT = 5000;


app.use(cors);


// Define a route to handle the command execution
app.get('/run-commands', (req, res) => {
    const commands = `echo "Executing commands..." && echo "Current date and time: $(date)"`;

    exec(commands, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
        res.send(`Commands executed successfully:\n${stdout}`);
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
