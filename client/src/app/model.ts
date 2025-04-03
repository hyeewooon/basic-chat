export interface Message {
  type: "WELCOME" | "CHAT" | "ME";
  name: string;
  msg: string;
}
