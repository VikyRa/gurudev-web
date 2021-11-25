import { chatContants } from "../constant/chat"



export const fetchChat = ({ userId, chattingWithId }) => {
    return async dispatch => {
        dispatch({type:chatContants.FETCH_CHAT_REQUEST});
        await axiosIntance.get(`/chat`).then((res) => {
            dispatch({
                type: chatContants.FETCH_CHAT_SUCCESS,
                payload:  res.data.payload
            });
            const chatDiv = document.querySelector('#chatAreaMain');
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }).catch((err) => {
            dispatch({
                type: chatContants.FETCH_CHAT_FAIL,
                payload: { error: 'unable to fetch chat' }
            });
            alert('unable to fetch chat');
            console.log(err);
        });

    }
}


export const updateChat = (newChats) => {
    return { type: chatContants.UPDATE_CHAT, payload: newChats };
}


export const pushChat = (form) => {
    return async dispatch => {
        dispatch({type:chatContants.PUSH_CHAT_REQUEST});
        await axiosIntance.post('chat',form)
            .then(res => {
                dispatch({ type: chatContants.PUSH_CHAT, payload: res.data.payload });
                const chatDiv = document.querySelector('#chatAreaMain');
                chatDiv.scrollTop = chatDiv.scrollHeight;
                cb && cb();
            })
            .catch(err => {
                alert('unable to send message !');
                console.log(err);
            })
    };
}