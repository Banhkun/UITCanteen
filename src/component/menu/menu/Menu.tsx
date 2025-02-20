// import menuItems from "../../../data/items.json";
// import anothermenuItems from "../../../data/items2.json";

import {
  Col,
  Container,
  Row,
  Button,
  Stack,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  ButtonGroup,
} from "react-bootstrap";
import { MenuItem } from "../menuitem/MenuItem";
import { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

export function Menu() {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Món chính", value: "1" },
    { name: "Món phụ", value: "2" },
  ];
  const checkButton = (currentTargetvalue: any) => {
    setRadioValue(currentTargetvalue);
    console.log(currentTargetvalue);
  };
  axios.defaults.withCredentials = true;

  // axios
  //   .get("https://uitbackend.onrender.com/menu")
  //   .then((response) => {
  //     dishItem = response.data.menu;
  //   });

  const [dishItemMain, setDishItemMain] = useState([]);
  const [dishItemSide, setDishItemSide] = useState([]);

  useEffect(() => {
    async function getDish() {
      const responseMenu = await axios.get(
        "https://uitbackend.onrender.com/menu"
      );
      const fullMenu = responseMenu.data.menu;
      const storedMenu = JSON.stringify(fullMenu);
      window.localStorage.setItem("fullMenu", storedMenu);
      // if (window.localStorage.getItem("fullMenu")) {
      //   const getfullMenu:any = JSON.parse(window.localStorage.getItem("fullMenu"));
      //   console.log(getfullMenu);
      // }
      const data_main = await axios.get(
        "https://uitbackend.onrender.com/menu/main"
      );
      setDishItemMain(data_main.data.menu);
      const data_side = await axios.get(
        "https://uitbackend.onrender.com/menu/side"
      );
      setDishItemSide(data_side.data.menu);
      return data_main.data.menu, data_side.data.menu;
    }
    getDish();
  }, [
    "https://uitbackend.onrender.com/menu",
    "https://uitbackend.onrender.com/menu/main",
    "https://uitbackend.onrender.com/menu/side",
  ]);

  return (
    <>
      <Container fluid className="">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={"outline-danger"}
            // name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={() => checkButton(radio.value)}
            // className="d-flex justify-content-center w-50"
            // style={{
            //   width: "300px",
            //   height: "70.45px",
            // }}
            className="Button_radio"
          >
            <div className="p-1">
              <text className="Text_radio">{radio.name}</text>
            </div>
          </ToggleButton>
        ))}
        {radioValue === "1" && (
          <Container fluid className="containerMenu">
            <Row md={2} xs={3} lg={3}>
              {dishItemMain.map((item: any) => (
                // <Col>{JSON.stringify(item)}</Col>
                <Col key={item.DishId} className="g-3">
                  <MenuItem {...item} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
        {radioValue === "2" && (
          <Container fluid className="containerMenu">
            <Row md={2} xs={3} lg={3}>
              {dishItemSide.map((item: any) => (
                // <Col>{JSON.stringify(item)}</Col>
                <Col key={item.DishId} className="g-3">
                  <MenuItem {...item} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}
