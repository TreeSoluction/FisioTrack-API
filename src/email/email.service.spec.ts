import { EmailService } from './email.service';

function createMailerMock() {
  return { sendMail: jest.fn().mockResolvedValue({}) };
}

describe('EmailService', () => {
  let service: EmailService;
  let mailer: ReturnType<typeof createMailerMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    mailer = createMailerMock();
    service = new EmailService(mailer as any);
  });

  describe('sendWelcome', () => {
    it('should send email with correct subject and recipient', async () => {
      await service.sendWelcome('user@test.com', 'João');

      expect(mailer.sendMail).toHaveBeenCalledWith({
        to: 'user@test.com',
        subject: 'Welcome to FisioTrack',
        html: expect.stringContaining('João'),
      });
    });
  });

  describe('sendAppointmentReminder', () => {
    it('should include patient name and date', async () => {
      await service.sendAppointmentReminder(
        'user@test.com',
        'Maria',
        '2026-07-01 10:00',
      );

      expect(mailer.sendMail).toHaveBeenCalledWith({
        to: 'user@test.com',
        subject: 'Appointment Reminder - FisioTrack',
        html: expect.stringContaining('Maria'),
      });
      expect(mailer.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('2026-07-01 10:00'),
        }),
      );
    });
  });

  describe('sendSessionSummary', () => {
    it('should include pain scale, weight, and notes', async () => {
      await service.sendSessionSummary('user@test.com', 'Pedro', {
        painScale: 7,
        weight: 82.5,
        notes: 'Improvement in mobility',
      });

      const call = mailer.sendMail.mock.calls[0][0];
      expect(call.to).toBe('user@test.com');
      expect(call.subject).toContain('Pedro');
      expect(call.html).toContain('7/10');
      expect(call.html).toContain('82.5 kg');
      expect(call.html).toContain('Improvement in mobility');
    });
  });

  describe('sendPaymentReminder', () => {
    it('should include value and due date', async () => {
      await service.sendPaymentReminder('user@test.com', 150.5, '2026-07-15');

      const call = mailer.sendMail.mock.calls[0][0];
      expect(call.to).toBe('user@test.com');
      expect(call.subject).toBe('Payment Reminder - FisioTrack');
      expect(call.html).toContain('150.50');
      expect(call.html).toContain('2026-07-15');
    });
  });
});
