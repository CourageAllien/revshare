import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export interface CompanyResearch {
  companyName: string;
  companyDescription: string;
  targetAudience: {
    painPoints: string[];
    characteristics: string[];
  };
  technographicSignals: string[];
  behavioralIndicators: string[];
  sampleEmails: Array<{
    subject: string;
    body: string;
    angle: string;
  }>;
}

export interface PersonalizedContent {
  research: CompanyResearch;
  personalizedHook: string;
  valueProposition: string;
  playbook: string; // HTML formatted playbook
}

export async function researchCompanyAndGenerateContent(
  website: string,
  dealSize: string,
  challenge: string
): Promise<PersonalizedContent> {
  const prompt = `You are an expert B2B sales strategist and cold email copywriter. A potential client has booked a call with RevShare, a company that handles the entire sales process (outreach, meeting prep, follow-ups) for B2B consultants and takes 15-30% of lifetime client revenue.

Here's what we know about them:
- Company Website: ${website}
- Average Deal Size: ${dealSize}
- Their Biggest Lead Generation Challenge: ${challenge}

Based on the website URL, infer what the company likely does. Then provide a comprehensive analysis.

Respond in this exact JSON format:
{
  "companyName": "inferred company name from website",
  "companyDescription": "brief description of what the company does based on the website domain",
  "targetAudience": {
    "painPoints": ["pain point 1", "pain point 2", "pain point 3", "pain point 4", "pain point 5"],
    "characteristics": ["characteristic 1", "characteristic 2", "characteristic 3", "characteristic 4"]
  },
  "technographicSignals": ["signal 1", "signal 2", "signal 3", "signal 4"],
  "behavioralIndicators": ["indicator 1", "indicator 2", "indicator 3", "indicator 4"],
  "sampleEmails": [
    {
      "subject": "short 2-3 word subject",
      "body": "full email body following the GEX template style - personalized, conversational, under 100 words",
      "angle": "what angle this email uses (e.g., Problem Sniffing, Case Study, Creative Ideas)"
    },
    {
      "subject": "subject 2",
      "body": "email 2 body",
      "angle": "angle 2"
    },
    {
      "subject": "subject 3", 
      "body": "email 3 body",
      "angle": "angle 3"
    },
    {
      "subject": "subject 4",
      "body": "email 4 body", 
      "angle": "angle 4"
    },
    {
      "subject": "subject 5",
      "body": "email 5 body",
      "angle": "angle 5"
    }
  ],
  "personalizedHook": "A compelling one-liner about how RevShare can specifically help THIS company based on their challenge",
  "valueProposition": "2-3 sentences explaining specifically how RevShare's model would benefit them given their deal size and challenges"
}

For the sample emails, follow these principles from Growth Engine X:
- Keep emails under 100 words
- Lead with research/relevance ("I saw...", "I noticed...")
- Use a conversational, non-salesy tone
- Include a soft CTA
- Reference their specific industry/niche
- Use pattern interrupts
- Make each email use a different angle:
  1. Standard Template with AI personalization
  2. Josh Braun "Poke the Bear" style
  3. Lead Magnet / Value-first approach
  4. Creative Ideas Campaign
  5. Short and Direct (2-sentence style)

The emails should be written as if RevShare is reaching out to THEIR ideal clients (the companies they want to sell their services to).`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const research = JSON.parse(jsonMatch[0]) as CompanyResearch & {
      personalizedHook: string;
      valueProposition: string;
    };

    // Generate the playbook HTML
    const playbook = generatePlaybookHTML(research, website, dealSize, challenge);

    return {
      research: {
        companyName: research.companyName,
        companyDescription: research.companyDescription,
        targetAudience: research.targetAudience,
        technographicSignals: research.technographicSignals,
        behavioralIndicators: research.behavioralIndicators,
        sampleEmails: research.sampleEmails,
      },
      personalizedHook: research.personalizedHook,
      valueProposition: research.valueProposition,
      playbook,
    };
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
}

