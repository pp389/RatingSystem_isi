import React from 'react'

export const Help = () => {
  return (
    <div className="h-32">
        <div className="flex justify-center bg-indigo-600 h-screen items-center" >

            <div className="rounded-xl w-96 bg-white p-6">
                <h3 className="font-semibold text-3xl flex py-2 justify-center">Pomoc</h3>
                <hr></hr>
                <div className="m-6">
                    <h2 className="font-semibold text-2xl flex py-2 justify-center">FAQ:</h2>
                </div>
                <hr></hr>
                <div className="m-6">
                    <h2 className="font-semibold text-2xl py-2 ">Do czego służy ta aplikacja?</h2>
                    <h2 className="font-semibold text-xl flex py-2 justify-center">Do oceny jakości usług i usługodawców</h2>
                </div>
                <hr></hr>
                <div className="m-6">
                    <h2 className="font-semibold text-2xl flex py-2 justify-center">Jak mogę skorzystać z systemu?</h2>
                    <h2 className="font-semibold text-xl flex py-2 justify-center">Wystarczy założyć konto użytkownika i zalogować się na nie</h2>
                </div>
                <hr></hr>
            </div>

        </div>

    </div>
  )
}
