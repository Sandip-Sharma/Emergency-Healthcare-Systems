const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Replace with your actual API key and external user ID
const apiKey = 'peJ3Tnn3e98Hy51qn1kdYQeO4OiBZ1sG';
const externalUserId = 'rizz';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Function to create a chat session
async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    console.log(response.data.data.id)
    return response.data.data.id;
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
}

// Function to submit a query
async function submitQuery(sessionId, userQuery) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: userQuery,  // Use the user's input query here
        pluginIds: ['plugin-1726236428', 'plugin-1726227923'],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting query:', error);
  }
}

// Route to handle the chat interaction
app.post('/start-chat', async (req, res) => {
  const userQuery = req.body.query; // Get user query from request body
  try {
    const sessionId = await createChatSession();
    if (sessionId) {
      const queryResponse = await submitQuery(sessionId, userQuery); // Pass the user query to the submitQuery function
      res.json(queryResponse);
    } else {
      res.status(500).json({ error: 'Failed to create chat session' });
    }
  } catch (error) {
    console.error('Error handling chat request:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});