const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.json({
        message: 'Hello from DevOps Pipeline!',
        version: '1.2.0',
        timestamp: new Date().toISOString()
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get('/health', (req, res) => {
 res.json({ status: 'healthy', uptime: process.uptime() });
});
module.exports = app;
