# task-manager

## Features

- Create a new task
- Retrieve all tasks
- Retrieve a task by ID
- Update a task
- Delete a task

## Installation
1. Install Node.js version 18:

2. Clone the repository:

  git clone https://github.com/hemanth8660/task-manager.git
  cd task-manager

3. Install the dependencies:
    npm install

4. Start the server:
    npm start

## Usage
The API can be accessed at `http://localhost:3000/api`

## API Endpoints

### Get All Tasks

- **Endpoint**: `/api/tasks`
- **Method**: `GET`
- **Description**: Retrieve all tasks.

### Filter Tasks

- **Endpoint**: `/api/filterTask`
- **Method**: `GET`
- **Description**: Filter tasks based on certain criteria.(Based On CreatedAt Date)

### Create a Task

- **Endpoint**: `api/tasks`
- **Method**: `POST`
- **Description**: Create a new task.

### Get Task by ID

- **Endpoint**: `/api/tasks/:id`
- **Method**: `GET`
- **Description**: Retrieve a task by its ID.

### Get Tasks by Priority

- **Endpoint**: `/api/tasks/priority/:level`
- **Method**: `GET`
- **Description**: Retrieve tasks by their priority level.

### Set Task Priority

- **Endpoint**: `api/tasks/priority`
- **Method**: `PUT`
- **Description**: Set the priority of a task.

### Update a Task

- **Endpoint**: `api/tasks/:id`
- **Method**: `PUT`
- **Description**: Update a task by its ID.

### Delete a Task

- **Endpoint**: `api/tasks/:id`
- **Method**: `DELETE`
- **Description**: Delete a task by its ID.

