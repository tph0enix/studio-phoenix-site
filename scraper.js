require('dotenv').config({ path: './.env.local' });
const axios = require('axios');
const { Client } = require('pg');

const client = new Client({ connectionString: process.env.DATABASE_URL }); // Ensure this is in .env.local

const INDUSTRIES = ['Logistics', 'Manufacturing', 'Construction'];
const TITLE_DORK = '("Operations" OR "Supply Chain" OR "Finance" OR "Plant" OR "General") AND ("Manager" OR "Director" OR "VP" OR "Controller")';

async function scrape() {
    await client.connect();
    
    for (const industry of INDUSTRIES) {
        console.log(`Targeting: ${industry}`);
        
        for (let page = 0; page < 5; page++) {
            try {
                const response = await axios.get('https://serpapi.com/search', {
                    params: {
                        engine: 'google',
                        q: `site:linkedin.com/in/ ${TITLE_DORK} "${industry}" -intitle:jobs`,
                        api_key: process.env.SERP_API_KEY,
                        start: page * 10
                    }
                });

                const results = response.data.organic_results || [];
                
                for (const res of results) {
                    const url = res.link;
                    
                    // 1. Strict Domain Validation
                    if (!url.includes('linkedin.com/in/')) continue;

                    // 2. Check Database for existing URL
                    const exists = await client.query('SELECT 1 FROM leads WHERE url = $1', [url]);
                    if (exists.rowCount > 0) continue;

                    // 3. Clean Name and Title
                    const parts = res.title.split(' - ');
                    const name = parts[0] || 'Lead';
                    const title = parts[1] || 'Executive';

                    // 4. Insert New Lead
                    await client.query(
                        'INSERT INTO leads (name, title, category, url, is_valid_lead, is_messaged) VALUES ($1, $2, $3, $4, $5, $6)',
                        [name, title, industry, url, true, false]
                    );
                }
            } catch (err) {
                console.error(`Error on ${industry} p${page}:`, err.message);
                break;
            }
        }
    }
    
    const count = await client.query('SELECT COUNT(*) FROM leads WHERE is_messaged = FALSE');
    console.log(`Scrape Complete. Total unmessaged leads in DB: ${count.rows[0].count}`);
    await client.end();
}

scrape();