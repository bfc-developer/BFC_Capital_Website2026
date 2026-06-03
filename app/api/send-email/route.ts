import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ✅ Create transporter ONCE outside the handler (reused across requests)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    pool: true, // ✅ Enable connection pooling
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, mobile, email, date, time, type } = body;

        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error("SMTP environment variables are missing.");
        }

        const fromName = process.env.SMTP_FROM_NAME || 'BFC Capital';
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
        const adminEmail = process.env.SMTP_USER;

        const isBooking = type === 'booking';

        const clientMail = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: isBooking
                ? `Your Financial Planning Session is Confirmed`
                : `Thank You for Taking the First Step Towards Your Financial Goals`,
            html: isBooking ? getBookingEmailHtml(name, date, time) : getCallbackEmailHtml(name),
        };

        const adminMail = {
            from: `"${fromName} System" <${fromEmail}>`,
            to: adminEmail,
            subject: isBooking
                ? `NEW BOOKING: Financial Planning - ${name}`
                : `NEW CALLBACK REQUEST: ${name}`,
            html: getAdminEmailHtml(type, name, mobile, email, date, time),
        };

        // ✅ Send both emails at the same time instead of one after another
        await Promise.all([
            transporter.sendMail(clientMail),
            adminEmail ? transporter.sendMail(adminMail) : Promise.resolve(),
        ]);

        return NextResponse.json({ status: 'success' });

    } catch (error: any) {
        console.error('Error in send-email API:', error);
        return NextResponse.json(
            { status: 'error', message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// --- Email template functions (unchanged content & styling) ---

function getBookingEmailHtml(name: string, date: string, time: string): string {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Thank you for scheduling your Financial Planning Session with us.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Every financial goal starts with a meaningful conversation, and we're excited to be a part of yours. Whether it's building wealth, planning for retirement, or securing your family's future, we're here to help you move forward with confidence.</p>
            <div style="background-color: #f4fbf7; border-left: 4px solid #024B39; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600; width: 100px;">📅 Date:</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #024B39; font-weight: 700;">${date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600;">⏰ Time:</td>
                        <td style="padding: 6px 0; font-size: 14px; color: #024B39; font-weight: 700;">${time} (IST)</td>
                    </tr>
                </table>
            </div>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Your advisor will connect with you at the scheduled time. If possible, keep your key financial goals or any questions you'd like to discuss handy.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">We look forward to meeting you soon.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;"><strong>Warm Regards,<br/>Team BFC Capital</strong></p>
        </div>
    `;
}

function getCallbackEmailHtml(name: string): string {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">We have received your request, and one of our advisors will connect with you shortly to understand your financial aspirations and help you build a roadmap towards achieving them.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Whether your goal is wealth creation, retirement planning, your child's education, or any other financial milestone, we look forward to assisting you on your journey.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Our team will contact you during business hours.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Thank you for placing your trust in BFC Capital.</p>
            <p style="color: #44475B; font-size: 15px; line-height: 1.6;"><strong>Warm Regards,<br/>Team BFC Capital</strong></p>
        </div>
    `;
}

function getAdminEmailHtml(type: string, name: string, mobile: string, email: string, date: string, time: string): string {
    const isBooking = type === 'booking';
    return `
        <div style="font-family: sans-serif; padding: 20px;">
            <h3>New Request details:</h3>
            <ul>
                <li><strong>Type:</strong> ${isBooking ? 'Financial Session Booking' : 'Callback Request'}</li>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Mobile:</strong> ${mobile}</li>
                <li><strong>Email:</strong> ${email}</li>
                ${isBooking ? `<li><strong>Date:</strong> ${date}</li>` : ''}
                ${isBooking ? `<li><strong>Time:</strong> ${time} (IST)</li>` : ''}
            </ul>
        </div>
    `;
}