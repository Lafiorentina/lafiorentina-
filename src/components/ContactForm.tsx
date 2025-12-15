import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ContactForm = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    formDataObj.append("access_key", "a942acba-c508-47d6-b12d-5be8d05d8de7");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          name: "",
          email: "",
          subject: "",
          reason: "",
          message: "",
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      console.log("Error:", error);
      setStatus('error');
      setErrorMessage("There was an error with the submission.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="input-floating">
          <input
            type="text"
            id="contact-name"
            name="name"
            placeholder=" "
            required
            value={formData.name}
            onChange={handleChange}
            className="peer"
          />
          <label htmlFor="contact-name">
            {t("form.fullName")}
          </label>
        </div>

        {/* Email Field */}
        <div className="input-floating">
          <input
            type="email"
            id="contact-email"
            name="email"
            placeholder=" "
            required
            value={formData.email}
            onChange={handleChange}
            className="peer"
          />
          <label htmlFor="contact-email">
            Email
          </label>
        </div>
      </div>

      {/* Reason Field */}
      <div className="input-floating">
        <select
          id="contact-reason"
          name="reason"
          required
          value={formData.reason}
          onChange={handleChange}
          className="peer cursor-pointer"
        >
          <option value="">{t("form.select.reason")}</option>
          <option value="general">{t("form.reason.general")}</option>
          <option value="group">{t("form.reason.group")}</option>
          <option value="private">{t("form.reason.private")}</option>
          <option value="feedback">{t("form.reason.feedback")}</option>
          <option value="partnership">{t("form.reason.partnership")}</option>
        </select>
        <label htmlFor="contact-reason" className="!top-0.5 !text-xs !text-primary">
          {t("form.reason")}
        </label>
      </div>

      {/* Subject Field */}
      <div className="input-floating">
        <input
          type="text"
          id="contact-subject"
          name="subject"
          placeholder=" "
          required
          value={formData.subject}
          onChange={handleChange}
          className="peer"
        />
        <label htmlFor="contact-subject">
          {t("form.subject")}
        </label>
      </div>

      {/* Message Field */}
      <div className="input-floating">
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder=" "
          required
          value={formData.message}
          onChange={handleChange}
          className="peer resize-none"
        />
        <label htmlFor="contact-message">
          {t("form.message")}
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`btn-luxury w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl text-white font-medium text-lg transition-all duration-300 ${
          status === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {language === 'pt' ? 'Enviando...' : 'Sending...'}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t("form.send")}
          </>
        )}
      </button>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700 animate-fade-in">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">
            {language === 'pt'
              ? 'Mensagem enviada com sucesso!'
              : 'Message sent successfully!'}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-700 animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">
            {errorMessage || (language === 'pt'
              ? 'Ocorreu um erro. Tente novamente.'
              : 'An error occurred. Please try again.')}
          </p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
