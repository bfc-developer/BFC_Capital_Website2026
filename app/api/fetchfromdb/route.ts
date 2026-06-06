import { NextResponse } from 'next/server';
import { getJobs } from '../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await getJobs();
    
    return NextResponse.json({
      status: 'success',
      count: jobs.length,
      jobs: jobs,
    });
  } catch (error: any) {
    console.error('[FetchFromDB API] Error fetching job postings:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
