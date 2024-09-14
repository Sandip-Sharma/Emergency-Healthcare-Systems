const apiKey = 'peJ3Tnn3e98Hy51qn1kdYQeO4OiBZ1sG'; // Your API key
  const externalUserId = ''; // Replace with your external user ID
  let sessionId = null;

  // Function to create a new chat session
  async function createChatSession() {
    const url = 'https://api.on-demand.io/chat/v1/sessions';
    const headers = { apikey: peJ3Tnn3e98Hy51qn1kdYQeO4OiBZ1sG };
    const body = { pluginIds: [], externalUserId: externalUserId };

    try {
      const response = await axios.post(url, body, { headers });
      sessionId = response.data.data.id;
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  }

  // Function to submit a query to the API
  async function submitQuery(query) {
    if (!sessionId) {
      await createChatSession(); // Create session if it doesn't exist
    }

    const url = `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`;
    const headers = { apikey: apiKey };
    const body = {
      endpointId: 'predefined-openai-gpt4o',
      query: query,
      pluginIds: ['plugin-1726236428', 'plugin-1726227923'],
      responseMode: 'sync'
    };

    try {
      const response = await axios.post(url, body, { headers });
      return response.data.result;
    } catch (error) {
      console.error('Error submitting query:', error);
      return 'Error fetching response';
    }
  }

  // Function to handle sending a message
  async function handleSend() {
    const inputField = document.getElementById('query-input');
    const chatBox = document.getElementById('chat-box');
    const query = inputField.value;

    if (query.trim() === '') return;

    // Add user message to chatbox
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<span>${query}</span>`;
    chatBox.appendChild(userMessage);
    inputField.value = '';

    // Get bot response
    const botResponse = await submitQuery(query);

    // Add bot message to chatbox
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.innerHTML = `<span>${botResponse}</span>`;
    chatBox.appendChild(botMessage);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Event listener for the send button
  document.getElementById('send-btn').addEventListener('click', handleSend);

  // Optional: allow pressing Enter to send the message
  document.getElementById('query-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      handleSend();
    }
  });