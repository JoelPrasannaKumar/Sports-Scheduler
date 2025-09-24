import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateSessionPage = () => {
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [venue, setVenue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const { data } = await api.get('/sports');
                setSports(data);
                if (data.length > 0) {
                    setSelectedSport(data[0]._id); // Default to the first sport
                }
            } catch (err) {
                setError('Could not fetch sports list.');
            }
        };
        fetchSports();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/sessions', {
                sport: selectedSport,
                dateTime,
                venue,
            });
            navigate('/');
        } catch (err) {
            setError('Failed to create session. Please check your inputs.');
        }
    };

    return (
        <div className="container mx-auto mt-10 max-w-lg">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create a New Session</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sport">
                            Sport
                        </label>
                        <select
                            id="sport"
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                        >
                            {sports.map(sport => (
                                <option key={sport._id} value={sport._id}>{sport.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datetime">
                            Date and Time
                        </label>
                        <input
                            id="datetime"
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">
                            Venue
                        </label>
                        <input
                            id="venue"
                            type="text"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Session
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSessionPage;