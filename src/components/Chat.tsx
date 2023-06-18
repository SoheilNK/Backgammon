import WebSocket, { WebSocketServer } from "ws";

//create a websocket client and connect to the server for chat
const socket = new WebSocket("ws://localhost:8080");

const Chat: React.FC = () => {

    return (
        <div>
            <h1>Chat</h1>
            <div id="messages"></div>
            <form name="publish">
                <input name="message" type="text" />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default Chat;


    


// send message from the form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// message received - show the message in div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}

