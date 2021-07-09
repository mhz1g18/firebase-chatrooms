export interface ChatRoom {
  id: string;
  uid?: string;
  name: string;
}

export interface Message {
  id: string;
  uid: string;
  text: string;
  photoURL: string;
  chatroomId: string;
}
