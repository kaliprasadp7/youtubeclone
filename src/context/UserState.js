import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';


function UserState(props) {
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
        try {
            const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signIn();
        const token = authInstance.currentUser.get().getAuthResponse().access_token;
        setAccessToken(token);
        // console.log(token)
        // fetchSubscriptions();
        } catch (error) {
            console.log("Login failed: try again", error)
        }
    };

    const handleLogout = async () => {
        try {
            const authInstance = gapi.auth2.getAuthInstance();
            await authInstance.signOut();
            setAccessToken(null);  // Clear the stored access token
            console.log("Logged out successfully");
        } catch (error) {
            console.log("Logout failed: try again", error);
        }
    };

    const fetchSubscriptions = async () => {
        if (!accessToken) {
            // console.error('Access token is missing.');
            // console.log(accessToken)
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
            <UserContext.Provider value={{ accessToken, handleLogin, handleLogout, subscriptions, fetchSubscriptions }}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export default UserState
