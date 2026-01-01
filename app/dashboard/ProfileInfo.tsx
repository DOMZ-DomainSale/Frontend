
"use client";
import { backendUserData } from "./profile";
const ProfileInfo = (props: backendUserData) => {
    return (
        <>
            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={props.name ?? ''}
                        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        value={props.phoneNumber ?? ''}
                        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                        readOnly
                    />
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={props.email ?? ''}
                        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                        readOnly
                    />
                </div>
            </form>
        </>
    )
}

export default ProfileInfo