import { useState } from 'react';


export default function AddCustomerPage() {
    const [storeID, setStoreId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressId, setAddressId] = useState('');
    const [createDate, setCreateDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://fastapi:8000/addCustomers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({storeID, firstName, lastName, email, addressId, createDate}),
            });

            if (!response.ok){
                throw new Error('Failed to Add Customer');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Add Customer</h1>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="storeID" className="block text-sm font-semibold mb-1">Store ID</label>
                    <input
                        type="text"
                        id="storeID"
                        value={storeID}
                        onChange={(e) => setStoreId(e.target.value)}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-semibold mb-1">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-semibold mb-1">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addressID" className="block text-sm font-semibold mb-1">Address ID</label>
                    <input
                        type="text"
                        id="addressID"
                        value={addressId}
                        onChange={(e) => setAddressId(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="createDate" className="block text-sm font-semibold mb-1">Create Date</label>
                    <input
                        type="text"
                        id="createDate"
                        value={createDate}
                        onChange={(e) => setCreateDate(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Add Customer
                </button>
            </form>
        </div>
    );
}