interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Carregando...',
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-[#16232E] bg-opacity-80 z-50'
    : 'absolute inset-0 flex items-center justify-center bg-[#16232E] bg-opacity-80 z-10';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center p-2" data-testid="loading-spinner-container">
          <div className="animate-spin h-5 w-5 text-white loading-spinner" data-testid="loading-spinner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        </div>
        {message && (
          <span className="mt-4 text-white text-sm">{message}</span>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 