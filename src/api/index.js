export const BASE_URL = "http://localhost:4000/api";

// LogIn helper function by setting localStorage token
export const logIn = (token, username) => {
    // setToken(true)
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
}

// LogOut helper function by clearing localStorage token
export const logOut = () => {
    localStorage.setItem('token', null)
    localStorage.setItem('username', null)
}



export async function getAllUsers() {
	try {
		return await fetch(`${BASE_URL}/user`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getUserInfo(userID) {
	try {
		return await fetch(`${BASE_URL}/user/${userID}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function logInUser( username, password ) {
	try {
		return fetch(`${BASE_URL}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: username,
				password: password
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				localStorage.setItem("token", result.token);
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function registerUser( username, password ) {
	try {
		return fetch(`${BASE_URL}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getAllProducts() {
	try {
		return fetch(`${BASE_URL}/product`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getSingleProduct({ productID }) {
	try {
		return await fetch(`${BASE_URL}/product/${productID}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function createNewProduct({
	token,
	name,
	description,
	price,
	quantity,
	category,
}) {
	try {
		return fetch(`${BASE_URL}/product`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				quantity: quantity,
				category: category,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function deleteProduct({ token, productID }) {
	try {
		return fetch(`${BASE_URL}/product/${productID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getAllProductPhotos() {
	try {
		return await fetch(`${BASE_URL}/photo`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getReviews() {
	try {
		return await fetch(`${BASE_URL}/review`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getAllOrders() {
	try {
		return await fetch(`${BASE_URL}/order`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getOrderInfo({ token, orderID }) {
	try {
		return await fetch(`${BASE_URL}/order/${orderID}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getAllCarts() {
	try {
		return await fetch(`${BASE_URL}/cart`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getAllGuests() {
	try {
		return await fetch(`${BASE_URL}/guest`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getGuest({ token, guestID }) {
	try {
		return await fetch(`${BASE_URL}/guest/${guestID}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function makeUserAdmin( userID ) {
	try {
		return fetch(`${BASE_URL}/user/makeAdmin/${userID}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userID: userID
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function addToCart(productId, productQty, cartGuestId ) {
	try { 
		return fetch(`${BASE_URL}/cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
				productQty: productQty,
				cartGuestId: cartGuestId
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			})

	} catch (error) {
		console.error(error)
	}
}

export async function getWaxMelts() {
	try {
		return fetch(`${BASE_URL}/product/?category=Wax%20Melt`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getCandles() {
	try {
		return fetch(`${BASE_URL}/product/?category=Candle`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}