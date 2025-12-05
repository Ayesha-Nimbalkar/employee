const API_BASE_URL = 'http://localhost:8080/api/employees';

// Global variables
let allEmployees = [];
let filteredEmployees = [];
let currentPage = 1;
const itemsPerPage = 10;
let salaryChart = null;
let typeChart = null;

// Tab switching functionality
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'view') {
        loadAllEmployees();
    } else if (tabName === 'dashboard') {
        loadDashboardData();
    } else if (tabName === 'analytics') {
        loadAnalytics();
    }
}

// Load all employees with pagination
async function loadAllEmployees() {
    const employeesList = document.getElementById('employees-list');
    employeesList.innerHTML = '<div class="loading">Loading employees...</div>';
    
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        
        if (response.ok && Array.isArray(data)) {
            allEmployees = data;
            applyFilters();
        } else {
            showError(employeesList, 'Failed to load employees');
        }
    } catch (error) {
        showError(employeesList, 'Error connecting to server: ' + error.message);
    }
}

// Apply filters and search
function applyFilters() {
    const searchName = document.getElementById('search-name')?.value.toLowerCase() || '';
    const searchEmail = document.getElementById('search-email')?.value.toLowerCase() || '';
    const filterType = document.getElementById('filter-type')?.value || '';
    const sortBy = document.getElementById('sort-by')?.value || 'id';
    const sortOrder = document.getElementById('sort-order')?.value || 'asc';
    
    filteredEmployees = allEmployees.filter(emp => {
        const nameMatch = !searchName || emp.name.toLowerCase().includes(searchName);
        const emailMatch = !searchEmail || emp.email.toLowerCase().includes(searchEmail);
        const typeMatch = !filterType || emp.type === filterType;
        return nameMatch && emailMatch && typeMatch;
    });
    
    // Sort employees
    filteredEmployees.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Populate type filter dropdown
    populateTypeFilter();
    
    // Reset to first page and display
    currentPage = 1;
    displayEmployees();
}

// Populate type filter dropdown
function populateTypeFilter() {
    const typeFilter = document.getElementById('filter-type');
    if (!typeFilter) return;
    
    const types = [...new Set(allEmployees.map(emp => emp.type))];
    const currentValue = typeFilter.value;
    
    typeFilter.innerHTML = '<option value="">All Types</option>';
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
    
    typeFilter.value = currentValue;
}

// Display employees with pagination
function displayEmployees() {
    const employeesList = document.getElementById('employees-list');
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageEmployees = filteredEmployees.slice(startIndex, endIndex);
    
    if (pageEmployees.length === 0) {
        employeesList.innerHTML = '<div class="empty-state">No employees found</div>';
    } else {
        employeesList.innerHTML = pageEmployees.map(employee => createEmployeeCard(employee)).join('');
    }
    
    // Update pagination info
    document.getElementById('showing-from').textContent = filteredEmployees.length > 0 ? startIndex + 1 : 0;
    document.getElementById('showing-to').textContent = Math.min(endIndex, filteredEmployees.length);
    document.getElementById('total-count').textContent = filteredEmployees.length;
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Enable/disable pagination buttons
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayEmployees();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Clear filters
function clearFilters() {
    document.getElementById('search-name').value = '';
    document.getElementById('search-email').value = '';
    document.getElementById('filter-type').value = '';
    document.getElementById('sort-by').value = 'id';
    document.getElementById('sort-order').value = 'asc';
    applyFilters();
}

// Create employee card HTML
function createEmployeeCard(employee) {
    return `
        <div class="employee-card">
            <h3>${employee.name}</h3>
            <div class="employee-info">
                <span><strong>ID:</strong> ${employee.id}</span>
                <span><strong>Salary:</strong> $${employee.salary.toLocaleString()}</span>
                <span><strong>Phone:</strong> ${employee.phone}</span>
                <span><strong>Email:</strong> ${employee.email}</span>
                <span><strong>Type:</strong> ${employee.type}</span>
            </div>
        </div>
    `;
}

// Add employee with validation
async function addEmployee(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('add-message');
    
    const id = parseInt(document.getElementById('add-id').value);
    const name = document.getElementById('add-name').value.trim();
    const salary = parseInt(document.getElementById('add-salary').value);
    const phone = document.getElementById('add-phone').value.trim();
    const email = document.getElementById('add-email').value.trim();
    const type = document.getElementById('add-type').value;
    
    // Validation
    if (!validateEmployeeData({ id, name, salary, phone, email, type }, messageDiv)) {
        return;
    }
    
    const employee = { id, name, salary, phone, email, type };
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess(messageDiv, 'Employee added successfully!');
            document.getElementById('add-form').reset();
            loadDashboardData();
        } else {
            showError(messageDiv, data.error || 'Failed to add employee');
        }
    } catch (error) {
        showError(messageDiv, 'Error adding employee: ' + error.message);
    }
}

