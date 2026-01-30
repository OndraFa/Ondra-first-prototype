# Travel Insurance Broker Prototype - Context & Requirements

## Project Overview
We have a shared basic and functional prototype. The prototype is just a simple HTML page. 
What I already have is a Git repository (both locally and on GitHub), connection and publication of the page via Netlify, and the overall plan.
I want to expand the prototype into an application that will emulate a small client zone. I want the application to be written in JavaScript, use my existing infrastructure with Netlify, and have the following parameters.

**Deployment URL**: https://vcelar.netlify.app/  
**Design Reference**: https://lnd-poj.netlify.app/  
**Approach**: Mobile-first design (majority of users will access from mobile devices)

## Goal
Create a prototype of a travel insurance broker application (sjednávač cestovního pojištění)

---

## Feature Requirements

### 1. Login & Authentication
- **Type**: Demo account with hardcoded credentials
- **Features**:
  - Username/password or email/password login
  - "Remember me" functionality
  - No password reset (would require sign-up)
- **Purpose**: Hide application from public access

### 2. Multi-Step Form for Travel Insurance
**Form Structure**: 6 steps (reordered for optimal UX)

**⚠️ IMPORTANT**: Collect email and phone ASAP (priority fields) to capture contact info early.

**Required Information Categories**:

#### Step 1: Contact Information (Priority - Collect ASAP)
- **Email** (REQUIRED) - for contract and documents
- **Phone** (REQUIRED) - international format, for assistance and claims
- **Purpose**: Capture contact info immediately before user might abandon form

#### Step 2: Personal Identification
- First name and last name
- Date of birth
- Personal ID number (rodné číslo) - Czech format OR date of birth (toggle switch)
  - Option A: Czech personal ID number (rodné číslo)
  - Option B: Date of birth (if no Czech ID)
- Nationality (sometimes - especially outside EU)
- Permanent address

#### Step 3: Trip Details (Critical for premium calculation)
- Country/region of stay
  - Options: Czech Republic / Europe / Rest of World
- Departure date
- Return date
- Trip duration (calculated automatically)
- One-time vs. repeated trip
- Number of insured persons
  - Adults
  - Children (with age)

#### Step 4: Trip Type & Purpose
- Trip type:
  - Recreational/tourist
  - Business trip
  - Study/au-pair
  - Sports stay
- Sports activities:
  - Yes / No
  - If yes:
    - Recreational
    - Risky
    - Extreme
    (e.g., skiing, diving, mountaineering, paragliding, etc.)

#### Step 5: Insurance Coverage (Customer choices)
- Medical expenses (limit) - **Options**: 50,000 EUR / 100,000 EUR / 200,000 EUR
- Accident insurance (death, permanent consequences)
- Baggage insurance
- Liability insurance
- Trip cancellation
- Assistance services
- Additional coverage (car assistance, pets, COVID, etc.)

**Premium Calculator**:
- Real-time premium calculation based on:
  - Number of persons (adults/children)
  - Destination category with currency:
    - **CZ** (Czech Republic) - prices in **CZK**
    - **EU** (Europe) - prices in **EUR**
    - **Rest of World** (World incl. USA, Canada, Australia) - prices in **USD**
  - Selected coverage options
  - Trip duration
- Display calculated premium with appropriate currency symbol

#### Step 6: Health & Risk Information (Sensitive area)
- Chronic illness - Yes / No
- Treatment in last X months - Yes / No
- Pregnancy - Yes / No (and week)
⚠️ **GDPR Compliance**:
  - Only necessary scope
  - Clear explanation of purpose
  - Consent for processing

#### Step 7: Payment, Legal Consents & ID Upload
- Payment method:
  - Card
  - Bank transfer
  - Apple / Google Pay
- Billing details (if different)
- **ID Document Upload** (placed at end to avoid early abandonment):
  - Camera capture or gallery selection
  - JPG format only
  - Max 2MB file size
  - Preview before submission
- **Mandatory Legal Consents** (regulatory critical):
  - ✅ Consent to personal data processing (GDPR)
  - ✅ Familiarization with insurance terms
  - ✅ Information document on insurance product (IPID)
  - ✅ Declaration of truthfulness of information
  - ✅ Consent to remote insurance agreement
  (ideally checkboxes + timestamp + audit log)

**Validations Required**:
- **Email** (REQUIRED): Standard email format validation
- **Phone** (REQUIRED): International format validation - exact format: `+420 123 456 789` (country code + spaces + digits)
- **Personal ID** (Czech format): Format validation `123456/7890` (10 digits with slash after 6th digit)
- **Date of Birth**: Alternative if no Czech ID provided
- Required fields validation (email and phone are mandatory)
- Date validation (departure before return, future dates, etc.)

### 3. Camera & File Upload
- **Purpose**: Upload ID document (doklad totožnosti)
- **Placement**: At the end of form (Step 7) to avoid early abandonment
- **Features**:
  - Camera capture
  - Gallery/file selection
  - Supported formats: JPG only
  - File size limit: 2MB
  - Preview before submission

### 4. Contract Display (Lightweight Client Zone)
- **Type**: Simplified client zone (no sophisticated system)
- **Content**:
  - Confirmation of personal data (from form)
  - Lorem ipsum text for insurance terms and conditions
  - Structured document format (not plain text)
- **Features**:
  - Dynamic contract generation based on filled form
  - PDF download option
  - Print option
  - Contract viewing in structured, readable format

### 5. Additional Features
- ✅ Overview of insurance policies
- ✅ Edit/cancel insurance option
- ✅ Notifications or confirmation email
- ✅ Transaction history

### 6. Technical Details
- **Data Storage**: localStorage (no backend/API)
- **Offline Mode**: No
- **Languages**: English only

### 7. Design & UX
- **Design Reference**: https://lnd-poj.netlify.app/
  - **Use from reference**: Colors and typography
  - Extract color palette and font styles from reference site
- **Dark Mode**: No
- **Color Scheme**: Based on reference site (extract specific colors)
- **Typography**: Based on reference site (extract font families, sizes, weights)
- **Approach**: Mobile-first responsive design

---

## MVP Minimum Requirements
For a lean digital broker, minimum is:
- **Person**: name, date of birth, contact
- **Trip**: where, when, how long
- **Risk**: sports/work/health (yes/no)
- **Product**: selected coverage
- **Consents + Payment**

---

## Implementation Plan

### Phase 1: Foundation
1. Project structure setup
2. Login system with demo credentials
3. Basic routing/navigation
4. Mobile-first CSS framework

### Phase 2: Core Forms
1. Multi-step form structure
2. Form validations
3. Data collection and storage (localStorage)
4. Progress indicators

### Phase 3: Advanced Features
1. Camera/file upload with preview
2. Dynamic contract generation
3. PDF generation and download
4. Print functionality

### Phase 4: Client Zone
1. Dashboard with policies overview
2. Policy details view
3. Edit/cancel functionality
4. Transaction history

### Phase 5: Polish
1. Notifications system
2. Design refinement based on reference
3. Mobile optimization
4. Testing and bug fixes
