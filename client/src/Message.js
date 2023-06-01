import React from 'react'

function Message({name,id,body,socket}) {
  if(id === socket.id) {
    return <>
      <div className='text-end text-xl'>
        You
      </div>
     <div className='max-w-lg bg-primary self-end py-3 px-4 mb-10 rounded-xl text-xl text-start'>
      {body}
    </div>
    </>
  } else {
    return <>
      <div className='text-start text-xl pl-2'>
        {name}
      </div>
     <div className='max-w-lg bg-secondary self-start py-3 px-4 mb-10 rounded-xl text-xl text-start'>
      {body}
    </div>
    </>
  }
}

export default Message;