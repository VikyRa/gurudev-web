import useHandleResponse from '../utilities/handleResponse';
import { useSnackbar } from 'notistack';
import axoisInst from '../helpers/axoisInst';
import store from '../store';

const token = window.localStorage.getItem('token');

export function useGetUsers() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization':token ? `Beare ${token}` : '',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
    };

    const getUsers = () => {
        return fetch(
            `/api/chat/getusers`,
            requestOptions
        )
            .then(handleResponse)
            .then(userList => {
                return userList
            })
            .catch(() =>
                enqueueSnackbar('Could not load Users', {
                    variant: 'error',
                }));
    };

    return getUsers;
}


export function useSearchUsers() {
    const handleResponse = useHandleResponse();

    const searchUsers = (query) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization':token ? `Beare ${token}` : '',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        };

        return axoisInst.post(
            `/chat/searchusers`,
            {query:query}
        )
            .then(handleResponse)
            .then(results => {
                return results
            })
    };

    return searchUsers;
}