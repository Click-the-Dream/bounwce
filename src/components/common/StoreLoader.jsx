const StoreLoader = ({
  title = "Setting up your store",
  description = "We're preparing everything for your business",
  fullScreen = true,
}) => {
  const content = (
    <div className="text-center space-y-8 max-w-sm mx-auto px-6">
      {/* Animated Orange Loader */}
      <div className="relative flex justify-center">
        <div className="relative">
          {/* Outer pulse */}
          <div className="absolute inset-0 bg-orange/20 rounded-full animate-ping"></div>

          {/* Main spinner */}
          <div className="relative w-20 h-20 border-4 border-orange/30 rounded-full">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-orange rounded-full animate-spin"></div>
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Loading dots */}
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-orange rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-orange rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-orange rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#6e4a06]/30 to-orange/10">
        {content}
      </div>
    );
  }

  return content;
};

export default StoreLoader;
