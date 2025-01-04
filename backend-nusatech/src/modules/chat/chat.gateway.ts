import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Sesuaikan ini untuk produksi
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private users: { [key: string]: string } = {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Hapus pengguna dari daftar saat mereka terputus
    delete this.users[client.id];
  }

  @SubscribeMessage('register')
  handleRegister(client: Socket, username: string) {
    this.users[client.id] = username; // Simpan username dengan ID socket
    client.emit('registered', username); // Kirim kembali informasi pengguna
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { content: string }) {
    const sender = this.users[client.id]; // Ambil username pengirim
    if (sender) {
      console.log(`Message from ${sender}: ${payload.content}`);
      // Kirim pesan ke semua klien
      this.server.emit('message', { sender, content: payload.content });
    }
  }
}