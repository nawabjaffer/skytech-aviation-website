# Google Apps Script Setup Guide

## Overview
This guide walks you through setting up the Google Apps Script Web App endpoint for the Distributors page form submissions. The Web App receives POST requests from your website and appends data to the Google Sheets.

---

## Prerequisites

- Google account with access to Google Sheets
- Your Google Sheet ID (from `VITE_GOOGLE_SHEET_ID`)
- Access to your project's `.env` file

---

## Step 1: Prepare Your Google Sheet

### Create Required Sheets

Your Google Sheets document should have **two sheets**:

#### Sheet 1: `ExistingDistributors`
This sheet stores current distributor partners displayed on the map.

**Columns (A-L)**:
| Column | Header | Type | Example |
|--------|--------|------|---------|
| A | id | Text | "DIST-001" |
| B | companyName | Text | "Gulf Aviation Parts LLC" |
| C | country | Text | "UAE" |
| D | city | Text | "Dubai" |
| E | region | Text | "Middle East" |
| F | latitude | Number | 25.2048 |
| G | longitude | Number | 55.2708 |
| H | yearsPartner | Number | 8 |
| I | specializations | Text | "Engines, Avionics" |
| J | website | Text | "https://example.com" |
| K | logo | Text | "https://example.com/logo.png" |
| L | active | Text | "true" |

**Header Row**: Row 1 should contain the column names above  
**Data Range**: `ExistingDistributors!A2:L100`

#### Sheet 2: `DistributorApplications`
This sheet stores new distributor applications submitted via the form.

**Columns (A-X)** (26 columns):
| Column | Header | Type | Example |
|--------|--------|------|---------|
| A | id | Text | "APP-1703872451234" |
| B | companyName | Text | "Test Aviation Inc" |
| C | contactPerson | Text | "John Doe" |
| D | email | Email | "john@test.com" |
| E | phone | Text | "+1234567890" |
| F | country | Text | "USA" |
| G | city | Text | "New York" |
| H | address | Text | "123 Main St" |
| I | website | Text | "https://test.com" |
| J | yearEstablished | Number | 2000 |
| K | numberOfEmployees | Number | 50 |
| L | annualRevenue | Text | "$5M" |
| M | businessLicense | Text | "https://example.com/license.pdf" |
| N | taxId | Text | "TAX123456" |
| O | industryExperience | Number | 10 |
| P | currentAircraftClients | Text | "Airline A, MRO B" |
| Q | territoryPreferences | Text | "USA, Canada" |
| R | warehouseFacilities | Text | "Yes" or "No" |
| S | certifications | Text | "ISO 9001, AS9120" |
| T | references | Text | "Name: X, Email: Y..." |
| U | businessPlan | Text | "https://example.com/plan.pdf" |
| V | status | Text | "Pending" |
| W | submittedDate | Text | "2024-01-15T10:00:00.000Z" |
| X | notes | Text | "Additional information" |

**Header Row**: Row 1 should contain the column names above  
**Data Range**: `DistributorApplications!A2:X100`

---

## Step 2: Open Apps Script Editor

1. Open your Google Sheet
2. Click **Extensions** in the menu bar
3. Select **Apps Script**
4. A new tab will open with the Apps Script editor

---

## Step 3: Create the Web App Script

### Delete Default Code
1. In the Apps Script editor, you'll see default code `function myFunction() {}`
2. Select all and delete it

### Paste the Web App Code

Copy and paste the following script:

