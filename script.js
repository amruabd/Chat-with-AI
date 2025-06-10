let url = 'http://localhost:11434/api/generate';  // URL of the model server
//llama3.2:1b
function fetchAndProcessResponse(url, input_data) {
  console.log("Sending request to the server with input data:", input_data);

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input_data)
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  })
  .then(text => {
    console.log("Raw response text from server:", text);
    
    const lines = text.split('\n');
    let completeResponse = '';
    let isFinalResponse = false;

    lines.forEach(line => {
      if (line.trim()) {
        try {
          const data = JSON.parse(line);
          if (data.response) {
            completeResponse += data.response;
          }
          if (data.done) {
            isFinalResponse = true;
          }
        } catch (error) {
          console.error("Could not parse line as JSON:", line);
        }
      }
    });

    if (isFinalResponse) {
      console.log("Final response from model:", completeResponse);
      return completeResponse;
    } else {
      console.error("The model did not return a final response.");
      throw new Error("Incomplete response from model");
    }
  })
  .catch(error => {
    console.error("Error during fetch or processing:", error);
    throw error;
  });
}

function send() {
  let input = document.querySelector(".textarea").value;
  console.log("User input:", input);

  if (input.trim() === '') {
    return;  // Don't send empty messages
  }

  // Display the sent message
  displayMessage(input, 'sent');
  
  const input_data = {
    /*
    model: "llama3:latest", 7b
    model: "phi3:latest", 3b
    */
    "model": "llama3.2:1b",
    "language": "de",
    "prompt": `${input}`,
    "temperature": 0.8, //Steuert die Kreativität der Antwort
    "max_tokens": 100, //Bestimmt die maximale Anzahl an Tokens in der Antwort
    "top_p": 0.9, //bestimmt dieser Wert, welcher Anteil der wahrscheinlichsten Tokens berücksichtigt wird
    "stop": ["\n", "<|endoftext|>"],
    "presence_penalty": 0.6, //bestimmt, wie stark die Anwesenheit neuer Wörter gegenüber bereits im Kontext vorhandenen Wörtern bestraft wird
    "frequency_penalty": 0.5, //bestraft dieser Wert Wörter, die bereits oft vorgekommen sind, um Wiederholungen zu vermeiden.
    "logit_bias": {
      "50256": -100 // Token ID für <|endoftext|>, um dessen Auftreten zu minimieren
    }
  };

  fetchAndProcessResponse(url, input_data)
    .then(response => {
      console.log("Response from fetchAndProcessResponse:", response);
      // Display the response in the chat
      displayMessage(response, 'received');
    })
    .catch(error => {
      console.error("Error in send function:", error);
      displayMessage("Error: Unable to get response from the server.", 'received');
    });

  // Clear the input area after sending
  document.querySelector(".textarea").value = '';
}

function displayMessage(message, messageType) {
  const messagesContainer = document.querySelector('.messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', messageType);
  
  // Preserve newlines and other whitespace characters
  const formattedMessage = message.replace(/\n/g, '<br>');
  messageElement.innerHTML = formattedMessage;

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

//send the user input when the user presses the enter key
document.querySelector(".textarea").addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // Prevents the default action of the Enter key
    send();
  } else if (e.key === 'Enter' && e.shiftKey) {
    document.querySelector(".textarea").value += '\n';
  }
});
