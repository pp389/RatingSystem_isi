import React from 'react'

export const Contact = () => {
  return (
    <div className="h-32">
        <div className="flex justify-center bg-indigo-600 h-screen items-center" >

            <div className="rounded-xl w-96 bg-white p-6">
                <h3 className="font-semibold text-3xl flex py-2 justify-center">Kontakt</h3>
                <hr></hr>
                <div className="m-6">
                    <h2 className="font-semibold text-2xl flex py-2 justify-center">Telefon: +48 123-456-789</h2>
                    <h2 className="font-semibold text-xl flex py-2 justify-center">Dostępny od poniedziałku do piątku od 10 do 16</h2>
                </div>
                <hr></hr>
                <div className="m-6">
                    <h2 className="font-semibold text-2xl flex py-2 justify-center">E-mail: firma.kolejowa@trainT.com</h2>
                </div>
            </div>

        </div>

    </div>
  )
}
