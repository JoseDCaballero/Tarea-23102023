let form = document.getElementById("clientForm");
let clients = [];
let clientTurn = 0;

//Structs
class Client
{  
    constructor(name, operation)
    {
        if(!name)
        throw new Error("A name is required to add a client to the queue")
        
        let creationTime = new Date()
        let timeOfArrival = twelveHrsFmt(creationTime); 
        
        //Client creation won't execute
        if(this.ClientExists(name, operation, timeOfArrival))
        throw new Error("Cannot duplicate a register")        
        
        this.turn = clientTurn;         
        this.name = name;
        this.operation = operation;   
        this.creationTime = timeOfArrival;                   
    }        

    ClientExists(name, operation, timeOfArrival)
    {
        console.log("Executing ClientExists")
        for (let client of clients)
        {
            //The !! operator works as an AND logic gate
            if(client.name === name &&
                client.operation === operation &&
                client.timeOfArrival === timeOfArrival); 
                return true                      
        }
        debugger  
        return false                     
    }
}

//Time related methods
function twelveHrsFmt(givenTime)
{
    let hours = givenTime.getHours();
    let minutes = givenTime.getMinutes();
    let seconds = givenTime.getSeconds()
    let amPM = hours >= 12 ? "pm" : "am";
    let formattedHours = hours % 12 || 12   
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${amPM}`;
}

function calculateWaitingTime(client)
{    
    let currentTime = new Date();
    let timeOfArrival = client.creationTime;    
    let difference = currentTime - timeOfArrival;
    let minutes = Math.floor(difference / 60000); // 1 minute = 60000 milliseconds
    let seconds = Math.floor((difference / 1000) % 60); // Extract remaining seconds
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

//Queue methods
function QueueIsEmpty() { return clients.length === 0; }

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', function(event){
    event.preventDefault();
    PushClient();
});

let grid = document.getElementById("clientGrid");
let dataRows = grid.getElementsByClassName('dataRow');
let turnLabel = document.getElementById('turnLabel');
let nameValue = document.getElementById("nameInput");  
let operationValue = document.getElementById("operationInput");

function PushClient()
{     
    clientTurn += 1;                     
    let client = new Client(nameValue.value, operationValue.value, clientTurn);    
    clients.push(client);    
    PushToGrid(client);
    nameValue.value = "";
    operationValue.value = ""
    let contador = parseInt(turnLabel.textContent);
    turnLabel.textContent = ++contador;
    UpdateAttendingNWaiting();
}

let serveButton = document.getElementById('serveButton');
serveButton.addEventListener('click', ShiftClient)

function ShiftClient()
{
    if (QueueIsEmpty()) return;  
    let clientToShift = clients[0];         
    shiftFromGrid();
    clients.shift(); 
    UpdateAttendingNWaiting();
    let timeWaited = calculateWaitingTime(clientToShift);                  
    alert(`Client attended: ${clientToShift.name}\n
    Time waited in line: ${timeWaited}`);            
}

//Interface methods
function UpdateAttendingNWaiting()
{
    let attendingLabel = document.getElementById('attendingLabel');
    let waitingLabel = document.getElementById('waitingLabel');    
    attendingLabel.innerText = `#${clients[0].turn}`;
    waitingLabel.innerText = clients.length - 1;    
}
function PushToGrid(client)
{   
    let row = document.createElement('div');
    row.classList.add('headers', 'dataRow', 'row', 'row-cols-4', 'mb-3');

    let colTurn = document.createElement('div');
    colTurn.classList.add('col');
    let pTurn = document.createElement('p');
    pTurn.innerText = `${client.turn}`;
    colTurn.appendChild(pTurn);

    let colName = document.createElement('div');
    colName.classList.add('col');
    let pName = document.createElement('p');
    pName.innerText = `${client.name}`;
    colName.appendChild(pName);

    let colOperation = document.createElement('div');
    colOperation.classList.add('col');
    let pOperation = document.createElement('p');
    pOperation.innerText = `${client.operation}`;
    colOperation.appendChild(pOperation);

    let colArrival = document.createElement('div');
    colArrival.classList.add('col');
    let pArrival = document.createElement('p');
    pArrival.innerText = `${client.creationTime}`;
    colArrival.appendChild(pArrival);
    
    row.appendChild(colTurn);
    row.appendChild(colName);
    row.appendChild(colOperation);
    row.appendChild(colArrival);    
    grid.appendChild(row);
}

function GridIsEmpty() { return dataRows.length === 0}
function shiftFromGrid()
{
    if (QueueIsEmpty()) return;  
    grid.removeChild(dataRows[0]);
}