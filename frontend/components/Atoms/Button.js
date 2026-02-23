import React from 'react';
import styles from '../../styles/Button.module.scss';
import { useSiteData } from '../../contexts/SiteDataContext';
import { withTrailingSlash } from '../../utils/url';
import Link from 'next/link';

const Arrow = () => (
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
);

const Button = ({ 
    variant = 'primary', 
    size = 'default', 
    children, 
    onClick, 
    href,
    ...props }) => {
        
    const { getNavbarData } = useSiteData();
    const navbarData = getNavbarData();
    const { buttonText, ariaLabel } = navbarData.cta;

    const buttonClasses = [
        styles.button,
        styles[`button--${variant}`],
        size !== 'default' && styles[`button--${size}`]
    ].filter(Boolean).join(' ');

    const Element = href ? Link : 'button';
    const elementProps = {
        className: buttonClasses,
        'aria-label': ariaLabel,
        onClick,
        ...(href ? { href: withTrailingSlash(href) } : {}),
        ...props
    };

    
    return (
        <Element {...elementProps}>
            {children || buttonText}
            <Arrow />
        </Element>
    );
};

export default Button;