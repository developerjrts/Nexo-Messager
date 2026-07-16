
 export interface IUser {
    avatar: string
    bio: string,
    createdAt: string
    email: string
    isOnline: boolean,
    isVerified: boolean
    name: string
    updatedAt: string
    username: string
    __v: string
    _id: string
}

export interface IMessage {
    conversationId: string,
    senderId: {       
    avatar: string
    name: string
    _id: string
    }, 
    text: string,
    readBy: string,
    createdAt: string,
    updatedAt: string
}