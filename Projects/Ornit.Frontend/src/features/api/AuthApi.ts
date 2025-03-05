import { AuthRequest,  } from "@/contenttypes";


export const authenticate = async (token: string) => {
	try {
		const response = await fetch(`api/Auth/authenticate}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			
		});

		if (!response.ok) {
			const errorMessage = await response.json();
			throw new Error(errorMessage);
		}

		
	} catch (error) {
		throw new Error("Authenticate")
	}
};

export const refreshToken = async (refreshToken: string) => {
	try {
		const response = await fetch(`api/Auth/refresh-token}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				
			},
			body: JSON.stringify(refreshToken),
		});

		if (!response.ok) {
			const errorMessage = await response.json();
			throw new Error(errorMessage);
		}

		
	} catch (error) {
		throw new Error("RefreshToken")
	}
};

export const login = async (request: AuthRequest) => {
	try {
		const response = await fetch(`api/Auth/login}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				
			},
			
		});

		if (!response.ok) {
			const errorMessage = await response.json();
			throw new Error(errorMessage);
		}

		
	} catch (error) {
		throw new Error("Login")
	}
};

export const register = async (request: AuthRequest) => {
	try {
		const response = await fetch(`api/Auth/register}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				
			},
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			const errorMessage = await response.json();
			throw new Error(errorMessage);
		}

		
	} catch (error) {
		throw new Error("Register")
	}
};
