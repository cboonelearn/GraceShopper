export const BASE_URL = "https://graceshopper-kashyyyk-candles.herokuapp.com/api" || "http://localhost:4000/api";

export const logIn = (token, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
}

export const logOut = () => {
    localStorage.setItem('token', null)
    localStorage.setItem('username', null)
	localStorage.setItem('userid', null)
}

// Helper function for making the request headers
export const makeHeaders = (tokenString) => {
    let headers = {}
    if (tokenString!=='null' && tokenString!==null) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenString.slice(1, -1)
        }
        return headers
    }    
}


export async function getAllUsers() {
	try {
		return await fetch(`${BASE_URL}/users`, {
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
		return await fetch(`${BASE_URL}/users/${userID}`, {
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
		return fetch(`${BASE_URL}/users/login`, {
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
		return fetch(`${BASE_URL}/users/register`, {
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
		return fetch(`${BASE_URL}/products`, {
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
		return await fetch(`${BASE_URL}/products/${productID}`, {
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

export async function createNewProduct(
	name,
	description,
	price,
	quantity,
	category,
) {
	try {
		return fetch(`${BASE_URL}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				qtyAvailable: quantity,
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

export async function deleteProduct( productID ) {
	try {
		return fetch(`${BASE_URL}/products/${productID}`, {
			method: "DELETE",
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

export async function getAllProductPhotos() {
	try {
		return await fetch(`${BASE_URL}/photos`, {
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
		return await fetch(`${BASE_URL}/reviews`, {
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
		return await fetch(`${BASE_URL}/orders`, {
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

export async function getUserOrders(userId) {
	try {
		return await fetch(`${BASE_URL}/orders/user/${userId}`, {
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
		let headers = makeHeaders(token)
		return await fetch(`${BASE_URL}/orders/${orderID}`, {
			headers: headers,
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
		return await fetch(`${BASE_URL}/carts`, {
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

export async function getUserCart({userID, guestID}) {
	try {
		let headers = {
			"Content-Type": "application/json",
		}
		if (userID) {
			return await fetch(`${BASE_URL}/carts/userId/${userID}`, {
				headers: headers
			})
				.then((response) => response.json())
				.then((result) => {
					let total = 0;
					for (let i=0; i<result.length; i++) {
						total += result[i].productQty
					}
					result.total = total
					return result;
				});
		} else {
			return await fetch(`${BASE_URL}/carts/guestId/${guestID}`, {
				headers: headers
			})
				.then((response) => response.json())
				.then((result) => {
					let total = 0;
					for (let i=0; i<result.length; i++) {
						total += result[i].productQty
					}
					result.total = total
					return result;
				});
		}
		
	} catch (error) {
		console.error(error);
	}
}

export async function deleteCartItem(cartID) {
	try {
		return fetch(`${BASE_URL}/carts/${cartID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function getAllGuests() {
	try {
		return await fetch(`${BASE_URL}/guests`, {
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

export async function getGuest( guestID ) {
	try {
		return await fetch(`${BASE_URL}/guests/${guestID}`, {
			headers: {
				"Content-Type": "application/json"
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
		return fetch(`${BASE_URL}/users/makeAdmin/${userID}`, {
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

export async function removeUserAdmin( userID ) {
	try {
		return fetch(`${BASE_URL}/users/removeAdmin/${userID}`, {
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

export async function addToCart(productId, productQty, cartUserId, cartGuestId ) {
	try { 
		return fetch(`${BASE_URL}/carts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
				productQty: productQty,
				cartUserId: cartUserId,
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
		return fetch(`${BASE_URL}/products/?category=Wax%20Melt`, {
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
		return fetch(`${BASE_URL}/products/?category=Candle`, {
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

export async function getCategory(category) {
	try {
		return fetch(`${BASE_URL}/products/?category=${category}`, {
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

export async function updateCart(cartId, productQty) {
	try {
		return fetch(`${BASE_URL}/carts/${cartId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productQty: productQty
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

export async function createOrder(userId, guestId) {
	try {
		return fetch(`${BASE_URL}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isUserId: userId,
				isGuestId: guestId
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function adminEditProduct(productId, productName, productDescription, productPrice, productQtyAvailable, productCategory) {
	try {
		return fetch(`${BASE_URL}/products/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: productName,
				description: productDescription,
				price: productPrice,
				qtyAvailable: productQtyAvailable,
				category: productCategory
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function adminEditProductPhoto(photoId, photoDescription, photoLink, productId) {
	try {
		return fetch(`${BASE_URL}/photos/${photoId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description: photoDescription,
				link: photoLink,
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function adminCreatePhoto(photoDescription, photoLink, productId) {
	try {
		return fetch(`${BASE_URL}/photos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description: photoDescription,
				link: photoLink,
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}