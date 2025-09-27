import React from 'react';
import styles from '../../styles/Button.module.scss';
import { useSiteData } from '../../contexts/SiteDataContext';

const Button = ({ 
    variant = 'primary', 
    size = 'default', 
    children, 
    onClick, 
    ...props }) => {
        
    const { getNavbarData } = useSiteData();
    const navbarData = getNavbarData();
    const { buttonText, ariaLabel } = navbarData.cta;

    
    const buttonClasses = [
        styles.button,
        styles[`button--${variant}`],
        size !== 'default' && styles[`button--${size}`]
    ].filter(Boolean).join(' ');

    return (
        <button 
            className={buttonClasses} 
            aria-label={ariaLabel}
            onClick={onClick}
            {...props}
        >
            {children || buttonText}
            <svg 
                className={styles.button__arrow} 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
            >
                <path 
                    d="M6 12L10 8L6 4" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};

export default Button;