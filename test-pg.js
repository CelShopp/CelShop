const { Client } = require('pg');

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Collection'
        `);
        console.log("Columns on Collection table:", res.rows.map(r => r.column_name));
    } catch (e) {
        console.error("PG error:", e);
    } finally {
        await client.end();
    }
}

main();
