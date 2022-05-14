document.addEventListener("DOMContentLoaded", () => {
    User.createUser();
    
})


class User {
    constructor (name) {
        this.username = name;
    }


    usersRecipient(e){
        let sender = this
        let recipient = e.target.textContent
        this.sendlistener(sender, recipient)
        this.updateChat(recipient)
    }

    updateChat(recipient){
        const chatbox =  document.querySelector("#chatbox")
        chatbox.style.color = "orange" 
        chatbox.innerHTML = `....starting conversation with ${recipient}.`
    }



    sendlistener(sender, recipient){
        const sendForm = document.getElementsByClassName("send-message")[0]
        sendForm.addEventListener('submit', (e) =>   {
            
            e.preventDefault() 
            const recipientID = Conversation.fetchRecipient(recipient)
            
            //get senderID  and recipient IDs
            const senderId =  sender["username"]['data']['id']

            const newMessage = e.target.children[0].value
            //??



            // const recipientObject = Conversation.returnID(recipientID)
        
            console.log(`sender ID: ${senderId}`)
            console.log(`recipient ID: ${recipientID}`)

            
            
            
        })
        // Conversation.newConversationPush(senderId, recipientID)
    }

    

            //create new conversation
            // Conversation.newConversationPush(senderId, recipientID)



            // let newConversationObjectData = new Conversation(sender, recipient)
            // console.log(newConversationObjectData)
            // let newMessageObjectData = new Message(sender, newConversationObjectData, newMessage)
            // console.log(newMessageObjectData)
            

            // if (newMessage === "") {
            //             return window.alert("You entered a blank username")
            //         } else {

            //              //instantiate conversation and create conversation
            //            let newConversation = Conversation.newConversationPush(sender, recipient)
            //              // 


                         
                    //     const userURL = "http://localhost:3000/messages";
            
                    //     const configurationObject = {
                    //         method: "POST",
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //             Accept: "application/json"
                    //         },
                    //         body: JSON.stringify({
                    //             username: newMessage
                    //         })
                    //     };
                
                    //     fetch(userURL, configurationObject)
                    //     .then(function(response) {
                    //         return response.json();
                    //     })
                    //     .then(function(message) {
                    //         let newUser = new User(user)
                    //         console.log(newUser);
                    //         newUser.displayUser()
                    //         User.fetchUsers(newUser);
                    //         // debugger
                    //         // let users =  newUser.fetchUsers()
                          
                    //     })
                    //     .catch(function(error) {
                    //         alert("User not added to User Controller");
                    //         console.log(error.message);
                    //     });
                    // }
          
     
    displayUser(){
        const loginWrapper = document.getElementsByClassName('login-wrapper')[0]
        const wrapper =  document.getElementsByClassName('wrapper')[0]
        const newUserForm = document.getElementsByClassName('new-user-form')[0]
        const welcome = document.querySelector("#menu > p.welcome")
        const formContainer = document.getElementsByClassName('form-container')[0]

        newUserForm.style.visibility = "hidden"
  
     
        let h2 = document.createElement('h2')
        // welcome.appendChild(h2)
        formContainer.remove()
        welcome.innerText = `Welcome, ${this["username"]["data"]["attributes"]["username"]}`
        wrapper.style.display = "block"
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
        li.addEventListener('click', (e) => {
            this.usersRecipient(e)
        })
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
                // let newUserObject = new User(formValue)
                const userURL = "http://localhost:3000/users";

                const configurationObject = {
                    method: "POST",
                    headers: {
                        // #type of content type we are sending 
                        // type of content type we accept
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        username: formValue
                    })
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
}







