import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationUI from './components/TablePagination';
import { episodeOptions, locationOptions } from '../../data';
import { Button } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
    textTransform: 'uppercase',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function TableUI({ info, rows = [], episode = false, location = false, fetchMore }) {
  const classes = useStyles2();
  const history = useHistory();

  const handlerButton = (id) => {
    history.push(`/${(episode && 'episode') || (location && 'location')}/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <InfiniteScroll
        dataLength={rows.length}
        next={fetchMore}
        hasMore={info?.next ? true : false}
        loader={<h4>Loading...</h4>}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {episode
                ? episodeOptions.map((option) => (
                    <StyledTableCell key={option} align="left">
                      {option}
                    </StyledTableCell>
                  ))
                : location &&
                  locationOptions.map((option) => (
                    <StyledTableCell key={option} align="left">
                      {option}
                    </StyledTableCell>
                  ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows &&
              rows.map((row, index) => (
                <TableRow key={`${row.id}_${index}`}>
                  {episode ? (
                    <>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlerButton(row.id)}>
                          details
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    location && (
                      <>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">{row.dimension}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handlerButton(row.id)}>
                            details
                          </Button>
                        </TableCell>
                      </>
                    )
                  )}
                </TableRow>
              ))}

            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
}
