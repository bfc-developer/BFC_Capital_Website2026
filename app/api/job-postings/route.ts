import { NextResponse } from 'next/server';
import { getJobById, upsertJob, logChange, Job } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobs = body.jobPostings || [];

    console.log(`[Sync API] Received sync request for ${jobs.length} job(s)`);

    const changeLogs: string[] = [];

    for (const job of jobs) {
      const incomingId = job.id;
      const incomingRole = job.jobRole;
      const slug = incomingRole.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const jdFileUrl = job.jdFileUrl || job.jdFileBase64 || '';

      // Fetch existing job from SQLite to detect changes
      const existingJob = await getJobById(incomingId);

      const jobData: Job = {
        id: incomingId,
        jobRole: incomingRole,
        slug: slug,
        exp: job.exp || '',
        location: job.location || '',
        heading: job.heading || '',
        preface: job.preface || '',
        skillsRequired: job.skillsRequired || '',
        vacancyType: job.vacancyType || '',
        package: job.package || '',
        qualification: job.qualification || '',
        jdFileName: job.jdFileName || '',
        jdFileUrl: jdFileUrl,
        createdAt: job.createdAt || new Date().toISOString(),
        status: job.status || 'active',
      };

      if (!existingJob) {
        // 1. New Job Insertion
        await logChange(incomingId, incomingRole, 'INSERT', 'ALL', '', incomingRole);
        await upsertJob(jobData);
        changeLogs.push(`Inserted new job: ${incomingRole} (${incomingId})`);
      } else {
        // 2. Existing Job - Check for changes
        const fieldsToCompare: Array<{ key: keyof Job; name: string }> = [
          { key: 'jobRole', name: 'jobRole' },
          { key: 'slug', name: 'slug' },
          { key: 'exp', name: 'exp' },
          { key: 'location', name: 'location' },
          { key: 'heading', name: 'heading' },
          { key: 'preface', name: 'preface' },
          { key: 'skillsRequired', name: 'skillsRequired' },
          { key: 'vacancyType', name: 'vacancyType' },
          { key: 'package', name: 'package' },
          { key: 'qualification', name: 'qualification' },
          { key: 'jdFileName', name: 'jdFileName' },
          { key: 'jdFileUrl', name: 'jdFileUrl' },
          { key: 'status', name: 'status' },
        ];

        let hasChanges = false;
        for (const field of fieldsToCompare) {
          const oldValue = (existingJob[field.key] || '').toString();
          const newValue = (jobData[field.key] || '').toString();

          if (oldValue !== newValue) {
            hasChanges = true;
            await logChange(
              incomingId,
              incomingRole,
              'UPDATE',
              field.name,
              oldValue,
              newValue
            );
            changeLogs.push(`Updated ${field.name} for ${incomingRole} (ID: ${incomingId}): '${oldValue}' -> '${newValue}'`);
          }
        }

        if (hasChanges) {
          await upsertJob(jobData);
        }
      }
    }

    console.log(`[Sync API] Seeding/Syncing complete. Logged ${changeLogs.length} change(s).`);
    
    return NextResponse.json({
      status: 'success',
      message: 'Job postings updated and logged successfully',
      changesCount: changeLogs.length,
      changes: changeLogs,
    });

  } catch (error: any) {
    console.error('[Sync API] Error syncing job postings:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
