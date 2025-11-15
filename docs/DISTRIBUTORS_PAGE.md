# Distributors Page Documentation

## Overview
The Distributors page is a comprehensive partnership application platform that enables potential distributors to apply for partnership with Skytech Aviation. It features Google Sheets integration for both reading existing distributor data and submitting new applications.

**File**: `src/pages/Distributors.tsx`  
**Lines**: ~700+ lines  
**Integration**: Bidirectional Google Sheets (READ + WRITE)

---

## Features

### 1. **Hero Section**
- Eye-catching gradient background (blue-600 to blue-800)
- Clear value proposition for potential partners
- Call-to-action button to scroll to application form
- Responsive text sizing (4xl on mobile, 5xl on desktop)

### 2. **Partnership Benefits Grid**
- 6 benefit cards with emoji icons:
  - 🌍 Global Network - Worldwide supplier access
  - ✈️ Authentic OEM Parts - 100% genuine certification
  - 📚 Training & Support - Comprehensive programs
  - 🚚 Logistics Support - AOG emergency support
  - 💼 Marketing Materials - Co-branded resources
  - 📈 Business Growth - Territory protection
- Hover effects with shadow transitions
- Dark mode support

### 3. **Requirements Checklist**
- 6 requirements with visual indicators:
  - **Required** (blue checkmark): Business Registration, Industry Experience, Financial Stability, Geographic Coverage
  - **Preferred** (gray checkmark): Warehouse Facilities, Certifications
- Clear distinction between mandatory and optional requirements
- Centered card layout with shadow

### 4. **Application Process Flowchart**
- 4-step visual timeline:
  1. Submit Application
  2. Initial Review (5 business days)
  3. Due Diligence (background verification)
  4. Partnership Agreement (contract signing)
- Numbered circles with connecting lines
- Responsive layout (stacked on mobile, horizontal on desktop)

### 5. **Partner Testimonials**
- 3 testimonial cards from existing distributors:
  - Ahmed Al-Mansouri (Dubai, UAE)
  - Hans Mueller (Frankfurt, Germany)
  - Michael Chen (Singapore)
- Quotation mark styling
- Company and location details
- Shadow and border styling

### 6. **Global Distributor Network Map**
- **Text-based map** (no external library required)
- Groups distributors by region (Middle East, Europe, Asia Pacific, etc.)
- Displays:
  - Company name
  - City, Country
  - Years as partner
  - Location pin icons
- Shows total distributor count and region count
- Loads from Google Sheets with 5-minute caching
- Falls back to 6 default distributors if sheet unavailable

### 7. **Application Form (22 Fields)**

#### Company Information Section:
- Company Name * (text)
- Contact Person * (text)
- Email Address * (email)
- Phone Number * (tel)
- Country * (text)
- City * (text)
- Street Address * (text)
- Website (url, optional)
- Tax ID / Business Number * (text)

#### Business Details Section:
- Year Established * (number, 1900-current year)
- Number of Employees * (number, min 1)
- Years of Industry Experience * (number)
- Annual Revenue (text, optional)
- Warehouse Facilities (select: Yes/No)
- Certifications (text, ISO/AS9120)

#### Documentation Section:
- Business License URL * (text with instructions)
- Business Plan (text, optional)
- Note: Users upload files to cloud storage and paste links

#### Territory & References Section:
- Territory Preferences * (text, comma-separated countries)
- Current Aircraft Clients (text, optional)
- Business References * (textarea, minimum 2 references)
- Additional Notes (textarea, optional)

#### Form Features:
- Real-time validation (HTML5 + required attributes)
- Loading state during submission
- Success message with green checkmark icon
- Error message display with red background
- Cancel and Submit buttons
- Dark mode support throughout

### 8. **Success Confirmation**
- Green checkmark icon (SVG)
- "Application Submitted Successfully!" message
- 5 business day response time notification
- Scroll to top animation after 500ms
- Close button to hide form

### 9. **Call-to-Action Section** (conditionally shown)
- Only displays when application form is hidden
- Blue background with white text
- Large "Apply Now" button
- Reinforces partnership value proposition

---

## Data Structure

### ExistingDistributor Interface (11 fields)
```typescript
interface ExistingDistributor {
  id: string;                  // Unique identifier
  companyName: string;         // Distributor company name
  country: string;             // Country
  city: string;                // City
  region: string;              // Region (Middle East, Europe, etc.)
  latitude: number;            // Geographic latitude
  longitude: number;           // Geographic longitude
  yearsPartner: number;        // Years as partner
  specializations: string;     // Product specializations
  website: string;             // Company website
  logo: string;                // Logo URL
  active: boolean;             // Active status
}
```

