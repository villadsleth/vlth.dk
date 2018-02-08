$( document ).ready(function() {
    console.log('vlth.dk');
    console.log( "ready!" );

    var auth2; // The Sign-In object.
    var googleUser; // The current user.

    /**
     * Calls startAuth after Sign in V2 finishes setting up.
     */
    var appStart = function() {
      console.log('appStart');
      gapi.load('auth2', initSigninV2);
    };

    /**
     * Initializes Signin v2 and sets up listeners.
     */
    var initSigninV2 = function() {
      console.log('initSigninV2');
      auth2 = gapi.auth2.init({
          client_id: '997559513117-ui9gap184okkntdm8f8u1h5tvtsv0tc6.apps.googleusercontent.com'
      });

      // Listen for sign-in state changes.
      auth2.isSignedIn.listen(signinChanged);

      // Listen for changes to current user.
      auth2.currentUser.listen(userChanged);

      // Sign in the user if they are currently signed in.
      if (auth2.isSignedIn.get() == true) {
        auth2.signIn();
      }

      // Start with the current live values.
      refreshValues();
    };

    /**
     * Listener method for sign-out live value.
     *
     * @param {boolean} val the updated signed out state.
     */
    var signinChanged = function (val) {
      console.log('Signin state changed to ', val);
      document.getElementById('signed-in-cell').innerText = val;
    };

    /**
     * Listener method for when the user changes.
     *
     * @param {GoogleUser} user the updated user.
     */
    var userChanged = function (user) {
      console.log('User now: ', user);
      googleUser = user;
      updateGoogleUser();
      document.getElementById('curr-user-cell').innerText =
        JSON.stringify(user, undefined, 2);
    };

    /**
     * Updates the properties in the Google User table using the current user.
     */
    var updateGoogleUser = function () {
      if (googleUser) {
        document.getElementById('user-id').innerText = googleUser.getId();
        document.getElementById('user-scopes').innerText = googleUser.getGrantedScopes();
        document.getElementById('auth-response').innerText = JSON.stringify(googleUser.getAuthResponse(), undefined, 2);
      } else {
        document.getElementById('user-id').innerText = '--';
        document.getElementById('user-scopes').innerText = '--';
        document.getElementById('auth-response').innerText = '--';
      }
    };

    /**
     * Retrieves the current user and signed in states from the GoogleAuth
     * object.
     */
    var refreshValues = function() {
      if (auth2){
        console.log('Refreshing values...');

        googleUser = auth2.currentUser.get();

        document.getElementById('curr-user-cell').innerText =
          JSON.stringify(googleUser, undefined, 2);
        document.getElementById('signed-in-cell').innerText =
          auth2.isSignedIn.get();

        updateGoogleUser();
      }
    };

    var elem = $('.g-signin2');
    console.log(elem);
    elem.bind('click', function(e){
      initSigninV2();
    });

    setTimeout(function () {
      // initSigninV2();
    }, 1000);

});
