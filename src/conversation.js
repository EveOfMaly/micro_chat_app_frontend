


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

            
           const chatbox =  document.querySelector("#chatbox")
           chatbox.className = conversation['data']['id']


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

    static fetchConversation(sender_id, recipient_id) {

    
        const userURL = "http://localhost:3000/conversations";
        return fetch(userURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(userJson) {
            return Conversation.renderConversation(userJson, sender_id, recipient_id)
            console.log(userJson);   
        })
        .then(function(userJson) {
            setTimeout(function() { Conversation.fetchConversation(sender_id, recipient_id)}, 5000);
            console.log(userJson);   
        })
        .catch(function(error) {
            alert("Conversation could not be rendered on screen");
            console.log(error.message);
        });

        
    }


    static renderConversation(array, sender_id, recipient_id){
       
        
        const arrayData = array['data']
        let convo 
        let chatbot = document.querySelector("#chatbox")

        
        
        let listElement = document.createElement('ul')
        listElement.id = "message"
       


        for (let i = 0; i < arrayData.length; i++) {
            if (array['data'][i]['attributes']['sender_id']  === parseInt(`${sender_id}`)  &&  array['data'][i]['attributes']['recipient_id'] === parseInt(`${recipient_id}`)){
                convo = array['data'][i]['attributes']
            }
          }
        
          for (let i = 0; i < convo.messages.length; i++) {
            chatbot.appendChild(listElement)
            console.log(convo.messages[i].content)
            let newMessageContainer = document.createElement('div')
            
            let li = document.createElement('li')
            li.innerText =  convo.messages[i].content
            listElement.appendChild(li)
          }

          
        //   setTimeout(() => {
        //     const elem = document.querySelector("#message")
        //     elem.parentNode.removeChild(elem);
        //     }, 5000);

        // setTimeout(function() { Conversation.fetchConversation(sender_id, recipient_id)}, 1000);
    }


}


function updateDiv(){ 
    const chatbox =  document.querySelector("#chatbox")
    $(`chatbox`).load(window.location.href + `#chatbox` );
}

