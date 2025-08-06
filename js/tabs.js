document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content containers
    const tabButtons = document.querySelectorAll('.role-tab');
    const tabContents = document.querySelectorAll('.steps-container');
    
    // Function to switch tabs
    function switchTab(button) {
        const targetRole = button.getAttribute('data-role');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show the corresponding content
        const targetContent = document.getElementById(`${targetRole}-steps`);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block';
        }
        
        // Store the active tab in localStorage
        localStorage.setItem('activeTab', targetRole);
    }
    
    // Add click event listeners to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            switchTab(this);
        });
    });
    
    // Initialize tabs - hide all content first
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Check for saved tab preference or activate first tab by default
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const tabToActivate = document.querySelector(`.role-tab[data-role="${savedTab}"]`);
        if (tabToActivate) {
            switchTab(tabToActivate);
            return;
        }
    }
    
    // Default to first tab if no saved preference or if saved tab doesn't exist
    if (tabButtons.length > 0) {
        switchTab(tabButtons[0]);
    }
});
