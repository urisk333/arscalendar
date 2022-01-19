# arscalendar

Arscalendar is a React application which uses Google Calendar API and OAuth2.0, connects the application with your personal primary Google Calendar. By using the application, you are able to view the list of the events, plus create the new ones, and delete them from the calendar.


# Getting started

## Google Calendar API 

Follow the next steps to set up your Google Calendar project, which is necessary to run the application:

1. Go to [Google Cloud Platform](https://console.cloud.google.com), and from the dropdown menu click on **New project**, name your project and click **Create**. Once the new project is created, select the new project from the dropdown menu (if the project is not already selected)

2. Click on the burger menu and choose **APIs & Services** -> choose **OAuth consent screen** -> choose **External** -> click **Create**

3. Follow the next steps:

#### OAuth consent screen

- App information -> App name `The name of the app` -> User support email `Your Gmail address`
- Developer contact information -> Email addresses `Your Gmail address`
- click **SAVE AND CONTINUE**

#### Scopes

- click **ADD OR REMOVE SCOPES** -> choose *.../auth/userinfo.email*, *.../auth/userinfo.profile*, *openid*, *.../auth/calendar.events* -> click **UPDATE**
- click **SAVE AND CONTINUE**

#### Test users

- click **ADD USERS** -> add `Your Gmail address` (You can add other users as well) -> click **ADD**
- click **SAVE AND CONTINUE**

4. Go to **Credentials**:

- click **CREATE CREDENTIALS** -> choose **API key** (Once the key is created, use it in your application)
- click **CREATE CREDENTIALS** -> choose **OAuth client ID** -> Application type **Web application** -> Name `The name of the app` -> Authorized Javascript origins `http://localhost:3000` -> click **CREATE** (Once the Client ID is created, use it in your application)


## Notes

- when signing in for the first time, choose your Gmail address on the pop-up window
- click **Continue** -> click on the check-box related to your Google calendar -> click **Continue**


## Run the application

Follow the installation process to run the application:

1. Clone the repo:
```
git clone https://github.com/urisk333/arscalendar
```

2. Add the credentials:

- Create .env file in the app's root folder, and add the credentials, created in the previous steps, to the file:
```
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_GOOGLE_API_KEY=
```

3. Run the application:
```
cd arscalendar/calendar
npm i
npm start
```


# Tech stack

- [ReactJS](https://reactjs.org)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


# Author

Ivan Car - [GitHub](https://github.com/urisk333) / [LinkedIn](https://www.linkedin.com/in/ivan-car/)
