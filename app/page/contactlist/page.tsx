// components/ContactPage.jsx
import React from 'react';

const ContactPage = () => {
  const contacts = [
    {
      product: "Life Insurance",
      name: "Vrushali Hirve",
      contactNo: "+91 99221 28699"
    },
    {
      product: "Health Insurance",
      name: "Ashwini Kamble",
      contactNo: "+91 80078 17504"
    },
    {
      product: "Motor Insurance",
      name: "Rohan Tapdiya",
      contactNo: "+91 90670 91947"
    },
    {
      product: "Investments",
      name: "Shweta Dalvi",
      contactNo: "+91 99221 28499"
    },
    {
      product: "Home Loan",
      name: "Rakhi Raut",
      contactNo: "+91 80107 12260"
    },
    {
      product: "Lap Loan",
      name: "Rakhi Raut",
      contactNo: "+91 80107 12260"
    },
    {
      product: "Personal Loan",
      name: "Yash Naik",
      contactNo: "+91 90750 19462"
    },
    {
      product: "Business Loan",
      name: "Yash Naik",
      contactNo: "+91 90750 19462"
    },
    {
      product: "Education Loan",
      name: "Prajakta Deshpande",
      contactNo: "+91 70574 85583"
    },
    {
      product: "Car Loan",
      name: "Prajakta Deshpande",
      contactNo: "+91 70574 85583"
    }
  ];

//   const handleCall = (phoneNumber) => {
//     window.location.href = `tel:${phoneNumber}`;
//   };

//   const handleWhatsApp = (phoneNumber) => {
//     const message = "Hello, I'm interested in your services";
//     const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Our Team
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with our dedicated representatives for each service
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
            >
              {/* Product Badge */}
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {contact.product}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-gray-600 text-sm">Representative</p>
                </div>

                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-900 font-medium">
                    {contact.contactNo}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-3">
                <button
                //   onClick={() => handleCall(contact.contactNo)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Call</span>
                </button>
                
                <button
                //   onClick={() => handleWhatsApp(contact.contactNo)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-600">
              Our representatives are available during business hours. 
              Feel free to call or message them directly for any queries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

