# UserAuth
NodeJS Authentication API

**Add User**
----
  Add User

* **URL**

  /api/User

* **Method:**

  `POST`

* **Body**

  `{Username: "artn", Password:"askdoaskdas" }`

* **Success Response:**
    **Content:** `"Registration Sucessfuly"`
 
* **Error Response:**

    **Content:** `"User already exist"`

    **Content:** `"Password does not meet the requirements"`
    
    **Content:** `"Invalid Username"`


**Login User**
----
  Add User

* **URL**

  /api/Auth

* **Method:**

  `POST`

* **Body**

  `{Username: "artn", Password:"askdoaskdas" }`

* **Success Response:**
    **Content:** `"{token: <token>}"`
 
* **Error Response:**

    **Content:** `"Authentication Error"`

