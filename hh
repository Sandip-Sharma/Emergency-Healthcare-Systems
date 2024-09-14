const axios = require('axios');

// Replace with your actual API key and external user ID
const apiKey = 'H1zy9eR09FDO1voEjhNJEdvbQkUST1XM';
const externalUserId = 'xyzabcd';

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
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}

// Function to submit a query
async function submitQuery(sessionId) {
  try {
    const response = await axios.post(
      https://api.on-demand.io/chat/v1/sessions/${sessionId}/query,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: 'Put your query here',
        pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726253762'],
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
    throw error;
  }
}

// Main function to execute the API calls
async function main() {
  try {
    const sessionId = await createChatSession();
    console.log('Session ID:', sessionId);
    const queryResponse = await submitQuery(sessionId);
    console.log('Query Response:', queryResponse);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Execute the main function
main();












const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.json());

const apiKey = "peJ3Tnn3e98Hy51qn1kdYQeO4OiBZ1sG";
const externalUserId = "abcd";

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
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}

// Function to submit a query
async function submitQuery(sessionId, query) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: query,
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
    throw error;
  }
}

// Route to create a chat session
app.post('/create-session', async (req, res) => {
  try {
    const sessionId = await createChatSession();
    res.json({ sessionId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating session' });
  }
});

// Route to submit a query
app.post('/submit-query', async (req, res) => {
  const { sessionId, query } = req.body;
  try {
    const queryResponse = await submitQuery(sessionId, query);
    res.json(queryResponse);
  } catch (error) {
    res.status(500).json({ error: 'Error submitting query' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
