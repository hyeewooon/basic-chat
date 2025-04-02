"use client";

import useSocket from "./useSocket";

export default function Home() {
  const { userId, value, list, changeUserId, submitUserId } = useSocket();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex-none w-[500px]">
        <h1 className="mb-4 text-center text-4xl font-bold text-blue-300">
          CHAT
        </h1>

        {!userId ? (
          <div>
            <form className="flex">
              <input
                className="w-full p-2 border border-gray-200 focus-visible:outline-none"
                placeholder="Enter Your ID"
                onChange={changeUserId}
                value={value}
              />
              <button
                type="submit"
                className="flex-none w-[70px] p-2 ml-2 bg-blue-300 text-white font-bold rounded-sm cursor-pointer"
                onClick={submitUserId}
              >
                로그인
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="min-h-[600px] p-4 bg-gray-50 rounded-sm"></div>

            <form className="flex mt-4">
              <input
                className="w-full p-2 border border-gray-200 focus-visible:outline-none"
                placeholder={userId}
              />
              <button className="flex-none w-[70px] p-2 ml-2 bg-blue-300 text-white font-bold rounded-sm cursor-pointer">
                등록
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
