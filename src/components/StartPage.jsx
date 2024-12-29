/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const StartPage = ({ onGetStarted, isDarkMode, toggleDarkMode }) => {
 
  return (
    <div
      className={` ${
        isDarkMode ? "bg-gray-950 text-slate-300" : "bg-slate-50 text-gray-950"
      }  min-h-screen flex  justify-center  p-8 text-center" `}
    >
      <div
        className={` w-1/2 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        }   flex justify-center rounded-3xl max-lg:hidden `}
      >
        <i className="fa-solid fa-umbrella text-sky-400 text-[230px] my-auto block "></i>
      </div>

      <div className="w-1/2 flex justify-center items-center flex-col max-lg:w-full relative">
        <i className="fa-solid fa-umbrella text-sky-400 pb-10  text-2xl max-lg:text-9xl max-lg:pb-24"></i>
        <h1 className="font-bold text-6xl">Breeze</h1>
        <p className="pb-16 pt-2 text-gray-500 font-medium">Weather App</p>
        <Link
          to="/home"
          onClick={onGetStarted}
          className=" px-8 py-3 w-fit bg-sky-500 text-white  font-semibold rounded-full hover:bg-sky-600 transition-colors"
        >
          Get Started
        </Link>

        {/* icon to control mode light or dark  */}
        <div
          className="absolute right-0 top-0 text-xl text-center"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <i className="fa-solid fa-moon  text-gray-500 "></i>
          ) : (
            <i className="fa-solid fa-sun text-yellow-500"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
