# Implementation Plan - Travel Insurance Broker

## Architecture Overview

### File Structure
```
/
├── index.html              # Main entry point
├── login.html              # Login page
├── dashboard.html          # Client zone dashboard
├── form.html               # Multi-step form
├── contract.html           # Contract view
├── style.css               # Main stylesheet
├── script.js               # Main JavaScript
├── auth.js                 # Authentication logic
├── form.js                 # Form handling
├── storage.js              # localStorage management
├── contract.js             # Contract generation
└── utils.js                # Utility functions
```

### Data Structure (localStorage)

```javascript
// User session
localStorage.setItem('user', JSON.stringify({
  username: 'demo',
  email: 'demo@example.com',
  loggedIn: true,
  rememberMe: true
}));

// Insurance policies
localStorage.setItem('policies', JSON.stringify([
  {
    id: 'POL-001',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'active',
    personalInfo: { ... },
    tripInfo: { ... },
    coverage: { ... },
    contract: { ... }
  }
]));

// Form progress
localStorage.setItem('formProgress', JSON.stringify({
  currentStep: 2,
  data: { ... }
}));
```

## Step-by-Step Implementation

### Step 1: Login System
**Files**: `login.html`, `auth.js`

**Features**:
- Demo credentials: `demo@example.com` / `demo123`
- Remember me checkbox
- Session management
- Redirect to dashboard after login

**Validation**:
- Check credentials
- Store session in localStorage
- Handle remember me

### Step 2: Multi-Step Form
**Files**: `form.html`, `form.js`

**Steps**:
1. Personal Information
2. Trip Details
3. Trip Type & Activities
4. Coverage Selection
5. Health Information
6. Payment & Consents

**Features**:
- Progress indicator
- Step navigation (next/previous)
- Form validation per step
- Data persistence between steps
- Save draft functionality

**Validations**:
- Email: regex pattern
- Phone: format validation (international)
- Dates: departure < return
- Required fields: visual indicators
- File upload: size (2MB), format (JPG)

### Step 3: File Upload
**Files**: `form.js` (camera functionality)

**Implementation**:
- `<input type="file" accept="image/jpeg" capture="environment">`
- File size check (2MB)
- Image preview before upload
- Convert to base64 for localStorage
- Error handling for unsupported formats

### Step 4: Contract Generation
**Files**: `contract.html`, `contract.js`

**Features**:
- Generate contract from form data
- Display in readable format
- PDF generation (using jsPDF or similar)
- Print stylesheet
- Download button

**Contract Content**:
- Policy number
- Insured person details
- Trip information
- Coverage details
- Terms and conditions reference
- Signatures/consents

### Step 5: Client Zone Dashboard
**Files**: `dashboard.html`, `dashboard.js`

**Features**:
- List of all policies
- Policy status (active, cancelled, expired)
- Quick actions (view, edit, cancel)
- Search/filter functionality
- Transaction history

**Views**:
- Policy list (cards/grid)
- Policy detail view
- Edit policy form
- Cancel confirmation

### Step 6: Notifications
**Files**: `notifications.js`

**Features**:
- Success messages (policy created)
- Error messages (validation failures)
- Confirmation dialogs (cancel policy)
- Toast notifications
- Email simulation (console log)

## Technical Stack

- **HTML5**: Semantic markup, mobile-friendly
- **CSS3**: Mobile-first, flexbox/grid, animations
- **Vanilla JavaScript**: No frameworks, ES6+
- **localStorage**: Client-side data persistence
- **jsPDF**: PDF generation (CDN)
- **File API**: Camera and file upload

## Design Guidelines

### Colors (from reference site)
- Primary: To be extracted from lnd-poj.netlify.app
- Secondary: Complementary colors
- Background: Light, clean
- Text: High contrast

### Typography
- Sans-serif font family
- Mobile-optimized sizes
- Clear hierarchy

### Components
- Cards for policies
- Stepper for form progress
- Buttons with clear CTAs
- Input fields with labels
- Error messages inline

### Mobile-First Breakpoints
- Mobile: < 768px (default)
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Testing Checklist

- [ ] Login with demo credentials
- [ ] Remember me functionality
- [ ] Form validation (all steps)
- [ ] File upload (camera and gallery)
- [ ] File size validation (2MB)
- [ ] Contract generation
- [ ] PDF download
- [ ] Print functionality
- [ ] Policy creation
- [ ] Policy editing
- [ ] Policy cancellation
- [ ] Transaction history
- [ ] Mobile responsiveness
- [ ] localStorage persistence
- [ ] Error handling

## Future Enhancements (Out of Scope)
- Backend integration
- Real payment processing
- Email notifications
- Multi-language support
- Advanced analytics
- Admin panel
