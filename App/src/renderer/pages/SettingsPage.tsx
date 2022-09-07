import { useState, useEffect } from 'react';
import authService from 'renderer/api/auth-service';
import Content from '../components/Content/Content';

const SettingsPage = () => {
  const [url, setUrl] = useState('');
  const [id, setId] = useState('');
  const [serialPort, setSerialPort] = useState('');
  const [overloaded, setOverloaded] = useState('');
  const [hasData, setHasData] = useState(false);

  const getData = async () => {

    const data  =  await authService.getSingleSetting()

    if(data) {
      setHasData(true)
      setId(data.id)
      setOverloaded(data.overloaded)
      setSerialPort(data.serial_port)
      setUrl(data.url)
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const submitNewEndpoint = async (e: any) => {
    e.preventDefault();
    let data:  any;
    if(hasData && id) {
      data  = await authService.updateSettings({url, serial_port:   serialPort.toUpperCase(), overloaded:  overloaded, id: id});
    }else  {
    data  = await authService.createSettings({url, serial_port:  serialPort.toUpperCase(), overloaded:  overloaded});
    }

    console.log(data)

    if(data) {
      setHasData(true)
      setId(data.id)
      setOverloaded(data.overloaded)
      setSerialPort(data.serial_port)
      setUrl(data.url)
    }
  };

  return (
    <Content whichPage="Settings">
      <div className="row">
        <div className="col-md-8">
          <div className="card p-3">
            <h4 className="card-title">Settings</h4>
            <div className="card-body">
              <form className="mt-1">
                <p className="text-primary">Setup Configurations</p>
                <div className="form-group mt-3">
                  <div className="col-md-12">
                    <p className="text-secondary">Centralized Server URI</p>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="ip"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <div className="col-md-12">
                    <p className="text-secondary">Serial Port</p>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="serial-port"
                      value={serialPort}
                      onChange={(e) => setSerialPort(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>


                <div className="form-group mt-3">
                  <div className="col-md-12">
                    <p className="text-secondary">Overload Minus/Plus(KG)</p>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="number"
                      name="overload"
                      value={overloaded}
                      onChange={(e) => setOverloaded(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  {hasData ? (
                    <button
                      type="submit"
                      onClick={(e) => submitNewEndpoint(e)}
                      className="btn btn-primary pl-4 pr-4 pt-1 pb-1 "
                    >
                      Update
                    </button>
                  ) : (
                    // eslint-disable-next-line react/button-has-type
                    <button
                      onClick={(e) => submitNewEndpoint(e)}
                      className="btn btn-primary pl-4 pr-4 pt-1 pb-1 mt-3"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h4 className="card-title">View Configurations</h4>
            <div className="card-body">
                <div className="form-group mt-3">
                  <div className="col-md-12">
                    <p className="text-secondary">Centralized Server URI</p>
                  </div>
                  <div className="col-md-12">
                    <span>{url}</span>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <div className="col-md-12">
                    <p className="text-secondary">Serial Port</p>
                  </div>
                  <div className="col-md-12">
                  <span>{serialPort}</span>
                  </div>
                </div>


                <div className="form-group mt-3">
                  <div className="col-md-12">
                    <p className="text-secondary">Overload Minus/Plus(KG)</p>
                  </div>
                  <div className="col-md-12">
                    <span>{overloaded} KG</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default SettingsPage;
