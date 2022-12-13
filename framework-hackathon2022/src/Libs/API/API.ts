const BASE_URL = 'https://api.api-it.io/'
const MAIN_URL = BASE_URL + 'framework-hack-2022/'

var token: string;

type LoginResponse = {
  Status: number,
  Error: string,
  Result: {
    token: string
  },
  Data: any
}

type apiRequest = { method: 'GET' | 'POST', url: string, body?: string, raw?: boolean }

const api = <T>({method, body, url, raw}: apiRequest): Promise<T> => {
  let requestOptions: RequestInit = {
    method: method,
  }
  if (body) {
    requestOptions.body = body;
  }
  if (url != 'login') {
    requestOptions.headers = new Headers([['Authorization', token]]);
  }

  // Allow ype assertion on then, if we know the expected shape if the response is ok.
  return fetch(BASE_URL + url, requestOptions).then<T>(res => raw ? res.text() : res.json())
}

async function login() {
  const body = JSON.stringify({UserName: 'MotherNight', Password: 'BrotherCrow'});
  return api<LoginResponse>({
    method: 'POST',
    url: 'login',
    body
  }).then(json => {
    token = 'bearer ' + json.Result.token;
  }).catch(err => {
    console.log('login error', err)
  })
}

async function set(location: string, data: string) {
  if (!token) {
    await login();
  }

  return api({
    method: 'POST',
    url: location,
    body: JSON.stringify(data),
    raw: true
  })
}

async function get(location: string): Promise<string> {
  if (!token) {
    await login();
  }

  return api<string>({
    method: 'GET',
    url: location
  }).then(res => {
    return res;
  })
}

export {login, set, get};
