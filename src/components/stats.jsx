import React from 'react';

const Stats = () => {
    const statsData = [
        {
            id: 1,
            number: "1,234,698",
            label: "Total Patients Served",
            bgColor: "bg-blue-50",
            textColor: "text-[#3b75c2]"
        },
        {
            id: 2,
            number: "278+",
            label: "Bookings Confirmed",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            id: 3,
            number: "348+",
            label: "Ongoing Treatments",
            bgColor: "bg-purple-50",
            textColor: "text-[#cb6ce6]"
        }
    ];

    return (
        <div className="bg-white py-12 border-y border-gray-100">
            <div className="w-10/12 mx-auto px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                    {statsData.map((stat) => (
                        <div 
                            key={stat.id} 
                            className={`${stat.bgColor} p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-center items-center transition duration-300 hover:shadow-md`}
                        >
                            <span className={`text-3xl md:text-4xl font-extrabold ${stat.textColor} tracking-tight`}>
                                {stat.number}
                            </span>
                            <span className="mt-2 text-sm md:text-base font-medium text-gray-600">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;