// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// interface Props {
//   domainId: string;
//   domain: string;
//   onClose: () => void;
// }

// const EmailTemplate = ({ domainId, domain, onClose }: Props) => {
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState(`Interested in buying ${domain}`);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !message) {
//       toast.error("Email and message are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         `${process.env.NEXT_PUBLIC_apiLink}communication/send-email`,
//         {
//           domainId,
//           buyerEmail: email,
//           subject,
//           message
//         }
//       );

//       toast.success("Message sent to seller");
//       onClose();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to send message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section>
//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* Buyer Email */}
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Your email
//           </label>
//           <input
//             type="email"
//             className="w-full p-2.5 border rounded-lg"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Subject */}
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Subject
//           </label>
//           <input
//             type="text"
//             className="w-full p-2.5 border rounded-lg"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>

//         {/* Message */}
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Message
//           </label>
//           <textarea
//             rows={6}
//             className="w-full p-2.5 border rounded-lg"
//             placeholder={`Hi,\n\nI am interested in buying ${domain}.\n\nThanks`}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send Message"}
//           </button>
//         </div>

//       </form>
//     </section>
//   );
// };

// export default EmailTemplate;




"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  domainId: string;
  domain: string;
  onClose: () => void;
}

const EmailTemplate = ({ domainId, domain, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [proxyEmail, setProxyEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subject = encodeURIComponent(`Interested in buying ${domain}`);
  const body = encodeURIComponent(
    `Hi,\n\nI am interested in buying ${domain}.\n\nThanks`
  );

  const generateProxy = async () => {
    if (!email) {
      toast.error("Your email is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}communication/send-email`,
        { domainId, buyerEmail: email }
      );

      setProxyEmail(res.data.proxyEmail);
    } catch (err: any) {
      toast.error("Failed to generate proxy email");
    } finally {
      setLoading(false);
    }
  };

  if (!proxyEmail) {
    return (
      <section className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Your email (kept private)
          </label>
          <input
            type="email"
            className="w-full p-2.5 border rounded-lg"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={generateProxy}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Preparing..." : "Continue"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <p className="font-medium mb-2">
          Choose how you want to email the seller
        </p>

        <p className="text-gray-600 mb-3">
          Your real email will remain hidden.
        </p>

        {/* DEFAULT EMAIL CLIENT */}
        <a
          href={`mailto:${proxyEmail}?subject=${subject}&body=${body}`}
          className="block w-full text-center px-4 py-2 mb-3 bg-gray-800 text-white rounded-lg"
        >
          Use default email app
        </a>

        {/* GMAIL */}
        <a
          href={`https://mail.google.com/mail/?view=cm&to=${proxyEmail}&su=${subject}&body=${body}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 mb-3 bg-red-600 text-white rounded-lg"
        >
          Use Gmail
        </a>

        {/* OUTLOOK */}
        <a
          href={`https://outlook.live.com/mail/0/deeplink/compose?to=${proxyEmail}&subject=${subject}&body=${body}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-blue-700 text-white rounded-lg"
        >
          Use Outlook
        </a>
      </div>

      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-600">
          Done
        </button>
      </div>
    </section>
  );
};

export default EmailTemplate;
