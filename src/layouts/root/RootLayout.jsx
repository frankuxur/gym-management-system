import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Toaster } from 'react-hot-toast'
import Footer from '../../components/footer/Footer'

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

        <Footer />
      </div>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: 'var(--s)',
            background: 'var(--new-3)',
            color: 'var(--new-2)',
          }
        }}
      />
    </div>
  )
}

export default RootLayout