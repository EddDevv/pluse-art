import React from "react";
import { Gap } from "../../utils/paginationNew/usePaginationNew";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

type PropsType = {
  page: number;
  prevPage: any;
  nextPage: any;
  setPage: any;
  gaps: Gap;
  totalPages: any;
};

const PaginationManager = ({
  page,
  prevPage,
  nextPage,
  setPage,
  gaps,
  totalPages,
}: PropsType) => {
  return (
    <>
      <div className="pagination">
        <Button
          onClick={prevPage}
          variant="contained"
          disabled={page === 1}
          sx={{
            height: "50px",
          }}
        >
          <ArrowBackIcon />
        </Button>
        <button
          onClick={() => setPage(1)}
          className={`page ${page === 1 && "active"}`}
        >
          1
        </button>
        {gaps.before ? "..." : null}

        {gaps.paginationGroup.map((el: number) => (
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
          className={`page ${page === totalPages && "disabled"}`}
        >
          {totalPages}
        </button>

        <Button
          onClick={nextPage}
          variant="contained"
          disabled={page === totalPages}
          sx={{
            height: "50px",
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </div>
    </>
  );
};

export default PaginationManager;
