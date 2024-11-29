import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Toaster } from 'react-hot-toast'

const RootLayout = () => {
  return (
    <div className="root">
      <div className="root__content">
        <Header />

        <main className='main'>
          <div className="main__content">
            <Outlet />
          </div>
        </main>

        <footer className='footer'>footer</footer>
      </div>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000
        }}
      />
    </div>
  )
}

export default RootLayout