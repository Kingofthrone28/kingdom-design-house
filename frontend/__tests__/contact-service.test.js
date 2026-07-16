const nodemailer = require('nodemailer');
const { processContactSubmission, resetRateLimits } = require('../server/contactService');

jest.mock('nodemailer', () => ({ createTransport: jest.fn() }));

const validBody = {
  name: 'Test User',
  email: 'visitor@example.com',
  phone: '+1 347 555 0100',
  company: 'Example Co',
  service: 'Web Development',
  message: 'I would like to discuss a new website project.',
  recaptchaToken: 'valid-token',
};

const request = (body = validBody, ip = '203.0.113.10') => ({
  body,
  headers: { 'x-forwarded-for': ip },
});

describe('contact service', () => {
  let sendMail;

  beforeEach(() => {
    resetRateLimits();
    jest.clearAllMocks();
    process.env.NEO_SMTP_USER = 'info@kingdomdesignhouse.com';
    process.env.NEO_SMTP_PASSWORD = 'test-password';
    process.env.BUSINESS_EMAIL = 'info@kingdomdesignhouse.com';
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
    process.env.RECAPTCHA_MIN_SCORE = '0.5';
    sendMail = jest.fn().mockResolvedValue({ messageId: 'message-id' });
    nodemailer.createTransport.mockReturnValue({ sendMail });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, score: 0.9, action: 'contact_form_submit' }),
    });
  });

  afterEach(() => {
    delete global.fetch;
  });

  test('sends the business notification before the visitor confirmation', async () => {
    const result = await processContactSubmission(request());

    expect(result.status).toBe(200);
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({
      host: 'smtp0001.neo.space',
      port: 587,
      secure: false,
      requireTLS: true,
    }));
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(sendMail.mock.calls[0][0]).toEqual(expect.objectContaining({
      to: 'info@kingdomdesignhouse.com',
      replyTo: 'visitor@example.com',
    }));
    expect(sendMail.mock.calls[1][0]).toEqual(expect.objectContaining({
      to: 'visitor@example.com',
      replyTo: 'info@kingdomdesignhouse.com',
    }));
  });

  test('succeeds when only the visitor confirmation fails', async () => {
    sendMail
      .mockResolvedValueOnce({ messageId: 'business-message' })
      .mockRejectedValueOnce(new Error('confirmation unavailable'));

    const result = await processContactSubmission(request());

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
  });

  test.each([
    [{ ...validBody, email: 'invalid' }, 'email'],
    [{ ...validBody, service: '' }, 'service'],
    [{ ...validBody, message: 'short' }, 'message'],
  ])('rejects invalid form data', async (body, field) => {
    const result = await processContactSubmission(request(body));

    expect(result.status).toBe(400);
    expect(result.body.errors[field]).toBeDefined();
    expect(sendMail).not.toHaveBeenCalled();
  });

  test('rejects failed reCAPTCHA without exposing provider details', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, score: 0.1, action: 'contact_form_submit' }),
    });

    const result = await processContactSubmission(request());

    expect(result.status).toBe(400);
    expect(result.body.message).toBe('Security validation failed. Please try again.');
    expect(sendMail).not.toHaveBeenCalled();
  });

  test('rate limits the sixth submission from one IP', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const result = await processContactSubmission(request(validBody, '198.51.100.20'));
      expect(result.status).toBe(200);
    }

    const limited = await processContactSubmission(request(validBody, '198.51.100.20'));
    expect(limited.status).toBe(429);
    expect(limited.headers['Retry-After']).toBeDefined();
  });
});
