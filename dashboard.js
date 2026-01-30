// Dashboard functionality for Travel Insurance Broker

// Initialize dashboard
function initDashboard() {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user info
    const user = getCurrentUser();
    if (user) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        const userEmail = document.getElementById('userEmail');
        
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome back, ${user.username || user.email}!`;
        }
        
        if (userEmail) {
            userEmail.textContent = user.email;
        }
    }
    
    // Load and display policies
    loadPolicies();
}

// Load policies from storage
function loadPolicies() {
    const policies = getPolicies();
    const container = document.getElementById('policiesContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    if (policies.length === 0) {
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        return;
    }
    
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Sort policies by creation date (newest first)
    const sortedPolicies = [...policies].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    // Render each policy
    sortedPolicies.forEach(policy => {
        const policyCard = createPolicyCard(policy);
        container.appendChild(policyCard);
    });
}

// Create policy card element
function createPolicyCard(policy) {
    const card = document.createElement('div');
    card.className = 'policy-card';
    
    const statusClass = `status-${policy.status}`;
    const statusText = policy.status.charAt(0).toUpperCase() + policy.status.slice(1);
    
    // Get policy details
    const insuredName = policy.personalInfo 
        ? `${policy.personalInfo.firstName || ''} ${policy.personalInfo.lastName || ''}`.trim() 
        : 'N/A';
    
    const destination = policy.tripInfo?.destination || 'N/A';
    const departureDate = policy.tripInfo?.departureDate 
        ? formatDate(policy.tripInfo.departureDate) 
        : 'N/A';
    
    card.innerHTML = `
        <div class="policy-card-header">
            <div class="policy-id">${policy.id}</div>
            <span class="policy-status ${statusClass}">${statusText}</span>
        </div>
        <div class="policy-info">
            <div class="policy-info-item">
                <strong>Insured:</strong> ${insuredName}
            </div>
            <div class="policy-info-item">
                <strong>Destination:</strong> ${destination}
            </div>
            <div class="policy-info-item">
                <strong>Departure:</strong> ${departureDate}
            </div>
            <div class="policy-info-item">
                <strong>Created:</strong> ${formatDate(policy.createdAt)}
            </div>
        </div>
        <div class="policy-actions">
            <button onclick="viewPolicy('${policy.id}')" class="btn btn-primary btn-small">
                View
            </button>
            ${policy.status === 'active' ? `
                <button onclick="editPolicy('${policy.id}')" class="btn btn-secondary btn-small">
                    Edit
                </button>
                <button onclick="cancelPolicyConfirm('${policy.id}')" class="btn btn-secondary btn-small">
                    Cancel
                </button>
            ` : ''}
        </div>
    `;
    
    return card;
}

// View policy details
function viewPolicy(policyId) {
    window.location.href = `contract.html?id=${policyId}`;
}

// Edit policy
function editPolicy(policyId) {
    const policy = getPolicy(policyId);
    if (policy) {
        // Save policy data to form progress for editing
        saveFormProgress(1, policy);
        window.location.href = `form.html?edit=${policyId}`;
    }
}

// Cancel policy with confirmation
function cancelPolicyConfirm(policyId) {
    if (confirm('Are you sure you want to cancel this policy? This action cannot be undone.')) {
        if (cancelPolicy(policyId)) {
            // Reload policies
            loadPolicies();
            
            // Show success message
            showNotification('Policy cancelled successfully', 'success');
        } else {
            showNotification('Error cancelling policy', 'error');
        }
    }
}

// Show notification (simple alert for now)
function showNotification(message, type = 'info') {
    // Simple implementation - can be enhanced with toast notifications
    alert(message);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}
