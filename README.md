### Problem statement
<p>
Develop a RESTful API for a task management system, incorporating user authentication through JWT tokens to ensure secure access. Implement comprehensive CRUD operations to enable the creation, retrieval, updating, and deletion of tasks. Use a database of your choice for reliable data persistence. Additionally, validate input data to maintain data integrity and security throughout the system.
</p>

### Features
- User Authentication: `/src/modules/auth`
  - Using JWT tokens for user authentication.
- Task CRUD Operations: `/src/modules/task`
	- Create
	- Get One
	- Get All
	- Update
	- Delete One
	- Delete All
	 
	
- Data Persistence: `/src/database`
    - App supports `MySQL` & `SQLite` databases - SQLite is default for quickstart.
    
- Input Validation: `/src/**/*.dto.ts`
    - Using npm `Class validator` and DTO pattern for input payload validation.

### Instructions
Document the following:
- API endpoints.
- Data models.
- Provide clear and concise documentation to aid future developers who may work with your code.
- Any other relevant information necessary for understanding and using your code.
- Make sure to create a socket to stream the data created In real-time.
- Use GitHub to manage your code.
- Share the repository URL along with any necessary documentation or instructions for running the code through the email thread on Factorial.
- Please complete the following tasks within 5 days.

## Download a copy

```bash
$ git clone https://github.com/godsgiftuko/task_management_system.git
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

<p align="center">
  <a style="text-decoration: underline" href="https://documenter.getpostman.com/view/8901262/2sA3JT3yDG" target="blank">See documentation<img src="https://learndirectus.com/content/images/2022/03/postman.png" width="100%" alt="Nest Logo" /></a>
</p>

## Data models
- User ER diagram
![User ER diagram](./src/modules/user/user.er.diagram.png)

- Task ER diagram
![Task ER diagram](./src/modules/task/task.er.diagram.png)
