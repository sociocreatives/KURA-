import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { endpoints } from 'renderer/api';
import Content from '../components/Content/Content';

import UserDetail from '../components/Dashboard/UserDetail';

const UserAccountPage = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getData = async () => {
    try {
      const { data } = await axios.get(endpoints.users.all);

      setUsers(data.users);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const createOperator = async (e: any) => {
    e.preventDefault();

    const body = {
      username,
      email,
      name,
      password,
      role: 'normal',
    };
    try {
      const { data } = await axios.post(endpoints.users.signup, { ...body });
      console.log(data);

      // clear inputs
      setName('');
      setEmail('');
      setPassword('');
      setUsername('');

      // fetch records
      getData();
      // notify user
      toast.success(data.message);
    } catch (error: any) {
      //
    }
  };

  return (
    <Content whichPage="Dashboard">
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="card recent-sales">
              <div className="card-body">
                <h5 className="card-title">User Accounts</h5>

                <table className="table table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any, index: number) => (
                      <UserDetail user={...user} num={index + 1} key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h4 className="card-title">Create an Operator Account</h4>
              <div className="card-body">
                <div className="form-group">
                  <p className="text-primary">Full Name</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <p className="text-primary">Username</p>
                  <input
                    type="text"
                    name={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="form-control"
                  />
                </div>
                <div className="form-group mt-3">
                  <p className="text-primary">Email Address</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="form-control"
                  />
                </div>
                <div className="form-group mt-3">
                  <p className="text-primary">Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control"
                  />
                </div>

                <button
                  type="submit"
                  onClick={(e) => createOperator(e)}
                  className="mt-4 pl-3 pr-3 btn btn-success"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default UserAccountPage;
