# LightClassVR
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
>A Docker container to run virtual reality web applications with the A-Frame framework

## Launch the container
To execute this container and make a web application, use the steps below:
1. Clone this repository
2. Create the certificates to execute the app. You can use the next commnad or create your owns certificates. They must be in **server/certs** and called **cert.crt** and **cert.key**
   ```
   make cert
   ```
4. Create your app. Go to the **html** folder and make your own desire changes to make your app.
5. Execute the next command to build the container:
   ```
   make build
   ```
6. Execute the next command to run the container:
   ```
   make run
   ```
7. Go to [https://localhost](https://localhost/) to view you virtual reality web app!
   
## Stop the container
To stop the container execute:
```
make stop
```
