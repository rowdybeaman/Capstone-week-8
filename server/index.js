const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

const { calculateRepair, carEvaluation } = require('./controller.js');

app.post('/api/car-evaluation', carEvaluation);
app.get('/api/total-repair-cost', calculateRepair);

app.put('/api/button-style', (req, res) => {
    const { color } = req.body;
    res.json({ message: `Button color updated to ${color}` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




