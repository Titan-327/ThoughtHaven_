import {Atom } from "react-loading-indicators";

export const Loader = function () {
  return (
    <div className="flex min-h-screen justify-center items-center dark:bg-gray-500">
      <div>
      <Atom color="#0a0a0a" size="large" text="" textColor="" />
      </div>
    </div>
  );
};
