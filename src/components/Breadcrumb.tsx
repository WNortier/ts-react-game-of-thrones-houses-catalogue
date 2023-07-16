import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";

function AppBreadcrumb(props: { name?: string; house?: string }) {
  const navigate = useNavigate();
  return (
    <Breadcrumb style={{ padding: "2em 0 0 5em", color: "white !important" }}>
      <Breadcrumb.Item
        style={{ color: "white !important" }}
        onClick={() => {
          props.house ? navigate("/houses") : navigate("/characters");
        }}
      >
        {props.house ? "Houses" : "Characters"}{" "}
      </Breadcrumb.Item>
      <Breadcrumb.Item style={{ color: "white" }} onClick={() => true}>
        {props.house ? props.house : props.name}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
