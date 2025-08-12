function callApi(options) {
      // Default options
      var defaultOptions = {
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            withToken: true,
            success: function(response) {
              console.log(response); // Log the response by default
            },
            error: function(xhr, status, error) {
              console.log(xhr); // Log the error by default
            }
      };

      // Merge default options with provided options
      options = Object.assign({}, defaultOptions, options);

      // Add token to headers if available
      var headers = options.headers || {};
      if (options.withToken) {
            var token = localStorage.getItem('access_token');
            if (token) {
                  headers.Authorization = 'Bearer ' + token;
            } else {
                  if (typeof logout === 'function') {
                        logout()
                  }
                  if (typeof loginWebUrl !== 'undefined') {
                        if (options.currentPath) {
                              if (options.currentPath !== 'login') {
                                    window.location.href = loginWebUrl
                              }
                        } else {
                              window.location.href = loginWebUrl
                        }
                  }
            }
      }

      if (options.token && options.token !== '' && options.token !== undefined) {
            headers.Authorization = 'Bearer ' + options.token;
      }

      var url = options.url;
      if (options.params) {
            url += '?' + $.param(options.params);
      }

      // Make the AJAX request
      $.ajax({
            url: url,
            type: options.method,
            data: options.data,
            dataType: options.dataType,
            contentType: options.contentType,
            processData: options.processData,
            headers: headers,
            success: options.success,
            error: function(xhr, status, error) {
                  // Handle token expiration error
                  if (xhr.status === 401) {
                        // Refresh the access token
                        if (options.token && options.token != '') {
                              options.error(xhr, status, error);
                        }
                        else {
                              refreshAccessToken(options);
                        }
                  } else {
                        // Call the error callback for other errors
                        options.error(xhr, status, error);
                  }
            }
      });
}
// Function to refresh access token
function refreshAccessToken(options) {
      var refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
            // Handle case when refresh token is not available
            return;
      }
      // Make AJAX request to refresh token endpoint
      $.ajax({
            url: serverUrl + refreshTokenUrl,
            type: 'POST',
            data: {refresh: refreshToken},
            success: function(response) {
                  // Save new access token in localStorage
                  localStorage.setItem('access_token', response.access);
                  // Retry the original API request with the new access token
                  callApi(options);
            },
            error: function(xhr, status, error) {
                  // Handle refresh token error
                  console.log(xhr);
            }
      });
}