import { useState, useRef, useEffect } from 'react';
import Content from '../components/Content/Content';
import AuthService from './../api/auth-service';
// import io from 'socket.io-client';
import axleTypes from '../data/axle';
import { endpoints } from 'renderer/api';
import { Button, Modal } from 'react-bootstrap';
import AppLogo from './../icons/logo.png';
import ReactToPrint from 'react-to-print';
import authService from 'renderer/api/auth-service';
import { randomCode } from './../utils/index';
import axios from 'axios';

const getDateAndTime = (): { date: string; time: string } => {
  const today = new Date();

  const timeAndDate = today.toLocaleString('en-US').split(', ');
  return { date: timeAndDate[0], time: timeAndDate[1] };
};



const CaptureReadingsPage = () => {
  const [transporter, setTransporter] = useState('');
  const [setting, setSetting] =  useState<any>(null);
  const [dateTime, _setDateTime] = useState(getDateAndTime());
  const [owner, setOwner] = useState('');
  const [serial, setSerial] = useState('');
  const [overloaded, setOverloaded] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [cargo, setCargo] = useState('');
  const [registration, setRegistration] = useState('');
  const [weights, setWeights] = useState('');

  const [reading, setReading] = useState('');
  const [axles, setAxles] = useState(axleTypes);
  // const [item, setItem] = useState([{ max: 0, value: '' }]);
  const [whichAxleName, setWhichAxleName] = useState('');
  let componentRef: any = useRef();

  // handle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    getData()
  },[])

  // endof handle modal

  // Net Vehicle Weight
  const calculateNetWeight = () => {
    const items = axles.find((ax) => {
      if (ax.name === whichAxleName) {
        return ax;
      }

      return;
    });

    return items?.max.reduce(
      (prev, current) => prev + parseInt(current.value.toString()),
      0
    );
  };

  
  const getData  =  async () => {
    const settingData  =  await AuthService.getSingleSetting();

    if(settingData) {
      setSetting(settingData);
    }

  }

  const report: [
    department: string,
    serial: string,
    date: string,
    time: string,
    truck: string,
    operator: string,
    driver: string,
    total?: number
  ] = [
    'Axle Load Compliance',
    `${serial}`,
    `${dateTime.date}`,
    `${dateTime.time}`,
    `${registration}`,
    `${owner}`,
    `${transporter}`,
    calculateNetWeight(),
  ];

  // useEffect(() => {
  //   const socket = io(`${BASEURL}`.replace('/api', ''));
  //   // socket.open();
  //   socket.on('serialdata', (data: any) => {
  //     // we get settings data and can do something with it
  //     setReading(data.wieght);
  //   });
  //   // setReading('120');
  //   console.log(reading);
  // }, []);

  const getActualRecording = async () => {
    try {
      const { data } = await axios.get(endpoints.readings.getReading);
      if (data.readings.length > 0) {
        setReading(data.readings[data.readings.length - 1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let item = axles.find((ax) => {
      if (ax.name === whichAxleName) {
        return ax;
      }

      return;
    });
    setWeights(JSON.stringify(item?.max));

    let  overloadedWeight =   0;
    if(setting.overloaded){
      overloadedWeight =  setting.overloaded;
    }
    // autocheck

    if (calculateNetWeight()! > calculateMaxWeight()! && calculateMaxWeight()! > overloadedWeight) {
      console.log('DONE');
      setOverloaded(true);
    }

    setWeights(JSON.stringify(item?.max));
    // set serial number
    const newSerial = `KURA-${randomCode()}`;
    setSerial(newSerial);
    setSerial(newSerial);
    setWeights(JSON.stringify(item?.max));
    const reqBody = {
      transporter,
      owner,
      source,
      destination,
      serial,
      overloaded,
      cargo,
      registration,
      weights,
    };

    console.log(reqBody);
    setWeights(JSON.stringify(item?.max));

    const newRecord  =  await authService.sendCapturedRecords(reqBody)
    if (newRecord) {
      setSerial(newRecord.serial);
      setTransporter(newRecord.transporter)
      setRegistration(newRecord.registration);
      handleShow();
      // clear fields
      clearFields();
    }
  };

  const clearFields = () => {
    setTransporter('');
    setOwner('');
    setSerial('');
    setOverloaded(false);
    setSource('');
    setDestination('');
    setCargo('');
    setRegistration('');
    setWeights('');

    setReading('');
  };

  const handleSelect = (e: any) => {
    e.preventDefault();
    setWhichAxleName(e.target.value);
  };

  const setActualReading = async (e: any, index: number) => {
    e.preventDefault();
    console.log(index);

    const existAxles = [...axles];
    let itemIndex = 0;
    let item: any = axles.find((ax, index) => {
      itemIndex = index;
      if (ax.name === whichAxleName) {
        return ax;
      }

      return;
    });

    await getActualRecording();
    item.max[index].value! = reading ? reading : 0;
    existAxles[itemIndex] = item;
    setAxles(existAxles);
  };

  //Gross Vehicle Weight:
  // const calculateGrossWeight = () => {
  //   const items = axles.find((ax) => {
  //     if (ax.name === whichAxleName) {
  //       return ax;
  //     }

  //     return;
  //   });

  //   return items?.max.reduce(
  //     (prev, current) => prev + parseInt(current.value),
  //     0
  //   );
  // };
  ///Maximum Weight:
  const calculateMaxWeight = () => {
    const items = axles.find((ax) => {
      if (ax.name === whichAxleName) {
        return ax;
      }

      return;
    });

    return items?.max.reduce(
      (prev, current) => prev + parseInt(current.max.toString()),
      0
    );
  };

  //Net Percentage Weight:

  // const calculateNetPercentage = () => {
  //   console.log(
  //     parseInt(calculateMaxWeight.toString()) /
  //       parseInt(calculateNetWeight.toString())
  //   );
  //   let percent =
  //     (parseInt(calculateMaxWeight.toString()) /
  //       parseInt(calculateNetWeight.toString())) *
  //     100;
  //   console.log(percent);
  //   return percent === NaN ? '-' : percent;
  // };

  const renderAxles = () => {
    const items = axles.find((ax) => {
      if (ax.name === whichAxleName) {
        return ax;
      }

      return;
    });

    return items?.max.map((item, index) => (
      <tr>
        <td>{`${whichAxleName.split('')[1]}${index + 1}`}</td>
        <td>{item.max}</td>
        <td>{item.value} </td>
        <td className="text-right">
          <button
            onClick={(e) => setActualReading(e, index)}
            className="btn btn-success"
          >
            Read
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <Content whichPage="Capture Readings">
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-3 p-4">
            <h4 className="card-title">Fill in the following information:</h4>
            <form className="card-body mt-4 pl-4">
              <h4 className="text-primary"> Vehicle Details</h4>
              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Driver Name</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      value={transporter}
                      onChange={(e) => setTransporter(e.target.value)}
                      className="form-control"
                      placeholder="Driver's Name"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Vehicle Owner </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      className="form-control"
                      placeholder="Vehicle Owner"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Registration No </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={registration}
                      onChange={(e) => setRegistration(e.target.value)}
                      placeholder="Registration Number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Origin/Source: </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="Origin/Source"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Destination: </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="form-control"
                      placeholder="Destination"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Cargo Descritpion: </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <textarea
                      className="form-control"
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                      placeholder="Cargo Description"
                    />
                  </div>
                </div>
              </div>

              <h4 className="mt-4 text-primary"> Axle Configuration</h4>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Choose Axle Type </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <select
                      className="form-select"
                      onChange={(e) => handleSelect(e)}
                    >
                      {axleTypes.map((axle, index) => (
                        <option key={index} value={axle.name}>
                          {axle.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="input-label">Choose Axle Type </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group mb-3">
                    <table className="table table-bordered table-striped">
                      <thead className="text-white bg-dark">
                        <tr>
                          <td>Actual</td>
                          <td>Max</td>
                          <td>Net</td>
                          <td>Scan</td>
                        </tr>
                      </thead>
                      <tbody>{renderAxles()}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* <h4 className="mt-4 text-primary"> Vehicle Weight Summary</h4>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="input-label">Gross Vehicle Weight: </p>
                </div>
                <div className="col-md-8">
                  <p className="text-default">{calcgro()}KG</p>
                </div>
              </div> */}
              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="input-label">Maximum Weight: </p>
                </div>
                <div className="col-md-8">
                  <p className="text-default">{calculateMaxWeight()}KG</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="input-label">Net Vehicle Weight: </p>
                </div>
                <div className="col-md-8">
                  <p className="text-success">{calculateNetWeight()}KG</p>
                </div>
              </div>
              {/* <div className="row mt-3">
                <div className="col-md-4">
                  <p className="input-label">Net Percentage Weight: </p>
                </div>
                <div className="col-md-8">
                  <p className="text-success">
                    {' '}
                    {calculateNetPercentage() ? 'NaN' : '-'} %
                  </p>
                </div>
              </div> */}
              <div className="mt-4">
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn btn-primary pl-4 pr-4 pt-1 pb-1 mt-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Print Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div ref={(el) => (componentRef = el)}>
              <div className="row ">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="card receipt col-md-12 mb-3">
                    <div className="text-center pt-3">
                      <img
                        src={AppLogo}
                        style={{ height: '80px', width: '100px' }}
                      />
                    </div>
                    <div className="card-body pt-4">
                      <div className="text-center">
                        <h4 className="receipt-title pb-2 border-bottom-dashed">
                          WEIGHING REPORT
                        </h4>
                      </div>
                      <div className="mt-3">
                        <p>Department: {report[0]}</p>
                        <p>Serial No.: {report[1]}</p>
                        <p>Date: {report[2]}</p>
                        <p>Time: {report[3]}</p>
                        <p>Truck: {report[4]}</p>
                        <p>Operator: {report[5]}</p>
                        <p>Driver: {report[6]}</p>
                      </div>
                      <div className="border-bottom-dashed" />
                      <div className="mt-3">
                        <p>
                          Total weight:{' '}
                          <span className="float-kilo">{report[7]}kg</span>
                        </p>
                      </div>
                      <div className="border-bottom-dashed" />
                      {axles
                        .find((ax) => {
                          if (ax.name === whichAxleName) {
                            return ax;
                          }

                          return;
                        })
                        ?.max.map((reading, index) => {
                          return (
                            <div className="mt-3">
                              <div>
                                <p>
                                  No. {index + 1}
                                  <span className="float-axle">Axle</span>
                                </p>
                                <p>
                                  Axle Weight:{' '}
                                  <span className="float-kilo">
                                    {reading.value}kg
                                  </span>
                                </p>
                              </div>
                              <div className="border-bottom-dashed" />
                            </div>
                          );
                        })}
                      <div className="border-bottom-dashed" />
                      <div className="text-center mt-3">
                        {overloaded ? (
                          <span className="btn btn-danger btn-sm text-white">
                            Overloaded
                          </span>
                        ) : (
                          <span className="btn btn-success btn-sm text-white">
                            Pass
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <ReactToPrint
              trigger={() => (
                <Button variant="secondary" onClick={handleClose}>
                  Print
                </Button>
              )}
              content={() => componentRef}
            />
          </Modal.Footer>
        </Modal>
      </div>
    </Content>
  );
};

export default CaptureReadingsPage;
