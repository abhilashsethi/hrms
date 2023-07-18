import { ClientToServerEvents, ServerToClientEvents } from "types";
import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { Public_SOCKET_URL } from "config/env.config";

// const SOCKET_URL = `wss://hrms.yardiot.com`;
const SOCKET_URL = Public_SOCKET_URL;
// const SOCKET_URL = `ws://localhost:8080`;

type socketState = {
	socketRef?: Socket<ServerToClientEvents, ClientToServerEvents>;
	setSocketRef: (arg: Socket) => void;
	connect: () => void;
	disconnect: () => void;
};
const useSocket = create<socketState>((set, get) => ({
	setSocketRef: (socket) => {
		set({
			socketRef: socket,
		});
	},
	connect: () => {
		let socket = io(SOCKET_URL);
		set({
			socketRef: socket,
		});
	},
	disconnect: () => {
		let socket = get().socketRef;
		socket?.disconnect();
	},
}));

export default useSocket;
