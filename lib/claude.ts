import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export interface EmailTemplate {
  subject: string;
  subjectVariationA: string;
  subjectVariationB: string;
  body: string;
  angle: string;
  whyItWorks: string;
}

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
  sampleEmails: EmailTemplate[];
  personalizationTiers?: {
    tier1: string[];
    tier2: string[];
    tier3: string[];
  };
  sequenceStructure?: Array<{
    email: string;
    timing: string;
    purpose: string;
    thread: string;
  }>;
  replyTemplates?: {
    positive: string;
    notNow: string;
    notInterested: string;
    sendMoreInfo: string;
    priceObjection: string;
  };
  sendingBestPractices?: {
    timing: string[];
    volume: string[];
    spamTriggers: string[];
    deliverability: string[];
  };
  metrics?: Array<{
    metric: string;
    poor: string;
    average: string;
    good: string;
    great: string;
  }>;
  listBuildingSources?: {
    primaryDatabases: string[];
    intentEnrichment: string[];
    creativeSources: string[];
  };
  discoveryQuestions?: string[];
  dosDonts?: Array<{
    do: string;
    dont: string;
  }>;
}

export interface PersonalizedContent {
  research: CompanyResearch;
  personalizedHook: string;
  valueProposition: string;
  playbook: string;
}

