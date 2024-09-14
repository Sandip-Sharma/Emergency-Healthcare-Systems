async function createChatSession(apiKey, externalUserId) {
    try {
      const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': peJ3Tnn3e98Hy51qn1kdYQeO4OiBZ1sG
        },
        body: JSON.stringify({
          pluginIds: [],
          externalUserId: externalUserId
        })
      });
  
      const data = await response.json();
      return data.data.id; // Extract session ID
    } catch (error) {
      console.error('Error creating session:', error);
    }
  }
  
  async function submitQuery(apiKey, sessionId, query) {
    try {
      const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, { // Corrected the string interpolation here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey
        },
        body: JSON.stringify({
          endpointId: 'predefined-openai-gpt4o',
          query: query,
          pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
          responseMode: 'sync'
        })
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  }
  
  async function startChatSession() {
    const apiKey = document.getElementById('apiKey').value;
    const externalUserId = document.getElementById('externalUserId').value;
    const query = document.getElementById('query').value;
  
    if (!apiKey || !externalUserId || !query) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const sessionId = await createChatSession(apiKey, externalUserId);
      const response = await submitQuery(apiKey, sessionId, query);
      document.getElementById('responseOutput').innerText = JSON.stringify(response, null, 2);
    } catch (error) {
      document.getElementById('responseOutput').innerText = 'Error: ' + error.message;
    }
  }
  