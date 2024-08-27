const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.text());

app.get('/', (req, res) => {
  res.send('This is the Home Page');
});

app.get('/about', (req, res) => {
  res.send('This is the About Page');
});

app.get('/contact', (req, res) => {
  res.send('This is the Contact Page');
});

app.post('/file-write', (req, res) => {
  console.log('Received request body:', req.body);
  
  if (typeof req.body !== 'string') {
    return res.status(400).send('Invalid data type. Body must be a string.');
  }
  
  const filePath = path.join(__dirname, 'hello.txt');
  fs.writeFile(filePath, req.body, (err) => {
    if (err) {
      return res.status(500).send('Error writing file');
    }
    res.set('Content-Type', 'text/plain');
    res.status(200).send('File written successfully');
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(5500, () => {
  console.log(`Server Run Success`);
});
