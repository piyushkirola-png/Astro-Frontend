import { Mail, Phone, MapPin, MessageSquare, Star, Users, Clock, Shield, Paperclip, X, Sparkles, Heart, Compass } from 'lucide-react';
import { useState, useRef } from 'react';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/animations/Reveal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'âŒ File size exceeds 5MB limit. Please choose a smaller file.',
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedFile) {
      formData.append('attachment', selectedFile);
    }

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'âœ… Message sent successfully! We\'ll get back to you within 24 hours.',
        });
        form.reset();
        setSelectedFile(null);
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(result.error || 'Failed to send');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'âŒ Failed to send. Please try again or use our contact details below.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Contact Us"
        title={<>Connect with <span className="gradient-text">Cosmic Wisdom</span></>}
        subtitle="Whether you need guidance, have questions, or want to consult an astrologer â€” our team is here to help."
      />

      <section className="section-pad bg-white">
        <div className="container-8xl max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ink-900 mb-4">Get in touch</h2>
              <p className="text-ink-500 max-w-2xl mx-auto">
                Fill out the form and our team will get back to you within 24 hours. For urgent
                matters, use the contact details below.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3 lg:pr-8">
              <Reveal>
                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                      }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ink-700 mb-1">
                        Full Name <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1">
                        Email Address <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ink-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-ink-700 mb-1">
                        Subject <span className="text-danger-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="Astrology Consultation">Astrology Consultation</option>
                        <option value="Kundali Generation">Kundali Generation</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-1">
                      Your Message <span className="text-danger-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">
                      Attach File (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file-upload"
                        name="attachment"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      />
                      <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-ink-200 hover:border-primary-400 transition-all bg-ink-50 hover:bg-white">
                        <div className="flex items-center justify-center gap-2 text-ink-500">
                          <Paperclip className="h-5 w-5" />
                          <span>
                            {fileName ? `Selected: ${fileName}` : 'Click to upload or drag & drop'}
                          </span>
                          <span className="text-xs text-ink-400 ml-2">
                            (Max 5MB - PDF, DOC, JPG, PNG, TXT)
                          </span>
                        </div>
                      </div>
                    </div>
                    {fileName && (
                      <div className="mt-2 flex items-center gap-2 p-2 bg-primary-50 rounded-lg border border-primary-200">
                        <Paperclip className="h-4 w-4 text-primary-600" />
                        <span className="text-sm text-ink-700 flex-1 truncate">{fileName}</span>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-primary-100 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4 text-ink-400 hover:text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-center pt-2">
                    {isSubmitting ? (
                      <Button
                        type="submit"
                        className="px-8 py-4 text-lg opacity-70 cursor-not-allowed"
                      >
                        <span className="inline-block animate-spin mr-2">âŸ³</span>
                        Sending...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="px-8 py-4 text-lg"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Send Message
                      </Button>
                    )}
                    <p className="text-sm text-ink-400 mt-3">
                      We'll respond to your message within 24 hours
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:pl-4">
              <div className="space-y-4">
                {/* Contact Details */}
                {[
                  { icon: Mail, label: 'Email', value: 'support@jyotishai.com', href: 'mailto:support@jyotishai.com' },
                  { icon: MapPin, label: 'Office', value: 'Noida, Uttar Pradesh, India' },
                  { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7' },
                ].map((item) => (
                  <Reveal key={item.label} delay={0.1}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-md transition-all"
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex-shrink-0">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-ink-500">{item.label}</div>
                          <div className="font-semibold text-ink-900">{item.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-ink-50 border border-ink-100">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex-shrink-0">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-ink-500">{item.label}</div>
                          <div className="font-semibold text-ink-900">{item.value}</div>
                        </div>
                      </div>
                    )}
                  </Reveal>
                ))}

                {/* Expert Astrologers */}
                <Reveal delay={0.2}>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <h3 className="font-bold text-ink-900">Talk to an Astrologer</h3>
                    </div>
                    <p className="text-sm text-ink-600 mb-4">
                      Get personalized guidance on love, career, health, and life from our expert astrologers.
                    </p>
                    <Button to="/consultations" variant="outline" size="sm">
                      <Users className="h-4 w-4" />
                      Book Consultation
                    </Button>
                  </div>
                </Reveal>

                {/* Quick Stats */}
                <Reveal delay={0.3}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-ink-50 border border-ink-100 text-center">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm font-bold text-ink-900">24/7</div>
                      <div className="text-xs text-ink-500">Support</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-ink-50 border border-ink-100 text-center">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm font-bold text-ink-900">100%</div>
                      <div className="text-xs text-ink-500">Privacy</div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <Badge variant="dark" className="mb-4">
              <Sparkles className="h-3 w-3" />
              Free Consultation
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to discover your <span className="gradient-text-light">cosmic path?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Chat with our expert astrologers today and get the guidance you need.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/consultations" variant="primary" size="lg">
                <MessageSquare className="h-4 w-4" />
                Book a Consultation
              </Button>
              <Button to="/free-kundali" variant="dark" size="lg">
                <Star className="h-4 w-4" />
                Get Free Kundali
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}