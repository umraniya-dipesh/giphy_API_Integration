import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Loader from "./Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "./Pagination";

const DisplayData = () => {
  const [dataFetch, setDataFectch] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItems = currentPage * itemsPerPage;
  // console.log("lastindex of items is:-", indexOfLastItems);
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  // console.log("FIRSTindex of items is:-", indexOfFirstItems);
  const SliceDATA = dataFetch.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    const gettingData = async () => {
      try {
        setIsLoading(true);
        const responseData = await axios.get(
          "https://api.giphy.com/v1/gifs/trending?api_key=sez5877u70MPPsIpRItAsRQRoKOM4qrQ&limit=100&rating=g"
        );
        // console.log(responseData.data);
        setDataFectch(responseData.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    gettingData();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  const changehandler = () => {
    const gettingData = async () => {
      try {
        setIsLoading(true);
        const responseData = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=sez5877u70MPPsIpRItAsRQRoKOM4qrQ&q=${search}&limit=100&offset=0&rating=g&lang=en`
        );
        // console.log(responseData.data);
        setDataFectch(responseData.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    gettingData();
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Form
        className="form_shadow w-75 align-items-center d-flex justify-content-center m-auto my-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <InputGroup className="">
          <Form.Control
            placeholder="Search GIF"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="success"
            id="button-addon2"
            type="submit"
            onClick={changehandler}
          >
            Search
          </Button>
        </InputGroup>
      </Form>
      <div className="row">
        {SliceDATA.map((e) => {
          return (
            <div className="col-md-3 my-3" key={e.id}>
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={e.images.fixed_height.url} style={{height:"200px"}} />
                {/* <p>hi</p> */}
              </Card>
            </div>
          );
        })}
        <Pagination
          setselectedPage={pageSelected}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={dataFetch.length}
        />
      </div>
    </>
  );
};

export default DisplayData;
