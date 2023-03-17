import { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { login, LoginProps } from "../../api/login";
import { ClipLoader } from "react-spinners";
import classNames from "classnames";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const Login = (): JSX.Element => {
  const { setSession } = useContext(SessionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

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
        toast.error("Incorrect username or password.");
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    },
    onSuccess: (data: any) => {
      setSession(data.data);

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

  return (
    <>
      <div className={"flex min-h-full ease-in duration-300"}>
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Skip Logo"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-light text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={doLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
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
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      Not a valid email address.
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
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
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="flex-row items-center justify-center">
                  <button
                    type="submit"
                    disabled={isLoading || emailIsInvalid}
                    className={classNames(
                      isLoading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                      "inline-flex items-center shadow w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm transition ease-in-out duration-150 cursor-pointer"
                    )}
                  >
                    <div className="mr-2 flex items-center">Sign in</div>
                  </button>
                  <div className="flex items-center justify-center mt-2">
                    <Transition show={isLoading}>
                      <Transition.Child
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
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
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;
