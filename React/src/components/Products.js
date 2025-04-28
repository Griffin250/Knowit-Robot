import React from 'react';

const Controller = () => {
    const handleClick = async () => {
        const numberToSend = 42; // Change this to your predetermined int value
        try {
            const response = await fetch('http://127.0.0.1:8000/send-number', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: numberToSend }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error sending number:', error);
        }
    };

    return (
        <div>
            <h1>Send Number to FastAPI</h1>
            <button onClick={handleClick}>Send Number</button>
        </div>
    );
};

export default Controller;