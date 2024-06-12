import React, {useState} from 'react'
import {NameAndPasswordForm} from './NameAndPasswordForm'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';

export const LoginPage = () => {
    let navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const serverURL = useSelector((state) => state.serverURL);
    const dispatch = useDispatch();

    const loginUser = (username, password, isServiceProvider) => {
        if(username === "") {
            setMessage("Nie wprowadzono nazwy uzytkownika")
            setIsMessageModalOpen(true);
            return
        } else if(password === ""){
            setMessage("Nie wprowadzono hasla")
            setIsMessageModalOpen(true);
            return
        }
        fetch(serverURL + `/users/login/${username}/${password}`, {
            method: 'POST', headers:{'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((message) => {
            if(message.userType !== "Wrong data") {
                dispatch({type: "setUsername", payload: username});
                dispatch({type: "setToken", payload: message.token});
                if(message.userType === "Service provider") {
                    navigate("/adminMainMenu");
                } else {
                    navigate("/userMainMenu");
                }
            } else {
                setMessage("Niepoprawne dane");
                setIsMessageModalOpen(true);
            }
        })
        .catch((err) => console.log(err));
    }

  return (
    <div>
        <NameAndPasswordForm onButtonClick={loginUser} title="Zaloguj się" message={message}></NameAndPasswordForm>
        <Modal isOpen={isMessageModalOpen} className="m-48 w-1/2 bg-indigo-600 border-2 rounded-md p-4">
            <div className="">
                <div className="">
                <h2 className="text-white font-semibold text-3xl text-black py-2 ">Wiadomość:</h2>
                <h2 className="text-white font-semibold text-2xl text-black py-2 ">{message}</h2>
                <button className="border-2 border-indigo-700 mt-4 bg-indigo-800 text-white py-1 px-2 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                onClick={() => {setIsMessageModalOpen(false)}}>Zamknij</button>
                </div>
            </div>
        </Modal>
    </div>
  )
}
