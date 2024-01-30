export default function Footer(){
    //ticketing footer with tailwind
    return (
        <footer className="text-white body-font bg-teal-500 bottom-0">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-black">
                    <span className="ml-3 text-xl">Tricket</span>
                </a>
                <p className="text-sm text-black sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                © 2024 Tricket
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    
                </span>
            </div>
        </footer>
    )
}