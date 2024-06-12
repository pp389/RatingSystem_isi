import React from 'react'

export const Service = (props) => {
  return (
    <div className="p-2 flex border-white border-2 mt-4" style={{color:`${props.color}`, minWidth:'80%'}}>
        <div className="text-xl">
        <p><b>Nazwa usługi:</b> {props.service.name}</p>
        <p><b>Opis usługi:</b> {props.service.description}</p>
        </div>
        <div className="ml-16 text-xl">
        <p><b>Usługodawca:</b> {props.service.serviceProvider.name}</p>
        <p><b>Kategoria:</b> {props.service.category.name}</p>
        </div>
    </div>
  )
}
