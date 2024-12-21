import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '15616069656-pjnj8tflbq33e2khhkq88ge65kl06j04.apps.googleusercontent.com'; 
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const YouTubeClone = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
            ],
            scope: SCOPES,
          });
  
          const authInstance = gapi.auth2.getAuthInstance();
          if (authInstance.isSignedIn.get()) {
            const user = authInstance.currentUser.get();
            setAccessToken(user.getAuthResponse().access_token);
          }
        } catch (error) {
          console.error('Error initializing Google API client:', error);
        }
      });
    };
  
    initClient();
  }, []);
  

  const handleLogin = async () => {
    const authInstance = gapi.auth2.getAuthInstance();
    await authInstance.signIn();
    const token = authInstance.currentUser.get().getAuthResponse().access_token;
    setAccessToken(token);
    // console.log(token)
  };

  const fetchSubscriptions = async () => {
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }
  
    try {
      const response = await gapi.client.youtube.subscriptions.list({
        part: 'snippet',
        mine: true,
        maxResults: 50,
      });
  
      if (response.result && response.result.items) {
        setSubscriptions(response.result.items);
      } else {
        console.warn('No subscriptions found.');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };
  

  return (
    <div>
      <h1>YouTube Clone</h1>
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <button onClick={fetchSubscriptions}>Fetch Subscriptions</button>
      )}

      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>{sub.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeClone;
