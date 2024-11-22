import * as React from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Button,
    Typography
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';

interface Data {
    id: number;
    idd: string;
    flags: string;
    cca2: string;
    cca3: string;
    name: string;
    native_name: string;
    alternativ_name: Array<string>;
    view?: string;
}

type Rows = {
    rows: Array<Data>;
    onSearch: (searchValue: string) => void;
    openModal: (id: number) => void;
};

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof Data>(
    order: Order,
    orderBy: Key
): (a: Data, b: Data) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
}

const headCells: readonly HeadCell[] = [
    // { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'flags', numeric: false, disablePadding: false, label: 'Flags' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'cca2', numeric: false, disablePadding: false, label: 'CCA2' },
    { id: 'cca3', numeric: false, disablePadding: false, label: 'CCA3' },
    { id: 'native_name', numeric: false, disablePadding: false, label: 'Native Name' },
    { id: 'alternativ_name', numeric: false, disablePadding: false, label: 'Alternative Name' },
    { id: 'idd', numeric: false, disablePadding: false, label: 'IDD' },
    { id: 'view', numeric: false, disablePadding: false, label: 'View' },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: keyof Data;
    rowCount: number;
}

const columnWidth: Record<keyof Data, string> = {
    id: '10%',
    idd: '10%',
    flags: '10%',
    name: '20%',
    native_name: '20%',
    alternativ_name: '20%',
    cca2: '5%',
    cca3: '5%',
    view: '10%',
};

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onRequestSort, order, orderBy } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            width: columnWidth[headCell.id], // Apply column width
                            backgroundColor: '#f5f5f5',
                            borderRight: index < headCells.length - 1 ? '1px solid #ccc' : undefined,
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTable: React.FC<Rows> = ({ rows, onSearch, openModal }) => {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [searchValue, setSearchValue] = React.useState('');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearch(value); // Pass search input to parent component
        setPage(0); // Reset page to 0
    };

    const handleRestSearch = () => {
        setSearchValue('');
        onSearch(''); // Pass search input to parent component
        setPage(0); // Reset page to 0
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Box className="flex justify-between items-center mb-4">
                <div>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        Country Table
                    </Typography>
                </div>
                <div className='w-1/4 flex justify-end items-center'>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search country..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="w-full relative"
                    />
                    {searchValue.length > 0 ?
                        <div
                            onClick={handleRestSearch}
                            className="text-gray-600 hover:text-red-500 absolute px-3 cursor-pointer"
                        >
                            <CloseIcon />
                        </div> :
                        <div
                            className="text-gray-600 absolute px-3 cursor-pointer"
                        >
                            <SearchIcon />
                        </div>
                    }
                </div>
            </Box>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <TableContainer
                    sx={{
                        minHeight: 720,
                        maxHeight: 720,
                        overflow: 'auto'
                    }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        stickyHeader
                    >
                        <EnhancedTableHead
                            numSelected={0}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={() => { }}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row) => (
                                <TableRow hover tabIndex={-1} key={row.id}>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.flags,
                                            borderRight: '1px solid #ccc',
                                        }}
                                    >
                                        <img src={row.flags} alt="flags" width={30} height={30} />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.name,
                                            cursor: 'pointer',
                                            borderRight: '1px solid #ccc',
                                        }}
                                        onClick={() => openModal(row.id)}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.cca2,
                                            borderRight: '1px solid #ccc',
                                        }}
                                    >
                                        {row.cca2}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.cca3,
                                            borderRight: '1px solid #ccc',
                                        }}
                                    >
                                        {row.cca3}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.native_name,
                                            borderRight: '1px solid #ccc',
                                        }}
                                    >
                                        {row.native_name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.alternativ_name,
                                            borderRight: '1px solid #ccc',
                                        }}
                                    >
                                        {row.alternativ_name.map((name, index) => (
                                            <React.Fragment key={index}>
                                                {name}
                                                {index < row.alternativ_name.length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: columnWidth.idd,
                                            borderRight: '1px solid #ccc',
                                        }}
                                    >
                                        {row.idd}
                                    </TableCell>
                                    <TableCell
                                        sx={{ width: columnWidth.view }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => openModal(row.id)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={8} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{ backgroundColor: '#f5f5f5' }}
                    rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default EnhancedTable;
