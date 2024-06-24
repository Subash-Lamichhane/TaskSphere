
---

# <p align="center">TaskSphere</p>
<p align="center">
    <a href="https://github.com/Subash-Lamichhane/TaskSphere" target="blank">
        <img src="https://img.shields.io/github/watchers/Subash-Lamichhane/TaskSphere?style=for-the-badge&logo=appveyor" alt="Watchers"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/TaskSphere/fork" target="blank">
        <img src="https://img.shields.io/github/forks/Subash-Lamichhane/TaskSphere?style=for-the-badge&logo=appveyor" alt="Forks"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/TaskSphere/stargazers" target="blank">
        <img src="https://img.shields.io/github/stars/Subash-Lamichhane/TaskSphere?style=for-the-badge&logo=appveyor" alt="Star"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/TaskSphere/issues" target="blank">
        <img src="https://img.shields.io/github/issues/Subash-Lamichhane/TaskSphere?style=for-the-badge&logo=appveyor" alt="Issue"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/TaskSphere/pulls" target="blank">
        <img src="https://img.shields.io/github/issues-pr/Subash-Lamichhane/TaskSphere?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/TaskSphere/blob/master/LICENSE" target="blank">
        <img src="https://img.shields.io/github/license/Subash-Lamichhane/TaskSphere?style=for-the-badge&logo=appveyor" alt="License" />
    </a>
</p>

## Overview

TaskSphere is an efficient and user-friendly task management web application designed to streamline team collaboration and task management. It uses Permit.io to assign roles to different users, such as admin, manager, and employee, each with distinct permissions to create, delete, read, change status, and manage tasks and staff. 

### Problem Statement

In many organizations, managing tasks and ensuring accountability across teams can be challenging. Common issues include:

- **Lack of Clear Task Assignment**: Without a structured system, tasks can be assigned informally, leading to confusion and overlapping responsibilities.
- **Poor Progress Tracking**: Teams struggle to keep track of task progress, resulting in missed deadlines and uncompleted tasks.
- **Inefficient Communication**: Important updates and changes in task status may not be communicated effectively, causing delays and misunderstandings.
- **Limited Role-Based Access**: Not all team members need the same level of access to task management functionalities, yet many systems fail to differentiate roles adequately.

## Key Features

TaskSphere addresses these challenges with the following features:

### Role-Based Access Control

TaskSphere uses Permit.io to manage roles and permissions seamlessly, ensuring that users have the appropriate access to tasks and functionalities based on their roles (admin, manager, or employee).

### Task Management

Admins and managers can create, update, and delete tasks, while employees can view and change the status of their assigned tasks, facilitating efficient workflow management.

### Staff Management

Users can manage staff, including assigning tasks and monitoring progress, ensuring that team members are working effectively and collaboratively.

### User-Friendly Interface

TaskSphere boasts a clean, intuitive interface designed with Tailwind CSS, making it easy for users to navigate and manage their tasks efficiently.


## Demo 
<video src="https://github.com/Subash-Lamichhane/TaskSphere/assets/109226874/cc105b24-2f6a-450f-9ddd-29de5a54d39b"></video>

## Getting Started

### Dependencies

- Node.js
- React
- Express
- MongoDB
- Permit.io

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Subash-Lamichhane/TaskSphere.git
```

#### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd TaskSphere/frontend
yarn
```

Start the development server:

```bash
yarn run dev
```

#### Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd ../backend
yarn install
```

Set up the environment variables by creating a `.env` file in the server directory and add your Gemini API key:

```bash
PERMIT_KEY='permit_key_********************************'
```

Pull PDP container
```bash
docker pull permitio/pdp-v2:latest
```

Run the container
```bash
docker run -it \
  -p 7766:7000 \
  --env PDP_API_KEY= YOUR_PERMIT_KEY\
  --env PDP_DEBUG=True \
  permitio/pdp-v2:latest

```

If you want, you can use 
```bash
permit_key_j0ZtQbuIqRaz5adIpZJB4JneoffsVGGyny71WrpD7NwISEFOElIhx1uhZdFuBwsDVpbeJ8mBqht7ydrCWWqQuO
```
as your permit key.

Start the backend server:

```bash
yarn run dev
```

## Usage

Visit the frontend application by opening your browser and navigating to:

```
http://localhost:5173/
```

Ensure the backend server is running at:

```
http://localhost:3000
```

## Screenshots

<!-- Add your screenshots here -->
Landing Page:
![Landing1](https://github.com/Subash-Lamichhane/TaskSphere/assets/109226874/66af3bcf-2dfe-4f32-a3a4-de9f48a1ce63)


Home Page:
![HomePage](https://github.com/Subash-Lamichhane/TaskSphere/assets/109226874/fe1b3db7-e2fe-4015-9860-d636df8072bf)

About Page:
![AboutPage](https://github.com/Subash-Lamichhane/TaskSphere/assets/109226874/57776da9-174f-463a-a51a-ecbd2fa2f75a)

<!-- ![SummaryPage1](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/89d27d65-38ed-46c9-a4fa-51e8c4371cfd) -->

Task Details Page:
![TaskDetails](https://github.com/Subash-Lamichhane/TaskSphere/assets/109226874/ea9f3529-b05d-4141-8b5d-ff64defb9aff)

## Contributing

We welcome contributions from the community! If you'd like to contribute to StudyMate, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your copy.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/Subash-Lamichhane/TaskSphere.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Implement your changes.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```

6. **Push Your Changes**:
   ```bash
   git push -u origin your-branch-name
   ```

7. **Create a Pull Request**: Submit your changes for review.

## License

This project is licensed under the [MIT License](LICENSE).


## Acknowledgments

- [Permit.io](https://permit.io/) for the role management
- [React](https://reactjs.org/) for the frontend library
- [Node.js](https://nodejs.org/) for the backend runtime
- [Express.js](https://expressjs.com/) for the web application framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework


---