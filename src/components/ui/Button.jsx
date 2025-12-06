import { Link } from "react-router-dom";

const Button = ({
   children,
   onClick,
   variant = 'primary',
   size = 'md',
   disabled = false,
   className = '',
   type,
   to,
   ...props
}) => {
   const baseStyles = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

   const variantStyles = {
      primary: 'bg-[#3b82f6] text-white cursor-pointer',
      success: 'bg-[#10b981] text-white cursor-pointer',
      warning: 'bg-[#f59e0b] text-white cursor-pointer',
      error: 'bg-[#ef4444] text-white',
      secondary: 'bg-[#6b7280] text-white',
   };

   const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
   };

   const disabledStyles = disabled
      ? 'opacity-50 cursor-not-allowed'
      : '';

   const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

   if (to) {
      return (
         <Link
            to={to}
            className={buttonStyles}
            {...props}
         >
            {children}
         </Link>
      );
   }

   return (
      <button
         type={type}
         onClick={onClick}
         disabled={disabled}
         className={buttonStyles}
         {...props}
      >
         {children}
      </button>
   );
};

export default Button;