// Storage management for Travel Insurance Broker
// Uses localStorage for client-side data persistence

const STORAGE_KEYS = {
    USER: 'user',
    POLICIES: 'policies',
    FORM_PROGRESS: 'formProgress',
    TRANSACTIONS: 'transactions'
};

// Policy Management
function getPolicies() {
    try {
        const policies = localStorage.getItem(STORAGE_KEYS.POLICIES);
        return policies ? JSON.parse(policies) : [];
    } catch (e) {
        console.error('Error reading policies:', e);
        return [];
    }
}

function savePolicies(policies) {
    try {
        localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(policies));
        return true;
    } catch (e) {
        console.error('Error saving policies:', e);
        return false;
    }
}

function addPolicy(policyData) {
    const policies = getPolicies();
    
    // Generate unique policy ID
    const policyId = 'POL-' + Date.now().toString().slice(-8);
    
    const newPolicy = {
        id: policyId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        ...policyData
    };
    
    policies.push(newPolicy);
    savePolicies(policies);
    
    // Add transaction record
    addTransaction({
        type: 'policy_created',
        policyId: policyId,
        timestamp: new Date().toISOString(),
        description: `Policy ${policyId} created`
    });
    
    return newPolicy;
}

function updatePolicy(policyId, updates) {
    const policies = getPolicies();
    const index = policies.findIndex(p => p.id === policyId);
    
    if (index === -1) {
        return false;
    }
    
    policies[index] = {
        ...policies[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    
    savePolicies(policies);
    
    // Add transaction record
    addTransaction({
        type: 'policy_updated',
        policyId: policyId,
        timestamp: new Date().toISOString(),
        description: `Policy ${policyId} updated`
    });
    
    return true;
}

function cancelPolicy(policyId) {
    const policies = getPolicies();
    const index = policies.findIndex(p => p.id === policyId);
    
    if (index === -1) {
        return false;
    }
    
    policies[index].status = 'cancelled';
    policies[index].cancelledAt = new Date().toISOString();
    policies[index].updatedAt = new Date().toISOString();
    
    savePolicies(policies);
    
    // Add transaction record
    addTransaction({
        type: 'policy_cancelled',
        policyId: policyId,
        timestamp: new Date().toISOString(),
        description: `Policy ${policyId} cancelled`
    });
    
    return true;
}

function getPolicy(policyId) {
    const policies = getPolicies();
    return policies.find(p => p.id === policyId) || null;
}

// Form Progress Management
function saveFormProgress(step, data) {
    try {
        const progress = {
            currentStep: step,
            data: data,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.FORM_PROGRESS, JSON.stringify(progress));
        return true;
    } catch (e) {
        console.error('Error saving form progress:', e);
        return false;
    }
}

function getFormProgress() {
    try {
        const progress = localStorage.getItem(STORAGE_KEYS.FORM_PROGRESS);
        return progress ? JSON.parse(progress) : null;
    } catch (e) {
        console.error('Error reading form progress:', e);
        return null;
    }
}

function clearFormProgress() {
    localStorage.removeItem(STORAGE_KEYS.FORM_PROGRESS);
}

// Transaction History
function getTransactions() {
    try {
        const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        return transactions ? JSON.parse(transactions) : [];
    } catch (e) {
        console.error('Error reading transactions:', e);
        return [];
    }
}

function addTransaction(transaction) {
    const transactions = getTransactions();
    transactions.unshift(transaction); // Add to beginning
    
    // Keep only last 100 transactions
    if (transactions.length > 100) {
        transactions.splice(100);
    }
    
    try {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
        return true;
    } catch (e) {
        console.error('Error saving transaction:', e);
        return false;
    }
}

function getTransactionsByPolicy(policyId) {
    const transactions = getTransactions();
    return transactions.filter(t => t.policyId === policyId);
}

// Utility: Generate policy number
function generatePolicyNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `POL-${timestamp}-${random}`;
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Utility: Format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
