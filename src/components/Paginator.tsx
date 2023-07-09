import { Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import useTsPaginator from 'ts-paginator';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';

function Paginator(props: any) {

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

    useEffect(() => {
        _handleChangeTotalRecordCount(props.records);
        _handleChangeRowsPerPage(10);
        _handleChangePage(1);
        if (props.setUserData)
            props.setUserData([...props.data.filter((d: any, i: number) => (i > (rowsPerPage * 1) - rowsPerPage) && (i <= (rowsPerPage * +1)))]);

    }, [])


    const message = _determinePaginationMessage({ verb: 'Showing' });
    const paginationPages = _determinePaginationPages()

    const rowsPerPageOptions = _determineRowsPerPageOptions()

    const handleChangePaginationPage = (page: any) => {
        // if (e)s
        // e.preventDefault()
        _handleChangePage(+page)
        _determinePaginationPages()
        _determineRowsPerPageOptions()
        props.setUserData([...props.data.filter((d: any, i: number) => (i > (rowsPerPage * page) - rowsPerPage) && (i <= (rowsPerPage * +page)))]);
        // console.log(page, rowsPerPage)
        props.getChars(String(page), String(rowsPerPage))
        // console.log(currentPage)
        // console.log(totalRecordCount)
        // console.log(rowsPerPage)
        // console.log(_determinePaginationMessage())
    }



    let items: any = [];

    console.log(paginationPages)

    paginationPages.forEach((p, i) => p === 0 ? items.push(
        <Pagination.Ellipsis key={i} id="paginator-item" onClick={(e) => e.preventDefault()} />
    ) : items.push(
        // active={p === active}
        <Pagination.Item id="paginator-item" onClick={(e) => handleChangePaginationPage(p)} key={i} >
            {p}
        </Pagination.Item>,
    ))

    // for (let number = 0; number <= paginationPages.length; number++) {
    //     if (paginationPages[number] === 0) {
    //         items.push(
    //             <Pagination.Ellipsis key={number} id="paginator-item" onClick={(e) => e.preventDefault()} />
    //         );
    //     } else {

    //         items.push(
    //             // active={number === active}
    //             <Pagination.Item id="paginator-item" onClick={(e) => handleChangePaginationPage(number)} key={number} >
    //                 {number}
    //             </Pagination.Item>,
    //         );
    //     }

    // }

    const rppo = rowsPerPageOptions.map((o, i) =>

        <Dropdown.Item style={{ width: '300px' }} key={i} onClick={(e) => e.preventDefault()} href={String(o)}>{o}</Dropdown.Item>
    )

    const handleRowsPerPageDropdownChange = (e: any) => {
        _handleChangeRowsPerPage(+e)
        props.setData(props.fetcher().filter((d: any, i: number) => i < rowsPerPage * (currentPage + 1)))
        _handleChangeTotalRecordCount(props.fethcher().length)
    }

    const pagesUserInterfaceElement = (
        <Dropdown className='mr-auto'>
            <Dropdown.Toggle id="paginator-item" onSelect={handleRowsPerPageDropdownChange}>
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu id="app-font" className='w-100'>
                {rppo}
            </Dropdown.Menu>
        </Dropdown>
    )


    return (

        <Container id="paginator-container" className='p-o m-0 mt-3' >
            {/* {pagesUserInterfaceElement} */}
            <div className='mr-auto'>
                <div className="mb-2" style={{ display: 'flex', alignItems: 'end', color: '#000' }}>
                    Page {currentPage + 1}
                </div>
                <Pagination id="paginator">{items}</Pagination>
                <div style={{ display: 'flex', alignItems: 'end', color: '#000' }}>
                    {_determinePaginationMessage()}
                </div>
            </div>
        </Container>
    );
}
export default Paginator;