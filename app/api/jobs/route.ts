import { NextResponse } from 'next/server';
import { getJobs } from '../../lib/db';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  try {
    const jobs = await getJobs();

    return NextResponse.json(
      { jobPostings: jobs },
      {
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (error: any) {
    console.error('Error fetching jobs from SQLite database:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch jobs' },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
