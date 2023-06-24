import React from "react";
import { Pagination } from "../../components/Home/ContReview/Pagination";

export const PaginationHome = ({
  items,
  countOnPage,
  prevPage,
  nextPage,
  paginate,
}) => {
  return (
    <div className="pagination_p">
      <div className="containerP">
        <li onClick={prevPage} className="prev_pag ">
          <i className="fa fa-arrow-left" aria-hidden="true" />
        </li>
        <Pagination
          itemsPerPage={countOnPage}
          totalItems={items.length}
          paginate={paginate}
          className={"prev_pag "}
        />
        <li onClick={nextPage} className="prev_pag ">
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </li>
      </div>
    </div>
  );
};
