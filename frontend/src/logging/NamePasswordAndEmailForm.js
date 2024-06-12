import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'

export const NamePasswordAndEmailForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [buttonStyle, setButtonStyle] = useState("");
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
        setIsServiceProvider(!checked);
        console.log(isServiceProvider)
    };


    const getIsAdminButtonStyle = () => {
    }

    useEffect(() => {
      console.log(isServiceProvider);
        if(isServiceProvider === true) {
            setButtonStyle("border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md font-semibold");

        } else {
            setButtonStyle("bg-transparent border-2 border-indigo-700 text-indigo-700 py-1 w-full rounded-md font-semibold");
        }
    },[isServiceProvider])

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
            <h1 className="text-3xl block text-center font-semibold"> <FontAwesomeIcon icon={faUser} /> {props.title}</h1>
            <hr className="mt-3"></hr>
            <div class="mt-3">
                <label for="username" className="block text-base mb-2">Podaj nazwę użytkownika:</label>
                <input type="text" id="nazwa" placeholder="Nazwa użytkownika"
                class="border w-full text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                value={username} onChange={(event) => {setUsername(event.target.value)}}/>
            </div>
            <div class="mt-3">
                <label for="password" className="block text-base mb-2">Podaj hasło:</label>
                <input type="password" id="haslo" placeholder="Hasło"
                class="border w-full text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            </div>
            <div class="mt-3">
                <label for="email" className="block text-base mb-2">Podaj adres email:</label>
                <input type="text" id="email" placeholder="Email"
                class="border w-full text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                value={email} onChange={(event) => {setEmail(event.target.value)}}/>
            </div>
            <div>
            <label>
                <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                />
                Jest usługodawcą
            </label>
            </div>
            <div className="mt-5">
                <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                type="button" onClick={() => props.onButtonClick(username,password,email,isServiceProvider)}>Potwierdź</button>
            </div>
            <div className="mt-5">
            </div>
            
            <Modal isOpen={isMessageModalOpen}>
              <div className="flex justify-center">
                <div>
                  <h2 className="font-semibold text-3xl text-black py-2 ">Wiadomość:</h2>
                  <h2 className="font-semibold text-2xl text-black py-2 ">{props.message}</h2>
                  <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                  onClick={() => {setIsMessageModalOpen(false)}}>Zamknij</button>
                </div>
              </div>
            </Modal>
        </div>
    </div>
  )
}
