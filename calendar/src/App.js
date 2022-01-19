import './App.css';
import { useState, useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

function App () {

  const [events, setEvents] = useState(null);
  const [isSigned, setIsSigned] = useState(false); // Track local signed in state

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);

  function handleClientLoad () {
    window.gapi.load('client:auth2', initClient);
  }

  function initClient () {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  function updateSigninStatus (isSignedIn) {
    if (isSignedIn) {
      listUpcomingEvents();
    }
  }

  function listUpcomingEvents () {
    window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime'
    }).then(function (response) {
      const events = response.result.items;
      if (events.length > 0) {
        setEvents(events);
      }
    }); 
  }

  function handleAuthClick () {
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn();

      // If we want to work with token and use it for auth process (set up as a state):
      // const token = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    }
    setIsSigned(!isSigned);
  }

  function handleSignOutClick () {
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
    setIsSigned(isSigned);
  }

  return (
    <div className="App">
      <button className="auth-button" id="signin-button" onClick={handleAuthClick}>Sign in with Google</button>
      <button className="auth-button" id="signout-button" onClick={handleSignOutClick}>Sign out with Google</button> 
    </div>
  );
}

export default App;