function generatePlaybookHTML(
  research: CompanyResearch & { personalizedHook: string; valueProposition: string },
  website: string,
  dealSize: string,
  challenge: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #1a1a1a;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #3b82f6;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .logo span { color: #3b82f6; }
    h1 {
      font-size: 32px;
      margin: 20px 0 10px;
      color: #1a1a1a;
    }
    .subtitle {
      color: #666;
      font-size: 18px;
    }
    h2 {
      font-size: 24px;
      color: #3b82f6;
      margin-top: 40px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
    }
    h3 {
      font-size: 18px;
      color: #333;
      margin-top: 25px;
    }
    .section {
      margin-bottom: 30px;
    }
    .overview-box {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 20px;
      margin: 20px 0;
    }
    .overview-box p {
      margin: 8px 0;
    }
    .overview-box strong {
      color: #3b82f6;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin: 10px 0;
      position: relative;
    }
    .pain-points li::marker { content: "🎯 "; }
    .characteristics li::marker { content: "👤 "; }
    .tech-signals li::marker { content: "💻 "; }
    .behavioral li::marker { content: "📊 "; }
    .email-card {
      background: #f8fafc;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }
    .email-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
    }
    .email-number {
      background: #3b82f6;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    .email-angle {
      color: #666;
      font-size: 14px;
      font-style: italic;
    }
    .email-subject {
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 10px;
    }
    .email-body {
      background: white;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
      white-space: pre-wrap;
      font-size: 14px;
    }
    .cta-section {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin-top: 40px;
    }
    .cta-section h2 {
      color: white;
      border: none;
      margin-top: 0;
    }
    .cta-section p {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">REV<span>SHARE</span></div>
    <h1>Custom Outbound Playbook</h1>
    <p class="subtitle">Prepared exclusively for ${research.companyName}</p>
  </div>

  <div class="section">
    <h2>📋 Overview</h2>
    <div class="overview-box">
      <p><strong>Company:</strong> ${research.companyName}</p>
      <p><strong>Website:</strong> ${website}</p>
      <p><strong>Average Deal Size:</strong> ${dealSize}</p>
      <p><strong>Current Challenge:</strong> ${challenge}</p>
    </div>
    <p>${research.companyDescription}</p>
    <p><strong>${research.personalizedHook}</strong></p>
    <p>${research.valueProposition}</p>
  </div>

  <div class="section">
    <h2>🎯 Target Audience Pain Points</h2>
    <p>These are the problems your ideal clients are experiencing that make them perfect prospects for your services:</p>
    <ul class="pain-points">
      ${research.targetAudience.painPoints.map(p => `<li>${p}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>👥 Target Market Characteristics</h2>
    <p>Key attributes of companies and decision-makers you should be targeting:</p>
    <ul class="characteristics">
      ${research.targetAudience.characteristics.map(c => `<li>${c}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>💻 Technographic Signals</h2>
    <p>Technical indicators that suggest a company is ready for your services:</p>
    <ul class="tech-signals">
      ${research.technographicSignals.map(t => `<li>${t}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>📊 Behavioral Indicators</h2>
    <p>Actions and behaviors that signal buying intent:</p>
    <ul class="behavioral">
      ${research.behavioralIndicators.map(b => `<li>${b}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>✉️ Sample Cold Emails</h2>
    <p>Here are 5 proven email templates customized for your business, following the Growth Engine X methodology:</p>
    
    ${research.sampleEmails.map((email, index) => `
    <div class="email-card">
      <div class="email-header">
        <span class="email-number">Email ${index + 1}</span>
        <span class="email-angle">${email.angle}</span>
      </div>
      <div class="email-subject">Subject: ${email.subject}</div>
      <div class="email-body">${email.body}</div>
    </div>
    `).join("\n    ")}
  </div>

  <div class="cta-section">
    <h2>Ready to Launch?</h2>
    <p>This playbook is just the beginning. On our call, we'll dive deeper into your specific market and build a complete outbound strategy tailored to ${research.companyName}.</p>
    <p><strong>Remember: We only get paid when you get paid.</strong></p>
  </div>

  <div class="footer">
    <p>© ${new Date().getFullYear()} RevShare. This playbook was custom-generated for ${research.companyName}.</p>
  </div>
</body>
</html>
  `;
}

export async function generatePersonalizedReminderEmail(
  type: "one-day" | "two-hours" | "thirty-min",
  name: string,
  date: string,
  time: string,
  research: CompanyResearch,
  personalizedHook: string
): Promise<{ subject: string; html: string }> {
  const prompt = `You are writing a reminder email for a booked strategy call. The email should be warm, personalized, and build excitement for the call.

Context:
- Recipient Name: ${name}
- Company: ${research.companyName}
- What they do: ${research.companyDescription}
- Their main challenge: They struggle with lead generation
- Call Date: ${date}
- Call Time: ${time}
- Personalized Hook: ${personalizedHook}

Email Type: ${type === "one-day" ? "1 day before the call" : type === "two-hours" ? "2 hours before the call" : "30 minutes before the call"}

Write a reminder email that:
1. Is warm and personal (use their first name)
2. References their specific business/challenge
3. Builds anticipation for the call
4. ${type === "one-day" ? "Includes a teaser about what you've prepared for them" : type === "two-hours" ? "Includes a quick checklist to prepare" : "Creates urgency and excitement"}
5. Feels like it's from a real person, not automated

Respond in JSON format:
{
  "subject": "short, personal subject line",
  "body": "the email body in plain text with line breaks"
}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const emailContent = JSON.parse(jsonMatch[0]) as { subject: string; body: string };

    // Convert to HTML email
    const html = generateReminderEmailHTML(emailContent.body, name, date, time, type, research.companyName);

    return {
      subject: emailContent.subject,
      html,
    };
  } catch (error) {
    console.error("Error generating personalized email:", error);
    throw error;
  }
}

function generateReminderEmailHTML(
  body: string,
  name: string,
  date: string,
  time: string,
  type: "one-day" | "two-hours" | "thirty-min",
  companyName: string
): string {
  const formattedBody = body.replace(/\n/g, "<br>");
  
  const typeEmoji = type === "one-day" ? "📅" : type === "two-hours" ? "⏰" : "🚀";
  const typeLabel = type === "one-day" ? "Tomorrow" : type === "two-hours" ? "In 2 Hours" : "In 30 Minutes";

  return `
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
              <!-- Time Badge -->
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px; padding: 8px 16px; color: #3b82f6; font-size: 14px; font-weight: 600;">
                  ${typeEmoji} ${typeLabel} - ${time}
                </span>
              </div>
              
              <!-- Email Body -->
              <div style="color: #a1a1aa; font-size: 16px; line-height: 1.8;">
                ${formattedBody}
              </div>
              
              <!-- Meeting Details -->
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; margin-top: 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color: #71717a; font-size: 14px; padding: 8px 0;">Date:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right;">${date}</td>
                  </tr>
                  <tr>
                    <td style="color: #71717a; font-size: 14px; padding: 8px 0;">Time:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right;">${time} (EST)</td>
                  </tr>
                  <tr>
                    <td style="color: #71717a; font-size: 14px; padding: 8px 0;">Company:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right;">${companyName}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                Questions? Just reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
