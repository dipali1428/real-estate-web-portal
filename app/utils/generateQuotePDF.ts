import jsPDF from 'jspdf';

export interface QuoteData {
    productType: 'travel' | 'pet' | 'cattle';
    insurerName: string;
    planTitle: string;
    planTagline?: string;
    price: string;
    duration?: string;
    features: string[];
    claimRatio?: string;
    network?: string;
    addons?: string[];
    agentName?: string;
}

// Brand Colors
const BRAND_BLUE = '#2076C7';
const BRAND_TEAL = '#1CADA3';
const SLATE_900 = '#0F172A';
const SLATE_700 = '#334155';
const SLATE_500 = '#64748B';
const SLATE_300 = '#CBD5E1';
const SLATE_100 = '#F1F5F9';
const WHITE = '#FFFFFF';

function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [0, 0, 0];
}

function setFill(doc: jsPDF, hex: string) { doc.setFillColor(...hexToRgb(hex)); }
function setTextColor(doc: jsPDF, hex: string) { doc.setTextColor(...hexToRgb(hex)); }
function setDrawColor(doc: jsPDF, hex: string) { doc.setDrawColor(...hexToRgb(hex)); }

export async function generateQuotePDF(quote: QuoteData): Promise<void> {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210;
    const H = 297;
    const MARGIN = 15;
    const CONTENT_W = W - (MARGIN * 2);

    // ── PAGE BORDER ──
    setDrawColor(doc, BRAND_BLUE);
    doc.setLineWidth(1.5);
    doc.rect(0, 0, W, H, 'S'); // Outer border

    // Top accent bar
    setFill(doc, BRAND_TEAL);
    doc.rect(0, 0, W, 4, 'F');

    // ── LOGO & HEADER ──
    try {
        const logoResponse = await fetch('/logo.png');
        const logoBlob = await logoResponse.blob();
        const logoBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(logoBlob);
        });
        doc.addImage(logoBase64, 'PNG', MARGIN, MARGIN, 40, 18);
    } catch {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        setTextColor(doc, BRAND_BLUE);
        doc.text('Infinity Arth', MARGIN, MARGIN + 10);
    }

    // Right Side Header (Quote Title & Date)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setTextColor(doc, SLATE_500);
    doc.text('OFFICIAL COMMERCIAL QUOTE', W - MARGIN, MARGIN + 4, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    setTextColor(doc, SLATE_900);
    const productLabel = quote.productType === 'travel' ? 'Travel Insurance'
        : quote.productType === 'pet' ? 'Pet Insurance'
        : 'Cattle Insurance';
    doc.text(productLabel, W - MARGIN, MARGIN + 13, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setTextColor(doc, SLATE_500);
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.text(`Date Generated: ${dateStr}   |   Valid for 30 days`, W - MARGIN, MARGIN + 19, { align: 'right' });

    // Header Divider
    setDrawColor(doc, SLATE_300);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, MARGIN + 28, W - MARGIN, MARGIN + 28);

    // ── INSURER & PREMIUM SUMMARY CARD ──
    const cardY = MARGIN + 35;
    
    // Premium Box (Right Side)
    setFill(doc, BRAND_BLUE);
    doc.roundedRect(W - MARGIN - 60, cardY, 60, 32, 2, 2, 'F');
    
    setTextColor(doc, WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('TOTAL PREMIUM', W - MARGIN - 30, cardY + 8, { align: 'center' });
    
    // jsPDF standard fonts don't render ₹ well. Make sure to replace ALL occurrences globally.
    const displayPrice = quote.price.replace(/₹/g, 'Rs. ').replace(/\/\*/g, '').trim();
    
    // Dynamically adjust font size for long price ranges (e.g. "Rs. 465 - Rs. 1,050")
    if (displayPrice.length > 16) {
        doc.setFontSize(14);
    } else if (displayPrice.length > 10) {
        doc.setFontSize(18);
    } else {
        doc.setFontSize(24);
    }
    
    doc.text(displayPrice, W - MARGIN - 30, cardY + 19, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(quote.duration || 'per policy term', W - MARGIN - 30, cardY + 26, { align: 'center' });

    // Insurer Info (Left Side)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setTextColor(doc, BRAND_TEAL);
    doc.text('INSURER DETAILS', MARGIN, cardY + 4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    setTextColor(doc, SLATE_900);
    doc.text(quote.insurerName, MARGIN, cardY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setTextColor(doc, SLATE_700);
    if (quote.claimRatio) doc.text(`Claim Settlement Ratio: ${quote.claimRatio}`, MARGIN, cardY + 21);
    if (quote.network) doc.text(`Cashless Network: ${quote.network}`, MARGIN, cardY + 27);

    // Divider
    setDrawColor(doc, SLATE_300);
    doc.line(MARGIN, cardY + 42, W - MARGIN, cardY + 42);

    // ── PLAN SPECIFICATIONS ──
    let y = cardY + 52;
    
    // Globally replace ₹ symbol as it breaks text tracking in jsPDF
    const formatStr = (str: string) => str.replace(/₹/g, 'Rs. ');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    setTextColor(doc, SLATE_900);
    doc.text(formatStr(quote.planTitle).toUpperCase(), MARGIN, y);

    if (quote.planTagline) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        setTextColor(doc, SLATE_500);
        doc.text(formatStr(quote.planTagline), MARGIN, y + 6);
        y += 16;
    } else {
        y += 10;
    }

    // ── FEATURES (2 Columns) ──
    setFill(doc, SLATE_100);
    doc.roundedRect(MARGIN, y, CONTENT_W, 8, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setTextColor(doc, SLATE_700);
    doc.text('KEY INCLUSIONS & BENEFITS', MARGIN + 4, y + 5.5);
    
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setTextColor(doc, SLATE_900);
    
    const maxFeaturesPerCol = Math.ceil(quote.features.length / 2);
    const colWidth = CONTENT_W / 2;

    quote.features.forEach((feature, idx) => {
        const col = Math.floor(idx / maxFeaturesPerCol);
        const row = idx % maxFeaturesPerCol;
        const xPos = MARGIN + (col * colWidth);
        const yPos = y + (row * 8);

        // Checkmark
        setFill(doc, BRAND_TEAL);
        doc.circle(xPos + 2, yPos - 1, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        setTextColor(doc, WHITE);
        doc.text('✓', xPos + 1.2, yPos - 0.2);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        setTextColor(doc, SLATE_700);
        // Truncate and sanitize feature string
        let text = formatStr(feature);
        if (text.length > 55) text = text.substring(0, 52) + '...';
        doc.text(text, xPos + 7, yPos);
    });

    y += (maxFeaturesPerCol * 8) + 12;

    // ── ADD-ONS (2 Columns) ──
    if (quote.addons && quote.addons.length > 0) {
        setFill(doc, SLATE_100);
        doc.roundedRect(MARGIN, y, CONTENT_W, 8, 1, 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        setTextColor(doc, SLATE_700);
        doc.text('AVAILABLE ADD-ONS (OPTIONAL)', MARGIN + 4, y + 5.5);
        
        y += 14;

        doc.setFont('helvetica', 'normal');
        const maxAddonsPerCol = Math.ceil(quote.addons.length / 2);

        quote.addons.forEach((addon, idx) => {
            const col = Math.floor(idx / maxAddonsPerCol);
            const row = idx % maxAddonsPerCol;
            const xPos = MARGIN + (col * colWidth);
            const yPos = y + (row * 7);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            setTextColor(doc, BRAND_BLUE);
            doc.text('+', xPos, yPos);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9.5);
            setTextColor(doc, SLATE_700);
            doc.text(addon, xPos + 5, yPos);
        });
        
        y += (maxAddonsPerCol * 7) + 10;
    }

    // ── FOOTER (Bottom attached) ──
    const footerY = H - 35;

    setDrawColor(doc, SLATE_300);
    doc.line(MARGIN, footerY, W - MARGIN, footerY);

    // Disclaimer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    setTextColor(doc, SLATE_500);
    const disclaimer = 'Disclaimer: This document is a quotation only and does not imply binding insurance cover. The premium and terms are subject to final underwriting approval by the respective insurer. Please refer to the official policy wording for exact terms, conditions, and exclusions.';
    const splitDisclaimer = doc.splitTextToSize(disclaimer, CONTENT_W);
    doc.text(splitDisclaimer, MARGIN, footerY + 6);

    // Company Footer Info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setTextColor(doc, SLATE_900);
    doc.text('Infinity Arthvishva Insurance Broker Pvt. Ltd.', MARGIN, footerY + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setTextColor(doc, SLATE_500);
    doc.text('IRDA Reg. No. CB-###   |   www.infinityarthvishva.com   |   info@infinityarthvishva.com', MARGIN, footerY + 27);

    // ── SAVE REPORT ──
    const safeStr = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
    const fileName = `${safeStr(quote.insurerName)}_${safeStr(quote.planTitle)}_Quote.pdf`;
    doc.save(fileName);
}