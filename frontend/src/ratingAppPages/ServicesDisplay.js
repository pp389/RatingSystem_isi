import React, {useState,useEffect} from 'react'
import Modal from 'react-modal';
import {Service} from './Service';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export const ServicesDisplay = (props) => {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const serverURL = useSelector((state) => state.serverURL);
  const username = useSelector((state) => state.username);
  const token = useSelector((state) => state.token);

  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);  
  const [isAddOpinionOpen, setIsAddOpinionOpen] = useState(false);
  const [isShowOpinionsOpen, setIsShowOpinionsOpen] = useState(false);

  const [grade, setGrade] = useState(1);
  const [content, setContent] = useState("");
  const [chosenService, setChosenService] = useState([]);
  const [opinionsList, setOpinionsList] = useState([]);


  const modalStyles = {
    overlay: {
      overflowY:"scroll"
    }
  };

  const addOpinion = (service) => {
    if(grade < 1 || grade > 5) {
      setMessage("Podaj ocenę w zakresie od 1 do 5")
      setIsMessageModalOpen(true)
      return
    } else if(content === "") {
      setMessage("Podaj treść opinii")
      setIsMessageModalOpen(true)
      return
    }
    fetch(serverURL + `/opinions/addOpinion/${grade}/${content}/${username}/${chosenService.id}`, {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
        .then(res => res.text())
        .then((reply) => {
            setMessage(reply);
            setIsMessageModalOpen(true);
        })
  }

  const getOpinions = (service, sortedAsc, sortedDsc) => {
    fetch(serverURL + `/opinions/getOpinion/${chosenService.id}`, {method:'GET', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
    .then(res => res.json())
    .then((opinionsRes) => {
    if(opinionsRes.length === 0) {
          setMessage("Nie znaleziono opinii o tej usłudze")
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

  const addPositiveReaction = (opinion) => {
    fetch(serverURL + `/opinions/addPositiveReactionToOpinion/${opinion.id}`, {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
        .then(res => res.text())
        .then((reply) => {
            setMessage(reply);
            setIsMessageModalOpen(true);
        })
  }

  const getResponse = (opinion) => {
    fetch(serverURL + `/opinions/getResponseToOpinion/${opinion.id}`, {method:'GET', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
    .then(res => res.text())
    .then((reply) => {
      setMessage(reply);
      setIsMessageModalOpen(true);
    })
  }

  const addNegativeReaction = (opinion) => {
    fetch(serverURL + `/opinions/addNegativeReactionToOpinion/${opinion.id}`, {method:'POST', headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }})
        .then(res => res.text())
        .then((reply) => {
            setMessage(reply);
            setIsMessageModalOpen(true);
        })
  }

  return (
    <div className="flex pl-48 w-full">
      {username !== "" && <div className="absolute top-0 right-0">
        <label className="font-semibold text-black">Jesteś zalogowany jako: {username}</label>
        <button className="border-2 border-indigo-700 bg-indigo-700 text-white px-2 m-4 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
        onClick={() => {
          dispatch({type: "setUsername",payload:""});
          navigate("/");
        }}>Wyloguj się</button>
      </div>
      }
      
      <div className="">
        <h2 className="text-white text-2xl">Znalezione usługi:</h2>
        {props.servicesList.map((service) => (
            <div className="flex">
              <Service service={service} color={'white'}></Service>
              <div className="ml-8 mt-4">
              <button onClick={() => {setIsAddOpinionOpen(true); setChosenService(service)}}
              class="bg-white text-indigo-700 text-xl hover:bg-transparent hover:text-white hover:border-white border-2 rounded-md">Dodaj opinię</button>
              </div>

              <div className="ml-8 mt-4">
              <button onClick={() => {setIsShowOpinionsOpen(true); setChosenService(service)}}
              class="bg-white text-indigo-700 text-xl hover:bg-transparent hover:text-white hover:border-white border-2 rounded-md">Pokaż opinie</button>
              </div>
            </div>
        ))}
      </div>
      
      <Modal isOpen={isAddOpinionOpen} className="w-1/2 bg-white mx-auto h-3/4 p-2">
                <div className=" space-y-4">
                    <h2 className="font-semibold flex justify-center text-xl py-2">Ocena w skali 1-5:</h2>
                    <div className="flex justify-center">
                        <input type="text"  placeholder="Ocena"
                        className="border w-48 text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={grade} onChange={(event) => {setGrade(event.target.value)}}/>
                    </div>
                    <hr></hr>    
                    <h2 className="flex justify-center font-semibold text-xl py-2">Podaj treść opinii:</h2>
                    <div className="flex justify-center">
                        <textarea type="text"  placeholder="Treść opinii"
                        className="border w-64 text-basepx-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        value={content} onChange={(event) => {setContent(event.target.value)}}/>
                    </div>
                    <hr></hr> 
                    <div className="flex justify-center">
                        <button className="border-2 mt-4 border-indigo-700 bg-indigo-700 text-white  py-1 w-48 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick = {() => {addOpinion(chosenService)}}>Dodaj opinię</button>
                    </div>
                    <hr></hr> 
                    <div className="flex justify-center">
                        <button className="border-2 mt-4 border-indigo-700 bg-indigo-700 text-white  py-1 w-48 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick = {() => {setIsAddOpinionOpen(false)}}>Zamknij</button>
                    </div>
                </div>

            </Modal>

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
                      onClick={() => {addPositiveReaction(opinion); setIsShowOpinionsOpen(false); setIsShowOpinionsOpen(true); getOpinions(chosenService);}}>Zgadzam się</button>
                      <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                      onClick={() => {addNegativeReaction(opinion); setIsShowOpinionsOpen(false); setIsShowOpinionsOpen(true); getOpinions(chosenService);}}>Nie zgadzam się</button>
                      </div>
                      <button className="border-2 border-indigo-700 bg-indigo-700 text-white mb-4 py-1 w-48 rounded-md hover:bg-white hover:text-indigo-700 font-semibold"
                      onClick={() => {getResponse(opinion)}}>Pokaż odpowiedź</button>
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
  )
}
