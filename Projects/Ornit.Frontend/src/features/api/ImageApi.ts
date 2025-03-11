import {  } from "@/contenttypes";


export const uploadImage = async (form: File) => {
	try {
		const response = await fetch(`api/Image/}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				
			},
			
		});

		if (!response.ok) {
			const errorMessage = await response.json();
			throw new Error(errorMessage);
		}

		const data : number = await response.json();
return data;
	} catch (error) {
		console.log("UploadImage -", error);
	}
};
