import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "../components/canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Validate email in real-time
    if (name === "email" && value && !validateEmail(value)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
    } else if (name === "email" && validateEmail(value)) {
      setErrors({ ...errors, email: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (form.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSubmitStatus(null);
    setErrors({});

    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus("error");
      setLoading(false);
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Shahriar Ahmed",
          from_email: form.email,
          to_email: "ahmedshahriar948@gmail.com",
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSubmitStatus("success");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus(null), 5000);
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative z-10`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl relative z-10'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${
                errors.name ? 'ring-2 ring-red-500' : ''
              }`}
              style={{ 
                transition: "ring 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "ring"
              }}
              onFocus={(e) => {
                if (!errors.name) e.currentTarget.style.boxShadow = "0 0 0 2px #915EFF";
              }}
              onBlur={(e) => {
                if (!errors.name) e.currentTarget.style.boxShadow = "";
              }}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="name-error"
                className="mt-2 text-red-400 text-sm"
                role="alert"
              >
                {errors.name}
              </motion.p>
            )}
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${
                errors.email ? 'ring-2 ring-red-500' : ''
              }`}
              style={{ 
                transition: "ring 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "ring"
              }}
              onFocus={(e) => {
                if (!errors.email) e.currentTarget.style.boxShadow = "0 0 0 2px #915EFF";
              }}
              onBlur={(e) => {
                if (!errors.email) e.currentTarget.style.boxShadow = "";
              }}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="email-error"
                className="mt-2 text-red-400 text-sm"
                role="alert"
              >
                {errors.email}
              </motion.p>
            )}
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none ${
                errors.message ? 'ring-2 ring-red-500' : ''
              }`}
              style={{ 
                transition: "ring 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "ring"
              }}
              onFocus={(e) => {
                if (!errors.message) e.currentTarget.style.boxShadow = "0 0 0 2px #915EFF";
              }}
              onBlur={(e) => {
                if (!errors.message) e.currentTarget.style.boxShadow = "";
              }}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.message ? (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="message-error"
                  className="text-red-400 text-sm"
                  role="alert"
                >
                  {errors.message}
                </motion.p>
              ) : (
                <span></span>
              )}
              <span className={`text-xs ${
                form.message.length > 1000 ? 'text-red-400' : 'text-secondary'
              }`}>
                {form.message.length}/1000
              </span>
            </div>
          </label>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400"
              role="alert"
            >
              Thank you! I'll get back to you as soon as possible.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400"
              role="alert"
            >
              Something went wrong. Please try again or contact me directly at ahmedshahriar948@gmail.com
            </motion.div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary disabled:opacity-50 disabled:cursor-not-allowed'
            style={{ 
              transition: "box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: "translateZ(0)",
              willChange: "transform, box-shadow"
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.transform = "scale(1.05) translateZ(0)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
              e.currentTarget.style.transform = "scale(1) translateZ(0)";
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] relative z-10'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