### DistributorApplication Interface (22+ fields)
```typescript
interface DistributorApplication {
  id: string;                       // Auto-generated: APP-{timestamp}
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  website: string;
  yearEstablished: string;
  numberOfEmployees: string;
  annualRevenue: string;
  businessLicense: string;          // URL or file reference
  taxId: string;
  industryExperience: string;
  currentAircraftClients: string;
  territoryPreferences: string;
  warehouseFacilities: string;      // "Yes" or "No"
  certifications: string;
  references: string;               // Textarea with 2+ references
  businessPlan: string;             // URL or file reference
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate: string;            // Auto-generated: ISO date
  notes: string;
}
```

---

## Google Sheets Integration

### Read Operations (Existing Distributors)

**Method**: `googleSheetsService.getExistingDistributors()`  
**Sheet Range**: `ExistingDistributors!A2:L100`  
**Columns**: 12 (A-L)

| Column | Field | Type | Notes |
|--------|-------|------|-------|
| A | id | string | Unique identifier |
| B | companyName | string | Required |
| C | country | string | Required |
| D | city | string | Required |
| E | region | string | For grouping |
| F | latitude | number | Float for mapping |
| G | longitude | number | Float for mapping |
| H | yearsPartner | number | Integer |
| I | specializations | string | Comma-separated |
| J | website | string | URL |
| K | logo | string | Image URL |
| L | active | boolean | "true"/"false" |

**Caching**: 5 minutes  
**Fallback**: 6 default distributors (Dubai, Frankfurt, Singapore, Johannesburg, Miami, Riyadh)

### Write Operations (New Applications)

**Method**: `googleSheetsService.submitDistributorApplication(data)`  
**Endpoint**: Google Apps Script Web App (POST)  
**Sheet Range**: `DistributorApplications!A2:Z100`  
**Columns**: 26 (A-Z)

**Auto-Generated Fields**:
- `id`: `APP-${Date.now()}` (e.g., "APP-1703872451234")
- `status`: Always "Pending" for new submissions
- `submittedDate`: ISO 8601 format (e.g., "2024-01-15T10:30:00.000Z")

**Response Format**:
```typescript
{
  success: boolean;
  message: string;
}
```

**Error Handling**:
- Network errors: "Failed to submit application. Please check your connection."
- Timeout (15s): "Request timed out. Please try again."
- Server errors: Custom error message from backend
- Unknown errors: "An unexpected error occurred. Please try again."

---

## Component Architecture

### Main Component: `Distributors`
- Manages state: `distributors`, `loading`, `showApplicationForm`
- Fetches distributors on mount with `useEffect`
- Controls form visibility with `scrollToForm()` function
- Smooth scroll to form section on button click

### Sub-Components (9 total)

1. **BenefitCard** (Props: icon, title, description)
   - Displays partnership benefits with emoji icons
   - Hover shadow effect

2. **RequirementItem** (Props: title, description, required)
   - Conditional checkmark color (blue for required, gray for optional)
   - Red asterisk for required fields

3. **ProcessStep** (Props: number, title, description)
   - Numbered circle with step details
   - Connecting line between steps (hidden on last step)

4. **TestimonialCard** (Props: quote, author, company, location)
   - Quotation mark styling
   - Border-top separator for attribution

5. **DistributorMap** (Props: distributors)
   - Groups distributors by region
   - Displays location pin SVG icons
   - Shows summary statistics (total distributors, regions)

6. **ApplicationForm** (Props: onClose)
   - **State**: formData, submitting, submitted, error
   - **Sections**: 4 (Company Info, Business Details, Documentation, Territory & References)
   - **Validation**: HTML5 + required attributes
   - **Submit Handler**: Calls Google Sheets service, handles success/error
   - **Success View**: Green confirmation card with close button
   - **Form View**: 22-field form with Cancel/Submit buttons

---

## State Management

### Component State
```typescript
const [distributors, setDistributors] = useState<ExistingDistributor[]>([]);
const [loading, setLoading] = useState(true);
const [showApplicationForm, setShowApplicationForm] = useState(false);
```

### Form State
```typescript
const [submitting, setSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState('');
const [formData, setFormData] = useState<Omit<DistributorApplication, 'id' | 'status' | 'submittedDate'>>({
  // 22 fields initialized with empty strings
});
```

---

