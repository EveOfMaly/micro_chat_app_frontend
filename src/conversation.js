


class Conversation{
    constructor(sender_id, recipient_id) {
        this.sender_id = sender_id ;
        this.recipient_id = recipient_id;
    }

    static makeConversation(sender_id, recipient_id) {
        var obj = new Conversation(sender_id, recipient_id)
        return obj;
    }

    // static fetchRecipient(recipientData) {
        

    //     const userURL = "http://localhost:3000/users";

    //     return fetch(userURL)
    //     .then(function(response) {
    //           return response.json();
    //     })
    //     .then(function(userJson) {
    //         return Conversation.returnRecipient(userJson, recipientData)
    //     } )  
    //     .catch(function(error) {
    //         alert("Cannot get index User Controllers");
    //         console.log(error.message);
    //     });
    // }

 
        // static returnRecipient(array, recipient){
        //     let copyOfuserJson = Object.assign({}, array)
        //     let recipientObject = []

            
        //      copyOfuserJson['data'].forEach( user => {
        //          if (user['attributes']['username'] === recipient) {
        //                 return recipientObject.push(user)
        //         }
        //     })   
        //     console.log(recipientObject[0]['id'])
        //     return recipientObject[0]['id']  
        // }



    static newConversationPush(senderId, recipientID, newMessage){

        
        
        const userURL = "http://localhost:3000/conversations";
        
        const configurationObject = {
            method: "POST",
            headers: {
                       "Content-Type": "application/json",
                        Accept: "application/json"
                      },
            body: JSON.stringify({
                sender_id: senderId,
                recipient_id: recipientID
            })
        };  
        return fetch(userURL, configurationObject)
        .then(function(response) {
            return  response.json();
        })
        .then(function(conversation) {
            console.log(`about to post to message`)
            console.log(`${senderId}`)
            console.log(`${conversation['data']['id']}`)
            console.log(newMessage)

            // const sendForm = document.getElementsByClassName("send-message")[0]
            // console.log(`Conversation ${conversation}`);
            // console.log(`Conversation Object Data ${conversationObject}`)
            
            
            // const newMessage = e.target.children[0].value
            
            // console.log(`newMessage is ${newMessage}`)

            // let newMessageObject= new Message(senderId, conversationObject, newMessage)
            // console.log(`new Message Object is ${newMessage}`)

            
            return Message.postMessage(senderId, parseInt(`${conversation['data']['id']}`), newMessage )
            // console.log(newMessageObject)
            // return newMessageObject
        })
        .catch(function(error) {
            alert("Conversation is not created");
            console.log(error.message);
        });
        
    }

    // changeto fetch and create conversation

    


    // console.log (Conversation.makeConversation(senderId, user.id))
                    // debugger
                    // return Conversation.makeConversation(senderId, user.id)




}