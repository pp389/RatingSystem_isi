import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

export const EntryPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.username);

    useEffect(() => {
        dispatch({type:"setServerURL", payload:"http://localhost:8000"});
    },[])



    const headerStyles = {
        backgroundColor: '#FFF',
        color: 'black',
        padding: '1rem',
        textAlign: 'center',
    };

    const mainSectionStyles = {
        backgroundSize:'cover',
        backgroundPosition:'center',
    }

    const login = () =>{
        if(username === "") {
            navigate("/login")
        } else {
            navigate("/userMainMenu")
        }
    }




  return (
    <div className="h-32">
        <div className="flex" style={headerStyles}>
            <ul className="flex space-x-4">
                <li><button onClick={() => {navigate("/help")}}>Pomoc</button></li>
            </ul>
        </div>
        <div className="flex justify-center bg-indigo-600 h-screen items-center" style={mainSectionStyles}>

            <div className="rounded-xl w-96 bg-white p-6">
                <h3 className="font-semibold text-3xl flex py-2 justify-center">System oceny usług i usługodawców</h3>
                <hr></hr>
                <div className="m-6">
                    <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={login}>Zaloguj się</button>
                </div>
                <div className="m-6">
                    <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={() => navigate("/register")}>Zarejestruj się</button>
                </div>
            </div>

        </div>

    </div>
  )
}
