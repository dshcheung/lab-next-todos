import CompsLayoutsNavbar from '@/components/layouts/Navbar'

export default function Layout({ children }) {
  return (
    <div id="layout">
      <CompsLayoutsNavbar />
      {children}
    </div>
  )
}
