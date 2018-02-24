##SMS API MONITOR

Must have a twilio account to work. Fill in the neccesary information in config.js and then run index.js. The application will send a get request to the provided end points and dependent on the response status code  will either log the request (200), or text the numbers in config.recipients (503, etc).