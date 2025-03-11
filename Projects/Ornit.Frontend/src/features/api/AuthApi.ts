import { Auth0LoginResponse, AuthRequest } from "@/contenttypes";


export const authenticate = async (token: string) => {
	try {
		const response = await fetch(`api/auth/authenticate}`, {
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
		console.log("Authenticate -", error);
	}
};

export const refreshToken = async (refreshToken: string) => {
	try {
		const response = await fetch(`api/auth/refresh-token}`, {
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
		console.log("RefreshToken -", error);
	}
};

export const login = async (request: AuthRequest) => {
	try {
		const response = await fetch(`api/auth/login}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				
			},
			
		});

		if (!response.ok) {
			const errorMessage = await response.json();
			throw new Error(errorMessage);
		}

		const data : Auth0LoginResponse = await response.json();
return data;
	} catch (error) {
		console.log("Login -", error);
	}
};

export const register = async (request: AuthRequest) => {
	try {
		const response = await fetch(`api/auth/register}`, {
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
		console.log("Register -", error);
	}
};
