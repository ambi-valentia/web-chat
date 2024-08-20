import {wrapper} from "../../utils/wrapper";
import {URLS} from "../../constants/urls";

export const getChatList = () => {
    return wrapper("get", URLS.LIST,undefined,{version: '0.0'})
}

export const getMessages = (chatId: string) => {
    return wrapper("get", URLS.MESSAGES+"chat_id="+chatId,undefined,{version: '0.0'})
}