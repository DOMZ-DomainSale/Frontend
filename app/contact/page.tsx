'use client';

import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import Loader from '@/components/Loader';
import Modal from '@/components/model';

/* ---------------- TYPES ---------------- */
interface UserMessageInterface {
  name: string;
  email: string;
  message: string;
  subject: string;
}

/* ---------------- COMPONENT ---------------- */
const page = () => {
  /* ---------- CONTACT FORM STATE ---------- */
  const [userData, setUserData] = useState<UserMessageInterface>({
    name: '',
    email: '',
    message: '',
    subject: 'New Submisson On the Contact Form',
  });

  /* ---------- AUTH & LOADING ---------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);

  /* ---------- SUBSCRIBE MODAL ---------- */
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}auth/me`,
          { withCredentials: true }
        );

        if (res.data?.user) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  /* ---------------- CONTACT FORM HANDLERS ---------------- */
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderStatus(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}email/sendemail`,
        userData
      );

      toast.success(res?.data?.message || 'Message sent successfully');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'An unexpected error occurred'
      );
    } finally {
      setLoaderStatus(false);
    }
  };

  /* ---------------- SUBSCRIBE HANDLERS ---------------- */
  const handleSubscribeClick = async () => {
    // 🟢 Logged-in → direct subscribe
    if (isLoggedIn) {
      await subscribeLoggedInUser();
      return;
    }

    // 🔴 Guest → open modal
    setIsSubscribeModalOpen(true);
  };

  const subscribeLoggedInUser = async () => {
    try {
      setLoaderStatus(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}subscribe`,
        {},
        { withCredentials: true }
      );

      toast.success(res?.data?.message || 'Subscribed successfully 🎉');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'Subscription failed'
      );
    } finally {
      setLoaderStatus(false);
    }
  };

  const subscribeGuestUser = async () => {
    if (!subscribeEmail) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoaderStatus(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}subscribe`,
        { email: subscribeEmail },
        {withCredentials:true}
      );

      toast.success(res?.data?.message || 'Subscribed successfully 🎉');
      setSubscribeEmail('');
      setIsSubscribeModalOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'Subscription failed'
      );
    } finally {
      setLoaderStatus(false);
    }
  };

  if (!authChecked || loaderStatus) return <Loader />;

  /* ---------------- UI ---------------- */
  return (
    <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet
        colorText="Let's Star"
        plainText="t the conversation"
        IsParaText
        ParaText="As a user-centric platform, we value your feedback."
        searchbarStatus={false}
      />

      {/* ---------- CONTACT FORM (UNCHANGED) ---------- */}
      <form
        onSubmit={onSubmitHandler}
        className="max-w-170 mx-auto pt-6 px-4 md:px-0"
      >
        <h2 className="text-center text-[2rem] font-bold mb-3">
          <span className="text-blue-600">Your questions</span> and feedback
          matter.
        </h2>

        <input
          type="text"
          name="name"
          required
          onChange={onChangeHandler}
          placeholder="Name"
          className="bg-blue-100 rounded-2xl w-full px-8 py-5 mb-6"
        />

        <input
          type="email"
          name="email"
          required
          onChange={onChangeHandler}
          placeholder="Email"
          className="bg-blue-100 rounded-2xl w-full px-8 py-5 mb-6"
        />

        <textarea
          name="message"
          required
          onChange={onChangeHandler}
          placeholder="Comment"
          className="bg-blue-100 rounded-2xl w-full px-8 py-5 mb-6"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-57.5 h-15 bg-blue-600 text-white rounded-full font-semibold"
          >
            SUBMIT
          </button>
        </div>
      </form>

      {/* ---------- SUBSCRIBE SECTION ---------- */}
      <div className="mx-auto my-20 max-w-6xl px-4 text-center">
        <div className="rounded-4xl bg-blue-600 px-10 py-20 text-white shadow-2xl">
          <h2 className="text-[2.6rem] font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Get news and announcements when our newsletter launches.
          </p>

          <button
            type="button"
            onClick={handleSubscribeClick}
            className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100"
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* ---------- SUBSCRIBE MODAL (GUEST ONLY) ---------- */}
      <Modal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        title="Subscribe to Newsletter"
        size="sm"
      >
        <div className="space-y-4">
          <input
            type="email"
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border px-4 py-3"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsSubscribeModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={subscribeGuestUser}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default page;
