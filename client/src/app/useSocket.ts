import { useEffect, useState } from "react";
import type { Message } from "./model";

const webSocket = new WebSocket("ws://localhost:8080");

function useSocket() {
  const [userId, setUserId] = useState("");
  const [list, setList] = useState([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (!webSocket) return;

    // 처음 소켓이 연결됨
    webSocket.onopen = () => {
      console.log("open", webSocket.protocol);
    };

    // 서버에서 온 메시지
    webSocket.onmessage = (e: MessageEvent<Message>) => {};

    // 소켓 연결이 종료됨
    webSocket.onclose = () => {
      console.log("close");
    };
  }, []);

  function changeUserId(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function submitUserId(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setUserId(value);
  }

  return {
    userId,
    value,
    list,
    changeUserId,
    submitUserId,
  };
}

export default useSocket;
