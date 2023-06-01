import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function Login({socket}) {

  const [roomId, setRoomId] = useState();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRoom = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Name cannot be empty!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!roomId) {
      toast.error('RoomId cannot be empty!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (roomId.length !== 4) {
      toast.error('RoomId must be 4 digits!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const numRoomId = Number(roomId);
    if(!numRoomId) {
      toast.error('RoomId must be a valid number!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    socket.emit("joinRoom", { name, roomId: numRoomId });
    console.log("join room");
    setRoomId(numRoomId);
    navigate('/chat',{state: {name,roomId:numRoomId}});
  }

  return (
    <div class="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40 h-screen flex justify-center items-center bg-dark">
      <div class="m-auto space-y-8 md:w-8/12 lg:w-6/12">
        <div class="rounded-3xl bg-secondary">
          <div class="p-8 py-12 sm:p-16">
            <form action="" class="space-y-8">
              <div class="">
                <input className="w-full py-3 px-5 rounded-full mb-5" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input className="w-full py-3 px-5 rounded-full mb-5" type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="RoomId" />
                <button class="font-bold text-xl w-full bg-primary rounded-full py-2 hover:bg-[#4957ed]" onClick={handleRoom}>
                    Join Room
                  </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>

  )
}

export default Login