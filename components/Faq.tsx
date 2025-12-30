
"use client";
import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import axios from "axios";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  priorityNumber: number;
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [faq,setFaq]=useState<FaqItem[]>([]);

  useEffect(()=>{
    const fetchFaq=async()=>{
      try {
        const res= await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}faq/`
        )
        setFaq(res.data.faqs.sort((a:FaqItem, b:FaqItem) => a.priorityNumber - b.priorityNumber));
      } catch (err) {
        
      }
    }
    fetchFaq();
  },[])

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-14">
          Got Questions? We’ve Got Answers.
        </h2>

        <div className="space-y-5">
          {faq.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 ${
                openIndex === index ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center w-full text-left px-6 py-5 gap-4 cursor-pointer"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-800" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-800" />
                  )}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {faq.question}
                </h3>
              </button>

              {openIndex === index && (
                <div className="px-16 pb-6 -mt-2 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
