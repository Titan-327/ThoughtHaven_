import { useNavigate } from "react-router-dom";
export const Landing = () => {
  const navigate=useNavigate()
  return (
    <div className="font-sans bg-white dark:bg-gray-900  dark:text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r  h-screen flex items-center justify-center text-center px-6 py-12">
        <div className="absolute inset-0 "></div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold  mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Welcome to ThoughtHaven
          </h1>
          <p className="text-lg sm:text-xl  mb-6 animate__animated animate__fadeIn animate__delay-2s">
            Discover interesting articles, share your thoughts, and stay informed.
          </p>
          <button
            onClick={function(){
             navigate("/blogs")
            }}
            className="px-6 py-3 bg-white text-blue-600 text-lg rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-3s dark:bg-blue-600 dark:text-white dark:hover:scale-105"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-slate-300 dark:bg-gray-500">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4 animate__animated animate__fadeIn">
            Features of Our Blog App
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 animate__animated animate__fadeIn animate__delay-1s">
            We offer a range of powerful tools to help you read and write with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md transform transition-all hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-2s dark:bg-gray-800 dark:text-white">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              Easy-to-Use Interface
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our simple and intuitive design makes it easy to navigate through articles and features.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md transform transition-all hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-3s dark:bg-gray-800 dark:text-white">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              Engaging Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We curate the most interesting and up-to-date articles from various genres to keep you informed.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md transform transition-all hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-4s dark:bg-gray-800 dark:text-white">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              Community Interaction
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join the conversation through discussions on articles to share ideas and feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
};
