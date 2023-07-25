export type ChatType = {
    id: number;
    lastMessage: {
        creationDate: string;
        id: number;
        isRead: boolean;
        senderId: number;
        text: string;
    };
    recipientId: number;
    recipientLogin: string;
    recipientName: string;
    userId: number;
};

export type ChatRoomType = {
    id: number;
    userId: number;
    recipientId: number;
    recipientName: string;
    recipientLogin: string;
    lastMessageDate: string;
    lastMessageText: string;
};
export type MessageType = {
    id: number;
    creationDate: string;
    isRead: boolean;
    senderId: number;
    text: string;
};
export type MessagesType = {
    items: MessageType[];
    totalCount: number;
    currentPage: number;
};

export type ResponseMessageType = {
    chatRoom: ChatRoomType;
    messages: MessagesType;
};

export type UseFetchresponseMessageType = {
    data: ResponseMessageType;
    loading: boolean;
};

export type ProfileType = {
    email: string;
    facebook: string;
    firstName: string;
    image: string;
    instagram: string;
    isBlocked: boolean;
    isCurrentUser: boolean;
    isOnline: boolean;
    isVerified: boolean;
    lastName: string;
    middleName: string;
    partnerFirstName: string;
    partnerId: number;
    partnerLastName: string;
    partnerMiddleName: string;
    phoneNumber: string;
    rang: string;
    telegram: string;
    twitter: string;
    vkontakte: string;
    yearsOld: number;
    youtube: string;
};