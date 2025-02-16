import parse from "html-react-parser";


interface FullBlogCardProps {
  content: string;
  title: string;
  authorName: string;
  createdAt: string;
  imageLink: string;
}

export const FullBlogCard = function ({
  content,
  title,
  authorName,
  createdAt,
  imageLink,
}: FullBlogCardProps) {


  return (
    <div className="dark:bg-slate-700 flex flex-col items-center justify-center min-h-screen px-4 md:px-6">
      <div className="flex flex-col md:flex-row min-h-12 w-full md:w-3/5 border-2 border-black mx-auto m-5 p-4 md:p-6">
        {/* Left Side: Title, Date, Content, Author */}
        <div className="md:w-2/3 w-full">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white break-words w-full">
            {title}
          </h2>

          {/* Date */}
          <div className="dark:text-white mx-4 my-2">
            Posted on {createdAt.slice(0, 10)}
          </div>

          {/* Content */}
          <div>
            <p className="text-lg text-gray-600 dark:text-white break-words m-4">
              {parse(content)}
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center m-2">
            {/* Author's first letter in a circle */}
            <div className="rounded-full w-10 h-10 bg-gray-500 text-center text-white flex items-center justify-center">
              {authorName[0]}
            </div>
            {/* Author's name */}
            <div className="mx-1 text-lg dark:text-white">{authorName}</div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/3 w-full md:h-auto h-80 sm:h-96 overflow-hidden rounded-xl mb-4 md:mb-0 md:ml-6">
          <img
            src={imageLink}
            className="w-full h-full object-cover sm:h-96 md:h-auto"
            alt="Blog Image"
          />
        </div>
      </div>
    </div>
  );
};
