
# Simple Spotify API 

This project lets you get started with Spotify's API.
It has the authntication process enabled, you cam also add tracks to your DB via the Spotify API, and query the tracks by artist or IRSC.


## Getting started

Clone this code to your repo and run npm install 
The database use is mysql with sequlize here, so you will need to create the database and make sure the credentials match those on db.js. 


You will also need to sign up to Spotify for a developer account, this application will prompt you to login.
## Deployment

To deploy this project run

```bash
  npm install
```

Assuming you done the perquisites in getting started you should be to run


```bash
  node app
```

NOTE: If tihs is the first time running the code the uncomment lines 24-33 to create the tables. 
Go to  localhost/api/login and that should prompt you to login and redirect to you the create track input. 

## Security

You will need to add some extra security layers if you want to use this for production. The API access token is currently stored in a session ideally you should use a webworker to stop being exposed on the User browser. You got alternatively encrypt the token before storing. 

An environment variables file would be good too to store your credentials. 

