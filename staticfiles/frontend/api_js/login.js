if (document.getElementById('user-login-form')) {
  document.getElementById('user-login-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Retrieve username and password from the form
    var email = document.getElementById('id_email').value;
    var password = document.getElementById('id_password').value;
    // Call the login function
    if (email && password) {
      login(email, password);
    }
  });
}``