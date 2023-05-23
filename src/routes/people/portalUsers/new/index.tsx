import { useState, Fragment } from "react";
import { roles } from "../../../../components/data/roles.config";
import { useNavigate } from "react-router-dom";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";



const PortalUserNew = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(roles[0]);

    return (
        <div>
            <div className="flow-root w-[calc(100%-18rem)]">
                <div className="flex flex-row mb-4">
                    <div className="text-gray-400 text-xl flex-auto">
                        <span className="mr-5 cursor-pointer" onClick={() => navigate("/people/portal-users")}>Portal Users</span>
                        <span className="mr-5">&gt;</span>
                        <span className="text-gray-800">New User</span>
                    </div>
                    <div className="flex-initial">
                        <select
                            className="text-right pr-4 py-1 rounded-md bg-white outline outline-1 outline-gray-300 text-md font-medium text-gray-600"
                        >
                            <option value="actions">Actions</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                </div>
                <hr />
            </div>
            <div className="flow-root mt-5">
                <div className="float-left bg-white w-[calc(100%-18rem)] shadow-md rounded-md">
                    <div className="grid m-5 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-normal leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="pl-2 block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-normal leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="pl-2 block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid m-5 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-normal leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="pl-2 block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="phone-number" className="block text-sm font-normal leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone-number"
                                    id="phone-number"
                                    autoComplete="phone-number"
                                    className="pl-2 block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid m-5 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-3">
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-normal leading-6 text-gray-900">Role</Listbox.Label>
                                        <div className="relative mt-2">
                                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <span className="block truncate">{selected.name}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {roles.map((role) => (
                                                        <Listbox.Option
                                                            key={role.id}
                                                            className={({ active }) =>
                                                                `
                                                                    ${active} ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'`
                                                            }
                                                            value={role}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <span className={`${selected} ? 'font-semibold' : 'font-normal', 'block truncate')`}>
                                                                        {role.name}
                                                                    </span>

                                                                    {selected ? (
                                                                        <span
                                                                            className={`${active} ? 'text-white' : 'text-indigo-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'`}
                                                                        >
                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flow-root mt-5">
                <div className="float-left bg-white w-[calc(100%-18rem)] shadow-md rounded-md">
                    <div className="m-5">
                        <div className="font-normal text-gray-800 text-xl">Store access</div>
                        <div className="mb-2 text-sm font-light mt-2 text-gray-500">User has <span className="font-bold">View</span> access for the following store(s):</div>
                        <hr />
                        <div className="flex flex-row items-center space-x-2 my-4">
                            <button
                                className="rounded-full bg-[#d1fae5] text-[#065f46] px-2 py-1 text-sm font-medium "
                            >
                                + Add store
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flow-root mt-5">
                <div className="float-left bg-white w-[calc(100%-18rem)] shadow-md rounded-md">
                    <div className="m-5">
                        <div className="font-normal text-gray-800 text-xl">Feature access</div>
                        <div className="mb-2 text-sm font-light mt-2 text-gray-500">User has <span className="font-bold">Edit</span> access for the following feature(s):</div>
                        <hr />
                        <div className="flex flex-row items-center space-x-2 my-4">
                            <button
                                className="rounded-full bg-[#d1fae5] text-[#065f46] px-2 py-1 text-sm font-medium "
                            >
                                + Add feature
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flow-root w-[calc(100%-18rem)]">
                <hr className="mt-5" />
                <div className="flex flex-row justify-end space-x-2 mt-5">
                    <button className="border rounded-md bg-white text-sm font-light px-3 py-2 border-1 border-gray-300">Discard</button>
                    <button className="border rounded-md bg-[#0284C7] text-sm text-white font-light px-3 py-2 border-1 border-gray-300">Save</button>
                </div>
            </div>
        </div>
    );
};

export default PortalUserNew;
