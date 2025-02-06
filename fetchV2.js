// sign-up
async function sign_up() {
    const api = "https://api.everrest.educata.dev/auth/sign_up";

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

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        const json = await response.json();
        if (response.ok) {
            console.log("Sign up successful:", json);
        } else {
            console.error("Sign up failed:", json.error);
        }
    } catch (error) {
        console.error("Error signing up:", error);
    }
}
sign_up();



// sign-in
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
        if (response.ok && json.access_token) {
            localStorage.setItem("authToken", json.access_token); // Store token
            console.log("Login Successful! Token saved.");
        } else {
            console.error("Login failed:", json.error || json.message);
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

sign_in();


// verifyEmail()
async function verifyEmail() {
    const api = "https://api.everrest.educata.dev/auth/verify_email";

    const verifyData = {
        email: "gio@gmail.com"
    };

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(verifyData)
        });

        const json = await response.json();
        if (response.ok) {
            console.log("Email verification successful:", json);
        } else {
            console.error("Email verification failed:", json.error || json.message);
        }
    } catch (error) {
        console.error("Error verifying email:", error);
    }
}

verifyEmail();




// getCurrentUser()
async function getCurrentUser() {
    const api = "https://api.everrest.educata.dev/auth";
    const token = localStorage.getItem("authToken");

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
        if (response.ok) {
            console.log("User Info:", json);
        } else {
            console.error("Failed to fetch user data:", json.error || json.message);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Call after login
getCurrentUser();





// getUserById()
async function getUserById(userId) {
    const api = `https://api.everrest.educata.dev/auth/id/${userId}`;
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const json = await response.json();
        if (response.ok) {
            console.log("User by ID:", json);
        } else {
            console.error("Failed to fetch user by ID:", json.error || json.message);
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
    }
}

// Pass the user ID as an argument
getUserById(123); // Example user ID




// getAllUsers()
async function getAllUsers(page_size = 10, page_index = 1) {
    const api = `https://api.everrest.educata.dev/auth/all?page_size=${page_size}&page_index=${page_index}`;
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("No token found. Please log in first.");
        return;
    }

    let allUsers = [];
    
    try {
        while (true) {
            const url = `${api}?page_size=${page_size}&page_index=${page_index}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const json = await response.json();
            if (response.ok && json.data && json.data.length > 0) {
                allUsers = allUsers.concat(json.data);
                page_index++; // Move to the next page
            } else {
                console.log("All users fetched.");
                break;
            }
        }

        console.log("All users:", allUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

getAllUsers(10, 1);  // Call with desired page_size and page_index




// refreshTocken()
async function refreshToken() {
    const api = "https://api.everrest.educata.dev/auth/refresh";
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        console.error("No refresh token found. Please log in again.");
        return;
    }

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh_token: refreshToken })
        });

        const json = await response.json();
        if (response.ok && json.access_token) {
            localStorage.setItem("authToken", json.access_token); // Save new access token
            console.log("Token refreshed successfully.");
        } else {
            console.error("Failed to refresh token:", json.error || json.message);
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
}

refreshToken();



// updateUserData()
async function updateUserData() {
    const api = "https://api.everrest.educata.dev/auth/update";
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
        address: "tbilisi",
        phone: "", 
        zipcode: "99189",
        avatar: "",
        gender: "MALE"
    };

    try {
        const response = await fetch(api, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            const json = await response.json();
            console.error("Error updating user:", json.error || json.message);
        } else {
            const json = await response.json();
            console.log("User updated successfully:", json);
        }

    } catch (error) {
        console.error("Error updating user:", error);
    }
}

updateUserData();







// recoverPassword()
async function recoverPassword() {
    const api = "https://api.everrest.educata.dev/auth/recovery";
    const recoverEmail = {
        email: "gio@gmail.com"
    };

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoverEmail)
        });

        const json = await response.json();

        if (response.ok) {
            console.log("Password recovery successful. Please check your email for the new password.");
        } else {
            console.error("Error during password recovery:", json.error || json.message);
        }
    } catch (error) {
        console.error("Error during password recovery:", error);
    }
}

recoverPassword();




// changePassword()
async function changePassword() {
    const api = "https://api.everrest.educata.dev/auth/change_password";

    const resetPassword = {
        oldPassword: "yourOldPasswordHere",
        newPassword: "yourNewPasswordHere"  
    };

    if (!resetPassword.oldPassword || !resetPassword.newPassword) {
        console.error("Both old and new passwords are required.");
        return;
    }

    try {
        const response = await fetch(api, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetPassword)
        });

        const json = await response.json();

        if (!response.ok) {
            console.error("Error changing password:", json.error || json.message);
        } else {
            console.log("Password changed successfully:", json);
        }

    } catch (error) {
        console.error("Error changing password:", error);
    }
}

changePassword();

