import { io } from "socket.io-client"
import { BASE_URL } from "./constants"

let socketInstance

export const createSocketConnection = () => {
  if (socketInstance && socketInstance.connected) return socketInstance

  if (socketInstance) {
    try {
      socketInstance.disconnect()
    } catch {}
  }

  socketInstance = io(BASE_URL, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: true,
  })

  return socketInstance
}

export const getSocket = () => socketInstance

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect()
    socketInstance = null
  }
}
