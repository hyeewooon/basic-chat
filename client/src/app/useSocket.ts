import { useEffect, useState } from "react";
import type { Message } from "./model";

const webSocket = new WebSocket("ws://localhost:8080");

function useSocket() {
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [list, setList] = useState<Message[]>([]);

  useEffect(() => {
    if (!webSocket) return;

    // 처음 소켓이 연결됨
    if (webSocket.readyState === WebSocket.OPEN) {
      console.log("WebSocket이 이미 열려 있음.");
    } else {
      webSocket.onopen = () => {
        console.log("open", webSocket.protocol);
      };
    }

    // 서버에서 온 메시지
    webSocket.onmessage = (e: MessageEvent<string>) => {
      const { type, name, msg }: Message = JSON.parse(e.data);

      const listItem: Message = {
        type,
        name,
        msg: type === "WELCOME" ? `${name} joins the chat` : msg,
      };

      setList((prev) => [...prev, listItem]);
    };

    // 소켓 연결이 종료됨
    webSocket.onclose = () => {
      console.log("close");
    };

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function submitUsername(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const sendData: Message = {
      type: "WELCOME",
      name: value,
      msg: value,
    };

    webSocket.send(JSON.stringify(sendData));

    setUsername(value);
    setValue("");
  }

  function submitChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const sendData: Message = {
      type: "CHAT",
      name: username,
      msg: value,
    };

    webSocket.send(JSON.stringify(sendData));

    const listItem: Message = {
      type: "ME",
      name: username,
      msg: value,
    };

    setList((prev) => [...prev, listItem]);
    setValue("");
  }

  return {
    username,
    value,
    list,
    changeInput,
    submitUsername,
    submitChat,
  };
}

export default useSocket;
