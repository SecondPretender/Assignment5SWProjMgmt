import {useEffect, useState} from 'react';


const AddCustomerPage = () =>  {
    //Films Rental Section
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState('');

    // Customer Add Section
    const [customerID, setCustomerID] = useState('')
    const [storeID, setStoreId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressId, setAddressId] = useState('');

    const formData = {
        customerID,
        storeID,
        firstName,
        lastName,
        email,
        addressId
    }

    const rentData = {
        customerID,
        selectedFilm
    }


    useEffect(() => {
        fetchFilms();
    }, []);

    const fetchFilms = async () => {

        try {
            const response = await fetch('http://localhost:8000/getFilms');

            if(!response.ok){
                throw new Error('Could not Get Films')
            }
            const data = await response.json();
            setFilms(data);
        } catch (error) {
            console.error('Error fetching films: ', error)
        }
    }

    const handleRentFilm = async () => {
        try {
            alert("Trying to Rent Film")
            const response = await fetch('http://localhost:8000/rentFilms', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTION',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rentData),
            });

            if (!response.ok) {
                throw new Error('Failed to Rent Film!');
            }
            const data = await response.json();
            alert("Movie Rented!: " + JSON.stringify(data));
        } catch (error) {
            console.error('Error Renting Films: ', error)
        }
    }

    const handleSubmit = async () => {

        try {
            alert("Trying to add new customer!");
            const response = await fetch('http://localhost:8000/addCustomers', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTION',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert("Customer Added: " + JSON.stringify(data));
            if (!response.ok) {
                throw new Error('Failed to Add Customer');
            }
        } catch (error) {
            alert('Error adding customer:' + error);
        }
    };

    return (
        <div className="min-h-screen flex justify-between">
            <div className="w-1/2 bg-blue-200">
                <h1 className="text-2xl font-bold my-4 justify-start text-black">Add Customer</h1>
                <div className="container mx-auto flex justify-start">
                    <form className="max-w-md">
                        <div className="mb-4">
                            <label htmlFor="customerID" className="block text-sm font-semibold mb-1">Customer ID</label>
                            <input
                                type="text"
                                id="customerID"
                                value={customerID}
                                onChange={(e) => setCustomerID(e.target.value)}
                                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
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
                        <button onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                            Add Customer
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-1/2 bg-green-200">
                <h1 className="text-3xl font-bold mb-4 text-black">Rent Films</h1>
                <div className="container mx-auto flex justify-center">
                    <div className="mt-8">
                        <label htmlFor="customerID" className="block text-sm font-medium text-gray-700">Customer
                            ID:</label>
                        <input
                            type="text"
                            id="customerID"
                            name="customerID"
                            value={customerID}
                            onChange={(e) => setCustomerID(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                            required
                        />
                        <button
                            onClick={handleRentFilm}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Rent Selected Film
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {films.map(film => (
                            <div key={film.film_id} className="bg-gray-100 p-4 rounded shadow text-black">
                                <h3 className="text-x1 font-semibold mb-2 text-black">{film.title}</h3>
                                <p className="text-black">{film.description}</p>
                                <button
                                    onClick={() => setSelectedFilm(film.film_id)}
                                    className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                                        selectedFilm === film.film_id && 'bg-blue-700'
                                    }`}
                                >
                                    {selectedFilm === film.film_id ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCustomerPage;