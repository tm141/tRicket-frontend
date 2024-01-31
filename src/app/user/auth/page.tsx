export default function Register() {
    return (
        // form for user registration
        <div>
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
                    <h1 className="text-3xl text-gray-900 mb-8">Register</h1>
                    <form className="w-full flex flex-col justify-center items-center">
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}