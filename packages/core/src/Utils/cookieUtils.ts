import Cookies from 'js-cookie';

export const getServerSideCookie = async (key: string) => {
  const { cookies } = await import('next/headers');
  return cookies().get(key)?.value;
};

export const appendNextRequestCookies =async ()=>{
  const { cookies } = await import('next/headers');
  
return cookies().getAll().reduce((prev,current)=>{
  const {name,value} = current;
  return prev + `${name}=${value};`
},"")
}

export const getClientSideCookie = (key: string) => {
  return Cookies.get(key);
};
