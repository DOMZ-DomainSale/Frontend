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
  const [subject, setSubject] = useState(`Interested in buying ${domain}`);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error("Email and message are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}communication/send-email`,
        {
          domainId,
          buyerEmail: email,
          subject,
          message
        }
      );

      toast.success("Message sent to seller");
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Buyer Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Your email
          </label>
          <input
            type="email"
            className="w-full p-2.5 border rounded-lg"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            className="w-full p-2.5 border rounded-lg"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Message
          </label>
          <textarea
            rows={6}
            className="w-full p-2.5 border rounded-lg"
            placeholder={`Hi,\n\nI am interested in buying ${domain}.\n\nThanks`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>

      </form>
    </section>
  );
};

export default EmailTemplate;
