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
  fiveSigns: Array<{
    sign: string;
    explanation: string;
    howItApplies: string;
  }>;
  giftIdeas: Array<{
    title: string;
    description: string;
    whyItHelps: string;
  }>;
  personalizedIntro: string;
  callToAction: string;
}

export async function generateLeadMagnetContent(
  email: string,
  domain: string
): Promise<LeadMagnetContent> {
  const websiteUrl = `https://${domain}`;
  
  const prompt = `You are an expert B2B sales strategist for RevShare, a company that handles the entire sales process (outreach, meeting prep, follow-ups) for B2B consultants and takes 15-30% of lifetime client revenue.

Someone just submitted their email to get a free guide. Their email is: ${email}
Their company domain is: ${domain} (website: ${websiteUrl})

Based on the domain, infer what this company likely does. Then create personalized content for them.

Respond in this exact JSON format:
{
  "companyName": "inferred company name from domain",
  "companyDescription": "brief description of what they likely do based on the domain",
  "fiveSigns": [
    {
      "sign": "Sign #1 title",
      "explanation": "What this sign means in general",
      "howItApplies": "How this specifically applies to their business based on what they do"
    },
    {
      "sign": "Sign #2 title",
      "explanation": "explanation",
      "howItApplies": "personalized application"
    },
    {
      "sign": "Sign #3 title",
      "explanation": "explanation",
      "howItApplies": "personalized application"
    },
    {
      "sign": "Sign #4 title",
      "explanation": "explanation",
      "howItApplies": "personalized application"
    },
    {
      "sign": "Sign #5 title",
      "explanation": "explanation",
      "howItApplies": "personalized application"
    }
  ],
  "giftIdeas": [
    {
      "title": "Gift idea 1 title",
      "description": "What this gift/resource is",
      "whyItHelps": "Why this would help them specifically"
    },
    {
      "title": "Gift idea 2 title",
      "description": "description",
      "whyItHelps": "why it helps"
    },
    {
      "title": "Gift idea 3 title",
      "description": "description",
      "whyItHelps": "why it helps"
    }
  ],
  "personalizedIntro": "A warm, personalized opening paragraph mentioning their company and what they do",
  "callToAction": "A compelling call-to-action for them to book a call with RevShare, mentioning how we could specifically help their type of business"
}

The 5 signs should be:
1. Your offer is proven (you have case studies/results)
2. Your deal size is $10k+ (makes outbound profitable)
3. You're capacity-constrained (too busy delivering to do sales)
4. You have a clear ICP (know exactly who you help)
5. You're ready to scale (want consistent pipeline)

Make each sign specific to their business based on what you infer from their domain.

The gift ideas should be things RevShare could offer them that would be valuable, such as:
- Custom ICP analysis
- Sample cold email sequences for their niche
- Competitive outreach audit
- Target account list sample
- Outbound strategy session`;

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
                <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
                <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 8px 0;">
                  5 Signs Your Offer is Ready for Cold Email
                </h1>
                <p style="color: #3b82f6; font-size: 16px; margin: 0;">
                  Personalized for ${content.companyName}
                </p>
              </div>
              
              <!-- Personalized Intro -->
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                ${content.personalizedIntro}
              </p>
              
              <!-- The 5 Signs -->
              ${content.fiveSigns.map((sign, index) => `
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0;">
                  ${index + 1}. ${sign.sign}
                </h3>
                <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                  ${sign.explanation}
                </p>
                <p style="color: #3b82f6; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                  💡 For ${content.companyName}: ${sign.howItApplies}
                </p>
              </div>
              `).join('')}
              
              <!-- Divider -->
              <div style="border-top: 1px solid #27272a; margin: 30px 0;"></div>
              
              <!-- Bonus Gift Ideas -->
              <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 16px 0;">
                🎁 Bonus: What We Could Build for ${content.companyName}
              </h2>
              
              ${content.giftIdeas.map(gift => `
              <div style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                <h4 style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0;">
                  ${gift.title}
                </h4>
                <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                  ${gift.description}
                </p>
                <p style="color: #10b981; font-size: 13px; margin: 0;">
                  ✓ ${gift.whyItHelps}
                </p>
              </div>
              `).join('')}
              
              <!-- CTA -->
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 12px; padding: 24px; margin-top: 30px; text-align: center;">
                <h3 style="color: #ffffff; font-size: 20px; margin: 0 0 12px 0;">
                  Ready to Fill Your Pipeline?
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
