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
  const lineHeight = 16;
  
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  
  const blue = rgb(0.231, 0.510, 0.965);
  const black = rgb(0, 0, 0);
  const gray = rgb(0.4, 0.4, 0.4);
  
  // Helper function to add text with word wrap
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
    y -= 20;
    if (y < margin + 100) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(title, { x: margin, y, size: 14, font: helveticaBold, color: blue });
    y -= 25;
  };
  
  const addBullet = (text: string) => {
    if (y < margin + 50) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText("•", { x: margin, y, size: 10, font: helvetica, color: gray });
    
    const words = text.split(' ');
    let line = '';
    let isFirstLine = true;
    
    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const width = helvetica.widthOfTextAtSize(testLine, 10);
      
      if (width > pageWidth - margin * 2 - 20 && line) {
        if (y < margin + 50) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(line, { x: margin + (isFirstLine ? 15 : 15), y, size: 10, font: helvetica, color: gray });
        y -= 14;
        line = word;
        isFirstLine = false;
      } else {
        line = testLine;
      }
    }
    
    if (line) {
      page.drawText(line, { x: margin + 15, y, size: 10, font: helvetica, color: gray });
      y -= 14;
    }
  };
  
  // Header
  page.drawText("REVSHARE", { x: margin, y, size: 24, font: helveticaBold, color: blue });
  y -= 35;
  
  // Title
  page.drawText("Outbound Strategy Guide", { x: margin, y, size: 20, font: helveticaBold, color: black });
  y -= 25;
  page.drawText("How to Reach Your Ideal Clients", { x: margin, y, size: 12, font: helvetica, color: gray });
  y -= 30;
  
  // Your Challenge Section
  const red = rgb(0.6, 0.11, 0.11);
  const challengeAnalysis = (research as { challengeAnalysis?: string }).challengeAnalysis || "This is a common challenge that prevents many B2B companies from scaling predictably.";
  const challengeSolution = (research as { challengeSolution?: string }).challengeSolution || "Cold email outbound, done right, puts you in front of decision-makers who need your service.";
  
  addSection("Your Challenge");
  page.drawText(`"${challenge.substring(0, 80)}${challenge.length > 80 ? '...' : ''}"`, { x: margin, y, size: 10, font: helveticaBold, color: red });
  y -= 16;
  addText(challengeAnalysis, 9, helvetica, gray);
  y -= 15;
  
  // The Solution Section
  const green = rgb(0.086, 0.529, 0.243);
  addSection("The Solution: Targeted Cold Outreach");
  addText(challengeSolution, 9, helvetica, green);
  y -= 20;
  
  // Overview Box
  const whatTheySell = (research as { whatTheySell?: string }).whatTheySell || research.companyDescription;
  addSection("Your Business Snapshot");
  page.drawRectangle({
    x: margin,
    y: y - 55,
    width: pageWidth - margin * 2,
    height: 60,
    color: rgb(0.96, 0.97, 0.98),
    borderColor: rgb(0.9, 0.9, 0.9),
    borderWidth: 1,
  });
  
  y -= 15;
  page.drawText(`Company: ${research.companyName}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 15;
  page.drawText(`What You Sell: ${whatTheySell.substring(0, 70)}${whatTheySell.length > 70 ? '...' : ''}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 15;
  page.drawText(`Average Deal Size: ${dealSize}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 35;
  
  // Pain Points Your Prospects Face
  addSection("Pain Points Your Prospects Face");
  addText("These are the problems your ideal clients are dealing with. Lead with these in your outreach:", 9, helvetica, gray);
  y -= 10;
  for (const point of research.targetAudience.painPoints.slice(0, 5)) {
    addBullet(point);
  }
  
  // Who to Target
  addSection("Who to Target");
  addText("Focus your outreach on companies and decision-makers with these characteristics:", 9, helvetica, gray);
  y -= 10;
  for (const char of research.targetAudience.characteristics.slice(0, 4)) {
    addBullet(char);
  }
  
  // Technographic Signals
  addSection("Technographic Signals");
  addText("When you see these technical indicators, the company is likely a good fit:", 9, helvetica, gray);
  y -= 10;
  for (const signal of research.technographicSignals.slice(0, 4)) {
    addBullet(signal);
  }
  
  // Buying Intent Signals
  addSection("Buying Intent Signals");
  addText("These behaviors suggest a company is actively looking for a solution like yours:", 9, helvetica, gray);
  y -= 10;
  for (const indicator of research.behavioralIndicators.slice(0, 4)) {
    addBullet(indicator);
  }
  
  // Cold Email Templates
  addSection("5 Cold Email Templates");
  addText("These emails are ready for you to customize and send. Each uses a different proven angle:", 9, helvetica, gray);
  y -= 10;
  
  for (let i = 0; i < Math.min(research.sampleEmails.length, 5); i++) {
    const email = research.sampleEmails[i];
    const whyItWorks = (email as { whyItWorks?: string }).whyItWorks;
    
    if (y < margin + 180) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    
    y -= 10;
    page.drawText(`Template ${i + 1}: ${email.angle}`, { x: margin, y, size: 11, font: helveticaBold, color: black });
    y -= 18;
    page.drawText(`Subject: ${email.subject}`, { x: margin, y, size: 10, font: helveticaBold, color: gray });
    y -= 18;
    
    // Email body with wrapping
    const bodyLines = email.body.split('\n');
    for (const line of bodyLines) {
      if (line.trim()) {
        const words = line.split(' ');
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const width = helvetica.widthOfTextAtSize(testLine, 9);
          
          if (width > pageWidth - margin * 2 - 10 && currentLine) {
            if (y < margin + 50) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - margin;
            }
            page.drawText(currentLine, { x: margin + 10, y, size: 9, font: helvetica, color: gray });
            y -= 12;
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
          page.drawText(currentLine, { x: margin + 10, y, size: 9, font: helvetica, color: gray });
          y -= 12;
        }
      } else {
        y -= 8;
      }
    }
    
    // Add "Why it works" explanation if available
    if (whyItWorks) {
      y -= 5;
      if (y < margin + 50) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText("Why it works: ", { x: margin + 10, y, size: 8, font: helveticaBold, color: green });
      const whyText = whyItWorks.substring(0, 100) + (whyItWorks.length > 100 ? '...' : '');
      page.drawText(whyText, { x: margin + 75, y, size: 8, font: helvetica, color: green });
      y -= 12;
    }
    
    y -= 15;
  }
  
  // Footer on last page
  y -= 30;
  if (y > margin + 50) {
    page.drawText("Let's Build Your Outbound Engine", { x: margin, y, size: 14, font: helveticaBold, color: blue });
    y -= 20;
    addText("On our call, we'll go deeper into your specific market, refine these messages, and map out a complete outbound strategy. We handle the execution - you focus on closing.", 10, helvetica, gray);
    y -= 15;
    page.drawText("No upfront costs. We only win when you win.", { x: margin, y, size: 10, font: helveticaBold, color: black });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
