import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export interface CompanyResearch {
  companyName: string;
  companyDescription: string;
  whatTheySell: string;
  challengeAnalysis?: string;
  challengeSolution?: string;
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
    whyItWorks: string;
  }>;
}

export interface PersonalizedContent {
  research: CompanyResearch;
  personalizedHook: string;
  valueProposition: string;
  playbook: string; // HTML formatted doc
}

export async function researchCompanyAndGenerateContent(
  website: string,
  dealSize: string,
  challenge: string
): Promise<PersonalizedContent> {
  const prompt = `You are creating an EDUCATIONAL strategy document for a B2B company.

THE CLIENT WHO BOOKED A CALL:
- Website: ${website}
- Average Deal Size: ${dealSize}  
- Their Stated Challenge: "${challenge}"

YOUR TASK:
1. Figure out what service/product THIS CLIENT sells based on their website
2. Identify who THEIR ideal customers are (the people they should be selling to)
3. Write 5 sample cold emails that THIS CLIENT can copy and send to THEIR prospects

CRITICAL DISTINCTION - READ CAREFULLY:
- The CLIENT is the company at ${website}
- The CLIENT's PROSPECTS are the companies the client wants to sell to
- The sample emails are FROM the client TO their prospects
- You are teaching the client how to sell their own service

EXAMPLE TO CLARIFY:
If the client is "ZortCloud" (a software development agency), their prospects might be "startups needing custom software" or "enterprises with legacy systems."
The sample emails would be emails ZortCloud sends to those startups/enterprises - NOT emails someone sends to ZortCloud.

IMPORTANT: This document is sent TO the client, so use second-person pronouns ("your", "you") when addressing the client in challengeAnalysis and challengeSolution. Speak directly to them.

Respond in this exact JSON format:
{
  "companyName": "name of the client's company",
  "companyDescription": "what the client's company does",
  "whatTheySell": "the specific service/product the client offers",
  "challengeAnalysis": "2-3 sentences addressing the client directly about their challenge using 'your' and 'you'. Example: 'Your list building challenge suggests you're struggling to...'",
  "challengeSolution": "2-3 sentences explaining how cold outbound solves their challenge, using 'your' and 'you'. Example: 'By systematically reaching prospects who match your ideal customer profile...'",
  "targetAudience": {
    "painPoints": [
      "5 pain points that the CLIENT'S PROSPECTS face (not the client)",
      "These are problems the client's service solves",
      "Be specific to the client's industry",
      "Example: If client is a dev agency, prospect pain point might be 'struggling with delayed software projects'",
      "Another example: 'Spending too much on in-house dev team for features they rarely need'"
    ],
    "characteristics": [
      "4 characteristics of ideal prospects for the client",
      "Company size, industry, situation, etc.",
      "Example: 'Series A-C startups with 20-100 employees'",
      "Example: 'Companies hiring their first technical roles'"
    ]
  },
  "technographicSignals": [
    "4 technical indicators that a company needs the client's service",
    "Example: 'Using no-code tools that are hitting limitations'",
    "Example: 'Job postings for multiple developer roles'",
    "Example: 'Outdated tech stack visible on their site'"
  ],
  "behavioralIndicators": [
    "4 behaviors that signal a company is ready to buy from the client",
    "Example: 'Recently raised funding'",
    "Example: 'Posted about scaling challenges on LinkedIn'",
    "Example: 'Hiring for roles the client's service could replace'"
  ],
  "sampleEmails": [
    {
      "subject": "short subject line (2-5 words)",
      "body": "This email is FROM the client TO their prospect. Under 100 words. The email pitches the CLIENT'S service to solve the PROSPECT'S pain point. Use [Prospect Name] and [Prospect Company] as placeholders.",
      "angle": "Pain Point + Quantified Impact",
      "whyItWorks": "1 sentence explaining why this angle is effective"
    },
    {
      "subject": "subject 2",
      "body": "Different angle - Research + Observation. Show the client did research on the prospect.",
      "angle": "Research + Observation", 
      "whyItWorks": "explanation"
    },
    {
      "subject": "subject 3",
      "body": "Different angle - mention a case study or result the client achieved for another customer.",
      "angle": "Social Proof + Case Study",
      "whyItWorks": "explanation"
    },
    {
      "subject": "subject 4",
      "body": "Different angle - list specific problems you noticed the prospect might have.",
      "angle": "Deep Research Bullet Points",
      "whyItWorks": "explanation"
    },
    {
      "subject": "subject 5",
      "body": "Different angle - short and direct, 2-3 sentences max.",
      "angle": "Short & Direct",
      "whyItWorks": "explanation"
    }
  ],
  "personalizedHook": "A one-liner acknowledging their stated challenge: '${challenge}'",
  "valueProposition": "How RevShare's outbound partnership can specifically help with their challenge"
}

EMAIL WRITING PRINCIPLES:
- Each email is FROM ${website} TO their ideal prospect
- Lead with prospect's pain, not the client's service features
- Quantify problems: "3 months delayed", "40% over budget", "5 hours/week wasted"
- Use soft CTAs: "Worth a conversation?", "Open to hearing more?", "Bad idea?"
- Conversational tone, not salesy
- Under 100 words per email
- Use [Prospect Name] and [Prospect Company] as placeholders`;

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
        whatTheySell: research.whatTheySell,
        challengeAnalysis: research.challengeAnalysis,
        challengeSolution: research.challengeSolution,
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
    .intro-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left: 4px solid #3b82f6;
      padding: 24px;
      margin: 20px 0;
      border-radius: 0 12px 12px 0;
    }
    .intro-box p {
      margin: 0;
      color: #1e40af;
      font-size: 16px;
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
      padding: 24px;
      margin: 24px 0;
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
      font-size: 15px;
    }
    .email-body {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.7;
    }
    .why-works {
      background: #f0fdf4;
      border-left: 3px solid #22c55e;
      padding: 12px 16px;
      margin-top: 16px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      color: #166534;
    }
    .why-works strong {
      color: #15803d;
    }
    .tip-box {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;
    }
    .tip-box strong {
      color: #b45309;
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
    <h1>Outbound Strategy Guide</h1>
    <p class="subtitle">How to Reach Your Ideal Clients</p>
  </div>

  <div class="section">
    <h2>🔥 Your ${challenge.charAt(0).toUpperCase() + challenge.slice(1).toLowerCase()} Challenge</h2>
    <div class="overview-box" style="background: #fef2f2; border-left-color: #ef4444;">
      <p style="color: #7f1d1d;">${research.challengeAnalysis || "This challenge is holding you back from scaling predictably. Let's fix that."}</p>
    </div>
  </div>

  <div class="section">
    <h2>✅ The Solution: Targeted Cold Outreach</h2>
    <div class="overview-box" style="background: #f0fdf4; border-left-color: #22c55e;">
      <p style="color: #166534;">${research.challengeSolution || "Cold email outbound, done right, puts you in front of decision-makers who need your service — before they even know they're looking. Below is exactly how to do it."}</p>
    </div>
  </div>

  <div class="section">
    <h2>📋 Your Business Snapshot</h2>
    <div class="overview-box">
      <p><strong>Company:</strong> ${research.companyName}</p>
      <p><strong>What You Sell:</strong> ${research.whatTheySell || research.companyDescription}</p>
      <p><strong>Average Deal Size:</strong> ${dealSize}</p>
    </div>
  </div>

  <div class="section">
    <h2>🎯 Pain Points Your Prospects Face</h2>
    <p>These are the problems your ideal clients are dealing with right now. Lead with these in your outreach — they're why prospects will pay attention to your message:</p>
    <ul class="pain-points">
      ${research.targetAudience.painPoints.map(p => `<li>${p}</li>`).join("\n      ")}
    </ul>
    <div class="tip-box">
      <strong>💡 Pro tip:</strong> The best cold emails quantify these pain points. Instead of "you're losing leads", say "you're probably losing 40% of qualified leads." Specific numbers grab attention.
    </div>
  </div>

  <div class="section">
    <h2>👥 Who to Target</h2>
    <p>Focus your outreach on companies and decision-makers with these characteristics:</p>
    <ul class="characteristics">
      ${research.targetAudience.characteristics.map(c => `<li>${c}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>💻 Technographic Signals</h2>
    <p>When you see these technical indicators, the company is likely a good fit:</p>
    <ul class="tech-signals">
      ${research.technographicSignals.map(t => `<li>${t}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>📊 Buying Intent Signals</h2>
    <p>These behaviors suggest a company is actively looking for a solution like yours:</p>
    <ul class="behavioral">
      ${research.behavioralIndicators.map(b => `<li>${b}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="section">
    <h2>✉️ 5 Cold Email Templates</h2>
    <p>These emails are ready for you to customize and send. Each uses a different proven angle — test them to see which resonates most with your market.</p>
    
    ${research.sampleEmails.map((email, index) => `
    <div class="email-card">
      <div class="email-header">
        <span class="email-number">Template ${index + 1}</span>
        <span class="email-angle">${email.angle}</span>
      </div>
      <div class="email-subject">Subject: ${email.subject}</div>
      <div class="email-body">${email.body}</div>
      ${email.whyItWorks ? `<div class="why-works"><strong>Why it works:</strong> ${email.whyItWorks}</div>` : ''}
    </div>
    `).join("\n    ")}
  </div>

  <div class="cta-section">
    <h2>Let's Build Your Outbound Engine</h2>
    <p>On our call, we'll go deeper into your specific market, refine these messages, and map out a complete outbound strategy. We handle the execution — you focus on closing.</p>
    <p><strong>No upfront costs. We only win when you win.</strong></p>
  </div>

  <div class="footer">
    <p>© ${new Date().getFullYear()} RevShare</p>
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
