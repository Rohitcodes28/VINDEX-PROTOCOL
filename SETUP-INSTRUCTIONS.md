# Vindex Protocol - Setup Instructions

## 🚀 Quick Start Guide

This guide will help you set up the complete Vindex Protocol website with Google Sheets integration for form submissions and newsletter signups.

---

## 📋 Prerequisites

- A Google Account
- GitHub Pages enabled (or any static hosting)
- Basic understanding of Google Apps Script

---

## 🔧 Step 1: Set Up Google Sheet

1. **Create a New Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it: **"Vindex Insurance Leads"**

2. **Add Column Headers**
   - In Row 1, add these exact headers (copy-paste recommended):
   ```
   Timestamp | Full Name | Email | Phone | City/Country | Annual CTC | Experience | Industry | College Tier | Monthly Expenditure | Dependents | Spouse Earning | Spouse Salary | Premium | Coverage | Security Score | Type
   ```

3. **Format the Sheet** (Optional but recommended)
   - Make Row 1 bold
   - Freeze Row 1 (View > Freeze > 1 row)
   - Apply alternating colors for better readability

---

## 📝 Step 2: Set Up Google Apps Script

1. **Open Script Editor**
   - In your Google Sheet, go to: **Extensions > Apps Script**
   - Delete any existing code in the editor

2. **Copy the Script**
   - Open the file `google-apps-script.js` from your project
   - Copy ALL the code
   - Paste it into the Apps Script editor

3. **Update Email Address**
   - Find this line in the script (appears twice):
   ```javascript
   to: 'rohitashgoyal509@gmail.com',
   ```
   - This is already set to your email, but verify it's correct

4. **Save the Script**
   - Click the disk icon or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
   - Name the project: **"Vindex Form Handler"**

---

## 🌐 Step 3: Deploy as Web App

1. **Deploy the Script**
   - Click the **Deploy** button (top right)
   - Select **New deployment**

2. **Configure Deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**
   
3. **Set Permissions**
   - **Description**: "Vindex Protocol Form Handler"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
   
   ⚠️ **Important**: "Anyone" means anyone with the URL can submit data. This is necessary for your public website to work.

4. **Authorize the App**
   - Click **Deploy**
   - You'll see a warning: "Google hasn't verified this app"
   - Click **Advanced** → **Go to Vindex Form Handler (unsafe)**
   - Click **Allow**

5. **Copy the Deployment URL**
   - After deployment, you'll see a **Web app URL**
   - It looks like: `https://script.google.com/macros/s/XXXXX.../exec`
   - **COPY THIS URL** - you'll need it in the next step

---

## 🔗 Step 4: Update Website Code

1. **Update JavaScript File**
   - Open `VINDEX-PROTOCOL/assets/js/main.js`
   - Find these two lines (around line 240 and 280):
   ```javascript
   const endpoint = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
   
2. **Replace with Your URL**
   - Replace `YOUR_SCRIPT_ID` with your actual deployment URL
   - Example:
   ```javascript
   ```

---

## 🧪 Step 5: Test the Setup

1. **Test the Script** (Optional)
   - In Google Apps Script, click **Run** next to the `testScript` function
   - Check your Google Sheet - you should see a test entry
   - Check your email - you should receive a test notification

2. **Test the Website**
   - Open your website
   - Fill out the insurance calculator
   - Submit the form
   - Check your Google Sheet for the new entry
   - Check your email for the notification

3. **Test Newsletter Signup**
   - Scroll to the footer
   - Enter an email in the newsletter signup
   - Submit the form
   - Check your Google Sheet and email

---

## 📊 Understanding the Data

### Google Sheet Columns:
- **Timestamp**: When the form was submitted
- **Full Name**: User's full name
- **Email**: User's email address
- **Phone**: Phone number (with country code)
- **City/Country**: Location (city for India, country for international)
- **Annual CTC**: Annual salary in rupees
- **Experience**: Years of work experience
- **Industry**: User's industry/sector
- **College Tier**: Educational background tier
- **Monthly Expenditure**: Monthly expenses in rupees
- **Dependents**: Number of family dependents
- **Spouse Earning**: Whether spouse earns (yes/no)
- **Spouse Salary**: Spouse's annual salary
- **Premium**: Calculated monthly premium
- **Coverage**: Calculated coverage amount
- **Security Score**: Family security score (0-100)
- **Type**: "Insurance Quote" or "Newsletter"

### Email Notifications:
- **Insurance Quotes**: Detailed email with all user information and calculations
- **Newsletter Signups**: Simple notification with email address

---

## 🔒 Security & Privacy

- The Google Apps Script runs under your Google account
- Only you receive the email notifications
- Data is stored in your private Google Sheet
- The web app URL should be kept secure (don't share publicly)
- Consider adding additional validation if needed

---

## 🚀 Deployment Options

### GitHub Pages (Recommended)
1. Push all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at: `https://yourusername.github.io/repository-name`

### Other Static Hosting
- Netlify
- Vercel
- Firebase Hosting
- Any web server that serves static files

---

## 🛠️ Troubleshooting

### Common Issues:

1. **"Script function not found" error**
   - Make sure you copied the entire script
   - Verify the function names are correct

2. **No data appearing in Google Sheet**
   - Check if the deployment URL is correct in the JavaScript
   - Verify the sheet has the correct column headers
   - Check the Apps Script execution log for errors

3. **No email notifications**
   - Verify your email address is correct in the script
   - Check your spam folder
   - Ensure the script has permission to send emails

4. **Form submission errors**
   - Open browser developer tools (F12) and check the console for errors
   - Verify all required fields are filled
   - Check network tab to see if the request is being sent

### Getting Help:
- Check the browser console for JavaScript errors
- Review the Google Apps Script execution log
- Verify all file paths and URLs are correct

---

## 📈 Analytics & Monitoring

Consider adding:
- Google Analytics to track website usage
- Form completion rates
- Popular cities/industries
- Conversion metrics

---

## 🎉 You're All Set!

Your Vindex Protocol website is now fully functional with:
- ✅ Professional insurance calculator
- ✅ Google Sheets data collection
- ✅ Email notifications
- ✅ Newsletter signup
- ✅ Open source community section
- ✅ Mobile-responsive design

**Next Steps:**
1. Customize the design further if needed
2. Add more cities to the dropdown
3. Implement additional analytics
4. Consider adding more form validation
5. Set up automated follow-up emails

---

## 📞 Support

If you encounter any issues:
1. Check this documentation first
2. Review the troubleshooting section
3. Check browser console for errors
4. Verify Google Apps Script permissions

**Happy coding! 🚀**