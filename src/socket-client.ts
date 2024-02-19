import { Manager, Socket } from "socket.io-client"
let socket:Socket

export const connectToServer = (url: string,token:string) => {
  const manager = new Manager(url,{
    extraHeaders:{
      Authorization: `${token}`
    }
  })
  socket?.removeAllListeners()
  socket = manager.socket('/')
  addListener()
}

const addListener = () =>{
  const serverStatusLabel = document.querySelector('#server-status')!
  const clientsUl = document.querySelector('#clients-ul')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
  const messageUl = document.querySelector<HTMLUListElement>('#message-ul')!
  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Online'
  })
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Offline'
  })

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = ''
    clients.forEach(client => {
      clientsHtml += `<li>${client}</li>`
    })
    clientsUl.innerHTML = clientsHtml 
  })
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(messageInput.value.trim().length <= 0) return
    socket.emit('message', { id:'yo', message:messageInput.value })
    console.log({ id:'yo', message:messageInput.value })
    messageInput.value = ''
  })
  socket.on('message-from-server', (payload: {fullName:string, message:string} ) => {
    const newMessage = document.createElement('li')
    newMessage.innerHTML = `<b>${payload.fullName}</b>: ${payload.message}`
    messageUl.appendChild(newMessage)

  })
}