import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { portalUsers } from "../../../../components/data/portalUsers.config";
import { useNavigate } from "react-router-dom";

const PortalUserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      // const response = await fetch(`/api/portal-users/${userId}`);
      // const data = await response.json();
      // setUser(data);
    };

    fetchUser();
  }, [userId]);

  const user = portalUsers.find((user) => user.id === Number(userId));
  if (!user) {
    return <div>Loading...</div>;
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [selectedRole, setSelectedRole] = useState(user.role);
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleAddStore = () => {
    // TODO: Implement add store functionality
  };

  const handleAddFeature = () => {
    // TODO: Implement add feature functionality
  };

  return (
    <div>
      <div className="flow-root w-[calc(100%-18rem)]">
        <div className="flex flex-row mb-4">
          <div className="text-gray-400 text-xl flex-auto">
            <span
              className="mr-5 cursor-pointer"
              onClick={() => navigate("/people/portal-users")}
            >
              Portal Users
            </span>
            <span className="mr-5">&gt;</span>
            <span className="text-gray-800">{`${user.first} ${user.last}`}</span>
          </div>
          <div className="flex-initial">
            <select
              className="text-right pr-4 py-1 rounded-md bg-white outline outline-1 outline-gray-300 text-md font-medium text-gray-600"
              value={selectedRole}
              onChange={handleRoleChange}
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
              <label
                htmlFor="first-name"
                className="block text-sm font-normal leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder={user.first}
                  autoComplete="given-name"
                  className="block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-normal leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder={user.last}
                  autoComplete="family-name"
                  className="block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="grid m-5 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-normal leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={user.email}
                  autoComplete="email"
                  className="block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone-number"
                className="block text-sm font-normal leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  placeholder={user.phonenumber}
                  autoComplete="phone-number"
                  className="block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="grid m-5 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-normal leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="role"
                  id="role"
                  placeholder={user.role}
                  autoComplete="role"
                  className="block w-full placeholder:pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="float-right rounded-md shadow-md bg-white text-left h-44 w-64">
          <div className="mt-5 ml-5 text-gray-600 text-lg">Metadata</div>
          <div className="mt-2 ml-5 text-gray-500 text-base">Created</div>
          <div className="ml-5 text-sm text-gray-400">
            {dateFormatter.format(user.created)}
          </div>
          <div className="mt-2 ml-5 text-gray-500 text-base">Updated</div>
          <div className="ml-5 text-sm text-gray-400">
            {dateFormatter.format(user.updated)}
          </div>
        </div>
      </div>
      <div className="flow-root mt-5">
        <div className="float-left bg-white w-[calc(100%-18rem)] shadow-md rounded-md">
          <div className="m-5">
            <div className="font-normal text-gray-800 text-xl">
              Store access
            </div>
            <div className="mb-2 text-sm font-light mt-2 text-gray-500">
              User has <span className="font-bold">View</span> access for the
              following store(s):
            </div>
            <hr />
            <div className="flex flex-row items-center space-x-2 my-4">
              {user.stores.map((store) => (
                <div
                  key={store}
                  className="px-3 py-1 bg-[#dbeafe] rounded-full text-sm font-normal text-[#1e40af]"
                >
                  {store}
                </div>
              ))}
              <button
                className="rounded-full bg-[#d1fae5] text-[#065f46] px-2 py-1 text-sm font-medium "
                onClick={handleAddStore}
              >
                + Add store
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flow-root mt-5">
        <div className="float-left bg-white w-[calc(100%-18rem)] shadow-md rounded-md mb-2">
          <div className="m-5">
            <div className="font-normal text-gray-800 text-xl">
              Feature access
            </div>
            <div className="mb-2 text-sm font-light mt-2 text-gray-500">
              User has <span className="font-bold">Edit</span> access for the
              following feature(s):
            </div>
            <hr />
            <div className="flex flex-row items-center space-x-2 my-4">
              {user.features.map((feature) => (
                <div
                  key={feature}
                  className="px-3 py-1 bg-[#dbeafe] rounded-full text-sm font-normal text-[#1e40af]"
                >
                  {feature}
                </div>
              ))}
              <button
                className="rounded-full bg-[#d1fae5] text-[#065f46] px-2 py-1 text-sm font-medium "
                onClick={handleAddFeature}
              >
                + Add feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalUserDetail;
