document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tableContents = document.querySelectorAll('.table-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Deactivate all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tableContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and its corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });


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
    const modal = document.getElementById('routeAssignmentModal');
    const openBtn = document.querySelector('.add-route-btn');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const staffNameInput = document.getElementById('staffName');
    const dateInput = document.getElementById('assignmentDate');
    const shopNameInput = document.getElementById('shopName');
    const routeTableBody = document.getElementById('routeTableBody');

    // Dynamic Sections
    const manualInputSection = document.getElementById('manualItemInput');
    const dbSelectionSection = document.getElementById('databaseItemSelection');
    const dbCheckboxContainer = dbSelectionSection.querySelector('.checkbox-list-container');
    const manualAddItemBtn = document.getElementById('manualAddItemBtn');
    const addSelectedItemsBtn = document.getElementById('addSelectedItemsBtn');

    let rowCount = 0; // Table row counter

    // --- 1. MODAL (Popup) Functionality ---

    // Open Modal: add-route-btn ကို နှိပ်လျှင်
    openBtn.onclick = function() {
        modal.style.display = 'block';
        
        // Button နှိပ်လိုက်တဲ့ row ရဲ့ Name data ကိုယူ (data-staff-name attribute မှ)
        const staffName = this.getAttribute('data-staff-name') || "Unknown Staff";
        staffNameInput.value = staffName;
        
        setDefaultDate(); // မနက်ဖြန် Date ကို Default ထား
        resetForm(); // Form ကို အခြေအနေ ပြန်လည်သတ်မှတ်
    }

    // Close Modal: X ခလုတ်ကို နှိပ်လျှင်
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close Modal: Popup အပြင်ဘက်ကို နှိပ်လျှင်
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }


    // --- 2. Default Date Setting (Tomorrow) ---

    function setDefaultDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); 

        // Format: YYYY-MM-DD (date input အတွက်)
        const day = tomorrow.getDate().toString().padStart(2, '0');
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const year = tomorrow.getFullYear();
        
        dateInput.value = `${year}-${month}-${day}`;
    }


    // --- 3. Dynamic Shop/Item Component Toggling (Database Simulation) ---
    // Dropdown/Text Input တွဲသုံးထားသောကြောင့် change နှင့် input နှစ်မျိုးလုံးကို နားထောင်သည်

    shopNameInput.addEventListener('change', checkShopData);
    shopNameInput.addEventListener('input', checkShopData);

    // Dummy Database for Simulation
    const DUMMY_DB_DATA = {
        "Shop 1": [
            { item: "Biscuit (50g)", address: "No. 10, Main St, YGN" },
            { item: "Coffee (3-in-1)", address: "No. 10, Main St, YGN" },
            { item: "Water (1L)", address: "No. 10, Main St, YGN" },
            { item: "Tea Pack", address: "No. 10, Main St, YGN" },
            { item: "Sugar (1kg)", address: "No. 10, Main St, YGN" },
            { item: "Milk Can", address: "No. 10, Main St, YGN" } // 6th item (for scroll test)
        ],
        "Shop 2": [
            { item: "Noodle (Mi Gyi)", address: "B Road, MDY" },
            { item: "Candy Bar", address: "B Road, MDY" },
            { item: "Soap (Small)", address: "B Road, MDY" }
        ],
        "Shop 3": [] // No items, should show manual input
    };

    function checkShopData() {
        const shopName = shopNameInput.value.trim();
        const shopData = DUMMY_DB_DATA[shopName];

        // Shop Name ဗလာဆိုလျှင် နှစ်ခုလုံးကို ဖျောက်ထားမည်
        if (!shopName) {
            manualInputSection.style.display = 'none';
            dbSelectionSection.style.display = 'none';
            return;
        }

        // 1. Database Match Found & Data ရှိလျှင်
        if (shopData && shopData.length > 0) {
            manualInputSection.style.display = 'none';
            dbSelectionSection.style.display = 'flex'; // DB Selection ကို ပေါ်စေမည်
            populateCheckboxes(shopData, shopName);
        } else {
            // 2. No Database Match or Data မရှိလျှင်
            manualInputSection.style.display = 'flex'; // Manual Input ကို ပေါ်စေမည်
            dbSelectionSection.style.display = 'none';
            dbCheckboxContainer.innerHTML = ''; // Old checkboxes ရှင်းထုတ်
        }
    }

    function populateCheckboxes(data, shopName) {
        dbCheckboxContainer.innerHTML = ''; // Clear existing
        data.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'checkbox-row';
            
            // Image ထဲကလို အမှတ်ခြစ်ပုံစံပါတဲ့ checkbox အတွက်
            // const checkIcon = document.createElement('input');
            // checkIcon.type = 'checkbox';
            // checkIcon.checked = true; // Always checked as per image
            // checkIcon.disabled = true;
            // checkIcon.className = 'visually-checked-icon';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `db-item-${index}`;
            checkbox.name = 'db-item';
            
            // Data attributes for table adding
            checkbox.setAttribute('data-shop', shopName);
            checkbox.setAttribute('data-item', item.item);
            checkbox.setAttribute('data-address', item.address);
            
            const label = document.createElement('label');
            label.htmlFor = `db-item-${index}`;
            label.textContent = item.item;
            
            // row.appendChild(checkIcon);
            row.appendChild(checkbox);
            row.appendChild(label);
            dbCheckboxContainer.appendChild(row);
        });
    }

    // --- 4. Add to Table Functionality ---

    // Manual Add
    manualAddItemBtn.onclick = function() {
        const shopName = shopNameInput.value.trim();
        const item = document.getElementById('itemManual').value;
        const qty = document.getElementById('qtyManual').value;
        const unit = document.getElementById('unitManual').value;
        const price = document.getElementById('priceManual').value; 

        if (!shopName || !item || !qty || !price) {
            alert('Shop Name, Item, and Qty တို့ကို ဖြည့်သွင်းပါ။');
            return;
        }

        // Manual Entry အတွက် Address ကို 'N/A' ဟု သတ်မှတ်သည်
        const address = "N/A"; 
        
        addRowToTable(shopName, address, item, qty, unit);
        
        // Clear inputs after adding to table
        document.getElementById('itemManual').value = '';
        document.getElementById('qtyManual').value = '1';
        document.getElementById('unitManual').value = 'pcs'; 
        document.getElementById('priceManual').value = '0';
        shopNameInput.value = ''; // Shop name ကို ရှင်းထုတ်ပြီး Dynamic Section များကို ပြန်ဖျောက်
        checkShopData(); 
    };

    // Database Selected Add
    addSelectedItemsBtn.onclick = function() {
        const checkboxes = dbCheckboxContainer.querySelectorAll('input[type="checkbox"]:not([disabled])');
        const checkedItems = Array.from(checkboxes).filter(cb => cb.checked);

        if (checkedItems.length === 0) {
            alert('ကျေးဇူးပြု၍ စာရင်းမှ ပစ္စည်းတစ်ခု သို့မဟုတ် တစ်ခုထက်ပို၍ ရွေးချယ်ပါ။');
            return;
        }

        checkedItems.forEach(checkbox => {
            const shop = checkbox.getAttribute('data-shop');
            const item = checkbox.getAttribute('data-item');
            const address = checkbox.getAttribute('data-address');
            // DB မှရွေးချယ်သော ပစ္စည်းအတွက် default Qty: 1, Unit: ထုပ်/pcs (ယာယီ)
            const qty = 1; 
            const unit = 'pcs'; 
            
            addRowToTable(shop, address, item, qty, unit);
        });

        // Add ပြီးနောက် Checkbox Section ကို ဖျောက်ပြီး Shop Name ကို ရှင်းထုတ်
        dbSelectionSection.style.display = 'none';
        shopNameInput.value = '';
        dbCheckboxContainer.innerHTML = '';
        checkShopData(); 
    };

    function addRowToTable(shop, address, item, qty, unit, price='0') {
        rowCount++;
        const newRow = routeTableBody.insertRow();
        
        // No.
        newRow.insertCell().textContent = rowCount;
        // Shop
        newRow.insertCell().textContent = shop;
        // Address
        newRow.insertCell().textContent = address;
        // Item
        newRow.insertCell().textContent = item;
        // Qty
        newRow.insertCell().textContent = qty;
        // Unit
        newRow.insertCell().textContent = unit;
        // Price
        newRow.insertCell().textContent = price;
        
        // Scroll to the bottom
        routeTableBody.scrollTop = routeTableBody.scrollHeight;
    }


    // --- 5. RESET and SUBMIT Functionality ---

    function resetForm() {
        routeTableBody.innerHTML = ''; // Table rows ရှင်းထုတ်
        rowCount = 0;
        shopNameInput.value = '';
        document.getElementById('remark').value = '';
        checkShopData(); // Dynamic sections reset
    }

    resetBtn.onclick = resetForm; // Reset ခလုတ်ကို နှိပ်လျှင် table data များရှင်းထုတ် (popup မပိတ်)

    submitBtn.onclick = function(e) {
        e.preventDefault();
        
        if (rowCount === 0) {
            alert('Submit မလုပ်မီ အနည်းဆုံး Route Item တစ်ခု ထည့်သွင်းပါ။');
            return;
        }

        const formData = collectFormData();
        
        console.log("Submitting Data:", formData);
        alert('Form Submitted Successfully! Data သိမ်းဆည်းပြီးပါပြီ။');

        modal.style.display = 'none'; // Popup ပိတ်မည်
        resetForm(); // Form data များ ရှင်းထုတ်
    };

    function collectFormData() {
        const routes = [];
        const rows = routeTableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            // Table structure: No, Shop, Address, Item, Qty, Unit
            routes.push({
                no: cells[0].textContent,
                shop: cells[1].textContent,
                address: cells[2].textContent,
                item: cells[3].textContent,
                qty: cells[4].textContent,
                unit: cells[5].textContent,
                price: cells[6].textContent
            });
        });

        return {
            staffName: staffNameInput.value,
            assignmentDate: dateInput.value,
            remark: document.getElementById('remark').value,
            routes: routes
        };
    }

    // Initialize the default state when the script loads
    checkShopData();
});











































