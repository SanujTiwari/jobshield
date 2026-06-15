import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateAnalysisPDF = (job) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header gradient bar
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('JobShield', 14, 18);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Powered Job Scam Analysis Report', 14, 28);

  // Report date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 35);

  let yPosition = 52;

  // Risk Level Badge
  doc.setTextColor(0, 0, 0);
  const riskColor = job.risk_level === 'High Risk' ? [244, 63, 94] :
                    job.risk_level === 'Medium Risk' ? [245, 158, 11] :
                    [16, 185, 129];
  doc.setFillColor(...riskColor);
  doc.roundedRect(14, yPosition, 60, 12, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(job.risk_level, 44, yPosition + 8, { align: 'center' });

  // Risk Score
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text(`Risk Score: ${job.risk_score}/100`, 82, yPosition + 8);

  yPosition += 24;

  // Job Details Table
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Job Details', 14, yPosition);
  yPosition += 4;

  autoTable(doc, {
    startY: yPosition,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], fontSize: 11 },
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 } },
    body: [
      ['Job Title', job.title || 'N/A'],
      ['Company', job.company_name || 'N/A'],
      ['Analysis Date', job.created_at ? new Date(job.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'],
    ],
  });

  yPosition = doc.lastAutoTable.finalY + 12;

  // Description
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Job Description', 14, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const descLines = doc.splitTextToSize(job.description || 'No description provided', pageWidth - 28);
  doc.text(descLines, 14, yPosition);
  yPosition += descLines.length * 5 + 10;

  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  }

  // Risk Reasons
  const reasons = typeof job.reasons === 'string' ? JSON.parse(job.reasons) : (job.reasons || []);
  if (reasons.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Risk Factors Detected', 14, yPosition);
    yPosition += 4;

    autoTable(doc, {
      startY: yPosition,
      theme: 'striped',
      headStyles: { fillColor: [244, 63, 94], fontSize: 11 },
      bodyStyles: { fontSize: 10 },
      head: [['#', 'Risk Factor']],
      body: reasons.map((reason, i) => [i + 1, reason]),
    });

    yPosition = doc.lastAutoTable.finalY + 12;
  }

  // AI Explanation
  if (job.ai_explanation) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('AI Analysis', 14, yPosition);
    yPosition += 6;

    doc.setFillColor(238, 242, 255);
    const aiLines = doc.splitTextToSize(job.ai_explanation, pageWidth - 36);
    const aiBoxHeight = aiLines.length * 5 + 10;
    doc.roundedRect(14, yPosition - 2, pageWidth - 28, aiBoxHeight, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 48, 163);
    doc.text(aiLines, 18, yPosition + 4);
    yPosition += aiBoxHeight + 10;
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `JobShield Report — Page ${i} of ${pageCount} — Confidential`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Download
  const fileName = `JobShield_Report_${(job.title || 'Analysis').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
};
