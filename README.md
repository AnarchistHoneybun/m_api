# M_api

API key buying selling system built on a really robust database. We probably
aren't even utilizing half of the cool things we can do on it and even so we're here.
That being said:

## Installation
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npm start` to start the server

That's it! You're good to go! Go to `localhost:3000` to see the app running.
Contact us for user keys and test credentials to see it in action.

## Description

This project is a comprehensive web application built using React, a popular JavaScript library for building user interfaces. The application is designed to manage users and their API keys, and handle key requests. It uses Supabase, an open-source Firebase alternative, for backend database interactions. The application is divided into two main sections: User and Admin. The User section allows users to manage their API keys, make new requests, and view their usage metrics. The Admin section provides an overview of all users, their API keys, and pending key requests.

The `Login.js` file handles user authentication, allowing users to log in or create a new account. It uses Supabase's authentication methods to securely manage user credentials. The `User.js` file is where users can view their total keys, total bandwidth, and total requests. They can also select an API key and an endpoint to make a new request. The `CreateAccount.js` file provides a form for new users to create an account, which includes fields for username, ID type, ID value, email, and password.

The Admin section, defined in `App.js`, includes a dashboard, key requests, and users. The `Dashboard.js` file displays the total number of users, total bandwidth, and total requests. The `KeyRequests.js` file lists all pending key requests, allowing the admin to approve or deny them. The `Users.js` file lists all users and their API keys. It also includes a modal to view a user's API keys. The project is designed with a focus on user management and API key administration, making it a useful tool for managing access to an API.

## Usage
Beauty of being able to write lines upon lines of frontend code is that it
self documents pretty well. 
1. On the user side:
   - Add payment details
   - Request for more keys
   - Make calls to our various endpoints
   - See your usage statistics
2. On the admin side:
   - View global usage stats
   - Approve key requests
   - View all users and their keys