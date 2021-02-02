import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      rtl={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />
  )
}

export default ToastProvider
