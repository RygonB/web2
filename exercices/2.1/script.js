function addDateTime(message) {
  const dateTimeNow = new Date();
  return dateTimeNow.toLocaleDateString()+ ' ' + dateTimeNow.toLocaleTimeString()+ ' : ' + message;
}

const MESSAGE = "This is the best moment to have a look at this website !";

const fullMessage = addDateTime(MESSAGE);

alert(fullMessage);
