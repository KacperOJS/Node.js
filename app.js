const EventEmitter = require('events')

const customEmitter = new EventEmitter()


customEmitter.on('response',()=>{
  console.log(`data recieved`);
})
customEmitter.on('response',()=>{
  console.log(`some logic `);
})
customEmitter.emit('response')