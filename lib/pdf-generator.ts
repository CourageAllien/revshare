import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { CompanyResearch } from "./claude";

export async function generatePlaybookPDF(
  research: CompanyResearch & { personalizedHook: string; valueProposition: string },
  website: string,
  dealSize: string,
  challenge: string
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 50;
  const lineHeight = 14;
  
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  
  const blue = rgb(0.231, 0.510, 0.965);
  const black = rgb(0, 0, 0);
  const gray = rgb(0.4, 0.4, 0.4);
  const red = rgb(0.6, 0.11, 0.11);
  const green = rgb(0.086, 0.529, 0.243);
  
  const addText = (text: string, size: number, font: typeof helvetica, color = black, maxWidth = pageWidth - margin * 2) => {
    const words = text.split(' ');
    let line = '';
    
    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const width = font.widthOfTextAtSize(testLine, size);
      
      if (width > maxWidth && line) {
        if (y < margin + 50) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(line, { x: margin, y, size, font, color });
        y -= lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }
    
    if (line) {
      if (y < margin + 50) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText(line, { x: margin, y, size, font, color });
      y -= lineHeight;
    }
  };
  
  const addSection = (title: string) => {
    y -= 15;
    if (y < margin + 80) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(title, { x: margin, y, size: 12, font: helveticaBold, color: blue });
    y -= 18;
  };
  
  const addBullet = (text: string, indent = 0) => {
    if (y < margin + 50) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText("•", { x: margin + indent, y, size: 9, font: helvetica, color: gray });
    
    const words = text.split(' ');
    let line = '';
    let isFirstLine = true;
    
    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const width = helvetica.widthOfTextAtSize(testLine, 9);
      
      if (width > pageWidth - margin * 2 - 25 - indent && line) {
        if (y < margin + 50) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(line, { x: margin + 12 + indent, y, size: 9, font: helvetica, color: gray });
        y -= 12;
        line = word;
        isFirstLine = false;
      } else {
        line = testLine;
      }
    }
    
    if (line) {
      page.drawText(line, { x: margin + 12 + indent, y, size: 9, font: helvetica, color: gray });
      y -= 12;
    }
  };

  // Header
  page.drawText("REVSHARE", { x: margin, y, size: 22, font: helveticaBold, color: blue });
  y -= 30;
  page.drawText("Cold Email Playbook", { x: margin, y, size: 18, font: helveticaBold, color: black });
  y -= 20;
  page.drawText(`Custom strategy for ${research.companyName}`, { x: margin, y, size: 10, font: helvetica, color: gray });
  y -= 30;

  // SECTION 1: Challenge
  const challengeTitle = challenge.charAt(0).toUpperCase() + challenge.slice(1).toLowerCase();
  addSection(`Your ${challengeTitle} Challenge`);
  const challengeAnalysis = research.challengeAnalysis || `Your ${challenge} challenge is holding you back from predictable growth.`;
  addText(challengeAnalysis, 9, helvetica, red);
  y -= 10;

  // SECTION 2: Solution
  addSection("The Solution");
  const challengeSolution = research.challengeSolution || "Cold email outbound creates predictable lead flow by reaching prospects who match your ideal customer profile.";
  addText(challengeSolution, 9, helvetica, green);
  y -= 10;

  // SECTION 3: Who to Target
  addSection("Who to Target");
  
  page.drawText("Ideal Company Profile:", { x: margin, y, size: 10, font: helveticaBold, color: black });
  y -= 14;
  for (const char of research.targetAudience.characteristics.slice(0, 5)) {
    addBullet(char);
  }
  y -= 5;
  
  page.drawText("Buying Intent Signals:", { x: margin, y, size: 10, font: helveticaBold, color: black });
  y -= 14;
  for (const indicator of research.behavioralIndicators.slice(0, 4)) {
    addBullet(indicator);
  }
  y -= 5;
  
  page.drawText("Technographic Signals:", { x: margin, y, size: 10, font: helveticaBold, color: black });
  y -= 14;
  for (const signal of research.technographicSignals.slice(0, 4)) {
    addBullet(signal);
  }
  y -= 10;

  // SECTION 4: Pain Points
  addSection("Pain Points to Lead With");
  for (const point of research.targetAudience.painPoints.slice(0, 5)) {
    addBullet(point);
  }
  y -= 10;

  // SECTION 5: Email Templates
  addSection("5 Cold Email Templates");
  
  for (let i = 0; i < Math.min(research.sampleEmails.length, 5); i++) {
    const email = research.sampleEmails[i];
    
    if (y < margin + 150) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    
    y -= 8;
    page.drawText(`Template ${i + 1}: ${email.angle}`, { x: margin, y, size: 10, font: helveticaBold, color: black });
    y -= 14;
    page.drawText(`Subject: ${email.subject}`, { x: margin, y, size: 9, font: helveticaBold, color: gray });
    y -= 14;
    
    // Email body
    const bodyLines = email.body.split('\n');
    for (const line of bodyLines) {
      if (line.trim()) {
        const words = line.split(' ');
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const width = helvetica.widthOfTextAtSize(testLine, 8);
          
          if (width > pageWidth - margin * 2 - 10 && currentLine) {
            if (y < margin + 50) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - margin;
            }
            page.drawText(currentLine, { x: margin + 10, y, size: 8, font: helvetica, color: gray });
            y -= 11;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        
        if (currentLine) {
          if (y < margin + 50) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(currentLine, { x: margin + 10, y, size: 8, font: helvetica, color: gray });
          y -= 11;
        }
      } else {
        y -= 6;
      }
    }
    
    if (email.whyItWorks) {
      y -= 3;
      page.drawText(`Why it works: ${email.whyItWorks}`, { x: margin + 10, y, size: 7, font: helvetica, color: green });
      y -= 10;
    }
    
    y -= 8;
  }

  // SECTION 6: Sequence Structure
  if (research.sequenceStructure) {
    addSection("Sequence Structure");
    for (const seq of research.sequenceStructure) {
      page.drawText(`${seq.email} (${seq.timing}): ${seq.purpose}`, { x: margin, y, size: 8, font: helvetica, color: gray });
      y -= 12;
    }
    y -= 8;
  }

  // SECTION 7: Reply Handling
  if (research.replyTemplates) {
    if (y < margin + 120) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    addSection("Reply Handling");
    
    const replies = [
      { type: "Positive", text: research.replyTemplates.positive },
      { type: "Not Now", text: research.replyTemplates.notNow },
      { type: "Not Interested", text: research.replyTemplates.notInterested },
      { type: "Send More Info", text: research.replyTemplates.sendMoreInfo },
      { type: "Price Objection", text: research.replyTemplates.priceObjection },
    ];
    
    for (const reply of replies) {
      page.drawText(`${reply.type}:`, { x: margin, y, size: 8, font: helveticaBold, color: black });
      y -= 11;
      addText(reply.text, 8, helvetica, gray);
      y -= 4;
    }
    y -= 8;
  }

  // SECTION 8: Sending Best Practices
  if (research.sendingBestPractices) {
    if (y < margin + 100) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    addSection("Sending Best Practices");
    
    page.drawText("Timing:", { x: margin, y, size: 9, font: helveticaBold, color: black });
    y -= 12;
    for (const t of research.sendingBestPractices.timing.slice(0, 3)) {
      addBullet(t);
    }
    
    page.drawText("Volume:", { x: margin, y, size: 9, font: helveticaBold, color: black });
    y -= 12;
    for (const v of research.sendingBestPractices.volume.slice(0, 4)) {
      addBullet(v);
    }
    y -= 8;
  }

  // SECTION 9: Metrics
  if (research.metrics) {
    if (y < margin + 80) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    addSection("Metrics & Benchmarks");
    
    page.drawText("Metric                 Poor      Avg       Good      Great", { x: margin, y, size: 8, font: helveticaBold, color: black });
    y -= 12;
    
    for (const m of research.metrics.slice(0, 4)) {
      const line = `${m.metric.padEnd(22)} ${m.poor.padEnd(10)} ${m.average.padEnd(10)} ${m.good.padEnd(10)} ${m.great}`;
      page.drawText(line, { x: margin, y, size: 7, font: helvetica, color: gray });
      y -= 10;
    }
    y -= 8;
  }

  // SECTION 10: List Building
  if (research.listBuildingSources) {
    if (y < margin + 80) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    addSection("List Building Sources");
    
    page.drawText("Primary Databases:", { x: margin, y, size: 9, font: helveticaBold, color: black });
    y -= 12;
    for (const p of research.listBuildingSources.primaryDatabases.slice(0, 4)) {
      addBullet(p);
    }
    
    page.drawText("Intent & Enrichment:", { x: margin, y, size: 9, font: helveticaBold, color: black });
    y -= 12;
    for (const i of research.listBuildingSources.intentEnrichment.slice(0, 3)) {
      addBullet(i);
    }
    y -= 8;
  }

  // SECTION 11: Discovery Questions
  if (research.discoveryQuestions) {
    if (y < margin + 80) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    addSection("Discovery Call Questions");
    
    for (let i = 0; i < Math.min(research.discoveryQuestions.length, 6); i++) {
      page.drawText(`${i + 1}. ${research.discoveryQuestions[i]}`, { x: margin, y, size: 8, font: helvetica, color: gray });
      y -= 12;
    }
    y -= 8;
  }

  // SECTION 12: Do's and Don'ts
  if (research.dosDonts) {
    if (y < margin + 100) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    addSection("Quick Reference: Do's and Don'ts");
    
    page.drawText("DO                                          DON'T", { x: margin, y, size: 8, font: helveticaBold, color: black });
    y -= 12;
    
    for (const d of research.dosDonts.slice(0, 8)) {
      const doText = d.do.substring(0, 35) + (d.do.length > 35 ? '...' : '');
      const dontText = d.dont.substring(0, 35) + (d.dont.length > 35 ? '...' : '');
      page.drawText(doText, { x: margin, y, size: 7, font: helvetica, color: green });
      page.drawText(dontText, { x: margin + 220, y, size: 7, font: helvetica, color: red });
      y -= 10;
    }
  }

  // Footer
  y -= 20;
  if (y > margin + 40) {
    page.drawText("Ready to Launch?", { x: margin, y, size: 12, font: helveticaBold, color: blue });
    y -= 16;
    addText("On our call, we'll refine these templates, build your target list, and set up your outbound engine.", 9, helvetica, gray);
    y -= 10;
    page.drawText("No upfront costs. We only win when you win.", { x: margin, y, size: 9, font: helveticaBold, color: black });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
