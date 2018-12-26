class ApiFacade {
    constructor()
    {
        this.username = null;
        this.friends = []
    }

    getFriends = () => {
        return this.friends;
    }

    logOut = () => {
        this.username = null;
        this.friends = [];
    }

    login = async (userName, password, location, distance) => {

        const options = await this.makeFetchOptions('POST', { 
            userName, password, distance, pushToken,
            longitude: location.longitude,
            latitude: location.latitude
          });
      
          return new Promise((resolve, reject) => {
            fetch(URL + '/api/login', options)
              .then(parseJSON)
              .then((response) => {
                if (response.ok) {
                  this.userName = userName;
                  this.friends = response.json.friends;
      
                  // Extract and return the json data.
                  return resolve(response.json); 
                }
                
                // Extract and return the error from the server's json data.
                return reject(response.json.msg);
              })
              .catch((error) => reject(error));
          });
    }

  makeFetchOptions = (type, body) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return {
      headers,
      method: type,
      body: JSON.stringify(body)
    }
  }

}

const parseJSON = async (response) => {
    if (response.status === 404) {
      return Promise.reject('An error occurred.\nThe server is not responding; it may be down.');
    }
  
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        // These properties will "follow" the next ".then()" method.
        status: response.status,
        ok: response.ok,
        json, // This will contain the server's json data (e.g. userName, friends, errors etc.).
      }))
    );
  }


  export default new ApiFacade();