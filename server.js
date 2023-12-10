const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/')));

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});
