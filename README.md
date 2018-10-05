# UserAuth
NodeJS Authentication API

**Show User**
----
  Returns json data about a single user.

* **URL**

  /users/:id

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
