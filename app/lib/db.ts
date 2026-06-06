import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:career.db',
});

export interface Job {
  id: string;
  jobRole: string;
  slug: string;
  exp?: string;
  location?: string;
  heading?: string;
  preface?: string;
  skillsRequired?: string;
  vacancyType?: string;
  package?: string;
  qualification?: string;
  jdFileName?: string;
  jdFileUrl?: string;
  createdAt?: string;
  status?: string;
}

// Automatically initialize tables if they do not exist
export async function initDb() {
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
}

// Run schema initialization asynchronously
initDb().catch(err => {
  console.error("Failed to initialize database tables:", err);
});

export async function getJobs(): Promise<Job[]> {
  const result = await client.execute("SELECT * FROM jobs WHERE status = 'active' ORDER BY createdAt DESC");
  return result.rows.map(row => ({
    id: row.id as string,
    jobRole: row.jobRole as string,
    slug: row.slug as string,
    exp: row.exp as string,
    location: row.location as string,
    heading: row.heading as string,
    preface: row.preface as string,
    skillsRequired: row.skillsRequired as string,
    vacancyType: row.vacancyType as string,
    package: row.package as string,
    qualification: row.qualification as string,
    jdFileName: row.jdFileName as string,
    jdFileUrl: row.jdFileUrl as string,
    createdAt: row.createdAt as string,
    status: row.status as string,
  }));
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const result = await client.execute({
    sql: "SELECT * FROM jobs WHERE slug = ? AND status = 'active' LIMIT 1",
    args: [slug]
  });
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    id: row.id as string,
    jobRole: row.jobRole as string,
    slug: row.slug as string,
    exp: row.exp as string,
    location: row.location as string,
    heading: row.heading as string,
    preface: row.preface as string,
    skillsRequired: row.skillsRequired as string,
    vacancyType: row.vacancyType as string,
    package: row.package as string,
    qualification: row.qualification as string,
    jdFileName: row.jdFileName as string,
    jdFileUrl: row.jdFileUrl as string,
    createdAt: row.createdAt as string,
    status: row.status as string,
  };
}

export async function getJobById(id: string): Promise<Job | null> {
  const result = await client.execute({
    sql: "SELECT * FROM jobs WHERE id = ? LIMIT 1",
    args: [id]
  });
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    id: row.id as string,
    jobRole: row.jobRole as string,
    slug: row.slug as string,
    exp: row.exp as string,
    location: row.location as string,
    heading: row.heading as string,
    preface: row.preface as string,
    skillsRequired: row.skillsRequired as string,
    vacancyType: row.vacancyType as string,
    package: row.package as string,
    qualification: row.qualification as string,
    jdFileName: row.jdFileName as string,
    jdFileUrl: row.jdFileUrl as string,
    createdAt: row.createdAt as string,
    status: row.status as string,
  };
}

export async function upsertJob(job: Job): Promise<void> {
  await client.execute({
    sql: `INSERT OR REPLACE INTO jobs (
      id, jobRole, slug, exp, location, heading, preface, skillsRequired, vacancyType, package, qualification, jdFileName, jdFileUrl, createdAt, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      job.id,
      job.jobRole,
      job.slug,
      job.exp || '',
      job.location || '',
      job.heading || '',
      job.preface || '',
      job.skillsRequired || '',
      job.vacancyType || '',
      job.package || '',
      job.qualification || '',
      job.jdFileName || '',
      job.jdFileUrl || '',
      job.createdAt || new Date().toISOString(),
      job.status || 'active'
    ]
  });
}

export async function logChange(
  jobId: string,
  jobRole: string,
  changeType: string,
  field: string,
  oldValue: string,
  newValue: string
): Promise<void> {
  await client.execute({
    sql: `INSERT INTO job_changes_log (
      jobId, jobRole, changeType, field, oldValue, newValue, timestamp
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      jobId,
      jobRole,
      changeType,
      field,
      oldValue,
      newValue,
      new Date().toISOString()
    ]
  });
}
