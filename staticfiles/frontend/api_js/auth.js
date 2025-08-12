// Function to perform login
function login(email, password) {
      $.ajax({
            url: serverUrl + loginUrl,
            type: 'POST',
            data: {email: email, password: password},
            success: function(response) {
                  // Save tokens in localStorage
                  console.log(response);
                  localStorage.setItem('access_token', response.access);
                  localStorage.setItem('refresh_token', response.refresh);
                  // Redirect or perform any other action upon successful login
                  window.location.href = dashboardUrl;
            },
            error: function(xhr, status, error) {
                  if (xhr.status === 401) {
                        // Display error message to the user
                        toastr.error("Incorrect email or password. Please try again.");
                  } else {
                        // Handle other error cases
                        console.log(xhr, "login");
                        toastr.error("Something went wrong please try again");
                  }
            }
      });
}

function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
}

// Function to perform logout
function logout() {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      if (!accessToken && !refreshToken) {
            // Handle case when refresh token is not available
            return;
      }
      // Make AJAX request to logout endpoint
      $.ajax({
            url: serverUrl + logoutUrl,
            type: 'POST',
            headers: {
                  'Authorization': 'Bearer ' + accessToken,
                  'X-CSRFToken': getCookie('csrftoken')
            },
            data: {refresh_token: refreshToken},
            success: function(response) {
                  // Clear tokens from localStorage
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('refresh_token');
                  // Redirect or perform any other action upon successful logout
                  window.location.href = loginWebUrl;
            },
            error: function(xhr, status, error) {
                  // Handle logout error
                  console.log(xhr, "Logout");
            }
      });
}

if (document.getElementById('logoutBtn')) {
      document.getElementById('logoutBtn').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (navigation)
      
            logout()
      });
}

if (document.getElementById('logoutBtnFrmSidebar')) {
      document.getElementById('logoutBtnFrmSidebar').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (navigation)
      
            logout()
      });
}