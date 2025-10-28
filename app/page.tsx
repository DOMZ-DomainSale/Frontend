import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import backgroundImg from '../public/assets/background.webp'
import DomainTable from '@/components/DomainTable'

const page = () => {
  return (
    <div className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}>
    <Navbar/>
     <div className="pt-24"> {/* 👈 Adjust this padding to match your navbar height */}
    <Hero />
    <div className='px-4 lg:ml-[20%] lg:mr-[20%]'>
      <DomainTable/>
    </div>
  </div>
    </div>
  )
}

export default page