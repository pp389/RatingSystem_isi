import React, {useState, useEffect} from 'react'
import {NamePasswordAndEmailForm} from './NamePasswordAndEmailForm'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';

export const RegisterPage = () => {
    let navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const serverURL = useSelector((state) => state.serverURL);

    const dispatch = useDispatch();
    const registerUser = (username, password, email, isServiceProvider) => {
        if(username === "") {
            setMessage("Nie wprowadzono nazwy uzytkownika")
            setIsMessageModalOpen(true)
            return
        } else if(password === "") {
            setMessage("Nie wprowadzono hasla")
            setIsMessageModalOpen(true)
            return
        } else if(email === "") {
            setMessage("Nie wprowadzono adresu email")
            setIsMessageModalOpen(true)
            return
        }
         fetch(`http://localhost:8000/users/addUser/${username}/${password}/${email}/${isServiceProvider}`, {
             method: 'POST', headers:{'Content-Type': 'application/json'}
         })
         .then((response) => response.text())
         .then((message) => {
            setMessage(message);
            console.log("Token: " + message)
            dispatch({type: "setUsername", payload: username});
            dispatch({type: "setToken", payload: message});
            if(isServiceProvider === true) {
                navigate("/adminMainMenu");
            } else {
                navigate("/userMainMenu")
            }
             
         })
         .catch((err) => console.log(err));
    }

  return (
    <div>
        <NamePasswordAndEmailForm onButtonClick={registerUser} title="Zarejestruj się" message={message}></NamePasswordAndEmailForm>
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
