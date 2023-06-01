import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Media from "./Media";
import Message from "./Message";
import { useNavigate } from "react-router-dom";


function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [dataType, setDataType] = useState("text");
  const [file, setFile] = useState();
  const location = useLocation();
  const { name, roomId } = location.state;
  const navigate = useNavigate();
  const textBox = useRef(null);


  socket.on("message", (message) => {
    setMessages([...messages, message]);
    
  })

  socket.on("join", (message) => {
    setMessages([...messages, message]);
  })

  socket.on("left", (message) => {
    setMessages([...messages, message]);
  })





  const handleSend = (e) => {
    e.preventDefault();
    if (dataType === "text") {
      if(!content) {
          return;
      }
      const message = {
        name,
        id: socket.id,
        type: "text",
        body: content,
        roomId
      }
      socket.emit("message", message);
      setContent("");
    } else {
      if(!file) {
        toast.error('Please attach a file', {
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
      if(file.size > 1e6) {
        toast.error('File size greater than 1MB!', {
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
      if(file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "audio/mpeg" && file.type !== "video/mp4") {
        toast.error('File extension not compatible!', {
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
      const message = {
        name,
        id: socket.id,
        type: "file",
        mimetype: file.type,
        body: file,
        roomId
      }
      console.log(file);
      console.log(message);
      socket.emit("message", message);
      setFile("");
    }
  }

  const leaveRoom = (e) => {
    e.preventDefault();
    socket.emit("leave",{name,roomId});
    navigate("/");
  }

  const handleFile = (e) => {
    e.preventDefault();
    console.log(e.target.files)
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    textBox.current.scrollTop = textBox.current.scrollHeight + 500;
  }, [messages])

  return <div className="text-white mx-auto text-center h-screen flex justify-center items-center ">
    <div className="sm:w-2/3 w-full h-screen pt-20">
      <h2 className="text-4xl font-bold mb-5">Welcome to room {roomId}</h2>
      <button onClick={leaveRoom} className="py-2 px-4 text-xl btn-leave rounded-xl font-bold">Leave</button>
      <div className="textbox flex flex-col sm:w-1/2 w-3/4 h-[70vh] border-2 border-white rounded-3xl mx-auto mt-10 p-4 overflow-y-auto" ref={textBox}>

        {messages.length > 0 && messages.map(message => {
          if (message.type === "text") {
            return <Message {...message} socket={socket} />
          } else if (message.type === "file") {
            return <Media {...message} socket={socket} />
          } else {
            return <div className="font-bold text-xl">
              {message}
            </div>
          }
        })}
      </div>
      <div className="mt-5 relative">

        <select value={dataType} onChange={(e) => setDataType(e.target.value)} className="py-3 rounded-l-full px-3">
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        {dataType == "text" ? <input className="w-4/12 py-3 px-5 mb-5" type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your message here"/>
          : <input className="bg-[#fff]" type="file" onChange={handleFile} />}
        <button className="w-1/12 bg-primary py-3 px-4 rounded-r-full hover:bg-[#3d4ef5] font-semibold" onClick={handleSend}>Send</button>
      </div>
    </div>
  </div>
}

export default Chat;
