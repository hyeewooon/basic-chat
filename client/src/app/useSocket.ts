import { useEffect, useState } from "react";
import type { Message } from "./model";

const webSocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? "");

function useSocket() {
  const [isConnected, setConnected] = useState(false);
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [list, setList] = useState<Message[]>([]);

  useEffect(() => {
    if (!webSocket) return;

    if (webSocket.readyState === WebSocket.OPEN) {
      console.log("WebSocket이 이미 열려 있음.");
      setConnected(true);
    }

    webSocket.onopen = handleOpen;
    webSocket.onmessage = handleMessage;
    webSocket.onclose = handleClose;

    return () => {
      webSocket.onopen = null;
      webSocket.onmessage = null;
      webSocket.onclose = null;
      webSocket.close();
    };
  }, []);

  const handleOpen = () => {
    console.log("WebSocket 연결됨");
    setConnected(true);
  };

  const handleMessage = (e: MessageEvent<string>) => {
    const { type, name, msg }: Message = JSON.parse(e.data);

    const listItem: Message = {
      type,
      name,
      msg: type === "WELCOME" ? `${name} joins the chat` : msg,
    };

    setList((prev) => [...prev, listItem]);
  };

  const handleClose = () => {
    console.log("WebSocket 연결 종료");
    setConnected(false);
  };

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
    isConnected,
    username,
    value,
    list,
    changeInput,
    submitUsername,
    submitChat,
  };
}

export default useSocket;
