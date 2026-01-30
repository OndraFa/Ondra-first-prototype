// Multi-step form handler for Travel Insurance Broker

let currentStep = 1;
const totalSteps = 7;
let formData = {};

// Initialize form
function initForm() {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate').setAttribute('min', today);
    document.getElementById('returnDate').setAttribute('min', today);
    document.getElementById('birthDate').setAttribute('max', today);
    
    // Load saved progress if exists
    const savedProgress = getFormProgress();
    if (savedProgress) {
        currentStep = savedProgress.currentStep || 1;
        formData = savedProgress.data || {};
        populateForm(formData);
    }
    
    // Check if editing existing policy
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
        const policy = getPolicy(editId);
        if (policy) {
            formData = { ...policy };
            populateForm(formData);
        }
    }
    
    showStep(currentStep);
    setupEventListeners();
    updatePremium();
}

// Setup event listeners
function setupEventListeners() {
    // ID type toggle
    document.querySelectorAll('input[name="idType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const czechIdGroup = document.getElementById('czechIdGroup');
            const birthDateGroup = document.getElementById('birthDateGroup');
            if (this.value === 'czechId') {
                czechIdGroup.style.display = 'block';
                birthDateGroup.style.display = 'none';
                document.getElementById('personalId').required = true;
                document.getElementById('birthDate').required = false;
            } else {
                czechIdGroup.style.display = 'none';
                birthDateGroup.style.display = 'block';
                document.getElementById('personalId').required = false;
                document.getElementById('birthDate').required = true;
            }
        });
    });
    
    // Sports activities toggle
    document.querySelectorAll('input[name="sportsActivities"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const sportsTypeGroup = document.getElementById('sportsTypeGroup');
            sportsTypeGroup.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });
    
    // Pregnancy toggle
    document.querySelectorAll('input[name="pregnancy"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const pregnancyWeekGroup = document.getElementById('pregnancyWeekGroup');
            pregnancyWeekGroup.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });
    
    // File upload
    const fileInput = document.getElementById('idDocument');
    const uploadArea = document.getElementById('fileUploadArea');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function(e) {
        handleFileUpload(e.target.files[0]);
    });
    
    // Destination change - update currency
    document.getElementById('destination').addEventListener('change', function() {
        updateCurrencyDisplay();
        updatePremium();
    });
    
    // Premium calculation triggers
    ['destination', 'departureDate', 'returnDate', 'adults', 'children', 'medicalLimit'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updatePremium);
        }
    });
    
    // Form submission
    document.getElementById('insuranceForm').addEventListener('submit', handleSubmit);
}

// Show specific step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }
    
    // Update progress bar
    const progress = (step / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        if (index + 1 <= step) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'inline-block' : 'none';
    
    currentStep = step;
}

// Next step
function nextStep() {
    if (validateStep(currentStep)) {
        saveStepData(currentStep);
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    }
}

// Previous step
function previousStep() {
    if (currentStep > 1) {
        saveStepData(currentStep);
        showStep(currentStep - 1);
    }
}

// Validate step
function validateStep(step) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    switch(step) {
        case 1: // Contact
            isValid = validateContact();
            break;
        case 2: // Personal
            isValid = validatePersonal();
            break;
        case 3: // Trip
            isValid = validateTrip();
            break;
        case 7: // Payment
            isValid = validatePayment();
            break;
    }
    
    return isValid;
}

// Validate contact information
function validateContact() {
    let isValid = true;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation - format: +420 123 456 789
    const phoneRegex = /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/;
    if (!phone || !phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter phone in format: +420 123 456 789';
        isValid = false;
    }
    
    return isValid;
}

// Validate personal information
function validatePersonal() {
    let isValid = true;
    const idType = document.querySelector('input[name="idType"]:checked').value;
    
    if (idType === 'czechId') {
        const personalId = document.getElementById('personalId').value.trim();
        const idRegex = /^[0-9]{6}\/[0-9]{4}$/;
        if (!personalId || !idRegex.test(personalId)) {
            document.getElementById('personalIdError').textContent = 'Please enter valid Czech ID format: 123456/7890';
            isValid = false;
        }
    } else {
        const birthDate = document.getElementById('birthDate').value;
        if (!birthDate) {
            isValid = false;
        }
    }
    
    return isValid;
}

// Validate trip information
function validateTrip() {
    let isValid = true;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    
    if (departureDate && returnDate) {
        if (new Date(returnDate) <= new Date(departureDate)) {
            document.getElementById('returnDateError').textContent = 'Return date must be after departure date';
            isValid = false;
        }
    }
    
    return isValid;
}

// Validate payment step
function validatePayment() {
    let isValid = true;
    const fileInput = document.getElementById('idDocument');
    
    // Check file upload
    if (!fileInput.files || fileInput.files.length === 0) {
        document.getElementById('fileError').textContent = 'Please upload your ID document';
        isValid = false;
    } else {
        const file = fileInput.files[0];
        // Check file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            document.getElementById('fileError').textContent = 'File size must be less than 2MB';
            isValid = false;
        }
        // Check file type
        if (!file.type.match('image/jpeg')) {
            document.getElementById('fileError').textContent = 'Only JPG files are allowed';
            isValid = false;
        }
    }
    
    // Check all consents
    const requiredConsents = ['consentGDPR', 'consentTerms', 'consentIPID', 'consentTruthfulness', 'consentRemote'];
    requiredConsents.forEach(id => {
        if (!document.getElementById(id).checked) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Save step data
function saveStepData(step) {
    const stepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = stepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.name] = input.value;
        }
    });
    
    // Save progress
    saveFormProgress(currentStep, formData);
}

