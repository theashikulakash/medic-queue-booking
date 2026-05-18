import Link from 'next/link';
import Image from "next/image";
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black mt-5  text-gray-400 px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">

                    <Link href="/">
                        <Image src="/logo.png" height={40} width={250} alt="logo" priority />
                    </Link>

                    <p className="mt-4 max-w-xl">
                        Your gateway to extraordinary travel experiences around the world.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide">NEWSLETTER</h3>
                        <p className="mb-4 text-sm">
                            Subscribe for exclusive travel deals and inspiration.
                        </p>

                        <div className="flex items-center bg-gray-800 px-4 py-3">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-transparent outline-none flex-1 text-sm"
                            />
                            <span className="text-white text-lg">↗</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide">QUICK LINKS</h3>
                        <ul className="space-y-2">
                            <li className="hover:text-white cursor-pointer">Home</li>
                            <li className="hover:text-white cursor-pointer">All Appointment</li>
                            <li className="hover:text-white cursor-pointer">Doctors</li>
                            <li className="hover:text-white cursor-pointer">Dashboard</li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide">SUPPORT</h3>
                        <ul className="space-y-2">
                            <li className="hover:text-white cursor-pointer">Help Center</li>
                            <li className="hover:text-white cursor-pointer">
                                Terms of Service
                            </li>
                            <li className="hover:text-white cursor-pointer">
                                Privacy Policy
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide">CONTACT US</h3>
                        <ul className="space-y-2">
                            <li>786 901 1622</li>
                            <li>info@vibetrek.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        © 2026 Medic Queue. All rights reserved.
                    </p>

                    <div className="flex gap-5 mt-4 md:mt-0 text-white text-lg">
                        <span className="cursor-pointer">X</span>
                        <span className="cursor-pointer">in</span>
                        <span className="cursor-pointer">◎</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;