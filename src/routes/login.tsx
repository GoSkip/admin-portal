import { useEffect, useState, useContext } from "react";
import { toastError } from "../toasts";
import { SessionContext, SessionContextType } from "../contexts/SessionContext";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { login, LoginProps } from "../api/login";
import { ClipLoader } from "react-spinners";
import classNames from "classnames";
import { emptyRetailer } from "../types/retailer";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import store_logo from "../assets/images/Image@2x.webp";
import standard_logo from "../assets/images/standard-logo.webp";

const Login = (): JSX.Element => {
  const { setSession } = useContext<SessionContextType>(SessionContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleRMe = () => {
    if (rememberMe) {
      setRememberMe(false);
    } else {
      setRememberMe(true);
    }
  };

  useEffect(() => {
    if (username !== "" && !username.match(emailRegex)) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
  }, [username]);

  const mutation = useMutation({
    mutationFn: (props: LoginProps) => login(props),
    onError: (error: any) => {
      if (error.response.status === 401) {
        toastError("Incorrect username or password.");
      } else {
        toastError("Something went wrong! Please try again later.");
      }
    },
    onSuccess: (data: any) => {
      setSession({
        ...data.data,
        permissions: [],
        rememberMe,
        active_retailer: emptyRetailer,
      });

      const pathRedirect = sessionStorage.getItem("pathRedirect");
      if (pathRedirect) {
        navigate(pathRedirect);
      } else {
        navigate("/");
      }

      sessionStorage.removeItem("pathRedirect");
    },
  });

  const doLogin = (e: any) => {
    e.preventDefault();
    const props: LoginProps = {
      username,
      password,
    };

    mutation.mutate(props);
  };

  const isLoading = mutation.isLoading;
  const isNotReady =
    isLoading || emailIsInvalid || username === "" || password === "";

  return (
    <>
      <div
        className={
          "grid grid-col-1 lg:grid-cols-2 lg:ml-20 min-h-auto content-center ease-in duration-100"
        }
      >
        <div className="w-96 self-center justify-self-center">
          <div className="mb-8">
            <div>
              <img className="mb-6" src={standard_logo} alt="Standard Logo" />
              <h2 className="text-3xl font-extrabold tracking-light text-gray-900">
                POS^ Admin Portal
              </h2>
              <h3 className="mt-3 text-sm font-light text-gray-600">
                Sign in to your account
              </h3>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={doLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Email address
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      className={classNames(
                        emailIsInvalid
                          ? "focus:ring-red-600"
                          : "focus:ring-indigo-600",
                        "block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      )}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      aria-describedby="email-error"
                    />
                    {emailIsInvalid && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  {emailIsInvalid && (
                    <p className="mt-1 text-sm text-red-600" id="email-error">
                      Not a valid email address.
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={toggleRMe}
                      className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-sky-500 hover:text-sky-600"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="flex-row items-center justify-center">
                  <button
                    type="submit"
                    disabled={isNotReady}
                    className={classNames(
                      isNotReady
                        ? "bg-sky-600 cursor-not-allowed"
                        : "bg-sky-500 cursor-pointer hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                      "inline-flex items-center shadow w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm transition ease-in-out duration-150"
                    )}
                  >
                    <div className="mr-2 flex items-center text-white font-light">
                      Sign in
                    </div>
                  </button>
                  <div className="flex items-center justify-center mt-2">
                    <Transition show={isLoading}>
                      <Transition.Child
                        enter="transition-opacity ease-linear duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ClipLoader size={25} color={"#36d7b7"} />
                      </Transition.Child>
                    </Transition>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:inline-block max-h-auto my-3">
          <img src={store_logo} alt="Store image" />
        </div>
      </div>
    </>
  );
};

export default Login;
