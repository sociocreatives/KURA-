import axios from 'axios';
import { toast } from 'react-toastify';
import { endpoints } from './index';

export interface Reading {
  id?: number;
  transporter: string;
  owner: string;
  source: string;
  destination: string;
  cargo: string;
  serial: string;
  overloaded?: false;
  registration: string;
  weights: string;
  user_id: number;
}

interface UserType {
  email: string;
  id: number;
  name: string;
  photo: string | null;
  role: string;
  username: string;
}

class AuthService {
  async login(username: string, password: string) {
    try {
      const { data } = await axios.post(endpoints.users.login, {
        username,
        password,
      });
      this.storeToken(data.token);

      this.getCurrentUser();
      return data;
    } catch (error) {
      console.log('Login', error);
    }
  }

  storeToken(token: string) {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  async getCurrentUser() {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.get(endpoints.users.currentUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(data);
        this.setUser(data.user);
      }
      return this.getStoredUser();
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  // store
  getStoredUser(): UserType | null {
    const strUser = localStorage.getItem('user');

    return strUser ? (JSON.parse(strUser) as UserType) : null;
  }

  setUser(user: UserType) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // send Records

  async sendCapturedRecords(records: any): Promise<Reading | null> {
    try {
      const token = this.getToken();
      let data:  Reading | null =  null;
      if (token) {
          let newData =  await axios.post(endpoints.readings.capture, records, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        data  = newData.data
      }
      return data;
    } catch (error: any) {
      const { errors } = error.response?.data;
      errors.forEach((err: any) => {
        toast.error(err.message);
      });
    }

    return null;
  }


  async createSettings(records: any): Promise<any> {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.post(endpoints.settings.create, records, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.setting;
      }
      return null;
    } catch (error: any) {
      const { errors } = error.response?.data;
      errors.forEach((err: any) => {
        toast.error(err.message);
      });
    }

    return null;
  }

  
  async updateSettings(records: any): Promise<any> {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.patch(endpoints.settings.update(records.id), records, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.setting;
      }
      return null;
    } catch (error: any) {
      const { errors } = error.response?.data;
      errors.forEach((err: any) => {
        toast.error(err.message);
      });
    }

    return null;
  }
  // get all capture records

  async getSingleSetting(): Promise<any> {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.get(endpoints.settings.getSingle, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.setting;
      }
      return null;
    } catch (error: any) {
      // const { errors } = error.response?.data;
      // errors.forEach((err: any) => {
      //   toast.error(err.message);
      // });
    }

    return null;
  }

  async getAllCaptureRecords(): Promise<Array<Reading> | []> {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.get(endpoints.readings.all, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.readings;
      }
      return [];
    } catch (error: any) {
      const { errors } = error.response?.data;
      errors.forEach((err: any) => {
        toast.error(err.message);
      });
    }

    return [];
  }


  async filterRecordsByDateRange(start_date:  string, end_date:  string): Promise<Array<Reading> | []> {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.get(`${endpoints.readings.filter}?start_date=${start_date}&end_date=${end_date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.readings;
      }
      return [];
    } catch (error: any) {
      const { errors } = error.response?.data;
      errors.forEach((err: any) => {
        toast.error(err.message);
      });
    }

    return [];
  }
  
}

export default new AuthService();
