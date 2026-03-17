import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { name: string; email: string; message: string; subject?: string } =
      await req.json();
    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminMailOptions: nodemailer.SendMailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: subject || `New message from ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    };

    const userMailOptions: nodemailer.SendMailOptions = {
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message`,
      text: `Hi ${name},\n\nThank you for contacting us. We have received your message:\n\n"${message}"\n\nWe will get back to you soon.`,
      html: `<p>Hi ${name},</p>
             <p>Thank you for contacting us. We have received your message:</p>
             <blockquote>${message}</blockquote>
             <p>We will get back to you soon.</p>`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
