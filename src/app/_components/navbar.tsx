import Logout from "../lib/logout/page";

export default function Navbar({ type, loggedIn }: { type: 'user' | 'admin' | 'guest' | 'organizer', loggedIn: boolean }) {
    let links = [];
    let rightButton = null;
    if (type === 'user') {
        if (!loggedIn) {
            links = [
                { label: 'Home', link: '/' },
                { label: 'event', link: '/user/event' },
                { label: 'Create Event', link: '/organizer/login' },
                { label: 'Register', link: '/user/register' },
            ];
            rightButton = (
                <a
                    href="/user/login"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                    Login
                </a>
            );
        } else {
            links = [
                { label: 'Home', link: '/user/dashboard' },
                { label: 'Event', link: '/user/event' },
                { label: 'Transaction', link: '/user/transaction' },
                // { label: Cart', link: '/user/cart' },
            ];
            rightButton = (
                <a
                    href="/lib/logout"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                    Logout
                </a>
            );
        }
    } else if (type === 'admin') {
        if (!loggedIn) {
            links = [
                { label: 'Login', link: '/admin/login' },
            ];
            rightButton = (
                <a
                    href="/admin/login"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                    Login
                </a>
            );
        } else {
            links = [
                { label: 'Home', link: '/admin/' },
                { label: 'User', link: '/admin/user' },
                { label: 'Organizer', link: '/admin/organizer' },
                { label: 'Transaction', link: '/admin/transaction' },
            ];
            rightButton = (
                <a
                    href="/lib/logout"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                    Logout
                </a>
            );
        }
    } else if (type === 'organizer') {
        if (!loggedIn) {
            links = [
                { label: 'Home', link: '/organizer/' },
                { label: 'Login', link: '/organizer/login' },
                { label: 'Register', link: '/organizer/register' },
            ];
            rightButton = (
                <a
                    href="/organizer/login"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                    Login
                </a>
            );
        } else {
            links = [
                { label: 'Dashboard', link: '/organizer/dashboard' },
                { label: 'My Event', link: '/organizer/event' },
                { label: 'Create Event', link: '/organizer/event/create' },
            ];
            rightButton = (
                <a
                    href="/lib/logout"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                    Logout
                </a>
            );
        }
    } else {
        links = [
            { label: 'Home', link: '/' },
            { label: 'Events', link: '/about' },
            { label: 'Login', link: '/user/login' },
            { label: 'Register', link: '/user/register' },
        ];
        rightButton = (
            <a
                href="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
                Login
            </a>
        );
    }



    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Tricket</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.link}
                            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div>
                    {rightButton}
                </div>
            </div>
        </nav>
    );

}