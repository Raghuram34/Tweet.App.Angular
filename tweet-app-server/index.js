const express = require('express');
const path = require('path');

const app = express()

const port = process.env.port || 3333;

app.use(express.static(path.join(__dirname,"dist/tweet-app/")));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,"dist/tweet-app/index.html"));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});