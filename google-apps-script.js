
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Check if it's a newsletter signup or insurance form
    if (data.type === 'newsletter') {
      handleNewsletterSignup(sheet, data);
    } else if (data.type === 'insurance_quote') {
      handleInsuranceQuote(sheet, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data received successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleNewsletterSignup(sheet, data) {
  // Append newsletter signup to sheet
  sheet.appendRow([
    new Date(),
    '', // Full Name (empty for newsletter)
    data.email,
    '', // Phone
    '', // City/Country
    '', // Annual CTC
    '', // Experience
    '', // Industry
    '', // College Tier
    '', // Monthly Expenditure
    '', // Dependents
    '', // Spouse Earning
    '', // Spouse Salary
    '', // Premium
    '', // Coverage
    '', // Security Score
    'Newsletter' // Type
  ]);
  
  // Send email notification
  MailApp.sendEmail({
    to: 'rohitashgoyal509@gmail.com',
    subject: '📧 New Newsletter Subscription - Vindex Protocol',
    body: `New newsletter subscription received!\n\nEmail: ${data.email}\nTimestamp: ${new Date()}\n\nBest regards,\nVindex Protocol System`
  });
}

function handleInsuranceQuote(sheet, data) {
  // Append insurance quote to sheet
  sheet.appendRow([
    new Date(),
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.location || '', // City or Country
    data.annualCTC || '',
    data.experience || '',
    data.industry || '',
    data.collegeTier || '',
    data.monthlyExpenditure || '',
    data.dependents || '',
    data.spouseEarning || '',
    data.spouseSalary || '0',
    data.calculatedPremium || '',
    data.calculatedCoverage || '',
    data.securityScore || '',
    'Insurance Quote' // Type
  ]);
  
  // Send detailed email notification
  const emailBody = `
New Insurance Quote Request Received!

═══════════════════════════════════════
PERSONAL INFORMATION
═══════════════════════════════════════
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location}

═══════════════════════════════════════
PROFESSIONAL PROFILE
═══════════════════════════════════════
Annual CTC: ₹${data.annualCTC}
Experience: ${data.experience} years
Industry: ${data.industry}
College Tier: ${data.collegeTier}

═══════════════════════════════════════
FINANCIAL PROFILE
═══════════════════════════════════════
Monthly Expenditure: ₹${data.monthlyExpenditure}
Number of Dependents: ${data.dependents}
Spouse Earning: ${data.spouseEarning}
Spouse Salary: ₹${data.spouseSalary}

═══════════════════════════════════════
CALCULATED RESULTS
═══════════════════════════════════════
Monthly Premium: ₹${data.calculatedPremium}
Coverage Amount: ₹${data.calculatedCoverage}
Family Security Score: ${data.securityScore}/100

═══════════════════════════════════════
Timestamp: ${new Date()}

Action Required: Follow up with the lead within 24 hours.

Best regards,
Vindex Protocol System
  `;
  
  MailApp.sendEmail({
    to: 'rohitashgoyal509@gmail.com',
    subject: `🎯 New Insurance Quote - ${data.fullName} (₹${data.calculatedPremium}/mo)`,
    body: emailBody
  });
}

// Test function - you can run this to test the script
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        type: 'insurance_quote',
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        location: 'Bangalore',
        annualCTC: '1200000',
        experience: '5',
        industry: 'Technology',
        collegeTier: 'Tier 1',
        monthlyExpenditure: '50000',
        dependents: '3',
        spouseEarning: 'yes',
        spouseSalary: '800000',
        calculatedPremium: '3333',
        calculatedCoverage: '600000',
        securityScore: '85'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
