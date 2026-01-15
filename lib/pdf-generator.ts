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
  page.drawText("Custom Outbound Playbook", { x: margin, y, size: 20, font: helveticaBold, color: black });
  y -= 25;
  page.drawText(`Prepared for ${research.companyName}`, { x: margin, y, size: 12, font: helvetica, color: gray });
  y -= 40;
  
  // Overview Box
  page.drawRectangle({
    x: margin,
    y: y - 80,
    width: pageWidth - margin * 2,
    height: 85,
    color: rgb(0.96, 0.97, 0.98),
    borderColor: rgb(0.9, 0.9, 0.9),
    borderWidth: 1,
  });
  
  y -= 15;
  page.drawText(`Company: ${research.companyName}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 15;
  page.drawText(`Website: ${website}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 15;
  page.drawText(`Average Deal Size: ${dealSize}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 15;
  page.drawText(`Challenge: ${challenge.substring(0, 80)}${challenge.length > 80 ? '...' : ''}`, { x: margin + 10, y, size: 10, font: helvetica, color: black });
  y -= 35;
  
  // Description
  addText(research.companyDescription, 11, helvetica, gray);
  y -= 10;
  
  // Target Audience Pain Points
  addSection("Target Audience Pain Points");
  for (const point of research.targetAudience.painPoints.slice(0, 5)) {
    addBullet(point);
  }
  
  // Target Market Characteristics  
  addSection("Target Market Characteristics");
  for (const char of research.targetAudience.characteristics.slice(0, 4)) {
    addBullet(char);
  }
  
  // Technographic Signals
  addSection("Technographic Signals");
  for (const signal of research.technographicSignals.slice(0, 4)) {
    addBullet(signal);
  }
  
  // Behavioral Indicators
  addSection("Behavioral Indicators");
  for (const indicator of research.behavioralIndicators.slice(0, 4)) {
    addBullet(indicator);
  }
  
  // Sample Emails
  addSection("Sample Cold Emails");
  
  for (let i = 0; i < Math.min(research.sampleEmails.length, 5); i++) {
    const email = research.sampleEmails[i];
    
    if (y < margin + 150) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    
    y -= 10;
    page.drawText(`Email ${i + 1}: ${email.angle}`, { x: margin, y, size: 11, font: helveticaBold, color: black });
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
    
    y -= 15;
  }
  
  // Footer on last page
  y -= 30;
  if (y > margin + 50) {
    page.drawText("Ready to Launch?", { x: margin, y, size: 14, font: helveticaBold, color: blue });
    y -= 20;
    addText("This playbook is just the beginning. On our call, we'll dive deeper into your specific market and build a complete outbound strategy.", 10, helvetica, gray);
    y -= 15;
    page.drawText("Remember: We only get paid when you get paid.", { x: margin, y, size: 10, font: helveticaBold, color: black });
  }
  
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
