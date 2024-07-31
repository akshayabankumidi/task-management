# Task Management API Documentation

## Base URL


## Authentication
All endpoints require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

## Endpoints

### 1. Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "due_date": "string (ISO 8601 format)",
    "assigned_to": "string (user_id)",
    "priority": "string (low|medium|high)"
  }
  ```
- **Response**: 
  - Status: 201 Created
  - Body: 
    ```json
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "due_date": "string",
      "assigned_to": "string",
      "priority": "string",
      "status": "string (pending|in_progress|completed)",
      "created_at": "string",
      "updated_at": "string"
    }
    ```

### 2. Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `status`: string (optional)
  - `assigned_to`: string (optional)
  - `page`: integer (optional, default: 1)
  - `limit`: integer (optional, default: 20)
- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "tasks": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "due_date": "string",
          "assigned_to": "string",
          "priority": "string",
          "status": "string",
          "created_at": "string",
          "updated_at": "string"
        }
      ],
      "total": "integer"
    }
    ```

### 3. Get Task by ID
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Response**:
  - Status: 200 OK
  - Body: Same as single task object in Create Task response

### 4. Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Request Body**: Same as Create Task, all fields optional
- **Response**:
  - Status: 200 OK
  - Body: Updated task object

### 5. Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response**:
  - Status: 204
  - Body: Successfully deleted {deleted_id}

### 6. Update Task Status
- **URL**: `/tasks/:id/status`
- **Method**: `PATCH`
- **Request Body**:
  ```json
  {
    "status": "string (pending|in_progress|completed)"
  }
  ```
- **Response**:
  - Status: 200 OK
  - Body: Updated task object

### 7. Get Task Metrics
- **URL**: `/metrics`
- **Method**: `GET`
- **Query Parameters**:
  - `start_date`: string (ISO 8601 format)
  - `end_date`: string (ISO 8601 format)
- **Response**:
  - Status: 200 OK
  - Body:
    ```json
    {
      "total_tasks": "integer",
      "completed_tasks": "integer",
      "overdue_tasks": "integer",
      "average_completion_time": "float (in days)"
    }
    ```

## Error Responses
All endpoints may return the following error responses:

- 400 Bad Request: Invalid input
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server-side error

Error response body:
```json
{
  "error": "string (error message)",
}
```