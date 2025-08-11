import React from 'react'

function Container({ children, className = '', size = 'default' }) {
  // Different container sizes for different use cases
  const sizeClasses = {
    sm: 'max-w-3xl',      // Small container for forms, articles
    default: 'max-w-7xl', // Default container for most content
    lg: 'max-w-[1400px]', // Large container for dashboards
    full: 'max-w-none',   // Full width container
    screen: 'max-w-screen-2xl' // Screen-based max width
  };

  return (
    <div className={`
      w-full 
      ${sizeClasses[size]} 
      mx-auto 
      px-4 
      sm:px-6 
      lg:px-8 
      xl:px-12
      ${className}
    `}>
      {children}
    </div>
  )
}

export default Container