// Validate employee data
function validateEmployeeData(data, messageDiv) {
    if (!data.name || data.name.length < 2) {
        showError(messageDiv, 'Name must be at least 2 characters');
        return false;
    }
    if (data.salary < 0) {
        showError(messageDiv, 'Salary cannot be negative');
        return false;
    }
    if (!/^\d{10}$/.test(data.phone)) {
        showError(messageDiv, 'Phone must be 10 digits');
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showError(messageDiv, 'Invalid email format');
        return false;
    }
    return true;
}

// Update field type based on selection
function updateFieldType() {
    const field = document.getElementById('update-field').value;
    const inputField = document.getElementById('update-value');
    const selectField = document.getElementById('update-value-select');
    
    if (field === 'type') {
        inputField.style.display = 'none';
        selectField.style.display = 'block';
        selectField.required = true;
        inputField.required = false;
    } else {
        inputField.style.display = 'block';
        selectField.style.display = 'none';
        inputField.required = true;
        selectField.required = false;
        
        // Set input type based on field
        if (field === 'salary' || field === 'phone') {
            inputField.type = 'number';
        } else if (field === 'email') {
            inputField.type = 'email';
        } else {
            inputField.type = 'text';
        }
    }
}

// Update employee
async function updateEmployee(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('update-message');
    
    const id = document.getElementById('update-id').value;
    const field = document.getElementById('update-field').value;
    const inputField = document.getElementById('update-value');
    const selectField = document.getElementById('update-value-select');
    const value = field === 'type' ? selectField.value : inputField.value.trim();
    
    if (!id || !field || !value) {
        showError(messageDiv, 'All fields are required');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field, value })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess(messageDiv, 'Employee updated successfully!');
            document.getElementById('update-form').reset();
            loadDashboardData();
            if (document.getElementById('view-tab').classList.contains('active')) {
                loadAllEmployees();
            }
        } else {
            showError(messageDiv, data.error || 'Failed to update employee');
        }
    } catch (error) {
        showError(messageDiv, 'Error updating employee: ' + error.message);
    }
}

