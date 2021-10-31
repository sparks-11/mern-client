import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from "axios"

const Register = () => {

	const [name, setName]= useState('')
	const [email, setEmail]= useState('')
	const [password, setPassword]= useState('')

	const history = useHistory()

	const userRegister = async (event) => {
		event.preventDefault()
		try {
			const res = await axios.post("https://e-com-server-side.herokuapp.com/api/auth/register", { name, email, password		})
			alert(res.data.result)
			history.push("/login")
		} catch (err) {
			console.log(err)
		}
	}


  // }
	const goHome = () => {
		history.push('/login')
	}

  return (
	<div className="pb-48 pt-12 flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
		<div className="max-w-md w-full space-y-8">
			<div>
          <Link to="/">
            <img className="mx-auto h-12 w-auto" src="/images/icons8_mesh_1.ico" alt="Workflow" />
          </Link>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Create your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
				</p>
			</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={userRegister}
				>
				<input type="hidden" name="remember" value="true"/>
				<div className="rounded-md shadow-sm -space-y-px">
					<div>
						<label htmlFor="name" className="sr-only">Name</label>
							<input
								id="name"
								name="name"
								type="text"
								required className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Name"
								value={name}
								onChange={(e)=>{setName(e.target.value)}}
							/>
					</div>
					<div>
						<label htmlFor="email-address" className="sr-only">Email address</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e)=>{setEmail(e.target.value)}}
							/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">Password</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e)=>{setPassword(e.target.value)}}
							/>
					</div>
				</div>

				<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Register
					</button>
					<button onClick={goHome}>go home</button>
				</div>
			</form>
		</div>
	</div>
  )
}

export default Register;

