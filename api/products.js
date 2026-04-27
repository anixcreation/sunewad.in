const { neon } = require('@neondatabase/serverless');

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Neon se products lana
    const result = await sql`SELECT * FROM products`;
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Neon DB connection failed" });
  }
}