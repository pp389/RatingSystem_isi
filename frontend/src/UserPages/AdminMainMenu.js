import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AdminMainMenu = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const username = useSelector((state) => state.username);
    const serverURL = useSelector((state) => state.serverURL);
    const token = useSelector((state) => state.token);

    const [serviceName, setServiceName] = useState("");

    const [category, setCategory] = useState("");


    const [removeService_serviceName, setRemoveService_serviceName] = useState("");

    const [serviceDescription, setServiceDescription] = useState("");


    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
    const [opinionsList, setOpinionsList] = useState([]);
    const [chosenOpinion, setChosenOpinion] = useState([]);
    const [opinionReply, setOpinionReply] = useState("");


    const openAddServiceModal = () => {
        setIsAddServiceOpen(true);

    }

    const [isRemoveServiceOpen, setIsRemoveServiceOpen] = useState(false);
    const openRemoveServiceModal = () => {
        setIsRemoveServiceOpen(true);
    }

    const [isShowServicesOpen, setIsShowServicesOpen] = useState(false);
    const openShowServicesModal = () => {
        setIsShowServicesOpen(true);
    }


    const [isShowOpinionsOpen, setIsShowOpinionsOpen] = useState(false);
    const openShowOpinionsModal = () => {
        setIsShowOpinionsOpen(true);
    }


    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const openReplyModal = () => {
        setIsReplyModalOpen(true);
    }


    const addService = () => {
        if(serviceName === "") {
            setMessage("Nie podano nazwy usługi")
            setIsMessageModalOpen(true)
            return
        } else if(category === "") {
            setMessage("Nie podano kategorii")
            setIsMessageModalOpen(true)
            return
        } else if(serviceDescription === false) {
            setMessage("Nie podano opisu usługi")
            setIsMessageModalOpen(true)
            return
        }
        fetch(serverURL + `/services/addService/${serviceName}/${serviceDescription}/${username}/${category}`, {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}})
        .then(res => res.text())
        .then((reply) => {
            setMessage(reply);
            setIsMessageModalOpen(true);
        })
    }

    const getOpinions = () => {
        console.log(token)
        fetch(serverURL + `/opinions/getAllServiceProviderOpinions/${username}`, {method:'GET', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then((opinionsRes) => {
        if(opinionsRes.length === 0) {
              setMessage("Nie znaleziono opinii o twoich usługach")
              setIsMessageModalOpen(true)
              return
            }
            setOpinionsList(opinionsRes)
        })
      }


    const removeService = () => {
        if(removeService_serviceName === "") {
            setMessage("Nie podano nazwy usługi")
            setIsMessageModalOpen(true);
            return
        } 
        fetch(serverURL + `/services/removeService/${username}/${removeService_serviceName}`, {method:'POST',headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}})
        .then(res => res.text())
        .then((reply) => {
            setMessage(reply);
            setIsMessageModalOpen(true);
        })
    }

    const [servicesList, setServicesList]= useState([]);
    const getServicesInfo = () => {
        fetch(serverURL + `/services/getAllProviderServices/${username}`,{method:'GET',headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}})
        .then(res => res.json())
        .then((servicesRes) => {
          if(servicesRes.length === 0) {
            setMessage("Nie znaleziono usług")
            setIsMessageModalOpen(true)
            return
          }
          setServicesList(servicesRes)
        })
        
      }


    const replyToOpinion = (opinion) => {
        if(opinionReply === "") {
            setMessage("Nie podano treści odpowiedzi")
            setIsMessageModalOpen(true)
            return
        }
        fetch(serverURL + `/opinions/addResponseToOpinion/${opinion.id}/${opinionReply}`, {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
        .then(res => res.text())
        .then((reply) => {
            setMessage(reply);
            setIsMessageModalOpen(true);
        })
    }


    const mainSectionStyles = {
        backgroundSize:'cover',
        backgroundPosition:'center',
    }

    const modalStyles = {
        overlay: {
          overflowY:"scroll"
        }
      };

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
        <div className="bg-white pl-8 pr-8 h-full w-3/4" style={mainSectionStyles}>
            <h2 className="font-semibold text-3xl text-black flex py-2 justify-center">Cześć {username}</h2>
            <h2 className="font-semibold text-2xl text-black flex py-2 justify-center">
                Jesteś zalogowany jako usługodawca
            </h2>
            <div className="flex justify-center text-white">
                <FontAwesomeIcon icon={faLock}/>
            </div>

            <hr></hr>

            <div align="center">
            <hr></hr>    
            <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                onClick = {openAddServiceModal}>Dodaj usługe</button>
            </div>

            <div align="center">
            <hr></hr>    
            <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                onClick = {openRemoveServiceModal}>Usuń usługe</button>
            </div>

            <div align="center">
            <hr></hr>    
            <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                onClick = {openShowServicesModal}>Wyświetl swoje usługi</button>
            </div>

            <div align="center">
            <hr></hr>    
            <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                onClick = {openShowOpinionsModal}>Pokaż opinie o twoich usługach</button>
            </div>


            <Modal isOpen={isShowOpinionsOpen} className="p-2 w-3/4 bg-white mx-auto h-full space-y-4" style={modalStyles}>
                <h2 align="center" className="font-semibold text-xl py-2">Opinie o usłudze:</h2>
                  
                <div align="center" className="">
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={() => {getOpinions()}}>Pobierz opinie</button>
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
                      onClick={() => { setChosenOpinion(opinion); openReplyModal()}}>Odpowiedz</button>
                      </div>
                  </div>
                ))}
                <hr></hr>
                <div align="center">
                  <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                  onClick={() => {setIsShowOpinionsOpen(false)}}>Zamknij</button>
                </div>
            </Modal>

            <Modal isOpen={isReplyModalOpen} className="m-48 w-1/2 bg-indigo-600 mx-auto border-2 rounded-md p-4">
                <div className="">
                    <div className="">
                    <h2 className="text-white font-semibold text-3xl text-black py-2 ">Twoja odpowiedź:</h2>
                    <div className="flex justify-center">
                        <textarea type="text"  placeholder="Odpowiedź"
                        className="border w-64 text-basepx-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={opinionReply} onChange={(event) => {setOpinionReply(event.target.value)}}/>
                    </div>
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-800 text-white py-1 px-2 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                    onClick={() => {replyToOpinion(chosenOpinion)}}>Odpowiedz</button>
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-800 text-white py-1 px-2 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                    onClick={() => {setIsReplyModalOpen(false)}}>Zamknij</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isAddServiceOpen} className="w-1/2 bg-white mx-auto h-3/4 p-2">
                <div className=" space-y-4">
                    <h2 className="font-semibold flex justify-center text-xl py-2">Podaj nazwę usługi:</h2>
                    <div className="flex justify-center">
                        <input type="text"  placeholder="Nazwa usługi"
                        className="border w-48 text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={serviceName} onChange={(event) => {setServiceName(event.target.value)}}/>
                    </div>
                    <hr></hr>
                    <h2 className="flex justify-center font-semibold text-xl py-2">Podaj kategorię:</h2>
                    <div className="flex justify-center">
                        <input type="text"  placeholder="Kategoria"
                        className="border w-48 text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={category} onChange={(event) => {setCategory(event.target.value)}}/>
                    </div>
                    <hr></hr>
                    <h2 className="flex justify-center font-semibold text-xl py-2">Podaj opis usługi:</h2>
                    <div className="flex justify-center">
                        <textarea type="text"  placeholder="Opis usługi"
                        className="border w-64 text-basepx-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={serviceDescription} onChange={(event) => {setServiceDescription(event.target.value)}}/>
                    </div>
                    <hr></hr>
                    <div className="flex justify-center">
                        <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-48 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick = {addService}>Dodaj usługę</button>
                    </div>
                    <div className="flex justify-center">
                        <button className="border-2 mt-4 border-indigo-700 bg-indigo-700 text-white  py-1 w-48 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick = {() => {setIsAddServiceOpen(false)}}>Zamknij</button>
                    </div>
                    <hr></hr>
                </div>

            </Modal>

            <Modal isOpen={isRemoveServiceOpen} className="w-1/2 bg-white mx-auto h-3/4 p-2">
                <div className="space-y-4">
                    <h2 className="flex justify-center font-semibold text-xl py-2">Wprowadź nazwę usługi:</h2>
                    <div className="flex justify-center">
                        <input type="text"  placeholder="Nazwa usługi"
                        className="border w-48 text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={removeService_serviceName} onChange={(event) => {setRemoveService_serviceName(event.target.value)}}/>
                    </div>
                    
                    <div className="flex justify-center">
                        <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-48 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick = {removeService}>Usuń usługę</button>
                    </div>
                    <div className="flex justify-center">
                        <button className="border-2 mt-4 border-indigo-700 bg-indigo-700 text-white  py-1 w-48 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick = {() => {setIsRemoveServiceOpen(false)}}>Zamknij</button>
                    </div>

                </div>
            </Modal>

            <Modal isOpen={isShowServicesOpen} className="p-2 w-3/4 bg-white mx-auto h-full space-y-4" style={modalStyles}>
                <h2 align="center" className="font-semibold text-xl py-2">Twoje usługi</h2>
                  
                <div align="center" className="">
                    <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                    onClick={() => {getServicesInfo()}}>Wyszukaj usługi</button>
                </div>
                <hr></hr>

                <h2 className="font-semibold text-xl py-2">Znalezione usługi:</h2>
                <hr></hr>
                {servicesList.map((service, key) => (
                  <div className="p-2 flex border-white border-2 mt-4">
                      <hr></hr>
                      <div className="text-xl">
                      <p><b>Nazwa usługi:</b> {service.name}</p>
                      </div>
                      <div className="ml-16 text-xl">
                      <p><b>Opis usługi:</b> {service.description}</p>
                      <p><b>Kategoria:</b> {service.category.name}</p>
                      </div>
                  </div>
                ))}
                <hr></hr>
                <div align="center">
                  <button className="border-2 border-indigo-700 mt-4 bg-indigo-700 text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                  onClick={() => {setIsShowServicesOpen(false)}}>Zamknij</button>
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
