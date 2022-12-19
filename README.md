# React-Custom-File-Upload-Component
This Repository contains custom React Web Component that can be used to upload file/ images.

1. Go to File-upload directory and find .env file and fill in your own private and publickey for uploadcare cloud.
# How to Run the Project locally?
This project was bootstrapped with Create React App.

Install Dependencies
In the project directory, you can run:

`yarn install`
OR
`npm install`

# Add Keys to .env
Create a .env file at the root of the project folder with the following content:

REACT_APP_UPLOADCARE_API_PUBLIC_KEY=YOUR_UPLOADCARE_PUBLIC_KEY
REACT_APP_UPLOADCARE_API_SECRET_KEY=YOUR_UPLOADCARE_SECRET_KEY

You can find the public and secret key from the uploadcare dashboard.

Run the Project
In the project directory, you can run:

`yarn start`
OR
`npm start`

Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
