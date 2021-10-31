import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { login } from '../redux/apiCalls';


const Login = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	const dispatch = useDispatch();
	const {error} = useSelector((state)=>state.user)


	const userLogin =async (event) => { 
		event.preventDefault()
		login(dispatch, { email, password });

	}



  return (
	<div className="min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
		<div className="max-w-md w-full space-y-8">
			<div>
          <Link to="/">
            <img className="mx-auto h-12 w-auto" src="/images/icons8_dolphin.ico" alt="Workflow" />
          </Link>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
				</p>
			</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={userLogin}
					>
				<input type="hidden" name="remember" value="true"/>
				<div className="rounded-md shadow-sm -space-y-px">
					<div>
						<label htmlFor="email-address" className="sr-only">Email address</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								onChange={(e)=>{setEmail(e.target.value)}}
								value={email}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">Password</label>
							<input
								id="password"
								name="password"
								type="password" autoComplete="current-password" required
								value={password}
								onChange={(e)=>{setPassword(e.target.value)}}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
						<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
							Remember me
						</label>
					</div>

					<div className="text-sm">
            
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</Link>
					</div>
				</div>

				<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
					</button>
				</div>
					<div>
						{error && <h4 className="text-red-500 font-normal text-sm">something went wrong ... please re-enter e-mail and password</h4>}
					</div>
			</form>
		</div>
	</div>
  )
}

export default Login;