```javascript
/**
 * Skytech Aviation - Distributor Application Handler
 * Receives POST requests from website and appends to DistributorApplications sheet
 */

function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.companyName || !data.contactPerson || !data.email) {
      throw new Error('Missing required fields');
    }
    
    // Get the active spreadsheet and DistributorApplications sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('DistributorApplications');
    
    if (!sheet) {
      throw new Error('DistributorApplications sheet not found');
    }
    
    // Prepare row data (26 columns: A-X)
    const row = [
      data.id || 'APP-' + Date.now(),              // A - Auto-generated if missing
      data.companyName,                             // B
      data.contactPerson,                           // C
      data.email,                                   // D
      data.phone,                                   // E
      data.country,                                 // F
      data.city,                                    // G
      data.address,                                 // H
      data.website || '',                           // I
      data.yearEstablished,                         // J
      data.numberOfEmployees,                       // K
      data.annualRevenue || '',                     // L
      data.businessLicense,                         // M
      data.taxId,                                   // N
      data.industryExperience,                      // O
      data.currentAircraftClients || '',            // P
      data.territoryPreferences,                    // Q
      data.warehouseFacilities || 'No',             // R
      data.certifications || '',                    // S
      data.references,                              // T
      data.businessPlan || '',                      // U
      data.status || 'Pending',                     // V
      data.submittedDate || new Date().toISOString(), // W
      data.notes || ''                              // X
    ];
    
    // Append row to sheet
    sheet.appendRow(row);
    
    // Log successful submission
    Logger.log('Application submitted: ' + data.companyName);
    
    // Optional: Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Application submitted successfully. We will review your application and contact you within 5 business days.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Failed to submit application: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Send email notification to admin when new application received
 * Configure your email address below
 */
function sendEmailNotification(data) {
  try {
    // CHANGE THIS to your admin email address
    const adminEmail = 'admin@skytechaviation.com';
    
    const subject = '🔔 New Distributor Application: ' + data.companyName;
    
    const htmlBody = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
              New Distributor Application Received
            </h2>
            
            <h3 style="color: #4B5563; margin-top: 20px;">Company Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 200px;">Company Name:</td>
                <td style="padding: 8px;">${data.companyName}</td>
              </tr>
              <tr style="background-color: #F9FAFB;">
                <td style="padding: 8px; font-weight: bold;">Contact Person:</td>
                <td style="padding: 8px;">${data.contactPerson}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Email:</td>
                <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr style="background-color: #F9FAFB;">
                <td style="padding: 8px; font-weight: bold;">Phone:</td>
                <td style="padding: 8px;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Location:</td>
                <td style="padding: 8px;">${data.city}, ${data.country}</td>
              </tr>
            </table>
            
            <h3 style="color: #4B5563; margin-top: 20px;">Business Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #F9FAFB;">
                <td style="padding: 8px; font-weight: bold; width: 200px;">Year Established:</td>
                <td style="padding: 8px;">${data.yearEstablished}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Employees:</td>
                <td style="padding: 8px;">${data.numberOfEmployees}</td>
              </tr>
              <tr style="background-color: #F9FAFB;">
                <td style="padding: 8px; font-weight: bold;">Industry Experience:</td>
                <td style="padding: 8px;">${data.industryExperience} years</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Territory Preferences:</td>
                <td style="padding: 8px;">${data.territoryPreferences}</td>
              </tr>
              <tr style="background-color: #F9FAFB;">
                <td style="padding: 8px; font-weight: bold;">Warehouse Facilities:</td>
                <td style="padding: 8px;">${data.warehouseFacilities}</td>
              </tr>
            </table>
            
            <h3 style="color: #4B5563; margin-top: 20px;">Documents</h3>
            <ul>
              <li><strong>Business License:</strong> <a href="${data.businessLicense}" target="_blank">View Document</a></li>
              ${data.businessPlan ? `<li><strong>Business Plan:</strong> <a href="${data.businessPlan}" target="_blank">View Document</a></li>` : ''}
            </ul>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #EFF6FF; border-left: 4px solid #2563EB;">
              <p style="margin: 0;"><strong>Next Steps:</strong></p>
              <p style="margin: 5px 0 0 0;">
                1. Review the application in <a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}" target="_blank">Google Sheets</a><br>
                2. Verify business documents<br>
                3. Contact references<br>
                4. Update application status
              </p>
            </div>
            
            <p style="color: #6B7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #E5E7EB; padding-top: 15px;">
              This is an automated notification from Skytech Aviation Distributor Application System.
            </p>
          </div>
        </body>
      </html>
    `;
    
    // Send HTML email
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('Email notification sent to: ' + adminEmail);
    
  } catch (error) {
    // Log email error but don't fail the application submission
    Logger.log('Failed to send email notification: ' + error.toString());
  }
}

/**
 * Test function to verify email notification works
 * Run this manually in Apps Script editor to test
 */
