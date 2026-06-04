import { createClient } from '@libsql/client';

async function seed() {
  console.log('Connecting to database...');
  const client = createClient({
    url: 'file:career.db',
  });

  console.log('Creating table if it does not exist...');
  await client.execute(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      jobRole TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      exp TEXT,
      location TEXT,
      heading TEXT,
      preface TEXT,
      skillsRequired TEXT,
      vacancyType TEXT,
      package TEXT,
      qualification TEXT,
      jdFileName TEXT,
      jdFileUrl TEXT,
      createdAt TEXT,
      status TEXT
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS job_changes_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobId TEXT NOT NULL,
      jobRole TEXT,
      changeType TEXT NOT NULL,
      field TEXT,
      oldValue TEXT,
      newValue TEXT,
      timestamp TEXT NOT NULL
    )
  `);

  console.log('Fetching live jobs from API...');
  const res = await fetch("https://hrms-bfc-capital2026.vercel.app/api/job-postings");
  const data = await res.json();
  const jobs = data.jobPostings || [];

  console.log(`Found ${jobs.length} jobs. Seeding database...`);

  for (const job of jobs) {
    const slug = job.jobRole.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Support both standard jdFileUrl (future) and jdFileBase64 (current data URL)
    const jdFileUrl = job.jdFileUrl || job.jdFileBase64 || '';
    
    await client.execute({
      sql: `INSERT OR REPLACE INTO jobs (
        id, jobRole, slug, exp, location, heading, preface, skillsRequired, vacancyType, package, qualification, jdFileName, jdFileUrl, createdAt, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        job.id,
        job.jobRole,
        slug,
        job.exp || '',
        job.location || '',
        job.heading || '',
        job.preface || '',
        job.skillsRequired || '',
        job.vacancyType || '',
        job.package || '',
        job.qualification || '',
        job.jdFileName || '',
        jdFileUrl,
        job.createdAt || new Date().toISOString(),
        job.status || 'active'
      ]
    });
    console.log(`- Seeded: ${job.jobRole} (${slug})`);
  }

  console.log('Seeding completed successfully!');
  client.close();
}

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
