"use client";

import clsx from "clsx";
import useSocket from "./useSocket";

export default function Home() {
  const { username, value, list, changeInput, submitUsername, submitChat } =
    useSocket();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex-none w-[500px]">
        <h1 className="mb-4 text-center text-4xl font-bold text-blue-300">
          CHAT
        </h1>

        {!username ? (
          <div>
            <form className="flex">
              <input
                className="w-full p-2 border border-gray-200 focus-visible:outline-none"
                placeholder="Enter Your Nickname"
                onChange={changeInput}
                value={value}
              />
              <button
                type="submit"
                className="flex-none w-[70px] p-2 ml-2 bg-blue-300 text-white font-bold rounded-sm cursor-pointer"
                onClick={submitUsername}
              >
                로그인
              </button>
            </form>
          </div>
        ) : (
          <>
            <ul className="min-h-[600px] rounded-sm">
              {list.length > 0 &&
                list.map((item, idx) => {
                  if (item.type === "WELCOME") {
                    return (
                      <li
                        key={`${idx}_${item.type}_${item.name}`}
                        className="text-sm text-gray-600"
                      >
                        {item.msg}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={`${idx}_${item.type}_${item.name}`}
                        className={clsx(
                          "flex items-center justify-center",
                          item.type === "ME" ? "justify-end" : "justify-start"
                        )}
                      >
                        <p className="mr-2 text-blue-400">{item.name}</p>
                        <p>{item.msg}</p>
                      </li>
                    );
                  }
                })}
            </ul>

            <form className="flex mt-4">
              <input
                className="w-full p-2 border border-gray-200 focus-visible:outline-none"
                placeholder={`${username}으로 등록`}
                onChange={changeInput}
                value={value}
              />

              <button
                type="submit"
                className="flex-none w-[70px] p-2 ml-2 bg-blue-300 text-white font-bold rounded-sm cursor-pointer"
                onClick={submitChat}
              >
                등록
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
