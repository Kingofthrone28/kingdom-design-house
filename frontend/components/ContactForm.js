import React, { useState } from 'react';
import { getContactFormData } from '../data/siteData';
import { handleFormSubmission } from '../utils/formSubmissionService';
import styles from '../styles/ContactForm.module.scss';
import Button from './Atoms/Button';
import PhoneIcon from './Atoms/PhoneIcon';
import EmailIcon from './Atoms/EmailIcon';

const ContactForm = () => {
  const formConfig = getContactFormData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);

    try {
      const result = await handleFormSubmission(formData, formConfig);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        setErrors(result.errors || {});
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldName, fieldConfig) => {
    const hasError = errors[fieldName];
    const fieldId = `contact-${fieldName}`;
    
    const baseInputProps = {
      id: fieldId,
      name: fieldName,
      value: formData[fieldName],
      onChange: handleInputChange,
      placeholder: fieldConfig.placeholder,
      className: `${styles.formField__input} ${hasError ? styles['formField__input--error'] : ''}`,
      required: fieldConfig.required
    };

    return (
      <div key={fieldName} className={`${styles.formField} ${hasError ? styles['formField--error'] : ''}`}>
        <label htmlFor={fieldId} className={styles.formField__label}>
          {fieldConfig.label}
          {fieldConfig.required && <span className={styles.formField__required}>*</span>}
        </label>
        
        {fieldConfig.type === 'textarea' ? (
          <textarea
            {...baseInputProps}
            rows="5"
            className={`${styles.formField__input} ${styles.formField__textarea} ${hasError ? styles['formField__input--error'] : ''}`}
          />
        ) : fieldConfig.type === 'select' ? (
          <select {...baseInputProps}>
            {fieldConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...baseInputProps}
            type={fieldConfig.type}
          />
        )}
        
        {hasError && (
          <span className={styles.formField__error}>
            {errors[fieldName]}
          </span>
        )}
      </div>
    );
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.contactForm__container}>
        {/* Header */}
        <div className={styles.contactForm__header}>
          <h1 className={styles.contactForm__title}>
            {formConfig.title}
          </h1>
          <p className={styles.contactForm__subtitle}>
            {formConfig.subtitle}
          </p>
        </div>

        <div className={styles.contactForm__content}>
          {/* Contact Information */}
          <div className={styles.contactForm__info}>
            <h2 className={styles.contactForm__sectionTitle}>Get In Touch</h2>
            <p className={styles.contactForm__sectionDescription}>
              We're here to help you succeed. Reach out to us through any of these channels.
            </p>

            <div className={styles.contactForm__methods}>
              {formConfig.contactMethods.map((method, index) => (
                <div key={index} className={styles.contactForm__method}>
                  <div className={styles.contactForm__methodIcon}>
                    {method.type === 'phone' && <PhoneIcon />}
                    {method.type === 'email' && <EmailIcon />}
                    {method.type === 'location' && <span>📍</span>}
                  </div>
                  <div className={styles.contactForm__methodDetails}>
                    <h3 className={styles.contactForm__methodLabel}>{method.label}</h3>
                    {method.action ? (
                      <a 
                        href={method.action} 
                        className={styles.contactForm__methodValue}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className={styles.contactForm__methodValue}>
                        {method.value}
                      </span>
                    )}
                    <span className={styles.contactForm__methodDescription}>
                      {method.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.contactForm__hours}>
              <h3 className={styles.contactForm__hoursTitle}>{formConfig.businessHours.title}</h3>
              <div className={styles.contactForm__hoursList}>
                {formConfig.businessHours.hours.map((hour, index) => (
                  <div key={index} className={styles.contactForm__hourItem}>
                    <span className={styles.contactForm__hourDay}>{hour.day}</span>
                    <span className={styles.contactForm__hourTime}>{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.contactForm__formSection}>
            <h2 className={styles.contactForm__sectionTitle}>Send Us a Message</h2>
            
            {submitStatus && (
              <div className={`${styles.contactForm__status} ${styles[`contactForm__status--${submitStatus.type}`]}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.contactForm__form}>
              <div className={styles.contactForm__formRow}>
                {renderField('name', formConfig.fields.name)}
                {renderField('email', formConfig.fields.email)}
              </div>

              <div className={styles.contactForm__formRow}>
                {renderField('phone', formConfig.fields.phone)}
                {renderField('company', formConfig.fields.company)}
              </div>

              {renderField('service', formConfig.fields.service)}
              {renderField('message', formConfig.fields.message)}

              <Button 
                type="submit" 
                variant="secondary" 
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? formConfig.submitButton.loadingText : formConfig.submitButton.text}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
