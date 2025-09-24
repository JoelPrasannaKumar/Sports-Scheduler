# Sports Scheduler

A full-stack web application designed to help users organize and participate in local sports activities. This platform allows administrators to manage available sports and provides players with the tools to create, view, and join game sessions seamlessly.

**[Live Demo](https://youtu.be/KCwpaj6CIIE?si=MZies_HPknymvHCR)** &nbsp;&nbsp;&nbsp; 

---

## About The Project

This project is a sports scheduling tool that helps plan and organize sports events. Its primary goal is to provide a simple interface for individuals to set up matches and for other players to easily find and participate in those games.

The application serves two main user roles:
*   **Players:** Any registered user who can create new game sessions and join existing ones.
*   **Administrators:** Users with special privileges to manage the list of available sports and view reports on platform activity.

This project was built as the capstone for the Vedic WD501 Advanced Backend course.

### Built With

This project was built using the MERN stack and styled with Tailwind CSS.

*   **Frontend:**
    *   [React.js](https://reactjs.org/)
    *   [React Router](https://reactrouter.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Axios](https://axios-http.com/)
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [MongoDB](https://www.mongodb.com/) (with Mongoose)
    *   [JSON Web Tokens (JWT)](https://jwt.io/) for authentication
    *   [bcrypt.js](https://www.npmjs.com/package/bcryptjs) for password hashing

---

## Key Features

### For Players
*   **User Authentication:** Secure sign-up and login functionality for all users.
*   **Create Sessions:** Players can schedule a new game session for any available sport, specifying the date, time, and location.
*   **View & Join Sessions:** Browse a dashboard of all upcoming sessions and join with a single click. Player names are displayed on the session card for others to see.
*   **Cancel Created Sessions:** Players have the ability to cancel a session that they have personally created.

### For Administrators
*   **Sport Management:** Admins can create new sport types (e.g., Cricket, Tennis, etc.) that will then be available for players to select when creating a session.
*   **Session Reports:** Access to a reporting dashboard to view the number of sessions played for each sport within a configurable time period.
*   **Full Player Functionality:** Administrators can also perform all player actions, such as creating and joining sessions.

---

## Screenshots

Here are a few snapshots of the application in action.

**Login Page**
![Login Page](./client/public/images/Screenshot%202025-09-24%20092110.png)

**Sessions Dashboard (Home Page)**
![Sessions Dashboard](./client/public/images/Screenshot%202025-09-24%20092727.png)

**Create Session Form**
![Create Session Form](./client/public/images/Screenshot%202025-09-24%20092757.png)

**Admin Dashboard**
![Admin Dashboard](./client/public/images/Screenshot%202025-09-24%20092840.png)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   **Node.js** and **npm** (Node Package Manager) installed. You can download them [here](https://nodejs.org/).
*   A **MongoDB Atlas** account or a local MongoDB instance. You can create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Setup the Backend Server**
    *   Navigate to the server directory:
        ```sh
        cd server
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   **Configure Environment Variables:** In the `server` directory, make a copy of the `.env.example` file and rename it to `.env`.
        ```sh
        cp .env.example .env
        ```
    *   Open your new `.env` file and fill in the required values (your MongoDB URI, a strong JWT secret, and a port).
    *   Start the server:
        ```sh
        npm start
        ```
    The server will be running on the port you specified in your `.env` file.

3.  **Setup the Frontend Client**
    *   Open a new terminal and navigate to the client directory:
        ```sh
        cd client
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Start the client application:
        ```sh
        npm start
        ```
    The application will open automatically in your browser at `http://localhost:3000`.