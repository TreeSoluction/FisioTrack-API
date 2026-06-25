import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailer: MailerService) {}

  async sendWelcome(to: string, name: string) {
    await this.mailer.sendMail({
      to,
      subject: 'Welcome to FisioTrack',
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Your account has been created successfully.</p>
        <p>You can now log in and start managing your patients.</p>
      `,
    });
  }

  async sendAppointmentReminder(to: string, patientName: string, date: string) {
    await this.mailer.sendMail({
      to,
      subject: 'Appointment Reminder - FisioTrack',
      html: `
        <h1>Appointment Reminder</h1>
        <p>You have an appointment with ${patientName} scheduled for ${date}.</p>
        <p>Please confirm or reschedule if needed.</p>
      `,
    });
  }

  async sendSessionSummary(to: string, patientName: string, data: { painScale: number; weight?: number; notes?: string }) {
    await this.mailer.sendMail({
      to,
      subject: `Session Summary - ${patientName} - FisioTrack`,
      html: `
        <h1>Session Summary</h1>
        <p><strong>Patient:</strong> ${patientName}</p>
        <p><strong>Pain Scale:</strong> ${data.painScale}/10</p>
        ${data.weight ? `<p><strong>Weight:</strong> ${data.weight} kg</p>` : ''}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
      `,
    });
  }

  async sendPaymentReminder(to: string, value: number, dueDate: string) {
    await this.mailer.sendMail({
      to,
      subject: 'Payment Reminder - FisioTrack',
      html: `
        <h1>Payment Reminder</h1>
        <p>You have a pending payment of R$ ${value.toFixed(2)}.</p>
        <p>Due date: ${dueDate}</p>
      `,
    });
  }
}