## User Flow

1. **Page Load**
   - Fetch existing distributors from Google Sheets
   - Display loading state ("Loading map...")
   - Show 6 sections: Hero, Benefits, Requirements, Process, Testimonials, Map
   - Display CTA section (form hidden by default)

2. **Click "Apply Now" Button**
   - Set `showApplicationForm` to true
   - Smooth scroll to #application-form section
   - Hide CTA section
   - Show application form

3. **Fill Out Form**
   - User enters 22 fields (14 required, 8 optional)
   - HTML5 validation prevents submission if required fields empty
   - Upload business documents to cloud storage, paste URLs

4. **Submit Application**
   - Set `submitting` to true (button shows "Submitting...")
   - Call `googleSheetsService.submitDistributorApplication(formData)`
   - Service auto-generates: id, status, submittedDate
   - POST to Google Apps Script Web App endpoint
   - Append row to DistributorApplications sheet

5. **Handle Response**
   - **Success**: 
     - Set `submitted` to true
     - Show green success card with checkmark
     - Scroll to top after 500ms
     - Display "We'll contact you in 5 business days" message
   - **Error**:
     - Display error message in red box
     - Keep form open for corrections
     - Set `submitting` to false

6. **Close Form**
   - Click "Close" button (success view) or "Cancel" (form view)
   - Set `showApplicationForm` to false
   - Show CTA section again

---

## Styling & Design

