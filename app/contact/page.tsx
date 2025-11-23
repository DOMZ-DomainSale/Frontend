import Footer from '@/components/Footer'
import NavbarComponenet from '@/components/NavbarComponenet'
import React from 'react'

const page = () => {
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
      <NavbarComponenet colorText="S" plainText="ignUp" IsParaText={true} ParaText="As a user-centric platfrom, we value your feedback.
        Reach out via the form or email us at info@domz.com - We'll respond promptly" searchbarStatus={false} />

      <form className="max-w-[680px] mx-auto pt-6 px-4 md:px-0">
        <h2 className="text-center text-[2rem] font-bold mb-3 leading-tight select-none">
          <span className="text-blue-600 font-bold">Your questions</span> and feedback matter.
        </h2>

        <div className="mb-8">
          <label htmlFor="name" className="block mb-3 text-[1rem] font-semibold text-black select-none ml-2">
            Name<span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            className="bg-blue-100 border-none text-[1.15rem] rounded-2xl block w-full px-8 py-5 shadow-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block mb-3 text-[1rem] font-semibold text-black select-none ml-2">
            Email<span className="text-blue-600">*</span>
          </label>
          <input
            type="email"
            className="bg-blue-100 border-none text-[1.15rem] rounded-2xl block w-full px-8 py-5 shadow-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="comment" className="block mb-3 text-[1rem] font-semibold text-black select-none ml-2">
            Comment<span className="text-blue-600">*</span>
          </label>
          <textarea
            className="bg-blue-100 border-none text-[1.15rem] rounded-2xl block w-full px-8 py-5 shadow-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[230px] h-[60px] flex items-center justify-center text-white text-[1.15rem] bg-linear-to-r from-blue-500 to-blue-600 font-semibold rounded-full tracking-[1px] shadow-lg border-none hover:from-blue-600 hover:to-blue-700 focus:outline-none"
            style={{ letterSpacing: "1px" }}
          >
            SUBMIT
          </button>
        </div>
      </form>
      <div className="mx-auto my-20 max-w-6xl px-4">
        <div
          className="relative rounded-4xl bg-linear-to-br from-[#2264e9] to-[#1858ca] overflow-hidden px-10 py-20 flex flex-col items-center shadow-2xl"
          style={{ minHeight: "340px" }}
        >
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            fill="none"
            viewBox="0 0 1100 340"
            style={{ opacity: 0.17 }}
          >
            <rect x="200" y="75" width="250" height="175" rx="20" stroke="white" strokeWidth="3" fill="none" />
            <rect x="500" y="83" width="200" height="160" rx="18" stroke="white" strokeWidth="2" fill="none" />
            <ellipse cx="340" cy="190" rx="18" ry="7" stroke="white" strokeWidth="2" fill="none" />
          </svg>

          <h2 className="text-white text-center font-bold text-[2.6rem] leading-tight mb-4 drop-shadow">
            Stay Updated
          </h2>
          <p className="text-white text-center text-lg font-medium mb-8 max-w-xl opacity-90">
            Get news, announcements, and highlighted names when our newsletter launches.
          </p>
          <button
            type="button"
            className="px-8 py-3 rounded-full bg-linear-to-r from-[#2264e9] to-[#1858ca] text-white text-lg font-semibold shadow-lg hover:from-[#1858ca] hover:to-[#2264e9] transition-all cursor-pointer"
            style={{ letterSpacing: "0.5px" }}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default page