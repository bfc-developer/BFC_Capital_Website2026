import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, mobile, email, date, time, type } = body;

        // Validate that SMTP environment variables are loaded
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error("SMTP environment variables are missing. Please ensure your .env file is set up and restart your dev server (npm run dev).");
        }

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Custom email headers / settings
        const fromName = process.env.SMTP_FROM_NAME || 'BFC Capital';
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

        let emailSubject = '';
        let htmlBody = '';

        if (type === 'booking') {
            emailSubject = `Confirmed: Financial Planning Session - ${name}`;
            htmlBody = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #024B39; margin: 0; font-size: 24px; font-weight: 700;">Financial Planning Session</h2>
                        <p style="color: #44475B; font-size: 14px; margin-top: 5px;">Your session is confirmed</p>
                    </div>
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Thank you for scheduling a session with BFC Capital. We are excited to assist you with your financial planning journey. Your appointment details are outlined below:</p>
                    
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
                            <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600;">📞 Mobile:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #44475B; font-weight: 600;">${mobile}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600;">✉️ Email:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #44475B; font-weight: 600;">${email}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Our certified advisor will contact you on your registered mobile number or share a meeting link shortly before the scheduled time.</p>
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">To prepare for your session, please keep any relevant financial documents or goals in mind.</p>
                    
                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                    <div style="text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                        <p style="margin: 0;">This is an automated confirmation from BFC Capital.</p>
                        <p style="margin: 5px 0 0 0;">If you need to reschedule or cancel your slot, please reply to this email or request a callback on our website.</p>
                    </div>
                </div>
            `;
        } else {
            // Callback Request
            emailSubject = `Callback Request Received - BFC Capital`;
            htmlBody = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #024B39; margin: 0; font-size: 24px; font-weight: 700;">Callback Requested</h2>
                        <p style="color: #44475B; font-size: 14px; margin-top: 5px;">We will connect with you soon</p>
                    </div>
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">We have received your request for a callback. A BFC Capital advisor will contact you on your registered mobile number shortly:</p>
                    
                    <div style="background-color: #f3f4f6; border-left: 4px solid #4b5563; padding: 20px; margin: 25px 0; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600; width: 100px;">📞 Mobile:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #024B39; font-weight: 700;">${mobile}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600;">✉️ Email:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #44475B; font-weight: 600;">${email}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Our representative will reach out to you within our business hours to answer any questions or set up a consultation.</p>
                    
                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                    <div style="text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                        <p style="margin: 0;">This is an automated confirmation from BFC Capital.</p>
                    </div>
                </div>
            `;
        }

        // Send confirmation email to the client
        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: emailSubject,
            html: htmlBody,
        });

        // Optional: Send a notification email to the BFC Capital admin team
        const adminEmail = process.env.SMTP_USER; // sending notification to user's mail as default admin
        if (adminEmail) {
            const adminSubject = type === 'booking'
                ? `NEW BOOKING: Financial Planning - ${name}`
                : `NEW CALLBACK REQUEST: ${name}`;
                
            const adminBody = `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h3>New Request details:</h3>
                    <ul>
                        <li><strong>Type:</strong> ${type === 'booking' ? 'Financial Session Booking' : 'Callback Request'}</li>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Mobile:</strong> ${mobile}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        ${type === 'booking' ? `<li><strong>Date:</strong> ${date}</li>` : ''}
                        ${type === 'booking' ? `<li><strong>Time:</strong> ${time} (IST)</li>` : ''}
                    </ul>
                </div>
            `;
            
            await transporter.sendMail({
                from: `"${fromName} System" <${fromEmail}>`,
                to: adminEmail,
                subject: adminSubject,
                html: adminBody,
            });
        }

        return NextResponse.json({ status: 'success' });
    } catch (error: any) {
        console.error('Error in send-email API:', error);
        return NextResponse.json(
            { status: 'error', message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
