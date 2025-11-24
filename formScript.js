document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tableContents = document.querySelectorAll('.table-content');

    // tabButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const targetTab = button.dataset.tab;

    //         // Deactivate all buttons and content
    //         tabButtons.forEach(btn => btn.classList.remove('active'));
    //         tableContents.forEach(content => content.classList.remove('active'));

    //         // Activate the clicked button and its corresponding content
    //         button.classList.add('active');
    //         document.getElementById(targetTab).classList.add('active');
    //     });
    // });


    // 2. Mobile Navigation Toggle (Hamburger Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavMenu = document.getElementById('mobileNavMenu');

    menuToggle.addEventListener('click', () => {
        // Toggle the visibility class
        mobileNavMenu.classList.toggle('visible');
    });


    // 3. Close mobile menu when a link is clicked or screen is resized
    const navLinks = mobileNavMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.remove('visible');
        });
    });

    // Close mobile menu on desktop/tablet view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileNavMenu.classList.remove('visible');
        }
    });

});


document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- 1. Tab Switching Functionality ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Deactivate all buttons and contents
            tabs.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate the clicked button and target content
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // --- 2. Exclusive Sales Form Logic ---
    const esConfirmBtn = document.getElementById('esConfirmBtn');
    const esResetBtn = document.getElementById('esResetBtn');
    const esTableBody = document.querySelector('#exclusiveSalesData .table-body');
    const esFormInputs = {
        shopName: document.getElementById('esShopName'),
        item: document.getElementById('esItem'),
        qty: document.getElementById('esQty'),
        unit: document.getElementById('esUnit'),
        price: document.getElementById('esPrice'),
        remark: document.getElementById('esRemark')
    };
    
    let esRowCount = esTableBody.querySelectorAll('tr').length; // Start row count from existing rows

    esConfirmBtn.addEventListener('click', () => {
        const data = collectFormData(esFormInputs);
        if (!data) return;

        esRowCount++;
        
        // Add new row to table
        const newRow = esTableBody.insertRow();
        newRow.innerHTML = `
            <td>${esRowCount}</td>
            <td>${data.shopName}</td>
            <td>${data.item}</td>
            <td>${data.qty}</td>
            <td>${data.unit}</td>
            <td>${data.price}</td>
            <td>${data.remark}</td>
            <td>New Sales</td>
        `;
        
        // Clear inputs after confirming
        resetFormInputs(esFormInputs);
        
        // Scroll to new row (simulated for vertical scroll)
        esTableBody.parentElement.parentElement.scrollTop = esTableBody.parentElement.parentElement.scrollHeight;
    });

    esResetBtn.addEventListener('click', () => {
        resetFormInputs(esFormInputs);
    });
    
    // --- 3. Today Order Form Logic ---
    const toConfirmBtn = document.getElementById('toConfirmBtn');
    const toResetBtn = document.getElementById('toResetBtn');
    const toTableBody = document.querySelector('#todayOrderData .table-body');
    const toFormInputs = {
        shopName: document.getElementById('toShopName'),
        item: document.getElementById('toItem'),
        qty: document.getElementById('toQty'),
        unit: document.getElementById('toUnit'),
        date: document.getElementById('toDate'), // Date instead of Price
        remark: document.getElementById('toRemark')
    };
    
    let toRowCount = toTableBody.querySelectorAll('tr').length;

    toConfirmBtn.addEventListener('click', () => {
        const data = collectFormData(toFormInputs);
        if (!data) return;

        toRowCount++;
        
        // Add new row to table
        const newRow = toTableBody.insertRow();
        newRow.innerHTML = `
            <td>${toRowCount}</td>
            <td>${data.shopName}</td>
            <td>${data.item}</td>
            <td>${data.qty}</td>
            <td>${data.unit}</td>
            <td>${data.date}</td> 
            <td>${data.remark}</td>
            <td>New Order</td>
        `;
        
        // Clear inputs after confirming
        resetFormInputs(toFormInputs);
        
        // Scroll to new row (simulated for vertical scroll)
        toTableBody.parentElement.parentElement.scrollTop = toTableBody.parentElement.parentElement.scrollHeight;
    });

    toResetBtn.addEventListener('click', () => {
        resetFormInputs(toFormInputs);
    });

    // --- Shared Utility Functions ---
    
    function collectFormData(inputs) {
        let isValid = true;
        const data = {};
        
        // Basic Check for all fields (excluding Price/Date for simplicity in this example)
        for (const key in inputs) {
            const value = inputs[key].value.trim();
            data[key] = value;
            
            // Simple validation: Ensure core fields are not empty
            if (key !== 'remark' && !value) {
                isValid = false;
                inputs[key].style.border = '1px solid red'; // Highlight error
            } else {
                inputs[key].style.border = '1px solid #ccc';
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return null;
        }
        return data;
    }
    
    function resetFormInputs(inputs) {
        inputs.shopName.value = '';
        inputs.item.value = '';
        inputs.qty.value = '1';
        inputs.unit.value = inputs.unit.options[0].value; // Reset to first unit option
        inputs.remark.value = '';
        
        if (inputs.price) inputs.price.value = '0';
        if (inputs.date) inputs.date.value = '';
        
        // Clear red borders if any
        for (const key in inputs) {
            inputs[key].style.border = '1px solid #ccc';
        }
    }
});