document.addEventListener('DOMContentLoaded', function() {
    const viewModal = document.getElementById('routeViewModal');
    const openViewBtn = document.querySelector('.view-route-btn');
    const closeViewBtn = document.querySelector('.view-close-btn');
    const resetViewBtn = document.getElementById('resetViewBtn');
    const staffNameViewInput = document.getElementById('staffNameView');
    const dateViewInput = document.getElementById('assignmentDateView');
    const routeViewTableBody = document.getElementById('routeViewTableBody');

    // --- Dummy Data (To test the table view and scroll) ---
    // const DUMMY_VIEW_DATA = [
    //     { no: 1, shop: "Shop A", address: "123 St, YGN", item: "Item X", qty: 10, unit: "ထုပ်"},
    //     { no: 2, shop: "Shop B", address: "456 Rd, MDY", item: "Item Y", qty: 5, unit: "တွဲ"},
    //     { no: 3, shop: "Shop C", address: "789 Ave, NAY", item: "Item Z", qty: 1, unit: "ဖာ"},
    //     { no: 4, shop: "Shop D", address: "101 Blvd, BGO", item: "Item W", qty: 20, unit: "ထုပ်" },
    //     { no: 5, shop: "Shop E", address: "112 Grv, AYA", item: "Item V", qty: 15, unit: "တွဲ"},
    //     { no: 6, shop: "Shop F", address: "131 Pza, SGG", item: "Item U", qty: 8, unit: "ထုပ်"},
    //     { no: 7, shop: "Shop G", address: "142 Ter, MAG", item: "Item T", qty: 2, unit: "ဖာ"},
    //     { no: 8, shop: "Shop H", address: "153 Lne, KCH", item: "Item S", qty: 4, unit: "ထုပ်"}
    // ];

    // --- 1. MODAL (Popup) Functionality ---

    // Open Modal
    openViewBtn.onclick = function() {
        viewModal.style.display = 'block';
        
        // 1. Staff Name: Get Name data from the clicked row
        const staffName = this.getAttribute('data-staff-name') || 'Viewing Staff';
        staffNameViewInput.value = staffName;

        // 2. Date: Set default date to tomorrow
        setDefaultDateView(); 
        
        // 3. Load Dummy Data (In a real app, you would fetch and load the actual route data here)
        // loadRouteData(DUMMY_VIEW_DATA);
    }

    // Close Modal
    closeViewBtn.onclick = function() {
        viewModal.style.display = 'none';
        resetTableData(); // Clear data when closing
    }

    // Close Modal when clicking outside
    window.onclick = function(event) {
        if (event.target == viewModal) {
            viewModal.style.display = 'none';
            resetTableData(); // Clear data when closing
        }
    }


    // --- 2. Default Date Setting (Tomorrow) ---

    function setDefaultDateView() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); 

        // Format date to YYYY-MM-DD
        const day = tomorrow.getDate().toString().padStart(2, '0');
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const year = tomorrow.getFullYear();
        
        dateViewInput.value = `${year}-${month}-${day}`;
    }

    // --- 3. Load Data to Table ---

    // function loadRouteData(data) {
    //     routeViewTableBody.innerHTML = ''; // Clear existing
    //     data.forEach(item => {
    //         const newRow = routeViewTableBody.insertRow();
            
    //         const rowData = [
    //             item.no, 
    //             item.shop, 
    //             item.address, 
    //             item.item, 
    //             item.qty, 
    //             item.unit,
    //         ];

    //         rowData.forEach((text, index) => {
    //             let cell = newRow.insertCell();
    //             cell.textContent = text;
    //         });
    //     });
    // }

    // --- 4. RESET Functionality ---

    function resetTableData() {
        routeViewTableBody.innerHTML = ''; // Clear table rows
        // You can optionally reset the date to tomorrow here if needed
        // setDefaultDateView(); 
    }

    resetViewBtn.onclick = function() {
        resetTableData();
        alert('Table data has been cleared.');
    };
});