// Bulk delete
async function bulkDelete(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('bulk-delete-message');
    const idsInput = document.getElementById('bulk-delete-ids').value.trim();
    
    if (!idsInput) {
        showError(messageDiv, 'Please enter employee IDs');
        return;
    }
    
    const ids = idsInput.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    
    if (ids.length === 0) {
        showError(messageDiv, 'Invalid IDs format');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete ${ids.length} employee(s)?`)) {
        return;
    }
    
    let successCount = 0;
    let failCount = 0;
    
    for (const id of ids) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                successCount++;
            } else {
                failCount++;
            }
        } catch (error) {
            failCount++;
        }
    }
    
    if (failCount === 0) {
        showSuccess(messageDiv, `Successfully deleted ${successCount} employee(s)!`);
    } else {
        showError(messageDiv, `Deleted ${successCount} employee(s), ${failCount} failed`);
    }
    
    document.getElementById('bulk-delete-form').reset();
    loadDashboardData();
    if (document.getElementById('view-tab').classList.contains('active')) {
        loadAllEmployees();
    }
}

// Export to CSV
function exportToCSV() {
    if (filteredEmployees.length === 0) {
        alert('No employees to export');
        return;
    }
    
    const headers = ['ID', 'Name', 'Salary', 'Phone', 'Email', 'Type'];
    const rows = filteredEmployees.map(emp => [
        emp.id, emp.name, emp.salary, emp.phone, emp.email, emp.type
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Load analytics
async function loadAnalytics() {
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        
        if (response.ok && Array.isArray(data)) {
            createSalaryChart(data);
            createTypeChart(data);
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// Create salary distribution chart
function createSalaryChart(employees) {
    const ctx = document.getElementById('salaryChart');
    if (!ctx) return;
    
    const salaryRanges = {
        '0-50k': 0,
        '50k-100k': 0,
        '100k-150k': 0,
        '150k-200k': 0,
        '200k+': 0
    };
    
    employees.forEach(emp => {
        const salary = emp.salary;
        if (salary < 50000) salaryRanges['0-50k']++;
        else if (salary < 100000) salaryRanges['50k-100k']++;
        else if (salary < 150000) salaryRanges['100k-150k']++;
        else if (salary < 200000) salaryRanges['150k-200k']++;
        else salaryRanges['200k+']++;
    });
    
    if (salaryChart) {
        salaryChart.destroy();
    }
    
    salaryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(salaryRanges),
            datasets: [{
                label: 'Number of Employees',
                data: Object.values(salaryRanges),
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Create employee type chart
function createTypeChart(employees) {
    const ctx = document.getElementById('typeChart');
    if (!ctx) return;
    
    const typeCounts = {};
    employees.forEach(emp => {
        typeCounts[emp.type] = (typeCounts[emp.type] || 0) + 1;
    });
    
    if (typeChart) {
        typeChart.destroy();
    }
    
    typeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(typeCounts),
            datasets: [{
                data: Object.values(typeCounts),
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(72, 187, 120, 0.8)',
                    'rgba(237, 137, 54, 0.8)',
                    'rgba(245, 101, 101, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Generate report
function generateReport() {
    if (allEmployees.length === 0) {
        alert('No data available for report');
        return;
    }
    
    const totalSalary = allEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    const avgSalary = totalSalary / allEmployees.length;
    const typeCounts = {};
    allEmployees.forEach(emp => {
        typeCounts[emp.type] = (typeCounts[emp.type] || 0) + 1;
    });
    
    const report = `
EMPLOYEE MANAGEMENT SYSTEM - REPORT
Generated: ${new Date().toLocaleString()}

SUMMARY STATISTICS:
- Total Employees: ${allEmployees.length}
- Total Salary: $${totalSalary.toLocaleString()}
- Average Salary: $${Math.round(avgSalary).toLocaleString()}
- Employee Types: ${Object.keys(typeCounts).length}

EMPLOYEE DISTRIBUTION BY TYPE:
${Object.entries(typeCounts).map(([type, count]) => `- ${type}: ${count}`).join('\n')}

DETAILED EMPLOYEE LIST:
${allEmployees.map(emp => 
    `ID: ${emp.id} | Name: ${emp.name} | Salary: $${emp.salary.toLocaleString()} | Type: ${emp.type}`
).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Load dashboard data
async function loadDashboardData() {
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        
        if (response.ok && Array.isArray(data)) {
            const totalEmployees = data.length;
            const totalSalary = data.reduce((sum, emp) => sum + emp.salary, 0);
            const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;
            const uniqueTypes = new Set(data.map(emp => emp.type)).size;
            
            document.getElementById('total-employees').textContent = totalEmployees;
            document.getElementById('total-salary').textContent = '$' + totalSalary.toLocaleString();
            document.getElementById('avg-salary').textContent = '$' + Math.round(avgSalary).toLocaleString();
            document.getElementById('employee-types').textContent = uniqueTypes;
            
            const recentEmployees = data.slice(-5).reverse();
            const dashboardList = document.getElementById('dashboard-employees');
            
            if (recentEmployees.length === 0) {
                dashboardList.innerHTML = '<div class="empty-state">No employees found</div>';
            } else {
                dashboardList.innerHTML = recentEmployees.map(employee => createEmployeeCard(employee)).join('');
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Show success message
function showSuccess(element, message) {
    element.textContent = message;
    element.className = 'message success';
    setTimeout(() => {
        element.className = 'message';
    }, 5000);
}

// Show error message
function showError(element, message) {
    element.textContent = message;
    element.className = 'message error';
    setTimeout(() => {
        element.className = 'message';
    }, 5000);
}

// Quotes array
const quotes = [
    "Streamline your workforce management with powerful tools",
    "Efficiently manage employee data with advanced filtering and search",
    "Get real-time insights with interactive analytics and charts",
    "Export data seamlessly and generate comprehensive reports",
    "Bulk operations for faster employee management",
    "Beautiful dashboard with real-time statistics",
    "Advanced pagination and sorting for large datasets",
    "Professional-grade employee management solution",
    "Simplify HR operations with intuitive interface",
    "Make data-driven decisions with visual analytics"
];

let currentQuoteIndex = 0;
let quoteInterval;

// Rotate quotes
function rotateQuotes() {
    const quoteElement = document.getElementById('quote-text');
    if (!quoteElement) return;
    
    quoteElement.classList.add('fade-out');
    
    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.classList.remove('fade-out');
        quoteElement.style.animation = 'none';
        setTimeout(() => {
            quoteElement.style.animation = 'quoteFadeIn 1s ease-in-out';
        }, 10);
    }, 500);
}

// Start quote rotation
function startQuoteRotation() {
    quoteInterval = setInterval(rotateQuotes, 4000); // Change quote every 4 seconds
}

// Load employees on page load
window.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    startQuoteRotation();
});
