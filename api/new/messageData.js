import { clientCredentials } from '../../utils/client';

const getMessages = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleMessage = (messageId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/message/${messageId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        sender: data.sender,
        receiver: data.receiver,
        subject: data.subject,
        messageContent: data.message_content,
        isNew: data.is_new,
        connectedToTrade: data.connected_to_trade,
      });
    })
    .catch((error) => reject(error));
});

const getMessagesBySender = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/message-sender/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getMessagesByReceiver = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/message-receiver/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createMessage = (message) => new Promise((resolve, reject) => {
  const messageObj = {
    sender: message.sender,
    receiver: message.receiver,
    subject: message.subject,
    message_content: message.messageContent,
    is_new: message.isNew,
    connected_to_trade: message.connectedToTrade,
  };
  fetch(`${clientCredentials.databaseURL}/message`, {
    method: 'POST',
    body: JSON.stringify(messageObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateMessage = (message) => new Promise((resolve, reject) => {
  const messageObj = {
    id: message.id,
    sender: message.sender,
    receiver: message.receiver,
    subject: message.subject,
    message_content: message.messageContent,
    is_new: message.isNew,
    connected_to_trade: message.connectedToTrade,
  };
  fetch(`${clientCredentials.databaseURL}/message/${message.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteMessage = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/message/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getMessages, getSingleMessage, createMessage, updateMessage, deleteMessage, getMessagesByReceiver, getMessagesBySender,
};
