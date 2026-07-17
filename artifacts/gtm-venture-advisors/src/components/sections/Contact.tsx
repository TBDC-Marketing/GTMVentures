import { useState } from "react";
import { CONTACT, SITE } from "../../content/site";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";

type FormStatus = "idle" | "submitting" | "success" | "error";

const FIELD_CLS =
  "w-full px-4 py-3 text-base text-brand-ivory bg-brand-navy border border-brand-ivory/20 rounded-sm placeholder:text-brand-ivory/35 focus:border-brand-gold focus:outline-none transition-colors";
const LABEL_CLS = "block text-[0.72rem] font-medium uppercase tracking-[0.18em] text-brand-ivory/70 mb-2";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-brand-gold" role="alert">
      {message}
    </p>
  );
}

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Honeypot: silently drop bot submissions that filled the hidden field. */
    if ((data.get("_honey") as string)?.length) return;

    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const message = (data.get("message") as string).trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please tell us briefly what you're looking for.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: (data.get("company") as string)?.trim() ?? "",
          stage: (data.get("stage") as string) ?? "",
          message,
          _subject: "New GTM Venture Advisors website inquiry",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" surface="deep">
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: invitation + direct contact details */}
          <div>
            <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] text-brand-ivory">
              Let's chart the <em className="text-brand-gold">next stage.</em>
            </h2>
            <p className="mt-6 text-brand-ivory/75 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] max-w-md">
              {CONTACT.sub}
            </p>
            <div aria-hidden="true" className="mt-8 h-px w-16 bg-brand-gold" />
            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="block font-display italic text-xl text-brand-ivory hover:text-brand-gold transition-colors"
              >
                {SITE.email}
              </a>
              <p className="text-brand-ivory/55">{SITE.address}</p>
              <p className="text-brand-ivory/55">
                {SITE.name} · A wholly owned subsidiary of the Toronto Business Development Centre
              </p>
            </div>
          </div>

          {/* Right: qualification form */}
          <div className="border border-brand-ivory/15 rounded-sm p-6 md:p-8 bg-brand-navy-soft/30">
            {status === "success" ? (
              <div role="status" className="py-10 text-center">
                <p className="font-display text-2xl text-brand-ivory">Thank you.</p>
                <p className="mt-3 text-brand-ivory/70 text-sm leading-relaxed max-w-sm mx-auto">
                  Your message has been received. A member of our team will review and respond to
                  you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from real users, tempting for bots */}
                <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
                  <label>
                    Leave this field empty
                    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className={LABEL_CLS}>
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className={FIELD_CLS}
                      />
                      <FieldError id="contact-name-error" message={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={LABEL_CLS}>
                        Work email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className={FIELD_CLS}
                      />
                      <FieldError id="contact-email-error" message={errors.email} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-company" className={LABEL_CLS}>
                        Company
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className={FIELD_CLS}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-stage" className={LABEL_CLS}>
                        Stage / financing need
                      </label>
                      <select id="contact-stage" name="stage" className={FIELD_CLS} defaultValue="">
                        <option value="" disabled>
                          Select…
                        </option>
                        {CONTACT.stageOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={LABEL_CLS}>
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={`${FIELD_CLS} resize-none`}
                    />
                    <FieldError id="contact-message-error" message={errors.message} />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-sm text-brand-gold leading-relaxed">
                      Something went wrong sending your message. Please try again, or email us
                      directly at{" "}
                      <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">
                        {SITE.email}
                      </a>
                      .
                    </p>
                  )}

                  <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