export async function researchCompanyAndGenerateContent(
  website: string,
  dealSize: string,
  challenge: string
): Promise<PersonalizedContent> {
  const prompt = `You are an expert cold email strategist. Generate a comprehensive, actionable cold email playbook customized to this specific company.

## INPUTS PROVIDED

1. **Company Domain**: ${website}
2. **Company Avg Deal Size**: ${dealSize}
3. **Company Biggest Challenge**: "${challenge}"

---

## YOUR TASK

Using these inputs, generate a complete cold email playbook. The playbook should be punchy, actionable, and practical. This document is sent TO the client, so use "your" and "you" when addressing them.

First, analyze the domain to understand what the company sells and who their ideal customers (prospects) are. The email templates should be emails THIS COMPANY can send to THEIR prospects.

Respond in this exact JSON format:

{
  "companyName": "inferred company name",
  "companyDescription": "what they do",
  "whatTheySell": "their specific product/service",
  "challengeAnalysis": "2-3 sentences reframing their '${challenge}' challenge into a deeper business problem. Connect it to revenue impact. Use 'your' and 'you'. Example: 'Your list building challenge suggests you're struggling to generate enough qualified leads to fill your sales pipeline.'",
  "challengeSolution": "2-3 sentences on how cold email solves this. Use 'your' and 'you'. Example: 'Cold email outbound creates predictable lead flow by systematically reaching prospects who match your ideal customer profile.'",
  "targetAudience": {
    "painPoints": [
      "5 specific pain points that YOUR PROSPECTS face (the people you're selling to)",
      "Start each with the consequence, then the cause",
      "Example: 'Sales teams missing quota because they spend 60% of time on admin'",
      "Example: 'CTOs wasting 15 hours/week managing freelancers instead of building product'",
      "These should be problems that the client's service SOLVES"
    ],
    "characteristics": [
      "5 characteristics of ideal prospects based on deal size ${dealSize}",
      "Include: company size, industries, maturity signals, sales cycle",
      "For $5k-$20k: Target SMBs, 10-100 employees, founder-led",
      "For $20k-$50k: Target mid-market, 50-500 employees",
      "For $50k-$100k+: Target mid-market to enterprise, 200-2000 employees"
    ]
  },
  "technographicSignals": [
    "4 tech stack indicators that suggest a company needs client's service",
    "Example: 'Using Zapier + spreadsheets for workflows (ready to upgrade)'",
    "Example: 'Job postings mentioning legacy system migration'",
    "Example: 'Website built on outdated stack (WordPress 4.x)'"
  ],
  "behavioralIndicators": [
    "4 behaviors that signal buying intent",
    "Example: 'Recently raised Series A-B funding'",
    "Example: 'Posted about scaling challenges on LinkedIn'",
    "Example: 'Hiring for roles the client's service could replace'"
  ],
  "sampleEmails": [
    {
      "subject": "2-4 word subject, lowercase",
      "subjectVariationA": "variation A",
      "subjectVariationB": "variation B",
      "body": "Template 1: The Research Flex. Under 100 words. Start with observation about prospect, not 'I' or company name. Use {{first_name}} and {{company}} placeholders. End with low-friction CTA as question.",
      "angle": "The Research Flex",
      "whyItWorks": "Shows you did homework, creates relevance"
    },
    {
      "subject": "subject 2",
      "subjectVariationA": "variation A",
      "subjectVariationB": "variation B",
      "body": "Template 2: The Problem Sniffer. Use 3 bullet-point questions to help prospect self-identify. 'If any hit home, we should talk.'",
      "angle": "The Problem Sniffer",
      "whyItWorks": "Questions engage, bullets are scannable"
    },
    {
      "subject": "subject 3",
      "subjectVariationA": "variation A",
      "subjectVariationB": "variation B",
      "body": "Template 3: The Case Study Drop. Lead with specific, quantified result. Include metrics and timeframe. Make it relevant to prospect's situation.",
      "angle": "The Case Study Drop",
      "whyItWorks": "Social proof with specifics builds credibility"
    },
    {
      "subject": "subject 4",
      "subjectVariationA": "variation A",
      "subjectVariationB": "variation B",
      "body": "Template 4: The AI-Personalized Hook. Reference something specific from their website/mission. Include 2-3 tailored ideas as bullets.",
      "angle": "The AI-Personalized Hook",
      "whyItWorks": "Deep personalization stands out"
    },
    {
      "subject": "subject 5",
      "subjectVariationA": "variation A",
      "subjectVariationB": "variation B",
      "body": "Template 5: The Ultra-Short. Under 40 words total. Pattern interrupt with extreme brevity. One clear value prop, one simple CTA.",
      "angle": "The Ultra-Short",
      "whyItWorks": "Brevity respects time, easy to respond"
    }
  ],
  "personalizationTiers": {
    "tier1": [
      "5 high-impact personalization types requiring manual research",
      "Example: 'Recent LinkedIn post about their challenge'",
      "Example: 'Job posting for role your service replaces'",
      "Example: 'Recent funding announcement'"
    ],
    "tier2": [
      "4 personalization types that can be automated with AI",
      "Example: 'Company mission summary from website'",
      "Example: 'Recent blog post topics'",
      "Example: 'Tech stack from job postings'"
    ],
    "tier3": [
      "3 fallback personalization using standard data",
      "Example: 'Tenure in current role (LinkedIn)'",
      "Example: 'Company size and industry'",
      "Example: 'Recent company news'"
    ]
  },
  "sequenceStructure": [
    {"email": "Email 1", "timing": "Day 1", "purpose": "Initial value-first outreach", "thread": "New"},
    {"email": "Email 2", "timing": "Day 3-4", "purpose": "New angle, add proof point", "thread": "Reply to #1"},
    {"email": "Email 3", "timing": "Day 7-8", "purpose": "Pattern interrupt, different hook", "thread": "New"},
    {"email": "Email 4", "timing": "Day 10-12", "purpose": "Breakup or soft close", "thread": "Reply to #3"}
  ],
  "replyTemplates": {
    "positive": "Great to hear! I have a few questions to make sure we're a fit. Mind sharing [1 qualifying question]? Then we can find 15 min that works.",
    "notNow": "Totally understand - timing is everything. Mind if I check back in [timeframe]? Any specific trigger that would make this more relevant?",
    "notInterested": "Appreciate the honesty. Before I go - was it the offer itself or just not a priority right now? Always looking to improve.",
    "sendMoreInfo": "Happy to share more context. Quick question first: [qualifying question]? Want to make sure I send the right info.",
    "priceObjection": "Fair. Most clients felt the same until they calculated [specific ROI metric]. Would it help to see the math for your situation?"
  },
  "sendingBestPractices": {
    "timing": [
      "Best: Tuesday-Thursday, 8-10am local time",
      "Good: Monday afternoon, Friday morning",
      "Avoid: Monday morning, Friday afternoon, weekends"
    ],
    "volume": [
      "Max 50 emails per inbox per day",
      "Max 2 inboxes per domain",
      "2-week warm-up period for new inboxes",
      "Target 50-60% open rate before scaling"
    ],
    "spamTriggers": [
      "Avoid: 'Free', 'Guarantee', 'Act now', all caps",
      "No tracking pixels in first email",
      "No links in first email (or max 1)",
      "Keep images minimal"
    ],
    "deliverability": [
      "SPF, DKIM, DMARC records configured",
      "Custom tracking domain (not shared)",
      "Unsubscribe link in footer",
      "Clean list hygiene (verify emails)"
    ]
  },
  "metrics": [
    {"metric": "Open Rate", "poor": "<30%", "average": "40-50%", "good": "50-60%", "great": "60%+"},
    {"metric": "Reply Rate", "poor": "<1%", "average": "2-3%", "good": "4-6%", "great": "7%+"},
    {"metric": "Positive Reply Rate", "poor": "<0.5%", "average": "1-2%", "good": "2-4%", "great": "5%+"},
    {"metric": "Leads per Positive", "poor": "500+", "average": "300-500", "good": "150-300", "great": "<150"}
  ],
  "listBuildingSources": {
    "primaryDatabases": [
      "Apollo.io - Best for contact data and basic intent",
      "Sales Navigator - Best for relationship mapping",
      "ZoomInfo - Best for enterprise data accuracy",
      "Hunter.io - Best for email finding on a budget"
    ],
    "intentEnrichment": [
      "Clay - Waterfall enrichment across 50+ sources",
      "Bombora - Surge intent data by topic",
      "G2 - Buyer intent from software research",
      "BuiltWith - Technographic data"
    ],
    "creativeSources": [
      "Industry-specific Slack/Discord communities",
      "Conference attendee lists (sponsor for access)",
      "Podcast guest lists in your space",
      "Job board scrapers for hiring signals"
    ]
  },
  "discoveryQuestions": [
    "What made you take this call today? (Context)",
    "Walk me through how you're currently handling [problem area]. (Current state)",
    "What's that costing you - in time, money, or headache? (Quantify pain)",
    "If you could wave a magic wand, what would this look like in 6 months? (Desired state)",
    "Who else would need to weigh in on a decision like this? (Decision process)",
    "What would make you say 'this isn't worth exploring'? (Disqualifiers)"
  ],
  "dosDonts": [
    {"do": "Lead with research and relevance", "dont": "Start with 'I' or your company name"},
    {"do": "Quantify pain points (40%, 3 hours, $50k)", "dont": "Use vague claims ('save time', 'grow revenue')"},
    {"do": "Keep emails under 100 words", "dont": "Write essays hoping something sticks"},
    {"do": "Use 2-4 word lowercase subjects", "dont": "Write clickbait subjects or use caps"},
    {"do": "End with a question (single CTA)", "dont": "Include multiple asks or links"},
    {"do": "Follow up in same thread", "dont": "Send every email as a new thread"},
    {"do": "Personalize tier 1 when possible", "dont": "Use obvious merge tags ('Hi {{first_name}}!')"},
    {"do": "Test and iterate weekly", "dont": "Send same emails for months without review"}
  ],
  "personalizedHook": "One-liner about their ${challenge} challenge",
  "valueProposition": "How RevShare's outbound partnership specifically addresses this challenge"
}

CRITICAL EMAIL RULES:
- Each email is FROM the client (${website}) TO their ideal prospect
- Under 100 words per email
- Never start with "I" or the company name
- 2-4 word subject lines, lowercase
- Use {{first_name}} and {{company}} as placeholders
- Single CTA as a question
- Lead with prospect's pain, not features`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
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

    const research = JSON.parse(jsonMatch[0]) as CompanyResearch & {
      personalizedHook: string;
      valueProposition: string;
    };

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
        personalizationTiers: research.personalizationTiers,
        sequenceStructure: research.sequenceStructure,
        replyTemplates: research.replyTemplates,
        sendingBestPractices: research.sendingBestPractices,
        metrics: research.metrics,
        listBuildingSources: research.listBuildingSources,
        discoveryQuestions: research.discoveryQuestions,
        dosDonts: research.dosDonts,
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
  const challengeTitle = challenge.charAt(0).toUpperCase() + challenge.slice(1).toLowerCase();
  
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
      font-size: 14px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #3b82f6;
    }
    .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
    .logo span { color: #3b82f6; }
    h1 { font-size: 28px; margin: 20px 0 10px; color: #1a1a1a; }
    .subtitle { color: #666; font-size: 16px; }
    h2 { font-size: 20px; color: #3b82f6; margin-top: 35px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }
    h3 { font-size: 16px; color: #333; margin-top: 20px; margin-bottom: 10px; }
    .section { margin-bottom: 25px; }
    .challenge-box {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 20px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    .solution-box {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      padding: 20px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    .info-box {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 15px 0;
    }
    ul { padding-left: 20px; margin: 10px 0; }
    li { margin: 8px 0; }
    .email-card {
      background: #f8fafc;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
    }
    .email-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e5e5;
    }
    .email-number {
      background: #3b82f6;
      color: white;
      padding: 3px 10px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: 600;
    }
    .email-angle { color: #666; font-size: 13px; font-style: italic; }
    .email-subject { font-weight: 600; color: #1a1a1a; margin-bottom: 8px; font-size: 14px; }
    .subject-vars { color: #666; font-size: 12px; margin-bottom: 10px; }
    .email-body {
      background: white;
      padding: 15px;
      border-radius: 6px;
      border: 1px solid #e5e5e5;
      white-space: pre-wrap;
      font-size: 13px;
      line-height: 1.6;
    }
    .why-works {
      background: #f0fdf4;
      border-left: 3px solid #22c55e;
      padding: 10px 12px;
      margin-top: 12px;
      border-radius: 0 6px 6px 0;
      font-size: 12px;
      color: #166534;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 13px;
    }
    th, td {
      border: 1px solid #e5e5e5;
      padding: 10px;
      text-align: left;
    }
    th { background: #f8fafc; font-weight: 600; }
    .tip-box {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: 6px;
      padding: 12px;
      margin: 15px 0;
      font-size: 13px;
    }
    .tip-box strong { color: #b45309; }
    .reply-template {
      background: #f8fafc;
      padding: 12px;
      border-radius: 6px;
      margin: 10px 0;
      font-size: 13px;
    }
    .reply-type { font-weight: 600; color: #3b82f6; margin-bottom: 5px; }
    .cta-section {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
      margin-top: 35px;
    }
    .cta-section h2 { color: white; border: none; margin-top: 0; }
    .cta-section p { opacity: 0.9; }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e5e5e5;
      color: #666;
      font-size: 12px;
    }
    .two-col { display: flex; gap: 20px; }
    .two-col > div { flex: 1; }
    @media (max-width: 600px) { .two-col { flex-direction: column; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">REV<span>SHARE</span></div>
    <h1>Cold Email Playbook</h1>
    <p class="subtitle">Custom strategy for ${research.companyName}</p>
  </div>

  <!-- SECTION 1: THE CHALLENGE -->
  <div class="section">
    <h2>🔥 Your ${challengeTitle} Challenge</h2>
    <div class="challenge-box">
      <p style="color: #7f1d1d; margin: 0;">${research.challengeAnalysis || `Your ${challenge} challenge is holding you back from predictable growth.`}</p>
    </div>
  </div>

  <!-- SECTION 2: THE SOLUTION -->
  <div class="section">
    <h2>✅ The Solution</h2>
    <div class="solution-box">
      <p style="color: #166534; margin: 0;">${research.challengeSolution || "Cold email outbound creates predictable lead flow by systematically reaching prospects who match your ideal customer profile."}</p>
    </div>
  </div>

  <!-- SECTION 3: WHO TO TARGET -->
  <div class="section">
    <h2>🎯 Who to Target</h2>
    
    <h3>Ideal Company Profile</h3>
    <ul>
      ${research.targetAudience.characteristics.map(c => `<li>${c}</li>`).join("\n      ")}
    </ul>

    <h3>Buying Intent Signals</h3>
    <ul>
      ${research.behavioralIndicators.map(b => `<li>${b}</li>`).join("\n      ")}
    </ul>

    <h3>Technographic Signals</h3>
    <ul>
      ${research.technographicSignals.map(t => `<li>${t}</li>`).join("\n      ")}
    </ul>
  </div>

  <!-- SECTION 4: PAIN POINTS -->
  <div class="section">
    <h2>💢 Pain Points to Lead With</h2>
    <p>These are problems your prospects face. Lead with these in your outreach:</p>
    <ul>
      ${research.targetAudience.painPoints.map(p => `<li><strong>${p}</strong></li>`).join("\n      ")}
    </ul>
    <div class="tip-box">
      <strong>💡 Pro tip:</strong> Quantify these pain points. Instead of "you're losing leads", say "you're probably losing 40% of qualified leads."
    </div>
  </div>

  <!-- SECTION 5: EMAIL TEMPLATES -->
  <div class="section">
    <h2>✉️ 5 Cold Email Templates</h2>
    <p>Customize these and start sending. Each uses a different proven angle.</p>
    
    ${research.sampleEmails.map((email, index) => `
    <div class="email-card">
      <div class="email-header">
        <span class="email-number">Template ${index + 1}</span>
        <span class="email-angle">${email.angle}</span>
      </div>
      <div class="email-subject">Subject: ${email.subject}</div>
      ${email.subjectVariationA ? `<div class="subject-vars">A/B: "${email.subjectVariationA}" | "${email.subjectVariationB}"</div>` : ''}
      <div class="email-body">${email.body}</div>
      ${email.whyItWorks ? `<div class="why-works"><strong>Why it works:</strong> ${email.whyItWorks}</div>` : ''}
    </div>
    `).join("\n    ")}
  </div>

  <!-- SECTION 6: PERSONALIZATION -->
  ${research.personalizationTiers ? `
  <div class="section">
    <h2>🎨 Personalization Playbook</h2>
    
    <h3>Tier 1: High-Impact (Manual Research)</h3>
    <ul>
      ${research.personalizationTiers.tier1.map(p => `<li>${p}</li>`).join("\n      ")}
    </ul>

    <h3>Tier 2: Scalable with AI</h3>
    <ul>
      ${research.personalizationTiers.tier2.map(p => `<li>${p}</li>`).join("\n      ")}
    </ul>

    <h3>Tier 3: Always Available (Fallback)</h3>
    <ul>
      ${research.personalizationTiers.tier3.map(p => `<li>${p}</li>`).join("\n      ")}
    </ul>
  </div>
  ` : ''}

  <!-- SECTION 7: SEQUENCE STRUCTURE -->
  ${research.sequenceStructure ? `
  <div class="section">
    <h2>📧 Sequence Structure</h2>
    <table>
      <tr>
        <th>Email</th>
        <th>Timing</th>
        <th>Purpose</th>
        <th>Thread</th>
      </tr>
      ${research.sequenceStructure.map(s => `
      <tr>
        <td>${s.email}</td>
        <td>${s.timing}</td>
        <td>${s.purpose}</td>
        <td>${s.thread}</td>
      </tr>
      `).join("")}
    </table>
    <div class="tip-box">
      <strong>💡 List reuse:</strong> Wait 2-3 months minimum before re-emailing the same list with a fresh angle.
    </div>
  </div>
  ` : ''}

  <!-- SECTION 8: REPLY HANDLING -->
  ${research.replyTemplates ? `
  <div class="section">
    <h2>💬 Reply Handling</h2>
    
    <div class="reply-template">
      <div class="reply-type">✅ Positive Reply</div>
      ${research.replyTemplates.positive}
    </div>
    
    <div class="reply-template">
      <div class="reply-type">⏰ "Not Now" / Timing</div>
      ${research.replyTemplates.notNow}
    </div>
    
    <div class="reply-template">
      <div class="reply-type">❌ "Not Interested"</div>
      ${research.replyTemplates.notInterested}
    </div>
    
    <div class="reply-template">
      <div class="reply-type">📄 "Send More Info"</div>
      ${research.replyTemplates.sendMoreInfo}
    </div>
    
    <div class="reply-template">
      <div class="reply-type">💰 Price/Budget Objection</div>
      ${research.replyTemplates.priceObjection}
    </div>
  </div>
  ` : ''}

  <!-- SECTION 9: SENDING BEST PRACTICES -->
  ${research.sendingBestPractices ? `
  <div class="section">
    <h2>⚙️ Sending Best Practices</h2>
    
    <div class="two-col">
      <div>
        <h3>📅 Timing</h3>
        <ul>
          ${research.sendingBestPractices.timing.map(t => `<li>${t}</li>`).join("\n          ")}
        </ul>
        
        <h3>📊 Volume & Infrastructure</h3>
        <ul>
          ${research.sendingBestPractices.volume.map(v => `<li>${v}</li>`).join("\n          ")}
        </ul>
      </div>
      <div>
        <h3>🚫 Spam Triggers to Avoid</h3>
        <ul>
          ${research.sendingBestPractices.spamTriggers.map(s => `<li>${s}</li>`).join("\n          ")}
        </ul>
        
        <h3>✅ Deliverability Checklist</h3>
        <ul>
          ${research.sendingBestPractices.deliverability.map(d => `<li>${d}</li>`).join("\n          ")}
        </ul>
      </div>
    </div>
  </div>
  ` : ''}

  <!-- SECTION 10: METRICS -->
  ${research.metrics ? `
  <div class="section">
    <h2>📈 Metrics & Benchmarks</h2>
    <table>
      <tr>
        <th>Metric</th>
        <th>Poor</th>
        <th>Average</th>
        <th>Good</th>
        <th>Great</th>
      </tr>
      ${research.metrics.map(m => `
      <tr>
        <td><strong>${m.metric}</strong></td>
        <td>${m.poor}</td>
        <td>${m.average}</td>
        <td>${m.good}</td>
        <td style="color: #166534; font-weight: 600;">${m.great}</td>
      </tr>
      `).join("")}
    </table>
    <p style="font-size: 12px; color: #666;">Average across campaigns is ~330 leads per positive response. Numbers vary by offer-market fit.</p>
  </div>
  ` : ''}

  <!-- SECTION 11: LIST BUILDING -->
  ${research.listBuildingSources ? `
  <div class="section">
    <h2>🔍 List Building Sources</h2>
    
    <h3>Primary Databases</h3>
    <ul>
      ${research.listBuildingSources.primaryDatabases.map(p => `<li>${p}</li>`).join("\n      ")}
    </ul>

    <h3>Intent & Enrichment</h3>
    <ul>
      ${research.listBuildingSources.intentEnrichment.map(i => `<li>${i}</li>`).join("\n      ")}
    </ul>

    <h3>Creative Sources</h3>
    <ul>
      ${research.listBuildingSources.creativeSources.map(c => `<li>${c}</li>`).join("\n      ")}
    </ul>
  </div>
  ` : ''}

  <!-- SECTION 12: DISCOVERY QUESTIONS -->
  ${research.discoveryQuestions ? `
  <div class="section">
    <h2>🎤 Discovery Call Questions</h2>
    <p>Use these to uncover pain and qualify on your calls:</p>
    <ol>
      ${research.discoveryQuestions.map(q => `<li>${q}</li>`).join("\n      ")}
    </ol>
  </div>
  ` : ''}

  <!-- SECTION 13: DO'S AND DON'TS -->
  ${research.dosDonts ? `
  <div class="section">
    <h2>✅ Quick Reference: Do's and Don'ts</h2>
    <table>
      <tr>
        <th style="background: #f0fdf4; color: #166534;">✅ DO</th>
        <th style="background: #fef2f2; color: #991b1b;">❌ DON'T</th>
      </tr>
      ${research.dosDonts.map(d => `
      <tr>
        <td>${d.do}</td>
        <td>${d.dont}</td>
      </tr>
      `).join("")}
    </table>
  </div>
  ` : ''}

  <div class="cta-section">
    <h2>Ready to Launch?</h2>
    <p>On our call, we'll refine these templates, build your target list, and set up your outbound engine. You focus on closing — we handle the rest.</p>
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
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px; padding: 8px 16px; color: #3b82f6; font-size: 14px; font-weight: 600;">
                  ${typeEmoji} ${typeLabel} - ${time}
                </span>
              </div>
              <div style="color: #a1a1aa; font-size: 16px; line-height: 1.8;">
                ${formattedBody}
              </div>
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
