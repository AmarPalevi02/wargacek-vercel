const PageLayout = ({ children }) => {
   return (
      <div className="w-full min-h-screen flex justify-center  font-poppins">
         <div className="w-full max-w-lg px-6 pb-5 bg-[#EEF9F5]">
            {children}
         </div>
      </div>
   );
};

export default PageLayout