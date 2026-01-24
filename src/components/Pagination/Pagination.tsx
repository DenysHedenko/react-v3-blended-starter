import ReactPaginate from "react-paginate";
import  css from '../Pagination/Pagination.module.css'

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}


export default function Pagination({totalPages, onPageChange,currentPage}: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
            forcePage={currentPage - 1}
            pageLinkClassName={css.link}
        />
    )
}