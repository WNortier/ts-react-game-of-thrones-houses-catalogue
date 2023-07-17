import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import useTsPaginator from "ts-paginator";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

function Paginator(props: {
  searched?: boolean;
  resetData?: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  setData?: Dispatch<SetStateAction<never[]>>;
  data: { name: string; email: string; pass: string }[];
  records: number;
  setUserData?: (arg: { name: string; email: string; pass: string }[]) => void;
  getHouses?: (page: string, rows: string) => void;
  getChars?: (page: string, rows: string) => void;
  getBooks?: (page: string, rows: string) => void;
}) {
  const {
    totalRecordCount,
    rowsPerPage,
    currentPage,
    _determinePaginationMessage,
    _determinePaginationDisabledState,
    _determinePaginationPages,
    _determineRowsPerPageOptions,
    _handleChangeTotalRecordCount,
    _handleChangeRowsPerPage,
    _handleChangePage,
  } = useTsPaginator(props.records, 10);

  const initPagination = () => {
    _handleChangeTotalRecordCount(props.records);
    _handleChangeRowsPerPage(10);
    _handleChangePage(1);
    handlePages();
    dataFetcher();
  };

  useEffect(() => {
    initPagination();
  }, []);

  const dataFetcher = () => {
    if (props.setUserData)
      props.setUserData([
        ...props.data.filter(
          (d: object, i: number) =>
            i >= rowsPerPage * 1 - rowsPerPage && i <= rowsPerPage * +1,
        ),
      ]);
    if (props.getChars) props.getChars(String(1), String(10));
    if (props.getBooks) props.getBooks(String(1), String(10));
    if (props.getHouses) props.getHouses(String(1), String(10));
  };

  const handleChangePaginationPage = (page: number, rows?: number) => {
    const rowCount = rows ? rows : rowsPerPage;
    _handleChangeRowsPerPage(rowCount);
    _handleChangePage(+page);
    _determinePaginationPages();
    _determineRowsPerPageOptions();
    handlePages();
    // dataFetcher();
    if (props.setUserData)
      props.setUserData([
        ...props.data.filter(
          (d: { name: string; email: string; pass: string }, i: number) => {
            if (i) {
              return (
                i >= +(rowsPerPage * 1 - rowsPerPage) && i <= rowsPerPage * +1
              );
            }
          },
        ),
      ]);
    if (props.getChars) props.getChars(String(page), String(rowCount));
    if (props.getBooks) props.getBooks(String(page), String(rowCount));
    if (props.getHouses) props.getHouses(String(page), String(rowCount));
  };

  const handleNext = () => handleChangePaginationPage(currentPage + 1 + 1);
  const handlePrev = () => handleChangePaginationPage(currentPage + 1 - 1);
  const handleFirst = () => handleChangePaginationPage(1);
  const handleLast = () =>
    handleChangePaginationPage(
      _determinePaginationPages()[_determinePaginationPages().length - 1],
    );

  const handlePages = (): ReactNode[] => {
    const items: ReactNode[] = [];
    items.unshift(
      <Pagination.Next
        disabled={
          _determinePaginationPages()[
            _determinePaginationPages().length - 1
          ] === currentPage || totalRecordCount <= 10
        }
        id="paginator-item"
        onClick={() => handleNext()}
        key={Math.random()}
      ></Pagination.Next>,
    );
    items.unshift(
      <Pagination.First
        disabled={totalRecordCount <= 10}
        id="paginator-item"
        onClick={() => handleFirst()}
        key={Math.random()}
      ></Pagination.First>,
    );
    let arr: number[] = [];

    if (_determinePaginationPages().length === 0) {
      arr = [
        1,
        0,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
        0,
        23,
      ];
    } else {
      arr = _determinePaginationPages();
    }
    arr.forEach((p: number, i: number) =>
      p === 0
        ? items.push(
            <Pagination.Ellipsis
              key={i}
              id="paginator-item"
              onClick={(e) => e.preventDefault()}
            />,
          )
        : items.push(
            <Pagination.Item
              className={currentPage + 1 === p ? "paginator-item-active" : ""}
              id="paginator-item"
              onClick={() => handleChangePaginationPage(p)}
              key={i}
            >
              {p}
            </Pagination.Item>,
          ),
    );
    items.push(
      <Pagination.Prev
        id="paginator-item"
        disabled={currentPage === 0 || totalRecordCount <= 10}
        onClick={() => handlePrev()}
        key={Math.random()}
      ></Pagination.Prev>,
    );
    items.push(
      <Pagination.Last
        disabled={totalRecordCount <= 10}
        id="paginator-item"
        onClick={() => handleLast()}
        key={Math.random()}
      ></Pagination.Last>,
    );
    return items;
  };

  useEffect(() => {
    _handleChangeRowsPerPage(10);
    _handleChangePage(1);
    handlePages();
  }, [props.searched]);

  const handleRowsPerPageDropdownChange = (o: number) => {
    handleChangePaginationPage(1, o);
    window.scrollTo(0, 0);
    _determinePaginationMessage();
  };

  const pagesUserInterfaceElement = (
    <Dropdown style={{ marginRight: "10px", padding: "0px" }}>
      <Dropdown.Toggle
        disabled={_determinePaginationDisabledState()}
        style={{ padding: "0.55em", background: "#6D2369 !important" }}
      >
        {rowsPerPage}
      </Dropdown.Toggle>

      <Dropdown.Menu id="app-font" className="mr-5">
        <Dropdown.Item
          style={{ padding: "0.5em" }}
          key={0}
          onClick={(e: FormEvent) => {
            e.preventDefault();
            handleRowsPerPageDropdownChange(10);
          }}
        >
          10
        </Dropdown.Item>
        <Dropdown.Item
          style={{ padding: "0.5em" }}
          key={1}
          onClick={(e: FormEvent) => {
            e.preventDefault();
            handleRowsPerPageDropdownChange(50);
          }}
        >
          50
        </Dropdown.Item>
        {/* {rppo} */}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Container id="paginator-container" className="p-o m-0 mt-2">
      <div className="mr-auto">
        <div
          className="mb-3 mt-4"
          style={{ display: "flex", alignItems: "end", color: "#000" }}
        >
          Page {currentPage + 1}
        </div>

        <div className="flex">
          {pagesUserInterfaceElement}
          <Pagination id="paginator">{handlePages()}</Pagination>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "end",
            color: "#000",
            paddingBottom: "1.5em",
          }}
        >
          {_determinePaginationMessage()}
        </div>
      </div>
    </Container>
  );
}

export default Paginator;
