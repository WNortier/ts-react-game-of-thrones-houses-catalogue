import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { generateUsers } from "../data/users";
import Paginator from "../components/Paginator";

function UsersTable() {
  const [appUsers, setAppUsers] = useState<
    { name: string; email: string; pass: string }[]
  >(generateUsers());

  const resetData = () => setAppUsers(generateUsers());

  const setAppUsersHandler = (
    newUsers: { name: string; email: string; pass: string }[],
  ) => {
    setAppUsers(newUsers);
  };

  return (
    <Container
      fluid
      id="characters-container"
      className="layout-basic-form layout-basic-table layout-basic-margin"
    >
      <h4>Users</h4>

      <Table striped bordered hover size="sm" className="layout-basic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Created</th> */}
          </tr>
        </thead>
        <tbody>
          {appUsers.map((u, i: number) => {
            return (
              <tr key={i}>
                <td> {u.name}</td>
                <td> {u.email}</td>
                {/* <td> {moment().subtract(1, 'days').calendar()}</td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paginator
        data={generateUsers()}
        records={generateUsers().length}
        setUserData={setAppUsersHandler}
        resetData={resetData}
      />
    </Container>
  );
}

export default UsersTable;
