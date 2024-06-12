import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Modal from 'react-modal';
import {Service} from '../ratingAppPages/Service';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UserMainMenu = () => {
    let navigate = useNavigate();
  let dispatch = useDispatch();
    const username = useSelector((state) => state.username);
    const serverURL = useSelector((state) => state.serverURL);
    const token = useSelector((state) => state.token);

    const [message, setMessage] = useState([]);

    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [isShowOpinionsOpen, setIsShowOpinionsOpen] = useState(false);
    const openShowOpinionsModal = () => {
      setIsShowOpinionsOpen(true);
  }

    const [chosenService, setChosenService] = useState([]);
    const [opinionsList, setOpinionsList] = useState([]);

    const modalStyles = {
      overlay: {
        overflowY:"scroll"
      }
    };
  
    const findServices = () => {
        navigate("/findServices");
    }

    const mainSectionStyles = {
        backgroundSize:'cover',
        backgroundPosition:'center',
    }


     const getResponse = (opinion) => {
      fetch(serverURL + `/opinions/getResponseToOpinion/${opinion.id}`, {method:'GET', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
      .then(res => res.text())
      .then((reply) => {
        setMessage(reply);
        setIsMessageModalOpen(true);
      })
    }

    const deleteOpinion = (opinion) => {
      fetch(serverURL + `/opinions/deleteOpinion/${opinion.id}`, {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
      .then(res => res.text())
      .then((reply) => {
        setMessage(reply);
        setIsMessageModalOpen(true);
      })
    }

    const getOpinions = (service, sortedAsc, sortedDsc) => {
      fetch(serverURL + `/opinions/getAllUserOpinions/${username}`, {method:'GET', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
      .then(res => res.json())
      .then((opinionsRes) => {
      if(opinionsRes.length === 0) {
            setMessage("Nie znaleziono opinii")
            setIsMessageModalOpen(true)
            return
          }
        if(sortedAsc === false && sortedDsc === false)
          setOpinionsList(opinionsRes)
        else if(sortedAsc === true && sortedDsc === false)
          setOpinionsList(opinionsRes.sort((a, b) => a.grade - b.grade))
        else if(sortedAsc === false && sortedDsc === true)
          setOpinionsList(opinionsRes.sort((a, b) => b.grade - a.grade))
      })
    }


  return (
    <div className="flex justify-center pt-20 bg-indigo-600 h-screen">
      {username !== "" && <div className="absolute top-0 right-0">
        <label className="font-semibold text-white">Jesteś zalogowany jako: {username}</label>
        <button className="border-2 border-indigo-700 bg-indigo-700 text-white px-2 m-4 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
        onClick={() => {
          dispatch({type: "setUsername",payload:""});
          navigate("/");
        }}>Wyloguj się</button>
      </div>}

        <div className="bg-white pl-8 h-3/4 w-3/4" style={mainSectionStyles}>
            <h2 className="font-semibold text-3xl text-black flex py-2 justify-center">Cześć {username}</h2>
            <h2 className="font-semibold text-3xl text-black flex py-2 justify-center"><FontAwesomeIcon icon={faUser}/></h2>

            <hr></hr>
            <div align="center">
            <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
            type="button" onClick={findServices}>Pokaż dostępne usługi</button>
            </div>
            <hr></hr>
            <div align="center">
            <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
            type="button" onClick={openShowOpinionsModal}>Pokaż wszystkie swoje opinie</button>
            </div>
            <hr></hr>

            <Modal isOpen={isShowOpinionsOpen} className="p-2 w-3/4 bg-white mx-auto h-full space-y-4" style={modalStyles}>
                <h2 align="center" className="font-semibold text-xl py-2">Opinie o usłudze:</h2>
                
                <div className="p-2 flex border-white border-2 mt-4">
                <div align="center" className="">
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={() => {getOpinions(chosenService, false, false)}}>Pobierz opinie</button>
                </div>
                <div align="center" className="">
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={() => {getOpinions(chosenService, true, false)}}>Sortuj: ocena rosnąco</button>
                </div>
                <div align="center" className="">
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={() => {getOpinions(chosenService, false, true)}}>Sortuj: ocena malejąco</button>
                </div>
                </div>
                <hr></hr>

                <h2 className="font-semibold text-xl py-2">Znalezione opinie:</h2>
                <hr></hr>
                {opinionsList.map((opinion, key) => (
                  <div className="p-2 flex border-white border-2 mt-4">
                      <hr></hr>
                      <div className="text-xl">
                      <p><b>Autor:</b> {opinion.user.nickname}</p>
                      <p><b>Data:</b> {opinion.date}</p>
                      </div>
                      <div className="ml-16 text-xl">
                      <p><b>Ocena:</b> {opinion.grade}</p>
                      <p><b>Treść:</b> {opinion.content}</p>
                      </div>
                      <div className="ml-16 text-xl">
                      <p><b>Zgadzam się:</b> {opinion.positiveReactions}</p>
                      <p><b>Nie zgadzam się:</b> {opinion.negativeReactions}</p>
                      </div>
                      <div className="ml-16 text-xl">
                      <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                      onClick={() => {getResponse(opinion)}}>Pokaż odpowiedź</button>
                     <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                      onClick={() => {deleteOpinion(opinion); setIsShowOpinionsOpen(false); setOpinionsList([])}}>Usuń opinię</button>
                      </div>
                  </div>
                ))}
                <hr></hr>
                <div align="center">
                  <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                  onClick={() => {setIsShowOpinionsOpen(false)}}>Zamknij</button>
                </div>
            </Modal>
        
            <Modal isOpen={isMessageModalOpen} className="m-48 mx-auto w-1/2 bg-indigo-600 border-2 rounded-md p-4">
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
    </div>
  )
}
