Capella Serverless

Description:

Current Staging App Server is: 18.136.119.97

Docker registry will be on gitlab

API-Server

1. Staging-Server
   URL: 18.136.119.97
   API: 18.136.119.97:8081

2. Production-Server
   URL:
   API:

CI/CD Pipeline workflow

1. Commit to Development branch will trigger pipeline
2. Pipeline will run all the test scripts (If success will proceed to step 3)
3. It will build image and push to gitlab docker registry
4. Once the docker image is available, visit the link "https://gitlab.com/variantz/Backend-Serverless/-/jobs" and press the button "Trigger this manual action" to run a script to pull the latest image
5. Now the backend server (The API server in EC2) will pull and run the latest image
6. Visit API-Server's API url to test the latest code is deployed

AWS Guide:
RDS is located in VPC (Capella-VPC)
We are following 3-tier architecture for system design

Web Server (It is incharged of exposing APIs to public. Therefore, it is located in public subnet of VPC)
App Server (It is incharged of business logic and it is where your express node sitting. Since it is handling sensitive data, it is located in private subnet of VPC)
RDS (Handling MySQL. It is the most protected server. It has no access except via App server)

Since RDS is not visible to public then how do we access?
Answer: we have to go through a host server which is located in the internet already in this case our capella webserver is in internet

Jump host:
ssh to web server -> proxy to app server -> then to RDS

You will need to tunnel (windows: just use putty to tunnel, IOS: use proxycommand)

only you have set up everything on app server then i will do the web server to expose the APIs
