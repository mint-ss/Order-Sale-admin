document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Check if it's desktop view and if the terms checkbox is present/checked
    // let isTermsAccepted = true;
    // const termsCheckbox = document.getElementById('terms');
    // if (termsCheckbox && window.innerWidth >= 768 && !termsCheckbox.checked) {
    //     isTermsAccepted = false;
    // }

    if (email && password ) {

        // In a real application, you would send this data to a server:
        // fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password, name }) });

        alert('Login Successful!');
        setTimeout(()=>{
            window.location.href='dashboard.html';
        },1000);

    // } else if (!isTermsAccepted) {
    //     alert('Please agree to the Terms & Privacy.');
    // }
    }else {
        alert('Please fill in all required fields.');
    }
});

