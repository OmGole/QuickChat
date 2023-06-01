import React,{memo} from 'react'

function Media({id,body,socket,mimetype}) {
  console.log("before blob", body);
  const blob = new Blob([body], { type: mimetype });
  const url = URL.createObjectURL(blob);

  console.log(mimetype)

  if (mimetype === "image/png" || mimetype === "image/jpeg") {
    
    return id === socket.id ? <div className='self-end'>
    <img src={url} className='block w-[140px] h-[140px] border-4 border-primary object-cover self-end rounded-2xl mb-10' />
  </div> : <div className='self-start'> <img src={url} className='w-[120px] h-[120px] border-4 border-secondary object-cover self-start rounded-2xl mb-10' /> </div>
  } else if (mimetype === "audio/mpeg") {
    
    return id === socket.id ? <div className='self-end'>
    <audio src={url} className='border-4 border-primary rounded-[100px] self-end mb-10' controls />
  </div> : <div className='self-start'>
    <audio src={url} className='border-4 border-secondary rounded-[100px] self-start mb-10' controls />
  </div> 
  } else {
    
    return id === socket.id ?  <div className='w-[200px] h-[200px] self-end mb-10'>
    <video src={url} className='w-[200px] h-[200px] border-4 border-primary rounded-[10px] self-end mb-10' controls />
  </div> : <div className='w-[200px] h-[200px] self-start mb-10'>
    <video src={url} className='w-[200px] h-[200px] border-4 border-secondary rounded-[10px] self-end mb-10' controls />
  </div>
  }
}

export default memo(Media);