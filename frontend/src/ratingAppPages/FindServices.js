import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import {ServicesDisplay} from './ServicesDisplay';
import Modal from 'react-modal';

export const FindServices = () => {
    const [category, setCategory] = useState("");
    const [serviceProviderName, setServiceProviderName] = useState("");
    const [message, setMessage] = useState("");

    const serverURL = useSelector((state) => state.serverURL);
    const username = useSelector((state) => state.username);
    const token = useSelector((state) => state.token)

    
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);  


    const mainSectionStyles = {
        backgroundSize:'cover'
    }


    const [servicesList, setServicesList]= useState([]);
    const getServicesInfo = () => {
        if(category === "" && serviceProviderName == "") {
            fetch(serverURL + `/services/getAllServices`,{method:'GET',headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}})
            .then(res => res.json())
            .then((servicesRes) => {
            if(servicesRes.length === 0) {
                setMessage("Nie znaleziono usług")
                setIsMessageModalOpen(true)
                return
            }
            setServicesList(servicesRes)
            })
        } else if (category !== ""){
            fetch(serverURL + `/services/getServicesByCategory/${category}`,{method:'GET',headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}})
            .then(res => res.json())
            .then((servicesRes) => {
            if(servicesRes.length === 0) {
                setMessage("Nie znaleziono usług z podaną kategorią")
                setIsMessageModalOpen(true);
                return
            }
            setServicesList(servicesRes)
            })
        } else if (serviceProviderName !== ""){
            fetch(serverURL + `/services/getAllProviderServices/${serviceProviderName}`,{method:'GET',headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}})
            .then(res => res.json())
            .then((servicesRes) => {
            if(servicesRes.length === 0) {
                setMessage("Nie znaleziono usług podanego usługodawcy")
                setIsMessageModalOpen(true);
                return
            }
            setServicesList(servicesRes)
            })
        }
    }

      const customStyles = {
          overflowY:"scroll"
      };


  return (
    <div className="bg-indigo-600 h-screen" style={customStyles}>
        <div className="flex pl-48 w-full bg-white" style={mainSectionStyles}>
            <div className="py-4">
                <h3 className="my-4 text-3xl font-semibold">Wyszukaj usługi</h3>
                <div className="flex">
                    <div className="ml-0">
                        <h4 className="font-semibold">Podaj kategorię usług:</h4>
                        <input className="border w-full text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        type="text" value={category} onChange={(event) => {setCategory(event.target.value)}}/>
                    </div>
                    <div className="ml-0">
                        <h4 className="font-semibold">Podaj nazwę usługodawcy:</h4>
                        <input className="border w-full text-base px-2 py-1 focus:outline-none focus-ring-0 focus:border-gray-600" 
                        type="text" value={serviceProviderName} onChange={(event) => {setServiceProviderName(event.target.value)}}/>
                    </div>
                </div>
                <div className="my-4">
                    <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 px-4 rounded-md hover:bg-transparent hover:text-indigo-700"
                    onClick={getServicesInfo}>Szukaj</button>
                </div>

            </div>
        </div>
        <ServicesDisplay servicesList={servicesList} style={customStyles}></ServicesDisplay>

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