function testEmailNotification() {
  const testData = {
    companyName: "Test Aviation Inc",
    contactPerson: "John Doe",
    email: "john@test.com",
    phone: "+1234567890",
    city: "New York",
    country: "USA",
    yearEstablished: "2000",
    numberOfEmployees: "50",
    industryExperience: "10",
    territoryPreferences: "USA, Canada",
    warehouseFacilities: "Yes",
    businessLicense: "https://example.com/license.pdf",
    businessPlan: "https://example.com/plan.pdf"
  };
  
  sendEmailNotification(testData);
}
```

### Configure Email Notification (Optional)

On line 69, change the admin email to your email address:
```javascript
const adminEmail = 'your-email@skytechaviation.com';
```

---

## Step 4: Deploy as Web App

### Save the Script
1. Click the **Save** icon (💾) or press `Cmd+S` (Mac) / `Ctrl+S` (Windows)
2. Name your project: **"Distributor Application Handler"**
3. Click **OK**

### Deploy the Web App
1. Click **Deploy** button in the top-right corner
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**

### Configure Deployment Settings
Fill in the following:

- **Description**: "Distributor Application Endpoint v1.0"
- **Execute as**: **Me** (your@email.com)
- **Who has access**: **Anyone**

⚠️ **Important**: "Who has access" MUST be set to "Anyone" for your website to POST data

### Authorize the Script
1. Click **Deploy**
2. A popup will appear: "Authorization required"
3. Click **Authorize access**
4. Select your Google account
5. Click **Advanced** (if you see a warning)
6. Click **Go to [Project Name] (unsafe)**
7. Click **Allow** to grant permissions

### Copy the Web App URL
1. After authorization, you'll see a success message
2. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Keep this URL safe - you'll need it in the next step

---

## Step 5: Add Web App URL to Environment Variables

### Update `.env` File
1. Open your project's `.env` file
2. Add the following line (replace with your actual URL):
   ```bash
   VITE_GOOGLE_WEBAPP_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Save the file

### Restart Development Server
If your dev server is running:
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

---

## Step 6: Test the Integration

### Test from Terminal (curl)

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "APP-1234567890",
    "companyName": "Test Company",
    "contactPerson": "John Doe",
    "email": "john@test.com",
    "phone": "+1234567890",
    "country": "USA",
    "city": "New York",
    "address": "123 Main St",
    "website": "https://test.com",
    "yearEstablished": "2000",
    "numberOfEmployees": "50",
    "annualRevenue": "$5M",
    "businessLicense": "https://example.com/license.pdf",
    "taxId": "TAX123",
    "industryExperience": "10",
    "currentAircraftClients": "Client A",
    "territoryPreferences": "USA, Canada",
    "warehouseFacilities": "Yes",
    "certifications": "ISO 9001",
    "references": "Ref 1, Ref 2",
    "businessPlan": "https://example.com/plan.pdf",
    "status": "Pending",
    "submittedDate": "2024-01-15T10:00:00.000Z",
    "notes": "Test submission"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Application submitted successfully. We will review your application and contact you within 5 business days."
}
```

### Test from Website
1. Navigate to `/distributors`
2. Click **"Apply Now"** button
3. Fill out the form (use test data)
4. Click **"Submit Application"**
5. Wait for success message
6. Check your Google Sheet - new row should appear
7. Check your email - notification should arrive (if configured)

---

## Step 7: Monitor and Debug

### View Execution Logs
1. In Apps Script editor, click **Executions** (left sidebar)
2. You'll see a log of all POST requests
3. Click on any execution to see details
4. Check for errors in red

### View Script Logs
1. Click **View** → **Logs** (or press `Cmd+Enter`)
2. You'll see `Logger.log()` output
3. Helpful for debugging issues

### Common Issues

#### Issue: "Authorization required" error when submitting form
**Cause**: Script not authorized or "Who has access" not set to "Anyone"  
**Fix**: 
1. Go to Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (pencil icon)
4. Ensure "Who has access" is **Anyone**
5. Click **Deploy**

#### Issue: "DistributorApplications sheet not found"
**Cause**: Sheet name mismatch  
**Fix**: 
1. Verify sheet name is exactly `DistributorApplications` (case-sensitive)
2. Ensure sheet exists in the same Google Sheets document

#### Issue: Email notifications not sending
**Cause**: Gmail daily sending limit or incorrect email address  
**Fix**:
1. Check email address in `sendEmailNotification()` function
2. Gmail limit: 100 emails/day for free accounts
3. Check Apps Script **Executions** for email errors

#### Issue: Data appears in wrong columns
**Cause**: Column order mismatch  
**Fix**:
1. Compare script's `row` array order with sheet headers
2. Ensure headers in Row 1 match the order in the script

---

## Step 8: Update Deployment (After Code Changes)

If you modify the Apps Script code:

1. Click **Deploy** → **Manage deployments**
2. Click **Edit** (pencil icon) on your deployment
3. Update **Version**: Select **New version**
4. Click **Deploy**
5. **Important**: The Web App URL remains the same

---

## Security Best Practices

### 1. Input Validation
The script validates required fields:
```javascript
if (!data.companyName || !data.contactPerson || !data.email) {
  throw new Error('Missing required fields');
}
```

Add more validation as needed (email format, phone format, etc.)

### 2. Rate Limiting
Consider adding rate limiting to prevent spam:
```javascript
const cache = CacheService.getScriptCache();
const key = 'submission_' + data.email;
const existing = cache.get(key);

