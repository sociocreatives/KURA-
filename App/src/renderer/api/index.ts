import { toast } from 'react-toastify';

class LocalUsage {
  getSettings(): string | null {
    return localStorage.getItem('endpoint');
  }

  setSettings(url: string) {
    if (url.endsWith('/api')) {
      localStorage.setItem('endpoint', url);
      toast.success('Successfully updated your backend api');
    } else {
      toast.error(
        'Your endpoint must be in the format *http://domain.com/api*'
      );
    }
  }
}

const localUsage = new LocalUsage();

const BASEURL = localUsage.getSettings()
  ? localUsage.getSettings()
  : 'http://localhost:4000/api';

const endpoints = {
  users: {
    signup: `${BASEURL}/users/signup`,
    login: `${BASEURL}/users/signin`,
    logout: `${BASEURL}/users/signout`,
    currentUser: `${BASEURL}/users/currentuser`,
    all: `${BASEURL}/users`,
   
  },
  readings: {
    capture: `${BASEURL}/readings`,
    all: `${BASEURL}/readings`,
    getReading: `${BASEURL}/get-records`,
    filter: `${BASEURL}/readings/filter`
  },
  settings: {
    create: `${BASEURL}/settings`,
    update:  (id: any) => `${BASEURL}/settings/${id}`,
    getSingle: `${BASEURL}/setting`,
  },
};

export { endpoints, BASEURL, localUsage };
