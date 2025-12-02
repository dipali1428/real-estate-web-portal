export const generateInitials = (name: string): string => {
    if (!name) return '?';
    const words = name.trim().split(/\s+/);
    if (words.length === 0) return '?';
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const generateColorFromName = (name: string): string => {
    const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
        'bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-teal-500',
        'bg-orange-500', 'bg-cyan-500', 'bg-blue-600', 'bg-green-600',
        'bg-purple-600', 'bg-pink-600', 'bg-red-600'
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'New':
        case 'New Lead':
            return 'bg-blue-100 text-[#2076C7]';
        case 'In-Progress':
        case 'Under Processing':
        case 'Underwriting':
            return 'bg-yellow-100 text-yellow-800';
        case 'Closed':
        case 'Sanctioned':
        case 'Disbursed':
        case 'Verified':
            return 'bg-green-100 text-green-800';
        case 'Not Interested':
        case 'Rejected':
            return 'bg-red-100 text-red-800';
        case 'Document Pending':
            return 'bg-orange-100 text-orange-800';
        case 'Hot':
            return 'bg-red-100 text-red-800';
        case 'Warm':
            return 'bg-yellow-100 text-yellow-800';
        case 'Cold':
            return 'bg-blue-100 text-[#2076C7]';
        default:
            return 'bg-slate-100 text-slate-800';
    }
};

export const getPaginatedData = <T>(data: T[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
        data: data.slice(startIndex, endIndex),
        totalPages: Math.ceil(data.length / itemsPerPage),
        totalItems: data.length
    };
};