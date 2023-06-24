import React from "react";

type PropsType = {
  page: number;
  prevPage: any;
  nextPage: any;
  setPage: any;
  gaps: any;
  totalPages: any;
};

const Pagination = ({
  page,
  prevPage,
  nextPage,
  setPage,
  gaps,
  totalPages,
}: PropsType) => {
  return (
    <>
      {/* *******************************************Pagination**************************************** */}

      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`page ${page === 1 ? "disabled" : ""}`}
        >
          {"<<"}
        </button>
        <button
          onClick={() => setPage(1)}
          className={`page ${page === 1 && "active"}`}
        >
          1
        </button>
        {gaps.before ? "..." : null}

        {gaps.paginationGroup.map((el: any) => (
          <button
            onClick={() => setPage(el)}
            key={el}
            className={`page ${page === el ? "active" : ""}`}
          >
            {el}
          </button>
        ))}
        {gaps.after ? "..." : null}
        <button
          onClick={() => setPage(totalPages)}
          className={`page ${page === totalPages && "active"}`}
        >
          {totalPages}
        </button>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className={`page ${page === totalPages && "disabled"}`}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Pagination;
