import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// List of personal email domains to reject
const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "yandex.com",
  "mail.com",
  "gmx.com",
  "tutanota.com",
  "fastmail.com",
  "hey.com",
];

// Rotating lead magnet topics - cycles through based on day of year
const LEAD_MAGNET_TOPICS = [
  {
    id: "5-signs-ready",
    title: "5 Signs Your Offer is Ready for Cold Email",
    emoji: "🎯",
    prompt: "5 signs that indicate a B2B offer is ready for cold email outreach",
  },
  {
    id: "domains-burned",
    title: "Why Your Email Domains Are Burned (And How to Fix It)",
    emoji: "🔥",
    prompt: "reasons why email domains get burned/blacklisted and how to prevent and fix it",
  },
  {
    id: "multi-channel",
    title: "10 Signs You Need Multi-Channel Outreach",
    emoji: "📡",
    prompt: "10 signs that indicate a business needs to use multi-channel outreach (email, LinkedIn, calls) instead of just one channel",
  },
  {
    id: "cold-email-mistakes",
    title: "7 Cold Email Mistakes Killing Your Reply Rates",
    emoji: "💀",
    prompt: "7 common cold email mistakes that kill reply rates and how to fix them",
  },
  {
    id: "icp-wrong",
    title: "Your ICP is Wrong: 5 Signs You're Targeting the Wrong People",
    emoji: "🎪",
    prompt: "5 signs that indicate a business is targeting the wrong ideal customer profile (ICP) in their outreach",
  },
  {
    id: "outbound-timing",
    title: "The Perfect Time to Start Outbound (It's Not When You Think)",
    emoji: "⏰",
    prompt: "when is the right time for a B2B business to start outbound sales and what conditions need to be met",
  },
  {
    id: "agency-vs-inhouse",
    title: "Agency vs In-House Sales: Which is Right for You?",
    emoji: "⚖️",
    prompt: "pros and cons of hiring an agency vs building in-house sales team for B2B outbound",
  },
];

export function getTodaysLeadMagnet(): typeof LEAD_MAGNET_TOPICS[0] {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % LEAD_MAGNET_TOPICS.length;
  return LEAD_MAGNET_TOPICS[index];
}

export function isPersonalEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return true;
  return PERSONAL_EMAIL_DOMAINS.includes(domain);
}

export function extractDomain(email: string): string {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain || "";
}

export interface LeadMagnetContent {
  companyName: string;
  companyDescription: string;
  title: string;
  emoji: string;
  sections: Array<{
    heading: string;
    content: string;
    personalizedTip: string;
  }>;
  personalizedIntro: string;
  callToAction: string;
}

export async function generateLeadMagnetContent(
  email: string,
  domain: string
): Promise<LeadMagnetContent> {
  const websiteUrl = `https://${domain}`;
  const todaysTopic = getTodaysLeadMagnet();
  
  const prompt = `You are an expert B2B sales strategist for RevShare, a company that handles the entire sales process (outreach, meeting prep, follow-ups) for B2B consultants and takes 15-30% of lifetime client revenue.

Someone just submitted their email to get a free guide. Their email is: ${email}
Their company domain is: ${domain} (website: ${websiteUrl})

TODAY'S TOPIC: ${todaysTopic.title}
TOPIC FOCUS: ${todaysTopic.prompt}

Based on the domain, infer what this company likely does. Then create personalized content about TODAY'S TOPIC specifically for them.

Respond in this exact JSON format:
{
  "companyName": "inferred company name from domain",
  "companyDescription": "brief description of what they likely do based on the domain",
  "title": "${todaysTopic.title}",
  "emoji": "${todaysTopic.emoji}",
  "sections": [
    {
      "heading": "Section 1 heading related to the topic",
      "content": "2-3 sentences explaining this point",
      "personalizedTip": "How this specifically applies to their business based on what they do"
    },
    {
      "heading": "Section 2 heading",
      "content": "explanation",
      "personalizedTip": "personalized application"
    },
    {
      "heading": "Section 3 heading",
      "content": "explanation",
      "personalizedTip": "personalized application"
    },
    {
      "heading": "Section 4 heading",
      "content": "explanation",
      "personalizedTip": "personalized application"
    },
    {
      "heading": "Section 5 heading",
      "content": "explanation",
      "personalizedTip": "personalized application"
    }
  ],
  "personalizedIntro": "A warm, personalized opening paragraph mentioning their company, what they do, and why this topic matters for them specifically",
  "callToAction": "A compelling call-to-action for them to book a call with RevShare, connecting today's topic to how we could specifically help their type of business"
}

Make each section specific and actionable. The personalized tips should reference their specific business/industry.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
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

    return JSON.parse(jsonMatch[0]) as LeadMagnetContent;
  } catch (error) {
    console.error("Error generating lead magnet content:", error);
    throw error;
  }
}

export function generateLeadMagnetEmailHTML(content: LeadMagnetContent): string {
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
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 48px; margin-bottom: 16px;">${content.emoji}</div>
                <h1 style="color: #ffffff; font-size: 26px; margin: 0 0 8px 0; line-height: 1.3;">
                  ${content.title}
                </h1>
                <p style="color: #3b82f6; font-size: 16px; margin: 0;">
                  Personalized for ${content.companyName}
                </p>
              </div>
              
              <!-- Personalized Intro -->
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                ${content.personalizedIntro}
              </p>
              
              <!-- Sections -->
              ${content.sections.map((section, index) => `
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0;">
                  ${index + 1}. ${section.heading}
                </h3>
                <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                  ${section.content}
                </p>
                <p style="color: #3b82f6; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                  💡 For ${content.companyName}: ${section.personalizedTip}
                </p>
              </div>
              `).join('')}
              
              <!-- CTA -->
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 12px; padding: 24px; margin-top: 30px; text-align: center;">
                <h3 style="color: #ffffff; font-size: 20px; margin: 0 0 12px 0;">
                  Want Help Implementing This?
                </h3>
                <p style="color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                  ${content.callToAction}
                </p>
                <a href="https://revshare.vercel.app/book" style="display: inline-block; background-color: #ffffff; color: #3b82f6; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Book Your Strategy Call →
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                This guide was personalized for ${content.companyName} using AI.
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
  `;
}
