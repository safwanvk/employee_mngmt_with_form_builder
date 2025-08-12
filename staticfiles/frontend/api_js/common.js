function setErrorMessage(responseJSON) {
      $('.invalid-feedback').remove();
  
      // Check if responseJSON is empty or null
      if (!responseJSON || Object.keys(responseJSON).length === 0) {
          return; // No error messages, so nothing to display
      }
  
      Object.keys(responseJSON).forEach(function(key) {
            var field = $('[name="' + key + '"]');
            var errors = responseJSON[key];
            var formGroup = field.closest('.form-group');
      
            if (key === 'password') {
                  // Show error message for the password field
                  var passwordField = $('[name="password1"]');
                  var passwordFormGroup = passwordField.closest('.form-group');
      
                  passwordFormGroup.append('<div class="invalid-feedback">' + errors.join(', ') + '</div>');
                  passwordFormGroup.find('.invalid-feedback').show();
            } if (key === 'password2') {
                  // Show error message for the password field
                  var passwordField = $('[name="password2"]');
                  var passwordFormGroup = passwordField.closest('.form-group');
      
                  passwordFormGroup.append('<div class="invalid-feedback">' + errors.join(', ') + '</div>');
                  passwordFormGroup.find('.invalid-feedback').show();
            } else {
                  // Add the new error message(s) to the field
                  errors.forEach(function(error) {
                        formGroup.append('<div class="invalid-feedback">' + error + '</div>');
                  });
                  // Show the .invalid-feedback elements
                  formGroup.find('.invalid-feedback').show();
            }
      });
}

$(document).ready(function() {
      callApi({
            url: serverUrl + getUserProfileUrl,
            method: 'GET',
            success: function(response) {
                  userData = response
                  if (document.getElementById('username')) document.getElementById('username').innerText = userData.email;
                  if (document.getElementById('fullName')) document.getElementById('fullName').innerText = userData.full_name;
                  if (document.getElementById('group_name')) document.getElementById('group_name').innerText = userData.title;
            },
            error: function(xhr, status, error) {
                  if (xhr.status === 401) {
                        window.location.href = loginWebUrl
                  } else {
                        toastr.error("Something went wrong please try again");
                  }
            }
      });
      callApi({
            url: serverUrl + checkPermissionUrl,
            method: 'POST',
            contentType: 'application/json',
            headers: {
                  'X-CSRFToken': getCookie('csrftoken')
            },
            data: JSON.stringify({'codenames': ['apis.add_afluser']}),
            success: function(response) {
                  if (response.status_code === 200) {
                        var respData = response.data;
                        for (var key in respData) {
                              if (respData.hasOwnProperty(key) && respData[key] === false) {
                                    var menuItem = document.getElementById(key);
                                    if (menuItem) {
                                          menuItem.style.display = 'none';
                                    }
                              } else if (respData.hasOwnProperty(key) && respData[key] === true) {
                                    var menuItem = document.getElementById(key);
                                    if (menuItem) {
                                          menuItem.style.display = 'block';
                                    }
                              }
                        }
                  }
              // Handle successful API response
            },
            error: function(xhr, status, error) {
                  if (xhr.status === 403) {
                        window.location.href = loginWebUrl
                  } else {
                        toastr.error("Something went wrong please try again");
                  }
            }
      });
});

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