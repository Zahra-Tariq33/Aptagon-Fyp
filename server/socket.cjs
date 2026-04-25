const { createServer } = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const PORT = Number(process.env.SOCKET_PORT || 3001);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "dev-insecure-secret-change-me";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: CORS_ORIGIN, credentials: true },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("auth required"));
    const p = jwt.verify(token, JWT_SECRET);
    socket.userId = String(p.sub);
    socket.userRole = String(p.role);
    return next();
  } catch {
    return next(new Error("auth invalid"));
  }
});

io.on("connection", (socket) => {
  const room = `user:${socket.userId}`;
  socket.join(room);

  socket.on("chat:send", (payload) => {
    const toId = payload?.toUserId;
    const message = payload?.message;
    if (!toId || !message) return;
    io.to(`user:${toId}`).emit("chat:message", {
      fromUserId: socket.userId,
      message: String(message),
      createdAt: new Date().toISOString(),
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.io listening on ${PORT} (CORS: ${CORS_ORIGIN})`);
});
