const { WebSocketServer } = require("ws");

// WebSocket 서버 생성
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("클라이언트가 연결되었습니다.");

  // 클라이언트로부터 메시지를 받았을 때 처리하는 이벤트
  ws.on("message", (message) => {
    console.log("클라이언트에게 받은 메시지: ", message);

    // 클라이언트에게 메시지 전송
    ws.send(`서버로부터 응답: ${message}`);
  });

  // 클라이언트 연결 종료 시
  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });

  // 오류 처리
  ws.on("error", (err) => {
    console.error("소켓 에러:", err);
  });

  // 클라이언트와 처음 연결 시 메시지 전송
  ws.send("서버에 연결되었습니다!");
});

console.log("서버가 8080번 포트에서 실행됨");
