interface UserProfile {
  name: string;
  contactNumber: string;
}

interface HeaderProps {
  userProfile: UserProfile;
}

export default function Header({ userProfile }: HeaderProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Professional Templates
        </h1>
        <p className="text-slate-600 mt-2 text-base sm:text-lg">
          Download personalized templates with contact details below the image
        </p>
      </div>

      {/* User Profile Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Personalized Marketing Templates</h3>
            <p className="text-blue-100 text-sm sm:text-base">
              Contact details will be added below the template image
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="font-semibold text-base sm:text-lg">{userProfile.name}</p>
            <p className="text-blue-200 text-sm sm:text-base">{userProfile.contactNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}