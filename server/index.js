const WebSocket = require("ws");

// 1. WebSocket 서버 생성
const wss = new WebSocket.Server({ port: 8080 });

// ws: 서버와 연결된 웹 소켓 클라이언트 객체
wss.on("connection", (ws) => {
  console.log("클라이언트가 연결되었습니다.");

  // 3. 클라이언트로부터 메시지를 받았을 때 처리하는 이벤트
  ws.on("message", (data, isBinary) => {
    // 메세지를 받았을 때, 메세지를 보낸 클라이언트(ws)을 제외하고 연결된 모든 클라이언트에게 브로드캐스팅
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  // 4. 클라이언트 연결 종료 시
  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });

  // 5. 오류 처리
  ws.on("error", (err) => {
    console.error("소켓 에러:", err);
  });
});

console.log("서버가 8080번 포트에서 실행됨");
