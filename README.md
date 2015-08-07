# sample-radar-ui-ebs

This is the front-end of a simple app to demonstrate deploying on Elastic Bean Stalk through Shippable. The app shows the age of Github issues and their status. To get the full functionality of the app, use the same steps to deploy the backend of the app which is at sample-radar-api-ebs. 

By default, runs on port 3000

# Environmental variables (optional):
- WWW_PORT: Port used for app (default:3000). Make sure the API gets the change accordingly.
- API_URL: URL for front end to find API (default:localhost:3001)
- API_PORT: Alternative to API_URL, port for front end to find API (default:3001)

