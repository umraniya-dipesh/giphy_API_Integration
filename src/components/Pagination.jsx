import React from "react";

const Pagination = (props) => {
  const pageNumber = [];
  for (
    let index = 1;
    index <= Math.ceil(props.totalItems / props.itemsPerPage);
    index++
  ) {
    pageNumber.push(index);
  }
  return (
    <>
      <nav>
        <ul className="pagination pagination-sm justify-content-center ">
          {pageNumber.map((number,index) => {
            let classToggle = "page-item ";
            if (number === props.currentPage) {
              classToggle += "active";
            }
            return (
              <li className={classToggle} key={index}>
                <a
                  onClick={() => props.setselectedPage(number)}
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
