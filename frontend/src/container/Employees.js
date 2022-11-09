import React, { useEffect, useState } from 'react'
import NoResultFound from '../components/NoResultFound'
import { Api } from '../services/Api'
import ApiEndpoints from '../services/ApiEndpoints'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Typography,
  Button,
  Box,
  styled,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Table
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SearchAppBar from '../components/SearchAppBar';
import moment from 'moment';
import getAge from '../helpers/getAge';


const Employees = () => {
  const [loader, setLoader] = useState(true)
  const [employees, setEmployees] = useState(false)
  const [searchedEmployee, setSearchedEmployee] = useState([])
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => { getEmployees() }, [])
  useEffect(() => {
    // filter all post
    employees.length && setSearchedEmployee(applayFilter(filterInput, employees))
  }, [filterInput, employees])
  const naviget = useNavigate();

  // get all employees
  const getEmployees = async () => {
    try {
      const data = await Api.get(ApiEndpoints.employee.getEmployees)
      setLoader(false);
      if (data.data.success) {
        setEmployees(data.data.data)
        setSearchedEmployee(data.data.data)
      }
    } catch (err) {
      setLoader(false);
      throw err
    }
  }
  // search employee by first name, last name, and email
  const applayFilter = (filterInput, dataSource) => {
    if (dataSource.length && filterInput) {
      const filteredData = dataSource.filter((data) => {
        const first_name = data.first_name.toLowerCase()
        const last_name = data.last_name.toLowerCase()
        const email = data.email.toLowerCase()
        filterInput = filterInput.toLowerCase()
        if (first_name.includes(filterInput) ||
          email.includes(filterInput) ||
          last_name.includes(filterInput)) return true
        return false
      })
      return filteredData
    }
    return dataSource
  }
  // remove employee
  const removeEmployee = async (id) => {
    try {
      const data = await Api.delete(`${ApiEndpoints.employee.removeEmployeeById}/${id}`)
      if (data.data.success) {
        toast.success('Employee removed')
        getEmployees()
      }
    } catch (err) { throw err }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  
  return (
    <>
      <SearchAppBar setValue={(v) => setFilterInput(v)} />
      <Container sx={{ mt: 2 }} maxWidth="false">
        <ToastContainer />

        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
          Employees
        </Typography>
        <br />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => { naviget(`/add`); }}

            variant="contained"
            sx={{
              borderRadius: '30px',
              margin: '0px 15px 0px 0px',
              height: '28px',
              background: '#3198F9 0% 0% no-repeat padding-box',
              px: 5,
              py: 3,
              textTransform: 'none',
            }}
          >
            Add Employee
          </Button>
        </Box>
        <br />
        <TableContainer
          elevation={0}
          sx={{
            maxWidth: {
              xs: '365px',
              sm: '600px',
              md: '100%',
              lg: '100%',
            },
            '&::-webkit-scrollbar': {
              width: 10,
            },
            '&::-webkit-scrollbar': {
              height: '8px',
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#fff',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(224, 224, 224, 1)',
              borderRadius: '30px',
              width: '20px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#B0B0B0',
            },
          }}
          component={Paper}
        >
          <Table
            sx={{
              width: {
                xs: 'max-content',
                sm: 'max-content',
                md: '100%',
                lg: '100%',
              },
            }}
            size="small"
          >
            <TableHead>
              <StyledTableRow sx={{ whiteSpace: 'nowrap' }}>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Employee Type</StyledTableCell>
                <StyledTableCell align="left">Age</StyledTableCell>
                <StyledTableCell align="left">Hobbies</StyledTableCell>
                <StyledTableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  Action
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {searchedEmployee?.length
                ? searchedEmployee.map((employee, index) => (
                  <>             <StyledTableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <StyledTableCell align="left">
                      {employee?.first_name ?
                        employee?.first_name.length > 25
                          ? `${employee?.first_name?.slice(0, 25)}....`
                          : `${employee?.first_name} ${employee?.last_name}`
                        : '-'}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee?.email ? employee?.email : '-'}

                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee?.employee_type ? employee?.employee_type : '-'}

                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee?.DOB ?
                        getAge(employee?.DOB, moment().format())

                        : '-'}

                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee?.hobbies ?
                        employee?.hobbies.length > 25
                          ? `${employee?.hobbies?.slice(0, 20)}....`
                          : `${employee?.hobbies}`
                        : '-'}

                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      <Button>
                        <EditIcon
                          sx={{ m: 1 }}
                          onClick={() => { naviget(`/employee/update/${employee?._id}`); }}
                        />
                      </Button>
                      <Button>
                      </Button>
                      <Button>
                        <DeleteIcon
                          sx={{ m: 1, color: 'red' }}
                          onClick={() => {
                            if (
                              window.confirm(
                                'Are you sure you want to delete this employee?'
                              )
                            ) {
                              removeEmployee(employee?._id);
                            }
                          }}
                        />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                  </>
                ))
                : 'No record found'}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>




    </>
  )
}

export default Employees