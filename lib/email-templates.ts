interface EmailData {
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  meetingLink?: string;
}

export function getConfirmationEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: `You're confirmed! Strategy call on ${data.date}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a;">
              <!-- Success Icon -->
              <div style="text-align: center; margin-bottom: 24px;">
                <div style="display: inline-block; width: 64px; height: 64px; background-color: rgba(16, 185, 129, 0.1); border-radius: 50%; line-height: 64px; font-size: 32px;">
                  ✓
                </div>
              </div>
              
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 16px 0; text-align: center;">
                You're All Set, ${data.name.split(" ")[0]}! 🎉
              </h1>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
                Your strategy call has been confirmed. We're excited to learn about 
                ${data.company} and explore how we can help fill your pipeline.
              </p>
              
              <!-- Meeting Details Box -->
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">📅 Meeting Details</h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Date:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">${data.date}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Time:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">${data.time} (EST)</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Duration:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">15 minutes</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Type:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">Video Call</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Add to Calendar Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="#" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Add to Calendar
                </a>
              </div>
              
              <!-- What to Prepare -->
              <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">Before our call, have ready:</h3>
                <ul style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>A clear idea of your ideal client profile</li>
                  <li>Your average deal size and sales cycle length</li>
                  <li>1-2 case studies or client results</li>
                  <li>Questions about how revenue-share works</li>
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                Questions? Reply to this email or reach out at hello@revshare.com
              </p>
              <p style="color: #52525b; font-size: 12px; margin: 16px 0 0 0;">
                © ${new Date().getFullYear()} RevShare. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function getOneDayReminderEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: `Tomorrow: Your strategy call with RevShare`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 16px 0;">
                See you tomorrow, ${data.name.split(" ")[0]}! 👋
              </h1>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Just a friendly reminder that we have our strategy call scheduled for <strong style="color: #ffffff;">tomorrow at ${data.time}</strong>.
              </p>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                I've been looking at ${data.company} and I'm genuinely excited to chat. 
                I have some ideas on how cold email could work for your specific market.
              </p>
              
              <!-- Quick Stats -->
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="color: #3b82f6; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">QUICK STAT</p>
                <p style="color: #ffffff; font-size: 18px; margin: 0;">
                  Our partners average <strong>6 days</strong> from campaign launch to first meeting booked.
                </p>
              </div>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Come prepared to share a bit about your offer and ideal clients. 
                The more specific you can be, the more valuable our conversation will be.
              </p>
              
              <p style="color: #ffffff; font-size: 16px; margin: 0;">
                Talk soon,<br>
                <strong>The RevShare Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                Need to reschedule? Reply to this email and we'll sort it out.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function getTwoHourReminderEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: `In 2 hours: Strategy call with RevShare`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a;">
              <div style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 24px; text-align: center;">
                <span style="color: #3b82f6; font-size: 14px; font-weight: 600;">⏰ 2 HOURS FROM NOW</span>
              </div>
              
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 16px 0;">
                Almost time, ${data.name.split(" ")[0]}!
              </h1>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Our call is coming up at <strong style="color: #ffffff;">${data.time}</strong>. 
                Here's a quick checklist to make sure we make the most of our 15 minutes:
              </p>
              
              <!-- Checklist -->
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <div style="margin-bottom: 12px;">
                  <span style="color: #10b981;">✓</span>
                  <span style="color: #ffffff; margin-left: 8px;">Quiet space with good internet</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="color: #10b981;">✓</span>
                  <span style="color: #ffffff; margin-left: 8px;">Know your average deal size</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="color: #10b981;">✓</span>
                  <span style="color: #ffffff; margin-left: 8px;">Have 1-2 case studies in mind</span>
                </div>
                <div>
                  <span style="color: #10b981;">✓</span>
                  <span style="color: #ffffff; margin-left: 8px;">Ready to describe your ideal client</span>
                </div>
              </div>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Remember: this isn't a sales pitch. We're here to understand your business and 
                honestly assess if cold email makes sense for ${data.company}.
              </p>
              
              <p style="color: #ffffff; font-size: 16px; margin: 0;">
                See you soon! 🚀
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function getThirtyMinReminderEmail(data: EmailData): { subject: string; html: string } {
  return {
    subject: `Starting in 30 mins! 🚀`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
              
              <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 16px 0;">
                30 Minutes!
              </h1>
              
              <p style="color: #a1a1aa; font-size: 18px; line-height: 1.6; margin: 0 0 24px 0;">
                Hey ${data.name.split(" ")[0]}, we're about to connect.<br>
                Get ready to dive into your pipeline strategy!
              </p>
              
              <!-- Big CTA -->
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 8px 0;">YOUR CALL IS AT</p>
                <p style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0;">${data.time}</p>
              </div>
              
              <p style="color: #a1a1aa; font-size: 16px; margin: 0;">
                The meeting link should be in your calendar.<br>
                If not, just reply to this email and we'll send it right over.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                Let's make this call count. See you in a few! 💪
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}
