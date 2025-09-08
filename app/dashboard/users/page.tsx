'use client'

import { useEffect, useState } from 'react';

interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    pass: string;
    // Add any other columns your table has
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users'); // Make sure this matches your route
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const data: User[] = await res.json();
            setUsers(data);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading users...</p>;
    if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
    if (!users.length) return <p className="p-6 text-center">No users found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Full Name</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center hover:bg-gray-50">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.full_name}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.pass}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
