
class Message{
    constructor(user, conversation, content) {
        this.name = user ;
        this.conversation = conversation;
        this.content = content;
    }


    


    // postMessage(e){
    //     const newMessage = e.target.children[0].value
    //     if (newMessage === "") {
    //         return window.alert("You entered a blank username")
    //     } else {
    //         let newUserObject = new User(formValue)
    //         const userURL = "http://localhost:3000/users";

    //         const configurationObject = {
    //             method: "POST",
    //             headers: {
    //                 // #type of content type we are sending 
    //                 // type of content type we accept
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json"
    //             },
    //             body: JSON.stringify(newUserObject)
    //         };
    
    //         fetch(userURL, configurationObject)
    //         .then(function(response) {
    //             return response.json();
    //         })
    //         .then(function(user) {
    //             let newUser = new User(user)
    //             console.log(newUser);
    //             newUser.displayUser()
    //             User.fetchUsers(newUser);
    //             // debugger
    //             // let users =  newUser.fetchUsers()
              
    //         })
    //         .catch(function(error) {
    //             alert("User not added to User Controller");
    //             console.log(error.message);
    //         });
    //     }

        
    // }

   

}