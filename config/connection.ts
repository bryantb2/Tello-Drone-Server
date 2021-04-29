export const connections = {
    connectionIP: '192.168.10.1',
    portType: 'UDP',
    videoPort: '11111',
    commandPort: '8889',
    statePort: '8889'
};
/*
// setup socket connections
const streamSocket = new WebSocket(`ws://${connections.connectionIP}:${connections.videoPort}`, 'udp4');
const commandSocket = new WebSocket(`ws://${connections.connectionIP}:${connections.commandPort}`, 'udp4');
const stateSocket = new WebSocket(`ws://${connections.connectionIP}:${connections.statePort}`, 'udp4');

// setup error handling
stateSocket.onerror = (err) => {
    console.log('Error opening state socket');
    console.log(err.error);
};
streamSocket.onerror = (err) => {
    console.log('Error opening stream socket');
    console.log(err.error);
};
commandSocket.onerror = (err: Error) => {
    console.log('Error opening command socket');
    console.log(err.error);
}

// setup open handling
stateSocket.onopen = () => stateSocket.send(controlCommands.INITIALIZE_DRONE);


module.exports ={
    streamSocket,
    commandSocket,
    stateSocket
};*/