// Populate form with data
function populateForm(data) {
    Object.keys(data).forEach(key => {
        const element = document.querySelector(`[name="${key}"]`);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = data[key];
            } else if (element.type === 'radio') {
                if (element.value === data[key]) {
                    element.checked = true;
                }
            } else {
                element.value = data[key] || '';
            }
        }
    });
    
    // Trigger change events to update UI
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        radio.dispatchEvent(new Event('change'));
    });
}

// Handle file upload
function handleFileUpload(file) {
    if (!file) return;
    
    // Validate file
    if (file.size > 2 * 1024 * 1024) {
        document.getElementById('fileError').textContent = 'File size must be less than 2MB';
        return;
    }
    
    if (!file.type.match('image/jpeg')) {
        document.getElementById('fileError').textContent = 'Only JPG files are allowed';
        return;
    }
    
    // Clear error
    document.getElementById('fileError').textContent = '';
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('uploadPreview').style.display = 'block';
        
        // Store file data
        formData.idDocumentData = e.target.result; // Base64
    };
    reader.readAsDataURL(file);
}

// Remove uploaded file
function removeUpload() {
    document.getElementById('idDocument').value = '';
    document.getElementById('uploadPlaceholder').style.display = 'block';
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('previewImage').src = '';
    delete formData.idDocumentData;
}

// Update currency display
function updateCurrencyDisplay() {
    const destination = document.getElementById('destination').value;
    const currencyMap = {
        'CZ': 'CZK',
        'EU': 'EUR',
        'WORLD': 'USD'
    };
    const currency = currencyMap[destination] || '';
    document.getElementById('medicalLimitCurrency').textContent = currency ? `Amount in ${currency}` : '';
}

// Calculate premium
function updatePremium() {
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const adults = parseInt(document.getElementById('adults').value) || 1;
    const children = parseInt(document.getElementById('children').value) || 0;
    const medicalLimit = document.getElementById('medicalLimit').value;
    
    if (!destination || !departureDate || !returnDate || !medicalLimit) {
        document.getElementById('premiumAmount').textContent = '-';
        document.getElementById('premiumCurrency').textContent = '';
        return;
    }
    
    // Calculate days
    const days = Math.ceil((new Date(returnDate) - new Date(departureDate)) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
        document.getElementById('premiumAmount').textContent = '-';
        return;
    }
    
    // Base rates per person per day (demo values)
    const baseRates = {
        'CZ': { adult: 50, child: 30, currency: 'CZK' },
        'EU': { adult: 2, child: 1.5, currency: 'EUR' },
        'WORLD': { adult: 3, child: 2, currency: 'USD' }
    };
    
    const rates = baseRates[destination];
    if (!rates) return;
    
    // Calculate base premium
    let premium = (adults * rates.adult + children * rates.child) * days;
    
    // Apply medical limit multiplier
    const limitMultipliers = {
        '50000': 1.0,
        '100000': 1.3,
        '200000': 1.6
    };
    premium *= (limitMultipliers[medicalLimit] || 1.0);
    
    // Format premium
    const formattedPremium = premium.toFixed(2);
    document.getElementById('premiumAmount').textContent = formattedPremium;
    document.getElementById('premiumCurrency').textContent = rates.currency;
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Save all data
    saveStepData(currentStep);
    
    // Prepare policy data
    const policyData = {
        personalInfo: {
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            personalId: formData.personalId,
            birthDate: formData.birthDate,
            idType: formData.idType,
            nationality: formData.nationality,
            address: formData.address
        },
        tripInfo: {
            destination: formData.destination,
            departureDate: formData.departureDate,
            returnDate: formData.returnDate,
            tripType: formData.tripType,
            adults: parseInt(formData.adults) || 1,
            children: parseInt(formData.children) || 0
        },
        tripType: {
            purpose: formData.purpose,
            sportsActivities: formData.sportsActivities,
            sportsType: formData.sportsType
        },
        coverage: {
            medicalLimit: formData.medicalLimit,
            accidentInsurance: formData.accidentInsurance || false,
            baggageInsurance: formData.baggageInsurance || false,
            liabilityInsurance: formData.liabilityInsurance || false,
            tripCancellation: formData.tripCancellation || false,
            assistanceServices: formData.assistanceServices || false,
            carAssistance: formData.carAssistance || false,
            pets: formData.pets || false,
            covid: formData.covid || false
        },
        healthInfo: {
            chronicIllness: formData.chronicIllness,
            recentTreatment: formData.recentTreatment,
            pregnancy: formData.pregnancy,
            pregnancyWeek: formData.pregnancyWeek
        },
        payment: {
            paymentMethod: formData.paymentMethod,
            billingAddress: formData.billingAddress
        },
        idDocument: formData.idDocumentData,
        consents: {
            gdpr: formData.consentGDPR,
            terms: formData.consentTerms,
            ipid: formData.consentIPID,
            truthfulness: formData.consentTruthfulness,
            remote: formData.consentRemote,
            timestamp: new Date().toISOString()
        }
    };
    
    // Check if editing
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        // Update existing policy
        updatePolicy(editId, policyData);
        alert('Policy updated successfully!');
    } else {
        // Create new policy
        const newPolicy = addPolicy(policyData);
        alert('Policy created successfully!');
    }
    
    // Clear form progress
    clearFormProgress();
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}
