import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HomePage = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const { data } = await api.get('/sessions');
                setSessions(data);
            } catch (err) {
                setError('Could not fetch sessions.');
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    const handleJoinSession = async (sessionId) => {
        try {
            await api.post(`/sessions/${sessionId}/join`);
            alert('Successfully joined the session!');
            // Refetch sessions to update the player list
            const { data } = await api.get('/sessions');
            setSessions(data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to join session.');
        }
    };


    if (loading) return <p className="text-center mt-10">Loading sessions...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Upcoming Sessions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.length > 0 ? (
                    sessions.map((session) => (
                        <div key={session._id} className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800">{session.sport.name}</h2>
                            <p className="text-gray-600 mt-2">
                                <strong>Venue:</strong> {session.venue}
                            </p>
                            <p className="text-gray-600">
                                <strong>Date:</strong> {new Date(session.dateTime).toLocaleString()}
                            </p>
                            <div className="mt-4">
                                <h4 className="font-semibold">Players Joined:</h4>
                                <ul className="list-disc list-inside text-gray-500">
                                    {session.players.map(player => <li key={player._id}>{player.name}</li>)}
                                </ul>
                            </div>
                            <button
                                onClick={() => handleJoinSession(session._id)}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Join Session
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No upcoming sessions found.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;