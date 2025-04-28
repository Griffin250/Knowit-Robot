//controller.js
import React, { useEffect } from 'react';
import upImage from '../assets/up.png';
import leftImage from '../assets/left.png';
import rightImage from '../assets/right.png';
import downImage from '../assets/down.png';
import pauseImage from '../assets/pause.png';
import axios from 'axios';

const Controller = () => {
    const ipa = 'http://10.20.30.197:8001/send-number'; //if backend is on rasperry
    //IF BACKEND IS LOCALLY ON PC: const ipa = 'http://127.0.0.1:8000/send-number';
    const forwardClick = async () => {
        const pos_fw = 5;
        try {
            const response = await fetch(ipa, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pos_fw: pos_fw }),
            });
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error sending number:', error);
        }
    };

    const backClick = async () => {
        const pos_rew = 5;
        try {
            const response = await fetch(ipa, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pos_rew: pos_rew }),
            });
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error sending number:', error);
        }
    };

    const leftClick = async () => {
        const pos_left = 5;
        try {
            const response = await fetch(ipa, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pos_left: pos_left }),
            });
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error sending number:', error);
        }
    };

    const rightClick = async () => {
        const pos_right = 5;
        try {
            const response = await fetch(ipa, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pos_right: pos_right }),
            });
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error sending number:', error);
        }
    };

    const pause = async () => {
        const pauseValue = 5;
        try {
            const response = await fetch(ipa, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pause: pauseValue }),
            });
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error sending number:', error);
        }
    };

    const handleKeyPress = (event) => {
        switch (event.key) {
            case 'w':
                forwardClick();
                break;
            case 's':
                backClick();
                break;
            case 'a':
                leftClick();
                break;
            case 'd':
                rightClick();
                break;
            case 'ArrowUp':
                forwardClick();
                break;
            case 'ArrowDown':
                backClick();
                break;
            case 'ArrowLeft':
                leftClick();
                break;
            case 'ArrowRight':
                rightClick();
                break;
            case ' ':
                pause();
                break;
            default:
                break;
        }
    };

    const runCommands = async () => {
        try {
            const response = await axios.get('http://localhost:5000/run-commands'); // Ensure this is a GET request
            console.log(response.data);
            alert('Commands executed successfully');
        } catch (error) {
            console.error('Error executing commands:', error);
            alert('Failed to execute commands');
        }
    };
    

    useEffect(() => {
        // Attach the keypress event listener
        window.addEventListener('keydown', handleKeyPress);
        // Remove the event listener on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className='controllercontainer'>
            <h1 className="pageheader">Controller</h1>
            <div>
                <img src={upImage} onClick={forwardClick} alt="Forward" />
            </div>
            <div>
                <img src={leftImage} onClick={leftClick} alt="Left" />
                <img src={rightImage} onClick={rightClick} alt="Right" />
            </div>
            <div>
                <img src={downImage} onClick={backClick} alt="Backward" />
            </div>
            <div>
                <br />
                <img src={pauseImage} onClick={pause} alt="Pause" />
            </div>

        <br/>
        <div>
            <div className='instruks'>
                <button onClick={runCommands}>
                    Run Commands
                </button>
                <p>1. (På rasperry) hostname -I</p>
                <p>2. ssh knowit@ip</p>
                <p>3. nohup python controller.py & disown</p>
                <p>4. nohup python thomasisaiah.py & disown</p>
                <br/>
            </div>

            <h1>Raspberry Pi Camera Feed</h1>
            <img
               src="http://10.20.30.197:8001/video-feed"
                alt="Live Camera Feed"
                style={{ width: '640px', height: '480px' }}
            />
            </div>
        </div>
    );
};

export default Controller;

