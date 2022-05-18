


class Conversation{
    constructor(sender_id, recipient_id) {
        this.sender_id = sender_id ;
        this.recipient_id = recipient_id;
    }

    static makeConversation(sender_id, recipient_id) {
        var obj = new Conversation(sender_id, recipient_id)
        return obj;
    }

    static fetchConversation(sender_id, recipient_id) {

    
        const userURL = "http://localhost:3000/conversations";
        return fetch(userURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(userJson) {
            const messageList =  document.querySelector("#message-list")

            messageList.innerHTML = ""
            
            return Conversation.renderConversation(userJson, sender_id, recipient_id)
            console.log(userJson);   
        })
        .catch(function(error) {
            // alert("Conversation could not be rendered on screen");
            console.log(error.message);
        });

        
    }

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


    static renderConversation(array, sender_id, recipient_id){
        
        
        const arrayData = array['data']
        let convo 
       
        

        for (let i = 0; i < arrayData.length; i++) {
            if (array['data'][i]['attributes']['sender_id']  === parseInt(`${sender_id}`)  &&  array['data'][i]['attributes']['recipient_id'] === parseInt(`${recipient_id}`)){
                convo = array['data'][i]['attributes']
            }
          }

          let messages = convo['messages']


          

    //     const length = messages.length
        
    //     const mostRecent = messages.slice(length - 3)
    //     const list = document.querySelector("#message-list")

    //     let newList = ""
        

    //     mostRecent.forEach(message => {
            
    //     if (!document.querySelector(`li[data-id='${message.id}']`)) {
    //   newList += Conversation.makeLi(message)}
    //   debugger
    // })
    // if (newList != "") {
    // list.innerHTML += newList
    // }



   
        let chatbot = document.querySelector("#chatbox")

        
        
        let listElement = document.querySelector("#message-list")

        // let newList = ""


          for (let i = 0; i < messages.length; i++) {

              
            console.log(convo.messages[i].content)            
            let li = document.createElement('li')
            li.innerText =  convo.messages[i].content
            listElement.appendChild(li)
            
          }
  



            

  
    }



    static grabMessages(sender_id, recipient_id){
        Conversation.fetchConversation(sender_id, recipient_id)
    }

    // static makeLi(message){
    //     let li = document.createElement('li')
    //     li.innerHTML = <li data-id='${message.id}'>${message.message}</li>
    //     debugger
    //     return li

    // }

}


// function updateDiv(){ 
//     const chatbox =  document.querySelector("#chatbox")
//     $(`chatbox`).load(window.location.href + `#chatbox` );
// }

