import React, { useState } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
    const [sportName, setSportName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateSport = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/sports', { name: sportName });
            setMessage(`Successfully created sport: ${sportName}`);
            setSportName('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to create sport.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Sport</h2>
                {message && <p className="bg-blue-100 text-blue-800 p-3 rounded mb-4">{message}</p>}
                <form onSubmit={handleCreateSport}>
                    <div className="mb-4">
                        <label htmlFor="sportName" className="block text-gray-700 font-bold mb-2">
                            Sport Name
                        </label>
                        <input
                            type="text"
                            id="sportName"
                            value={sportName}
                            onChange={(e) => setSportName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Add Sport
                    </button>
                </form>
            </div>

            {/* Placeholder for future reports feature */}
            <div className="mt-10 bg-white p-8 rounded-lg shadow-lg max-w-md">
                 <h2 className="text-xl font-bold mb-4">Session Reports</h2>
                 <p className="text-gray-500">(Reports feature coming soon)</p>
            </div>
        </div>
    );
};

export default AdminDashboardPage;