// async function getData(){
//     const api = "https://api.everrest.educata.dev"
//     try{
//         const response = fetch(api);
//         console.log(api)
//     }catch(error){

//     }
// }


// const response = fetch("https://api.everrest.educata.dev");
// const json = response.json();
// console.log(json);



// success api endpoints

// shop/products/all
// async function getData(){
//     const api = "https://api.everrest.educata.dev/shop/products/all";
//     const response = await fetch(api);
//     const json = await response.json();
//     console.log(json.products[0]);
// }

// succesfully sign up

async function sign_up() {
    const api = "https://api.everrest.educata.dev/auth/sign_up";

    // Example user data for sign-up
    const userData = {
        firstName: "giorgi",
        lastName: "kheladze",
        age: 20,
        email: "gio@gmail.com",
        password: "12345678",
        address: "somewhere",
        phone: "+995599123456",
        zipcode: "1900",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane",
        gender: "MALE"
    };

    try{
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-type": "application/json" 
            },
            body: JSON.stringify(userData)
        })
        const json = await response.json();
        console.log(json)
    }catch(error){
        console.error("Error signing up:", error);
    }
}
sign_up();

// succesfully sign in

async function sign_in() {
    const api = "https://api.everrest.educata.dev/auth/sign_in";

    const loginData = {
        email: "gio@gmail.com",
        password: "12345678"
    };

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const json = await response.json();

        if (json.access_token) {
            localStorage.setItem("authToken", json.access_token); // Store token
            console.log("Login Successful! Token saved.");
        } else {
            console.log("Login failed:", json);
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

sign_in();



// success verify

async function verifyEmail(){
    const api = "https://api.everrest.educata.dev/auth/verify_email"

    const verifyData = {
        email: "gio@gmail.com"
    }

    try{
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(verifyData)
        })

        const json = await response.json();
        console.log(json)

    }catch(error){
        console.error(error);
    }
}

verifyEmail();


// work if email will be verified
async function getCurrentUser() {
    const api = "https://api.everrest.educata.dev/auth";
    const token = localStorage.getItem("authToken"); // Retrieve token from storage

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Send token in headers
            }
        });

        const json = await response.json();
        console.log("User Info:", json);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Call after login
getCurrentUser();


// also this work is email is verified
async function getUserById(){
    const api = "https://api.everrest.educata.dev/auth/id/:id";
    let token = localStorage.getItem("authToken")

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    try{
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            } 
        })

        const json = await response.json();
        console.log(json);
    }catch(error){
        console.error(error);
    }
}
getUserById();

// static

async function getAllUsers(page_size, page_index) {
    const api = `https://api.everrest.educata.dev/auth/all?page_size=${page_size}&page_index=${page_index}`;
    
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");  // Replace with the actual token retrieval mechanism

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Add the token to the request headers
            }
        });

        const json = await response.json();
        console.log(json); // Logs the list of users or any other response from the API

    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// // Call the function with desired page_size and page_index
getAllUsers(10, 1);  // Example: Fetch 10 users from page 1



// dinamica; 
async function getAllUsers() {
    const api = "https://api.everrest.educata.dev/auth/all";
    const token = localStorage.getItem("authToken");  // Retrieve token from localStorage

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    let page_size = 10;
    let page_index = 1; 
    let allUsers = []; 

    try {
        while (true) {
            // Construct the API URL with dynamic page size and page index
            const url = `${api}?page_size=${page_size}&page_index=${page_index}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Send token in headers
                }
            });

            const json = await response.json();

            if (json && json.data && json.data.length > 0) {
                allUsers = allUsers.concat(json.data);  // Append users to the list
                page_index++;  // Move to the next page
            } else {
                // If no more users or no data in response, break out of the loop
                console.log("All users fetched.");
                break;
            }
        }

        console.log("All users:", allUsers);  // Print all users
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

getAllUsers();  // Call the function to get all registered users


// refres tokens in thelocallsorage, request headers and coockies
async function refreshTokenLocalStorage(){
    const api = "https://api.everrest.educata.dev/auth/refresh"
    const refreshToken = localStorage.getItem("refreshToken")

    if (!refreshToken) {
        console.error("No refresh token found. Please log in again.");
        return;
    }

    try{
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh_token: refreshToken  // Send refresh token in body
            })
        })
        const json = await response.json();
        console.log(json)

        if (json.access_token) {
            localStorage.setItem("authToken", json.access_token);
        }

    }catch(error){
        console.error(error)
    }
}

refreshTokenLocalStorage()


// in the request headers
async function refreshTokenHeaders() {
    const api = "https://api.everrest.educata.dev/auth/refresh";
    
    // Retrieve the refresh token from localStorage (or cookie)
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        console.error("No refresh token found. Please log in again.");
        return;
    }

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`  // Send refresh token in Authorization header
            }
        });

        const json = await response.json();
        console.log(json);

        // Save the new access token if available
        if (json.access_token) {
            localStorage.setItem("authToken", json.access_token);
        }

    } catch (error) {
        console.error("Error refreshing token:", error);
    }
}

refreshTokenHeaders();

// refresh in the coocies
async function refreshToken() {
    const api = "https://api.everrest.educata.dev/auth/refresh";

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // No need to manually set refresh_token if it's in cookies
            },
            credentials: 'include'  // Include cookies with the request
        });

        const json = await response.json();
        console.log(json);

        // Save the new access token if available
        if (json.access_token) {
            localStorage.setItem(json.access_token);
        }

    } catch (error) {
        console.error("Error refreshing token:", error);
    }
}

refreshToken();


// update user data
async function updateUserData(){
    const api = "https://api.everrest.educata.dev/auth/update"
    const token = localStorage.getItem("authToken"); 

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    const updateData = {
        firstname: "giorgi",
        lastname: "kheladze",
        age: 19,
        email: "gi0@gmail.com",
        adress: "tbilisi",
        phone: "",
        zipcode: "99189",
        avatar: "",
        gender: "MALE"
    }

    try{
        const response = await fetch(api, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        })
        const json = await response.json();
        console.log(json);

        if (json.error) {
            console.error(json.error);
        }

    }catch(error){
        console.error(error)
    }
}

updateUserData()



// recover password
async function recoverPassword(){
    const api = "https://api.everrest.educata.dev/auth/recovery";

    const recoverEmail = {
        email: "gio@gmail.com"
    }

    try{
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoverEmail)
        })
    
        const json = await response.json()

        if (response.ok) {
            console.log("Password recovery successful. Please check your email for the new password.");
        } else {
            console.error("Error:", json.error || json.message);
        }
    }catch(error){
        console.error(error)
    }
}

recoverPassword()

// change password

async function changePassword(){
    const api = "https://api.everrest.educata.dev/auth/change_password"

    const resetPassword = {
        oldPassword: "",
        newPassword: ""
    }

    try{
        const response = await fetch(api, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetPassword)
        });

        const json = await response.json();
        console.log(json)

    }catch(error){
        console.error(error);
    }
}
changePassword()



// bugs
// 1.check is satus is ok
// 2.await always used with fetch inside async 