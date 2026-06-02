import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, mobileNumber, email, subject, message } = body;

        const finalName = fullName || 'Valued Client';
        const finalMobile = mobileNumber || 'N/A';

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

        const emailSubject = `We Received Your Message - BFC Capital`;
        const htmlBody = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <div style="text-align: center; margin-bottom: 25px;">
                    <h2 style="color: #024B39; margin: 0; font-size: 24px; font-weight: 700;">Thank You for Reaching Out</h2>
                    <p style="color: #44475B; font-size: 14px; margin-top: 5px;">We have received your message</p>
                </div>
                <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Dear <strong>${finalName}</strong>,</p>
                <p style="color: #44475B; font-size: 15px; line-height: 1.6;">Thank you for contacting BFC Capital. Our team has received your inquiry, and we will get back to you shortly. Here is a summary of the details you submitted:</p>
                
                <div style="background-color: #f3f4f6; border-left: 4px solid #024B39; padding: 20px; margin: 25px 0; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        ${subject ? `<tr>
                            <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600; width: 100px;">📝 Subject:</td>
                            <td style="padding: 6px 0; font-size: 14px; color: #44475B; font-weight: 600;">${subject}</td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 600; width: 100px;">💬 Message:</td>
                            <td style="padding: 6px 0; font-size: 14px; color: #44475B; line-height: 1.5; white-space: pre-line;">${message || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
                
                <p style="color: #44475B; font-size: 15px; line-height: 1.6;">We appreciate your patience. A representative from BFC Capital will be in touch with you soon.</p>
                
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                <div style="text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                    <p style="margin: 0;">This is an automated confirmation from BFC Capital.</p>
                </div>
            </div>
        `;

        // Send confirmation email to the client
        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: emailSubject,
            html: htmlBody,
        });

        // Send a notification email to the BFC Capital admin team
        const adminEmail = process.env.SMTP_USER;
        if (adminEmail) {
            const adminSubject = `NEW CONTACT FORM: ${subject || 'General'} - ${finalName}`;
            const adminBody = `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h3>New Contact Form Details:</h3>
                    <ul>
                        <li><strong>Type:</strong> Contact Form Submission</li>
                        <li><strong>Name:</strong> ${finalName}</li>
                        <li><strong>Mobile:</strong> ${finalMobile}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        ${subject ? `<li><strong>Subject:</strong> ${subject}</li>` : ''}
                        ${message ? `<li><strong>Message:</strong> ${message}</li>` : ''}
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
        console.error('Error in contact-email API:', error);
        return NextResponse.json(
            { status: 'error', message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
