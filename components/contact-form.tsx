"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "2nUb5-UZuxg7YxAPw";
const EMAILJS_SERVICE_ID = "service_3rrh7ph";
const CONTACT_TEMPLATE_ID = "template_g8cxx84";
const AUTO_REPLY_TEMPLATE_ID = "template_2hceflv";
const DEFAULT_TITLE = "New message from nbphuy.github.io website";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "warning" | "error" | "";
  }>({ message: "", type: "" });

  function validateEmail(value: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }

  function validateForm() {
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    let isValid = true;

    if (name.trim() === "") {
      nextErrors.name = "Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      nextErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email.trim())) {
      nextErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (message.trim() === "") {
      nextErrors.message = "Message cannot be empty";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus({ message: "", type: "" });

    if (!validateForm()) {
      return;
    }

    const templateParams = {
      title: subject.trim() || DEFAULT_TITLE,
      name: name.trim(),
      message: message.trim(),
      email: email.trim(),
      reply_to: email.trim(),
    };

    setIsSubmitting(true);

    try {
      const [contactResult, autoReplyResult] = await Promise.allSettled([
        emailjs.send(
          EMAILJS_SERVICE_ID,
          CONTACT_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ),
        emailjs.send(
          EMAILJS_SERVICE_ID,
          AUTO_REPLY_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ),
      ]);

      if (contactResult.status === "rejected") {
        throw contactResult.reason;
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});

      if (autoReplyResult.status === "fulfilled") {
        setFormStatus({
          message:
            "Message sent successfully! A confirmation email has been sent to you.",
          type: "success",
        });
      } else {
        setFormStatus({
          message:
            "Message sent successfully, but the confirmation email could not be delivered.",
          type: "warning",
        });
      }
    } catch {
      setFormStatus({
        message: "Unable to send your message. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animate-fade-in mx-auto my-10 max-w-[600px] rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-10">
      <form
        id="contact-form"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-[25px]"
      >
        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-[0.9rem] font-medium text-[#f0f6fc]"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="John Doe"
            autoComplete="name"
            required
            className={`rounded-lg border bg-white/5 px-[15px] py-3 text-base text-[#f0f6fc] transition-all focus:bg-white/[0.08] focus:outline-none ${
              errors.name
                ? "border-[#ff5555]"
                : "border-[#30363d] focus:border-[#00cfff]"
            }`}
          />
          {errors.name && (
            <span
              id="name-error"
              className="absolute -bottom-5 left-0 text-[0.8rem] text-[#ff5555]"
            >
              {errors.name}
            </span>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[0.9rem] font-medium text-[#f0f6fc]"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="name@example.com (For me to reply)"
            autoComplete="email"
            required
            className={`rounded-lg border bg-white/5 px-[15px] py-3 text-base text-[#f0f6fc] transition-all focus:bg-white/[0.08] focus:outline-none ${
              errors.email
                ? "border-[#ff5555]"
                : "border-[#30363d] focus:border-[#00cfff]"
            }`}
          />
          {errors.email && (
            <span
              id="email-error"
              className="absolute -bottom-5 left-0 text-[0.8rem] text-[#ff5555]"
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-[0.9rem] font-medium text-[#f0f6fc]"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What is this regarding? (Optional)"
            className="rounded-lg border border-[#30363d] bg-white/5 px-[15px] py-3 text-base text-[#f0f6fc] transition-all focus:border-[#00cfff] focus:bg-white/[0.08] focus:outline-none"
          />
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-[0.9rem] font-medium text-[#f0f6fc]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message)
                setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            placeholder="Write your message here..."
            rows={6}
            required
            className={`resize-y rounded-lg border bg-white/5 px-[15px] py-3 text-base text-[#f0f6fc] transition-all focus:bg-white/[0.08] focus:outline-none ${
              errors.message
                ? "border-[#ff5555]"
                : "border-[#30363d] focus:border-[#00cfff]"
            }`}
          />
          {errors.message && (
            <span
              id="message-error"
              className="absolute -bottom-5 left-0 text-[0.8rem] text-[#ff5555]"
            >
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-[15px] w-full"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        <p className="text-center text-[0.85rem] text-[#8b949e]">
          Your message will be sent directly to my Gmail, and you will receive a
          confirmation email.
        </p>

        <div
          id="form-status"
          role="status"
          aria-live="polite"
          className={`min-h-[24px] text-center text-[0.9rem] ${
            formStatus.type === "success"
              ? "text-[#50fa7b]"
              : formStatus.type === "warning"
                ? "text-[#f1c40f]"
                : formStatus.type === "error"
                  ? "text-[#ff5555]"
                  : ""
          }`}
        >
          {formStatus.message}
        </div>
      </form>
    </div>
  );
}
