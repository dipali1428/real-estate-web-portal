"use client";
import React from 'react';
import Link from 'next/link';

const PersonalLoanCTA = () => (
    <section className="bg-linear-to-r from-teal-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Secure Your Financial Future?
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
                Don't wait to achieve your dreams. Whether it is your home, growing your assets, or
                protecting your family, we support are here to guide you. Get started on your financial success today.
            </p>
            <Link
                href="/#contact"
                className="bg-white text-teal-600 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition cursor-pointer inline-block"
            >
                Get a Consultation
            </Link>
        </div>
    </section>
);

export default PersonalLoanCTA;
