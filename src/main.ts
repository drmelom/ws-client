import { connectToServer } from './socket-client'
import './style.css'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jwtToken" placeholder="Json Web Token"/>
    <button id="connect">Connect</button>
    <br>
    <span id="server-status">Offline</span> 
    <ul id="clients-ul">
    </ul>
    <form id="message-form">
      <input id="message-input" placeholder="Type your message here" />
    </form>
    <h3>Messages</h3>
    <ul id="message-ul"></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer('http://localhost:3000/socket.io/socket.io.js')
const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!
const connectButton = document.querySelector<HTMLButtonElement>('#connect')!
connectButton.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) alert('Please enter a valid token')
  connectToServer('http://localhost:3000', jwtToken.value)
}
)