if (existing) {
  throw new Error('Duplicate submission. Please wait before resubmitting.');
}

cache.put(key, 'submitted', 300); // 5-minute cooldown
```

### 3. Data Sanitization
Sanitize user input before storing:
```javascript
function sanitize(str) {
  return str.toString().trim().replace(/[<>]/g, '');
}

const row = [
  sanitize(data.id),
  sanitize(data.companyName),
  // ... etc
];
```

### 4. Monitor Executions
Regularly check Apps Script executions for:
- Unusual traffic spikes
- Error patterns
- Suspicious submissions

---

## Production Checklist

Before going live:

- [ ] **Email configured**: Admin email set in `sendEmailNotification()`
- [ ] **Web App deployed**: Deployment active and URL copied
- [ ] **Environment variable set**: `VITE_GOOGLE_WEBAPP_URL` in `.env`
- [ ] **Sheet structure verified**: Both sheets exist with correct headers
- [ ] **Test submission completed**: Form works end-to-end
- [ ] **Email notification tested**: Test email received
- [ ] **Error handling tested**: Invalid submissions rejected
- [ ] **Authorization confirmed**: Script authorized and "Anyone" access set
- [ ] **Logs reviewed**: No errors in Apps Script executions
- [ ] **Production build tested**: `npm run build` succeeds

---

## Maintenance

### Monthly Tasks
- Review new applications in Google Sheets
- Update application statuses (Pending → Under Review → Approved/Rejected)
- Archive old applications (move to separate sheet)

### Quarterly Tasks
- Check Apps Script execution quota usage
- Review and delete old execution logs
- Update email notification template if needed

### Annual Tasks
- Rotate or regenerate Web App deployment URL
- Review and update security measures
- Audit distributor data for accuracy

---

## Advanced Features (Optional)

### 1. Auto-Reply Email to Applicant
Add to `doPost()` function after successful submission:
```javascript
MailApp.sendEmail({
  to: data.email,
  subject: 'Application Received - Skytech Aviation',
  htmlBody: `
    <p>Dear ${data.contactPerson},</p>
    <p>Thank you for your interest in becoming a Skytech Aviation distributor.</p>
    <p>We have received your application for <strong>${data.companyName}</strong> and will review it within 5 business days.</p>
    <p>Your application ID: <strong>${data.id}</strong></p>
    <p>Best regards,<br>Skytech Aviation Team</p>
  `
});
```

### 2. Slack Integration
Send notifications to Slack:
```javascript
function sendSlackNotification(data) {
  const webhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
  
  const payload = {
    text: `🔔 New distributor application: ${data.companyName}`,
    attachments: [{
      color: '#2563EB',
      fields: [
        { title: 'Contact', value: data.contactPerson, short: true },
        { title: 'Email', value: data.email, short: true },
        { title: 'Location', value: `${data.city}, ${data.country}`, short: true },
        { title: 'Territory', value: data.territoryPreferences, short: true }
      ]
    }]
  };
  
  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}
```

### 3. Google Calendar Event
Create calendar event for follow-up:
```javascript
function createFollowUpEvent(data) {
  const calendar = CalendarApp.getDefaultCalendar();
  const followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + 5); // 5 days from now
  
  calendar.createEvent(
    `Follow up: ${data.companyName} distributor application`,
    followUpDate,
    followUpDate,
    {
      description: `Application ID: ${data.id}\nContact: ${data.contactPerson}\nEmail: ${data.email}`
    }
  );
}
```

---

## Support

For issues with Google Apps Script:
- [Apps Script Documentation](https://developers.google.com/apps-script)
- [Apps Script Community](https://stackoverflow.com/questions/tagged/google-apps-script)
- [Gmail Sending Limits](https://support.google.com/a/answer/166852)

**Last Updated**: January 2024  
**Version**: 1.0
