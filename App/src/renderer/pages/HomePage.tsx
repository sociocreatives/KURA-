import { useEffect, useState, useMemo, useRef } from 'react';
import { CSVLink } from "react-csv"
import ReactToPrint from 'react-to-print';
import Content from '../components/Content/Content';
import AuthService, { Reading } from './../api/auth-service';
import Pagination from "./../components/Pagination/Pagination"
// import GOKELOGO from "./../icons/goke.png"
// import KURAMORE from "./../icons/kura-more.png"
import moment from "moment"
import { Button, Modal } from 'react-bootstrap';

let PageSize = 6;
const HomePage = () => {
  const [readings, setReadings] = useState<Array<Reading>>([]);
  const [overloadLoadWeight, setOverloadLoadWeight] = useState(0)
  const [setting, setSetting] = useState<any>(null);
  const [filter, setFilter] = useState({
    filter: "all",
    start_date: "",
    end_date: ""
  });
  const [headers, setHeaders] = useState(Array<{ label: string; key: string }>());
  const [currentPage, setCurrentPage] = useState(1);
  let componentRef: any = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return readings.slice(firstPageIndex, lastPageIndex);
  }, [readings, currentPage]);


  // make http request to server

  useEffect(() => {
    getData();
  }, []);


  const calculateOverWeight = (weight: string) => {
    const weights = JSON.parse(weight);

    weights.reduce(
      (prev: number, current: any) => {
        console.log(`Value: ${current.value}`)
        console.log(`prev: ${prev}`)
        return prev + parseInt(current.max);
      }, 0)
    const totalMax = weights.reduce(
      (prev: number, current: any) => prev + parseInt(current.max),
      0
    );

    const totalValue = weights.reduce(
      (prev: number, current: any) => prev + parseInt(current.value),
      0
    );

    // console.log(totalValue, totalValue)
    let overloadedWeight = 0;
    if (setting.overloaded) {
      overloadedWeight = setting.overloaded;
    }

    return totalValue - totalMax - overloadedWeight;
  };

  const getData = async () => {
    const data = await AuthService.getAllCaptureRecords();

    const settingData = await AuthService.getSingleSetting();

    if (settingData) {
      setSetting(settingData);
    }
    setReadings(data);
    console.log(data)
    setHeaders([
      { label: 'DATE TIME.'.toUpperCase(), key: 'createdAt' },
      { label: 'Reg No.'.toUpperCase(), key: 'registration' },
      { label: 'Vehicle Owner'.toUpperCase(), key: 'owner' },
      { label: 'Transpoter Name'.toUpperCase(), key: 'transporter' },
      { label: 'Origin/Source'.toUpperCase(), key: 'source' },
      { label: 'Destination'.toUpperCase(), key: 'destination' },
      { label: 'Cargo Description'.toUpperCase(), key: 'cargo' },
      { label: 'Serial No'.toUpperCase(), key: 'serial' },
      { label: 'Maximum Weight'.toUpperCase(), key: 'max_weight' },
      { label: 'Actual Weight'.toUpperCase(), key: 'actual_weight' },
      {
        label: "Overload Weight".toUpperCase(), key: "overload_weight"
      },
      { label: 'Overloaded'.toUpperCase(), key: 'overloaded' },
    ]);
  };

  const searchRecords = (value: string | '') => {
    let actualreadings = readings;

    let overloaded = value === 'overloaded' ? true : false
    if (value) {
      let filterRecords = actualreadings.filter(
        (item: Reading) => {
          return item.registration.toLowerCase().includes(value.toLowerCase()) ||
            item.transporter.toLowerCase().includes(value.toLowerCase()) ||
            item.owner.toLowerCase().includes(value.toLowerCase()) ||
            item.source.toLowerCase().includes(value.toLowerCase()) ||
            item.destination.toLowerCase().includes(value.toLowerCase()) ||
            item.cargo.toLowerCase().includes(value.toLowerCase()) ||
            item.overloaded === overloaded && calculateOverWeight(item.weights) > 0

        }

      );

      setReadings(filterRecords);
    } else {
      getData();
    }
  };




  const prohibitionOrder = (reading: any) => {
    return (<div className='probihition-order'>
      {/* <div className='probihition-order-header'>
        <div className='probihition-order-header-goke'>
          <img width={} src={GOKELOGO} alt='GOKE' />
        </div>
        <div className='probihition-order-header-serial'>
          <span>KURA/RAM/1</span>
        </div>
        <div className='probihition-order-header-ministry'>
          <span>REPUBLIC OF KENYA</span>
          <span>MINISTRY OF ROADS</span>
        </div>
        <div className='probihition-order-header-office'>
          <img src={KURAMORE} alt='KURAMORE' />
        </div>

        <div className='probihition-order-header-number'>
          <span>NO.P0000012</span>
        </div>
      </div> */}

      <div className='probihition-order-body'>
        <div className='probihition-order-body-header'>
          <span> THE TRAFFIC ACT</span>
          <span>(cap. 403)</span>
          <span>ORDER TO REMOVE VEHICLE FROM ROAD OR PUBLIC PLACE, TO OFFLOAD</span>
          <span>EXCESS WEIGHT, OR TO EFFECT REPAIRS</span>
        </div>
        <div className='prohition-order-body-main'>
          <p> To the owner or servant of owner or driver of Vehicle Registration No. <b>{reading.registration}</b></p>
          <p> 1.	I, _______________________________________ a Police Officer / Licensing Officer/
            Inspector acting under Section 106 and 107 of the Traffic Act, have inspected and found the
            above vehicle is being used along road <b>{reading.source}</b> - <b>{reading.destination}</b> at <b>KURA WEIGHBRIDGE</b>
            in contravention of Section 55,56 and 58 of the Traffic Rules in respect of loading and construction
            of the vehicle and I ORDER that the vehicle shall not be further used until the excess load of
              <b>{" " + overloadLoadWeight}</b> KG is properly distributed or offloaded as per weigh ticket number
            <b>{reading.serial}</b>
          </p>

          <p>For this purpose I FURTHER ORDER that the vehicle shall be moved to ATHIRIVER POLICE STATION and there detained until this order is complied with in accordance with the Traffic Act.</p>
          <p>
            2.	This order is without prejudice to any proceedings that may be brought for the contravention with
            the Traffic Act or the Traffic Rules.
          </p>
          <p>
            3.	It is an offence to disobey this Order.
          </p>
          <p>
            4.	Attention is drawn to subsection (3) of Section 106 of the Traffic Act that any loss or damage
            incurred as a result of this Order shall not be the responsibility of the police officer, licensing
            officer or inspector.
          </p>

          <p>Signed:____________________</p>
          <p>Date:	<b>{moment(reading.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</b></p>

          <p>Scale Operator Sign:______________________	Prosecution Clerk Sign:_________________
          </p>
        </div>
      </div>
    </div>)
  }

  const ReadingTableRow = () => {
    return currentTableData.map((reading, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}.</th>
          <td className="text-secondary">{reading.transporter}</td>
          <td>
            {reading.owner}
            <span style={{ color: '#000', marginLeft: '10px' }}>
              ({reading.registration})
            </span>
          </td>
          <td className="text-secondary">
            <span style={{ color: '#000', marginRight: '5px' }}>
              {reading.source}
            </span>{' '}
            - to -
            <span style={{ color: '#000', marginLeft: '5px' }}>
              {reading.destination}
            </span>
          </td>
          <td>{reading.cargo}</td>
          <td>
            {JSON.parse(reading.weights).reduce(
              (prev: any, curr: any) => prev + parseFloat(curr.value),
              0
            )}{' '}
            /{' '}
            {JSON.parse(reading.weights).reduce(
              (prev: any, curr: any) => prev + parseFloat(curr.max),
              0
            )}
          </td>
          <td>
            {reading.overloaded ? (
              <span className="btn btn-danger btn-sm"> Overloaded </span>
            ) : (
              <span className="btn btn-success btn-sm"> Passed </span>
            )}
          </td>
          <td style={{ textAlign: "center" }}>
            {reading.overloaded ? (<>
              <span className="btn btn-success btn-sm" onClick={() => {
                const itemWeight = calculateOverWeight(reading.weights);
                setOverloadLoadWeight(itemWeight)
                handleShow()
              }}>
                <i className="fa fa-download fa-lg" />
              </span>
              <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Prohibition Order</Modal.Title>
                </Modal.Header>
                <Modal.Body ref={componentRef} >{prohibitionOrder(reading)}</Modal.Body>
                <Modal.Footer>
                  <ReactToPrint
                    trigger={() =>
                      <Button variant="secondary" onClick={handleClose}>
                        <i className="fa fa-print fa-lg" />
                      </Button>
                    }
                    content={() => componentRef.current}
                  />
                </Modal.Footer>
              </Modal>

            </>
            ) : (
              <span className="btn btn-default btn-sm disabled">
                <i className="fa fa-download fa-lg" /> </span>
            )}
          </td>
        </tr>
      );
    });
  };

  const filterRecords = (option: string) => {
    setFilter({ ...filter, filter: option })

    let now = new Date();
    const currentDate = now.toLocaleDateString().replaceAll("/", "-")
    let start_date = "";
    let end_date = ""
    if (option === 'months6') {

      start_date = currentDate;
      end_date = severalDate(180, false);
      setFilter({ ...filter, start_date, end_date, filter: option })
      getFilteredRecords(start_date, end_date)
    }

    if (option === 'month12') {

      start_date = severalDate(1, true);
      end_date = severalDate(365, false);
      setFilter({ ...filter, start_date, end_date, filter: option })
      getFilteredRecords(start_date, end_date)
    }
    if (option === 'monthly') {

      start_date = severalDate(1, true);
      end_date = severalDate(30, false);
      setFilter({ ...filter, start_date, end_date, filter: option })
      getFilteredRecords(start_date, end_date)
    } else if (option === 'today') {
      start_date = currentDate;
      end_date = severalDate(1, true);
      setFilter({ ...filter, start_date, end_date, filter: option })
      getFilteredRecords(start_date, end_date)
    }
    else if (option === 'weekly') {
      start_date = severalDate(1, true);
      end_date = severalDate(7, false);
      setFilter({ ...filter, start_date, end_date, filter: option })
      getFilteredRecords(start_date, end_date)
    } else if (option === 'overloaded') {
      searchRecords('overloaded')
    } else {
      // all records
      getData()
    }
  }


  const getFilteredRecords = async (start_date: string, end_date: string) => {
    setCurrentPage(1)
    const data = await AuthService.filterRecordsByDateRange(start_date, end_date);
    setReadings(data);
  }

  const severalDate = (several: number, next: boolean) => {
    const date = new Date();
    const dateGet = next ? date.getDate() + several : date.getDate() - several;
    return new Date(date.setDate(dateGet)).toLocaleDateString().replaceAll("/", "-");
  };
  return (
    <Content whichPage={'Welcome'}>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-xl-3 col-md-3">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Recordings <span>| Vehicles</span>
                    </h5>

                    <div className="d-flex align-items-center">
                      <div className="ps-3">
                        <h6>{readings.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-3">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Recordings <span>| Overloads</span>
                    </h5>

                    <div className="d-flex align-items-center">
                      <div className="ps-3">
                        <h6 className="text-danger">
                          {
                            readings
                              .map((item) => item.overloaded)
                              .filter((i) => i).length
                          }
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h4 className="card-title">
                      Filters
                    </h4>
                    <div className="d-flex filter-ranges">
                      <div onClick={() => filterRecords("all")} className={filter.filter === 'all' ? 'active' : ""}>All</div>
                      <div onClick={() => filterRecords("today")} className={filter.filter === 'today' ? 'active' : ""}>1D</div>
                      <div onClick={() => filterRecords("weekly")} className={filter.filter === 'weekly' ? 'active' : ""}>1W</div>
                      <div onClick={() => filterRecords("monthly")} className={filter.filter === 'monthly' ? 'active' : ""}>1M</div>
                      <div onClick={() => filterRecords("months6")} className={filter.filter === 'months6' ? 'active' : ""}>6M</div>
                      <div onClick={() => filterRecords("months12")} className={filter.filter === 'months12' ? 'active' : ""}>1Y</div>
                      <div onClick={() => filterRecords("overloaded")} className={filter.filter === 'overloaded' ? 'active' : ""}>Oveloaded</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card recent-sales">
              <div className="card-header bg-white pb-2">
                <div className="card-title">
                  Recordings <span>| Today</span>
                  <div className="float-kilo form-inline">
                    <div className="col-auto" style={{ display: 'flex', justifyContent: "space-between", gap: "1.3rem", alignContent: "center", alignSelf: 'center', justifyItems: "center" }}>
                      <input
                        type="search"
                        className="form-control text-default"
                        style={{ width: '100%' }}
                        name="search"
                        onChange={(e) => searchRecords(e.target.value)}
                        placeholder="Search here..."
                      />
                      <CSVLink data={readings.map((item: any) => {
                        let actual_weight = 0;
                        let max_weight = 0;
                        JSON.parse(item.weights).forEach((weight: any) => {
                          max_weight = max_weight + parseInt(weight.max);
                          actual_weight = actual_weight + parseInt(weight.value)
                        });

                        let overload_weight = max_weight - actual_weight
                        return {
                          createdAt: new Date(item.createdAt).toLocaleString(),
                          registration: item.registration?.toUpperCase().replace(" ", ""),
                          transporter: item.transporter?.toUpperCase(),
                          owner: item.owner?.toUpperCase(),
                          source: item.source?.toUpperCase(),
                          destination: item.destination?.toUpperCase(),
                          cargo: item.cargo?.toUpperCase(),
                          serial: item.serial?.toUpperCase(),
                          actual_weight,
                          max_weight,
                          overload_weight: overload_weight > 0 ? "0.00" : overload_weight.toString().replace("-", ""),
                          overloaded: item.overloaded ? "TRUE" : "FALSE"
                        }
                      })} headers={headers} filename={`${filter.filter.toUpperCase()}-${filter.filter !== "today" ? filter.start_date + "-" + filter.end_date : (new Date()).toISOString().split('T')[0]}-portable-weighbridge-readings.csv`} style={{
                        backgroundColor: 'green',
                        textDecoration: "none",
                        textAlign: "center",
                        flex: 1,
                        border: 'none',
                        outlineWidth: '0',
                        color: "#fff",
                        padding: '0.5rem 0.5rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                      }}>Get CSV</CSVLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <table className="table table-borderless datatable">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Driver</th>
                          <th scope="col">Owner - Vehicle Reg</th>
                          <th scope="col">Source - Destination</th>
                          <th scope="col">Cargo</th>
                          <th scope="col">Weight</th>
                          <th scope="col">Status</th>
                          <th scope="col">Reports</th>
                        </tr>
                      </thead>
                      <tbody>{ReadingTableRow()}</tbody>
                    </table>
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={readings.length}
                      pageSize={PageSize}
                      onPageChange={(page: number) => setCurrentPage(page)}
                    />
                  </div>
                  {/* <div className="col-3">
                    <form>
                      <div>
                        <label>From</label>
                        <input
                          type="date"
                          className="form-control"
                          name="from"
                        />
                      </div>
                      <div className="mt-2">
                        <label>To</label>
                        <input type="date" className="form-control" name="to" />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 p-1 btn-reset btn-sm form-control"
                      >
                        <i className="fa fa-search" /> filter
                      </button>
                    </form>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default HomePage;
