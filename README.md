# nestjs-blog-usecase

##End-points:
### 1) Super-Admin Login : http://4.227.243.54:3001/super/login
### Request Body: {
    "email": "superadmin@gmail.com",
    "password": "super@admin"
}
### Response Body: {
    "statusCode": 200,
    "message": "successfully logged in",
    "data": ""  //token returned here as data
}
### 2) Create-User : http://4.227.243.54:3001/users/create-user
### Request Body: {
    "id": "S001",
    "name": "Pallavi",
    "email": "pallavi@gmail.com",
    "password": "12345",
    "role": "R004"
}
### Response Body: {
    "statusCode": 200,
    "message": "Successfully added user",
    "data": {
        "id": "U005",
        "name": "Prachoorya",
        "email": "prach@gmail.com",
        "password": "827ccb0eea8a706c4c34a16891f84e7b",
        "role": "R004"
    }
}
### 3) Super-Admin assigns roles: http://4.227.243.54:3001/super/assign-roles   //protected route
### Request Body: {
    "user_id":"U002",
    "role_id":"R003"
}
### Response Body: {
    "statusCode": 200,
    "message": "Successfully assigned roles",
    "data": {
        "id": "U002",
        "name": "Arpita",
        "email": "arpita@gmail.com",
        "password": "827ccb0eea8a706c4c34a16891f84e7b"
    }
}
### 4) User login (admin, editor): http://4.227.243.54:3001/users/login  
### Request Body: {
    "email":"choubey@gmail.com",
    "password":"12345"
}
### Response Body: {
    "statusCode": 200,
    "message": "successfully logged in",
    "data": ""  //user token here
}
### 5) Create topic (only admins/superadmins): http://4.227.243.54:3001/topic/create   //protected route
### Request Body: {
    "id":"T003",
    "name":"horror",
    "description":"stories",
    "user":null
}
### Response Body: {
    "statusCode": 200,
    "message": "Topic created succesfully",
    "data": {
        "id": "T003",
        "name": "horror",
        "description": "stories",
        "createdAt": "2024-02-19T09:01:43.000Z",
        "user_": "S001"
    }
}
### 6) Topic relations with user(owner): http://4.227.243.54:3001/topic/topic-relations   //protected route
### Request Body: {
    "topic_":"T003",
    "role_":"R003",
    "user_":"U002"
}
### Response Body: {
    "statusCode": 200,
    "message": "Data inserted",
    "data": {
        "topic_": "T003",
        "user_": "U002",
        "role_": "R003",
        "id": 3
    }
}
### 7) Create blog(user with editor access) : http://4.227.243.54:3001/blog/create-blog   //protected route
### Request Body: {
    "id":"B001",
    "title":"cricket is a gentleman's game",
    "description":"<h1>dabshkvkz</h1>",
    "topic_id":"T002"
}
### Response Body: {
    "statusCode": 200,
    "message": "Blog created successfully!",
    "data": {
        "id": "B001",
        "title": "cricket is a gentleman's game",
        "description": "dabshkvkz",
        "createdAt": "2024-02-19T05:10:53.000Z",
        "updatedAt": "2024-02-19T05:10:53.000Z",
        "topic_": "T002"
    }
}
### 8) Get all topics and owner details: http://4.227.243.54:3001/topic/view-topics  
### Response Body: [
    {
        "id": "T001",
        "name": "literature",
        "description": "stories",
        "createdAt": "2024-02-19T04:57:06.000Z",
        "user_": {
            "id": "S001",
            "name": "superadmin"
        }
    },
    {
        "id": "T002",
        "name": "Sports",
        "description": "cricket",
        "createdAt": "2024-02-19T04:58:00.000Z",
        "user_": {
            "id": "U001",
            "name": "Ankit Choubey"
        }
    }
]
### 9) Delete a blog(only admin/superadmin can delete): http://4.227.243.54:3001/blog/delete-blog  //protected route
### Request Body : {
    "blog_id":"B001"
}
### Response Body: {
    "statusCode": 200,
    "message": "Blog deleted successfully!",
    "data": {
        "raw": [],
        "affected": 1
    }
}

