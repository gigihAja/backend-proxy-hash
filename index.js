import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/ha/search', async (req, res) => {
    const { hash } = req.query;
    try {
        const response = await fetch(`https://www.hybrid-analysis.com/api/v2/search/hash?hash=${hash}`, {
            headers: {
                'api-key': process.env.HA_API_KEY,
                'User-Agent': 'Falcon Sandbox'
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/ha/summary/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://www.hybrid-analysis.com/api/v2/report/${id}/summary`, {
            headers: {
                'api-key': process.env.HA_API_KEY,
                'User-Agent': 'Falcon Sandbox'
            }
        });

        const text = await response.text();
        res.setHeader('Content-Type', 'application/json');
        res.send(text);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/abuseipdb', async (req, res) => {
    const { ip } = req.query;
    try {
        const response = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&verbose`, {
            headers: {
                'Key': process.env.ABUSEIPDB_KEY,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});
