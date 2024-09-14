// document.getElementById('create-session-btn').addEventListener('click', async () => {
//     try {
//         const response = await fetch('/create-session', { method: 'POST' });
//         const data = await response.json();
//         const sessionId = data.sessionId;

//         if (sessionId) {
//             document.getElementById('session-id').innerText = `Session ID: ${sessionId}`;
//             document.getElementById('query-section').style.display = 'block';
//         }
//     } catch (error) {
//         console.error('Error creating session:', error);
//     }
// });

// document.getElementById('submit-query-btn').addEventListener('click', async () => {
//     const sessionId = document.getElementById('session-id').innerText.split(': ')[1];
//     const query = document.getElementById('query-input').value;

//     if (sessionId && query) {
//         try {
//             const response = await fetch('/submit-query', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ sessionId, query })
//             });
//             const data = await response.json();
//             document.getElementById('query-response').innerText = JSON.stringify(data, null, 2);
//         } catch (error) {
//             console.error('Error submitting query:', error);
//         }
//     } else {
//         alert('Please create a session and enter a query.');
//     }
// });


const express = require('express');
const app = express();
app.use(express.json());

// Mock function to simulate session creation
function createSession() {
    // Generate a random session ID
    return Math.random().toString(36).substring(2, 15);
}

// Mock function to simulate query processing
function processQuery(sessionId, query) {
    // You can modify this function to return an appropriate answer based on the query.
    return {
        sessionId,
        messageId: Math.random().toString(36).substring(2, 15),
        answer: `This is a mock answer for the query: "${query}"`,
        status: 'completed'
    };
}

// POST /create-session - Create a new session and return the sessionId
app.post('/create-session', (req, res) => {
    const sessionId = createSession();
    res.json({ sessionId });
});

// POST /submit-query - Submit a query with sessionId and return the response
app.post('/submit-query', (req, res) => {
    const { sessionId, query } = req.body;
    
    if (!sessionId || !query) {
        return res.status(400).json({ error: 'Session ID and query are required.' });
    }
    
    const response = processQuery(sessionId, query);
    res.json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

