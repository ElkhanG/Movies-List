import React, { useState, forwardRef } from 'react';
import './FAQ.css';

const FAQ = forwardRef((props, ref) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How does the AI quiz work?',
      answer: 'The AI quiz analyzes your answers to suggest movies tailored to your preferences.',
    },
    {
      question: 'How is my personality determined?',
      answer: 'Your favorite movies are analyzed to infer personality traits, allowing for highly personalized recommendations.',
    },
    {
      question: 'Can I save my movie list?',
      answer: 'Yes, you can save your list and share it with friends or revisit it later.',
    },
    {
      question: 'What data is used to make recommendations?',
      answer: 'We use data from your quiz responses and favorite movies to provide personalized recommendations.',
    },
    {
      question: 'Is this service free?',
      answer: 'Yes, our platform is completely free to use for movie recommendations and list saving.',
    },
  ];

  return (
    <section ref={ref} className="faq-section">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-items">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-toggle">{openIndex === index ? '-' : '+'}</span>
              </div>
              <div
                className={`faq-answer`}
                style={{
                  maxHeight: openIndex === index ? '200px' : '0',
                  transition: 'max-height 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FAQ;
