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

  `{Username: "<username>", Password:"<password>" }`

* **Success Response:**
    **Content:** `"Registration Sucessfuly"`
 
* **Error Response:**

    **Content:** `"User already exist"`

    **Content:** `"Password does not meet the requirements"`
    
    **Content:** `"Invalid Username"`


**Login User**
----
   Login user returns Token

* **URL**

  /api/Auth

* **Method:**

  `POST`

* **Body**

  `{Username: "<username>", Password:"<password>" }`

* **Success Response:**
    **Content:** `"{token: <token>}"`
 
* **Error Response:**

    **Content:** `"Authentication Error"`
    
    

**Token Auth**
----
  Checks if token is valid returns Username

* **URL**

  /api/TokenAuth

* **Method:**

  `POST`

* **Body**

  `{Token:"<token>" }`

* **Success Response:**
    **Content:** `"{token: <token>}"`
 
* **Error Response:**

    **Content:** `"Authentication Error"`

