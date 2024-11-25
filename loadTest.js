const axios = require('axios');

const totalRequests = 1000; // Number of requests
const concurrentRequests = 50; // Concurrent connections
let completedRequests = 0;

const sendRequest = async () => {
    try {
        const res = await axios.get('http://localhost:5001/score');
        console.log(res.data);
    } catch (error) {
        console.error(error.message);
    } finally {
        completedRequests++;
        if (completedRequests === totalRequests) {
            console.log('All requests completed');
        }
    }
};

const testLoad = () => {
    for (let i = 0; i < concurrentRequests; i++) {
        for (let j = 0; j < totalRequests / concurrentRequests; j++) {
            sendRequest();
        }
    }
};

testLoad();
