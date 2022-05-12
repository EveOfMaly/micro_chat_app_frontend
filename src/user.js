document.addEventListener("DOMContentLoaded", () => {
    User.createUser();
})


class User {
    constructor (name) {
        this.username = name;
    }

    displayUser(){
        const loginWrapper = document.querySelector("body > div.login-wrapper")
        const wrapper =  document.getElementsByClassName('wrapper')[0]
        const newUserForm = document.getElementsByClassName('new-user-form')[0]
        newUserForm.style.visibility = "hidden"
        wrapper.style.display = "block"
        let h2 = document.createElement('h2')
        h2.innerText = `Welcome ${this["username"]["data"]["attributes"]["username"]}`
        wrapper.parentNode.insertBefore(h2, wrapper) //insert after the wrapper 
    }

    renderRegisteredUsers(userInstance, users) {
        let newUsersArray = users.slice()
        
        let registeredUserSection = document.getElementsByClassName('registered-users-section')[0]
        let registeredUsersContainer = document.createElement('div')
        let listElement = document.createElement('ul')
        registeredUserSection.appendChild(listElement)

        
    
        //list of all users that don't include user instance
        let ArrayOfRegisteredUser = newUsersArray.filter(user => {
            return user["attributes"]['username'] != userInstance['username']['data']['attributes']['username']
        })

        
       //create list for each user 
       ArrayOfRegisteredUser.forEach (user => {
        let li = document.createElement('li')
        li.innerText =  user['attributes']['username'] 
        listElement.appendChild(li)
       })
    }


    static fetchUsers(userInstance) {

        let currentUser = userInstance 

        const userURL = "http://localhost:3000/users";
        return fetch(userURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(userJson) {
            currentUser.renderRegisteredUsers(currentUser, userJson["data"]) 
            console.log(userJson);   
        })
        .catch(function(error) {
            alert("Cannot get index User Controllers");
            console.log(error.message);
        });
    }


   

    static createUser(){
        const newUserForm = document.getElementsByClassName('new-user-form')[0]
        
        newUserForm.addEventListener('submit', (e) =>   {
            // const newUserValue = document.querySelector("#new-user-name").value
            e.preventDefault() //ensure the button doesn't redirect on click. 
            const formValue =  e.target.children[1].value; //value of the input
            if (formValue === "") {
                return window.alert("You entered a blank username")
            } else {
                let newUserObject = new User(formValue)
                const userURL = "http://localhost:3000/users";

                const configurationObject = {
                    method: "POST",
                    headers: {
                        // #type of content type we are sending 
                        // type of content type we accept
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify(newUserObject)
                };
        
                fetch(userURL, configurationObject)
                .then(function(response) {
                    return response.json();
                })
                .then(function(user) {
                    let newUser = new User(user)
                    console.log(newUser);
                    newUser.displayUser()
                    User.fetchUsers(newUser);
                    // debugger
                    // let users =  newUser.fetchUsers()
                  
                })
                .catch(function(error) {
                    alert("User not added to User Controller");
                    console.log(error.message);
                });
            }
        })
    }



    displayChatWidget(){


    }
 


    sendMessage(currentUser){



    }


}


