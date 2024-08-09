import { auth } from "./auth";

// DON'T FORGET TO AWAIT WHEN CALLING THIS FUNCTION
export async function fetchImproved(url: string,
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: any) {

  let defaultMethod = ''

  if (typeof method === 'undefined') {
    defaultMethod = 'GET'
  } else {
    defaultMethod = method
  }


  const session = await auth();
  const activeUser: any = session?.user;
  const userToken = activeUser?.accessToken;


  const response = await fetch(`${process.env.BACKEND_URL}${url}`, {
    method: defaultMethod,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: body
  })

  if (!response.ok) {
    throw new Error('RESPONSE IS NOT OK')
  }

  let json: any;

  try {
    json = await response.json();
  } catch (e) {
    throw new Error('Cant parse')
  }

  return json;
}
