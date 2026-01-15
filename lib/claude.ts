import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export interface CompanyResearch {
  companyName: string;
  companyDescription: string;
  whatTheySell: string;
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
  const prompt = `You are an expert B2B cold email strategist and copywriter. You're creating an EDUCATIONAL document for a client who has booked a call. This document should teach them how to sell THEIR product/service to THEIR target market.

The client's details:
- Company Website: ${website}
- Average Deal Size: ${dealSize}
- Their Lead Generation Challenge: ${challenge}

IMPORTANT: You are NOT selling to this client. You are TEACHING them how to write cold emails to sell their own product/service. The sample emails should be emails THEY would send to THEIR prospects.

Based on the website URL, research what the company does and who their ideal customers are. Then create a document that teaches them how to target their market.

Respond in this exact JSON format:
{
  "companyName": "inferred company name from website",
  "companyDescription": "what this company does based on the domain",
  "whatTheySell": "the specific product or service they offer",
  "targetAudience": {
    "painPoints": ["5 specific pain points their ideal customers face that the client's service solves"],
    "characteristics": ["4 key characteristics of companies that would buy from them"]
  },
  "technographicSignals": ["4 technical indicators that a company needs their service"],
  "behavioralIndicators": ["4 actions/behaviors that signal buying intent for their service"],
  "sampleEmails": [
    {
      "subject": "2-5 word attention-grabbing subject line",
      "body": "Email the CLIENT can send to THEIR prospects. Under 100 words. Specific pain point + how client's service solves it + social proof if possible + soft CTA.",
      "angle": "name of the approach used",
      "whyItWorks": "brief explanation of why this email is effective"
    },
    ... 4 more emails with different angles
  ],
  "personalizedHook": "A compelling one-liner about their specific challenge we noticed",
  "valueProposition": "How RevShare's outbound partnership model specifically addresses their stated challenge"
}

CRITICAL EMAIL GUIDELINES - Study these examples and write emails of similar quality:

EXAMPLE 1 - Pain Point Lead:
Subject: 40% qualified leads lost
That's probably the last thing you want to hear, Sarah.
But, for TechCorp it happens way too often. And that's usually as a result of disconnected sales and marketing systems.
We make it easy for companies in such situations to increase lead conversion by 65%. TechFlow saw similar issues and increased qualified leads by 73% within 60 days.
Think this can help?

EXAMPLE 2 - Research + Observation:
Hey Sarah,
Your team spends half their day researching and finding AI companies similar to Discord instead of focusing on closing deals and building strategic partnerships.
We help them focus on selling while our AI-automated workflows handle the prospect research and build lists based on signals that show companies are struggling with LLM implementation at scale.
Mind if I share a sample well-researched prospect list?

EXAMPLE 3 - Social Proof Angle:
Hey Sarah – Looks like you work with AI infrastructure platforms. Saw that Discord is a client.
Usually this suggests you'll be open to working with other AI product companies building similar applications.
Companies without large GTM teams plug our AI-automated workflows to handle research, outreach and scale pipeline generation. 100 personalized conversations = qualified meetings on autopilot.
Think this can help you get clients similar to Discord?

EXAMPLE 4 - Deep Research:
Sarah – from my research these are some of the issues your target market faces that Adaline helps with:
• Difficulty managing prompts and evaluating LLM performance at scale
• Challenges bridging the gap between technical and nontechnical teams
• Struggles with maintaining reliability and uptime in production AI workflows
We have AI-automated workflows that can identify companies struggling with these exact issues and message them on your behalf with relevant case studies.
Is this a bad idea or am I way off mark here?

EXAMPLE 5 - Show Competence:
Sarah – I sent an email a while back that probably didn't do a good enough job showing you how we could help.
Our system combines AI-powered research and automation so your team can see qualified accounts in front of them instead of manually researching.
For example:
• Your platform processes 5B+ tokens per day with 99.998% uptime
• Discord and Epsilon are listed as key clients
• You're targeting product and engineering teams
Besides insights like this, we also monitor for news, job positions, tech stack changes.
Wanna make it happen?

KEY PRINCIPLES FOR THE SAMPLE EMAILS:
1. Each email targets the CLIENT'S ideal customer (not the client themselves)
2. Lead with research/relevance - show you understand the prospect's world
3. Quantify pain points when possible (40% lost, 3 hours per day, etc.)
4. Include social proof with specific results (73% increase, 60 days, etc.)
5. Use soft CTAs: "Think this can help?", "Open to hearing more?", "Mind if I share?"
6. Conversational tone - like a helpful peer, not a salesperson
7. Keep under 100 words - respect their time
8. Position the client as a partner who "gets it", not a vendor

The 5 email angles to use:
1. Pain Point + Quantified Impact (e.g., "40% leads lost")
2. Research + Observation (show you did homework on the prospect)  
3. Social Proof + Similar Company (leverage existing client success)
4. Deep Research Bullet Points (list specific pain points you identified)
5. Competence Demonstration (show specific insights you found about them)`;

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
    <div class="intro-box">
      <p>This guide breaks down exactly who your best prospects are, what signals indicate they're ready to buy, and gives you 5 ready-to-use cold email templates based on proven frameworks. Use these to start conversations with decision-makers who need what you offer.</p>
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
