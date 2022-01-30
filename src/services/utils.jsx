export const removeCookie = (name) => {
  const cookies = new Cookies();
  cookies.set(name, '', { path: '/', expires: new Date(Date.now()) });
};
