const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
const PORT = 3000;

app.get('/consulta-dados', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

sequelize.sync({ force: true }).then(() => {
    User.bulkCreate([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' }
    ]);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
