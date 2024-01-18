# EventO
EventO is a fullstack web application that simulates an event listing and reviewing platform. It allows users to browse upcoming events listed by the community or the admin, leave reviews or engage in discussions for upcoming events or list events themselves by first registering or logging themselves in. A listed event can be updated as well as deleted but only by the owner.

Frontend for the application is designed using HTML, Vanilla CSS and Tailwind CSS. The backend is designed using Express JS framework folllowing the MVC architecture. The web application is connected to a cloud database- MongoDB Atlas which stores all the information of users, listed events, user comments etc from the application. Cloudinary which is a cloud-based image and vedio storage service is used to store the images for all the events. Many node packages are utilized to implement features like success and error messages, user authentication etc.

## Features
* **User Registration and Authentication:** Users can create accounts, log in, and manage their profiles to interact with the website's functionalities. SOme functionalites can only be accesses after loggin in like listing an event or commenting in an even't discussion forum. Also the listed events can be updated or deleted only by the organizer/author.
* **Event Listings:** Under the Discover section, users can see the various upcoming events listed by the other users or them. Some basic information like event venue, date, time and ticket price are also listed. The user can click on KNOW MORE to get detailed information about the event.
* **Event Show Page:** Every event has a detailed show page containing the entire gallery of the event along with details like venue, location, date, time, ticket price, map to the venue and the discussion forum. The author/organizer of the event can acces update and delete optiions from this page.
* **User Reviews and Discussions:** The users can leave their reviews and engage in discussions with other users about an event.
* **List An Event** Registered users can list their own events along will all the details like Titile, description, location, venue, date, time, images, ticket price, etc.

## Installation
1. Clone the repository using the git clone command 
2. Navigate to the project directory: cd EventO
3. Install the dependencies: npm install
4. Get the respective credentials for cloudinary, MongoDB atlas and Mapbox
5. Set up the MongoDB connection by updating the .env file with your database credentials.
6. Start the application: npm start
7. Access the application in your browser at http://localhost:3000

## Interfaces
<img width="1469" alt="Screenshot 2024-01-13 at 4 20 11 AM" src="https://github.com/Gopal1252/EventO/assets/93401686/4064fa3f-6015-4329-9b54-83a7bf6fe9c3">
<img width="1470" alt="Screenshot 2024-01-18 at 5 09 16 PM" src="https://github.com/Gopal1252/EventO/assets/93401686/4a5e09bb-b5ea-4fb5-8f51-49469a749f75">
<img width="1469" alt="Screenshot 2024-01-13 at 4 21 55 AM" src="https://github.com/Gopal1252/EventO/assets/93401686/dfb560de-f639-4165-8242-7b005dfe7766">
<img width="1470" alt="Screenshot 2024-01-13 at 4 21 22 AM" src="https://github.com/Gopal1252/EventO/assets/93401686/48f2d700-fe6d-4721-9b28-75c87105ebdd">
<img width="1470" alt="Screenshot 2024-01-13 at 4 25 43 AM" src="https://github.com/Gopal1252/EventO/assets/93401686/7ed593e6-1b42-4021-a6f2-ebda1139911a">
<img width="1470" alt="Screenshot 2023-11-22 at 10 55 40 PM" src="https://github.com/Gopal1252/EventO/assets/93401686/be4ea9db-648e-4336-b506-dd1599220795">
<img width="1470" alt="Screenshot 2023-11-22 at 10 55 29 PM" src="https://github.com/Gopal1252/EventO/assets/93401686/99a8257e-4d8a-4bae-a990-aaf3c26d9434">
