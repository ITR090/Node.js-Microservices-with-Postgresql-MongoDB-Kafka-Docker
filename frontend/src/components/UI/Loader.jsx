const Loader = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-t-transparent border-primary ${sizes[size]}`}
      />
      {text && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
