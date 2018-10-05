# UserAuth
NodeJS Authentication API

Endpoint
`https://userauth-218420.appspot.com/`


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

  `{token:"<token>" }`

* **Success Response:**
    **Content:** `<username>`
 
* **Error Response:**

    **Content:** `"Token Expired"`

