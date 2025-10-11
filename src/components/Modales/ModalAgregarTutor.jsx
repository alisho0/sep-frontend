import React from 'react'

export const ModalAgregarTutor = ({tutores}) => {

    const submitTutor = () => {
        console.log(tutores);
    }

  return (
    <>
        <p>Modal tutor</p>
        <button onClick={submitTutor}>
            Test
        </button>
    </>
  )
}