### Color Palette
- **Primary**: Blue-600 (#2563EB), Blue-800 (#1E40AF)
- **Success**: Green-600 (#16A34A), Green-50 (#F0FDF4)
- **Error**: Red-600 (#DC2626), Red-50 (#FEF2F2)
- **Neutral**: Gray-50 to Gray-900
- **Text**: Gray-900 (light mode), White (dark mode)

### Responsive Grid
- Benefits: 1 column (mobile) → 2 (tablet) → 3 (desktop)
- Process Steps: Stacked (mobile) → 4 columns (desktop)
- Testimonials: 1 column (mobile) → 3 columns (desktop)
- Map Regions: 1 column (mobile) → 2 (tablet) → 3 (desktop)
- Form Fields: 1 column (mobile) → 2 columns (desktop)

### Typography
- **H1**: 4xl (mobile), 5xl (desktop) - Hero title
- **H2**: 3xl - Section headings
- **H3**: xl - Subsection headings
- **Body**: base - Descriptions
- **Small**: sm, xs - Helper text, metadata

### Spacing
- **Page Sections**: py-16 (64px top/bottom padding)
- **Container**: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- **Grid Gaps**: gap-4 (16px), gap-6 (24px), gap-8 (32px)

---

## Performance Optimizations

1. **Caching**: 5-minute cache for distributor data (reduces API calls)
2. **Lazy Form Loading**: Application form only renders when `showApplicationForm` is true
3. **Default Data**: Falls back to 6 default distributors if fetch fails (no empty state)
4. **Minimal Re-renders**: State updates isolated to specific components
5. **Conditional Rendering**: CTA section hidden when form shown (DOM optimization)

---

## Accessibility

- Semantic HTML: `<section>`, `<h1>-<h3>`, `<form>`, `<button>`
- Form labels: Explicit labels for all inputs
- Required field indicators: Red asterisks (*) and HTML5 `required` attribute
- ARIA-friendly: SVG icons with proper stroke widths and viewBox
- Keyboard navigation: All interactive elements keyboard-accessible
- Focus states: Default browser focus rings on inputs and buttons
- Color contrast: Meets WCAG AA standards (dark text on light backgrounds)

---

## SEO Optimization

- **Page Title**: "Become a Distributor - Skytech Aviation"
- **Meta Description**: Auto-generated from first paragraph
- **Headings**: Proper H1-H3 hierarchy
- **Content Structure**: Semantic HTML for better crawling
- **Benefits of Partnership**: Clear, keyword-rich content

---

## Testing Checklist

### Functional Tests
- [ ] Distributors load from Google Sheets
- [ ] Map displays correct number of regions
- [ ] "Apply Now" button scrolls to form
- [ ] Form shows when button clicked
- [ ] CTA section hides when form visible
- [ ] All 14 required fields validated
- [ ] Optional fields can be left empty
- [ ] Form submission calls Google Sheets service
- [ ] Success message displays on successful submission
- [ ] Error message displays on failed submission
- [ ] "Close" button hides form
- [ ] "Cancel" button hides form
- [ ] Scroll-to-top animation works

### Data Integrity Tests
- [ ] Auto-generated id has correct format (APP-{timestamp})
- [ ] Status always "Pending" for new applications
- [ ] SubmittedDate in ISO 8601 format
- [ ] All 22 form fields included in submission
- [ ] File URLs properly captured (businessLicense, businessPlan)

### UI/UX Tests
- [ ] Responsive design works on mobile (320px)
- [ ] Responsive design works on tablet (768px)
- [ ] Responsive design works on desktop (1280px+)
- [ ] Dark mode displays correctly
- [ ] Hover effects work on benefit cards
- [ ] Loading state shows while fetching distributors
- [ ] Submit button disabled while submitting
- [ ] Form inputs support autofill
- [ ] Smooth scrolling animations work

### Performance Tests
- [ ] Page loads in under 2 seconds
- [ ] Distributor data cached for 5 minutes
- [ ] Form renders without lag
- [ ] No console errors
- [ ] Build size acceptable (check bundle analyzer)

### Accessibility Tests
- [ ] All form inputs have labels
- [ ] Required fields clearly marked
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (test with NVDA/JAWS)

---

## Environment Setup

### Required Environment Variable

```bash
VITE_GOOGLE_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**How to Get This URL:**
1. Open Google Apps Script editor
2. Create Web App (see Google Apps Script Setup below)
3. Deploy as Web App
4. Copy the deployment URL
5. Add to `.env` file

**Fallback Behavior**:
If `VITE_GOOGLE_WEBAPP_URL` is not set:
- Form submissions will fail
- Error message: "Web App URL not configured"
- Users should contact admin

---

## Google Apps Script Setup

### Step 1: Create Apps Script Project

1. Open your Google Sheet (DistributorApplications)
2. Go to **Extensions** → **Apps Script**
3. Delete default code
4. Paste the following script:

```javascript
function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the DistributorApplications sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('DistributorApplications');
    
    // Prepare row data (26 columns: A-Z)
    const row = [
      data.id,                        // A - Auto-generated
      data.companyName,               // B
      data.contactPerson,             // C
      data.email,                     // D
      data.phone,                     // E
      data.country,                   // F
      data.city,                      // G
      data.address,                   // H
      data.website,                   // I
      data.yearEstablished,           // J
      data.numberOfEmployees,         // K
      data.annualRevenue,             // L
      data.businessLicense,           // M
      data.taxId,                     // N
      data.industryExperience,        // O
      data.currentAircraftClients,    // P
      data.territoryPreferences,      // Q
      data.warehouseFacilities,       // R
      data.certifications,            // S
      data.references,                // T
      data.businessPlan,              // U
      data.status,                    // V - "Pending"
      data.submittedDate,             // W - ISO date
      data.notes                      // X
    ];
    
    // Append row to sheet
    sheet.appendRow(row);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Application submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Email notification function
function sendEmailNotification(data) {
  const recipient = 'admin@skytechaviation.com'; // Change to your email
  const subject = 'New Distributor Application: ' + data.companyName;
  const body = `
    New distributor application received:
    
    Company: ${data.companyName}
    Contact: ${data.contactPerson}
    Email: ${data.email}
    Country: ${data.country}
    
    View full application in Google Sheets.
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
```

### Step 2: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Select type: **Web app**
3. Configuration:
   - **Description**: "Distributor Application Endpoint"
   - **Execute as**: Me (your account)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Authorize** the script (grant permissions)
6. Copy the **Web app URL**
7. Add URL to `.env` as `VITE_GOOGLE_WEBAPP_URL`

### Step 3: Test the Endpoint

Use curl or Postman to test:

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
    "currentAircraftClients": "Client A, Client B",
    "territoryPreferences": "USA, Canada",
    "warehouseFacilities": "Yes",
    "certifications": "ISO 9001",
    "references": "Ref 1, Ref 2",
    "businessPlan": "https://example.com/plan.pdf",
    "status": "Pending",
    "submittedDate": "2024-01-15T10:00:00.000Z",
    "notes": "Looking forward to partnership"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

---

## Default Distributors

If Google Sheets is unavailable, the page displays 6 default distributors:

| Company | City | Country | Region | Years | Specializations |
|---------|------|---------|--------|-------|-----------------|
| Gulf Aviation Parts LLC | Dubai | UAE | Middle East | 8 | Engines, Avionics, Landing Gear |
| Euro Aero Supply GmbH | Frankfurt | Germany | Europe | 5 | Flight Control, Fuel Systems |
| Asia Pacific Aviation | Singapore | Singapore | Asia Pacific | 6 | Avionics, Interior |
| African Aviation Parts | Johannesburg | South Africa | Africa | 4 | Engines, Landing Gear |
| Americas Aviation Supply | Miami | USA | Americas | 7 | All Categories |
| Middle East Aero Trading | Riyadh | Saudi Arabia | Middle East | 3 | Engines, Fuel Systems |

**Coordinates** (for future map integration):
- Dubai: 25.2048, 55.2708
- Frankfurt: 50.1109, 8.6821
- Singapore: 1.3521, 103.8198
- Johannesburg: -26.2041, 28.0473
- Miami: 25.7617, -80.1918
- Riyadh: 24.7136, 46.6753

---

## Future Enhancements

### Phase 1: Interactive Map
- Install `react-leaflet` and `leaflet`
- Replace text-based map with interactive world map
- Show distributor markers at lat/long coordinates
- Clickable popups with company details
- Zoom/pan functionality

### Phase 2: File Upload
- Integrate cloud storage (AWS S3, Google Cloud Storage, Cloudinary)
- Replace text inputs with file upload buttons
- Auto-upload files and populate URL fields
- Preview uploaded documents

### Phase 3: Application Tracking
- Create user login system
- Allow applicants to check application status
- Email notifications on status changes
- Re-submission for rejected applications

### Phase 4: Admin Dashboard
- Build admin panel to review applications
- Approve/reject applications with notes
- Send approval emails automatically
- Update application status in Google Sheets

### Phase 5: Territory Management
- Detect territory conflicts (multiple applications for same region)
- Auto-flag overlapping territories
- Suggest alternative territories

### Phase 6: Analytics
- Track application conversion rate
- Monitor popular territories
- Identify drop-off points in form
- A/B test different form layouts

---

## Troubleshooting

### Issue: Distributors not loading
**Symptom**: "Loading map..." persists indefinitely  
**Cause**: Google Sheets API error or network issue  
**Solution**: 
1. Check browser console for error messages
2. Verify `VITE_GOOGLE_SHEET_ID` in `.env`
3. Check Google Sheets API quota
4. Falls back to 6 default distributors automatically

### Issue: Form submission fails
**Symptom**: Error message displayed after clicking Submit  
**Cause**: Web App URL not configured or incorrect  
**Solution**:
1. Check `VITE_GOOGLE_WEBAPP_URL` in `.env`
2. Verify Web App deployment is active
3. Test endpoint with curl (see Testing section)
4. Check Apps Script execution logs

### Issue: Dark mode not working
**Symptom**: Page stays light even in dark mode  
**Solution**: 
1. Ensure TailwindCSS dark mode enabled in `tailwind.config.js`
2. Check if `<html>` has `class="dark"` when dark mode active
3. Verify all components use `dark:` prefixed classes

### Issue: Form fields not validating
**Symptom**: Can submit form with empty required fields  
**Solution**:
1. Verify all required inputs have `required` attribute
2. Check browser console for JavaScript errors
3. Ensure form has `<form onSubmit={handleSubmit}>` wrapper

### Issue: TypeScript errors
**Symptom**: Red squiggly lines in VS Code  
**Solution**:
1. Run `npm install` to ensure all types installed
2. Check `DistributorApplication` and `ExistingDistributor` interfaces match
3. Verify imports from `../config/googleSheets`

---

## Related Files

- **Config**: `src/config/googleSheets.ts` (interfaces and default data)
- **Service**: `src/services/googleSheetsService.ts` (API methods)
- **SEO**: `src/components/SEOHead.tsx` (meta tags)
- **i18n**: `public/locales/*/translation.json` (translations)
- **Environment**: `.env` (API keys and URLs)

---

## Changelog

### Version 1.0 (Current)
- ✅ Full page implementation (7 sections)
- ✅ 22-field application form with validation
- ✅ Google Sheets bidirectional integration (READ + WRITE)
- ✅ Text-based distributor map (6 default locations)
- ✅ Success/error handling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ SEO optimization

### Version 1.1 (Planned)
- 🔜 Interactive Leaflet map
- 🔜 File upload to cloud storage
- 🔜 Email notifications
- 🔜 Application status tracking

---

## Support

For issues or questions about the Distributors page:
1. Check this documentation
2. Review Google Sheets service logs
3. Test with default data (no API calls)
4. Contact development team

**Last Updated**: January 2024  
**Maintained By**: Skytech Aviation Development Team
