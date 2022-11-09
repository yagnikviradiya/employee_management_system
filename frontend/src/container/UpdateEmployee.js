import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Container,
  TextField,
  Box,
  Grid,
  OutlinedInput,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  CircularProgress,
} from '@mui/material'
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import FormError from '../components/FormError';
import UploadFile from '../components/UploadFile';
import regExValidation from '../helpers/validations';
import { Api } from '../services/Api';
import ApiEndpoints from '../services/ApiEndpoints';

const UpdateEmployee = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    DOB: '',
    employeeType: 'office workplace',
    hobbies: [],
    images: '',
  });
  const [employeeDetailsError, setEmployeeDetailsError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    DOB: '',
    employeeType: '',
    hobbies: [],
    images: '',
  });
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  const params = useParams();

  const hobbies = [
    'Java learning',
    'CakePHP learning',
    'Anguler learning',
    'Node learning',
  ];

  useEffect(() => { getEmployeeDetails() }, [])

  // get employee initial details
  const getEmployeeDetails = async () => {
    try {
      if (params.id) {
        const data = await Api.get(`${ApiEndpoints.employee.getEmployeeById}/${params.id}`)
        if (data.data.success) {
          let setInitialEmployeeDetails = data.data.data
          const {
            first_name,
            last_name,
            email,
            profile_pic,
            employee_type,
            DOB,
          } = setInitialEmployeeDetails
          setEmployeeDetails({
            firstName: first_name,
            lastName: last_name,
            email: email,
            DOB: moment(setInitialEmployeeDetails.DOB).format('yyyy-MM-DD'),
            employeeType: employee_type,
            hobbies: hobbies,
            images: profile_pic,
          })
        } else toast.error(data.data.message)
        // initialEmployeeDetails
      } else toString.error('employee id required')
    } catch (err) { throw err }
  }

  // handle input change set values in state
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setEmployeeDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }
  // age is grater 17 years validation
  const IsAgeValid = (DOB) => {
    const minAge = new Date(moment().subtract(17, 'years').calendar()).getTime()
    const currentDate = new Date(DOB).getTime()
    return (Math.sign(minAge - currentDate))
  }

  // set validation message in in error state
  const checkValidation = () => {
    const { firstName,
      lastName,
      email,
      DOB,
      hobbies,
      images } = employeeDetails;

    if (regExValidation.name(firstName)) {
      setEmployeeDetailsError(prev => ({ ...prev, firstName: '' }))
    } else {
      setEmployeeDetailsError(prev => ({ ...prev, firstName: 'Please enter valid first name' }))
    }
    if (regExValidation.name(lastName)) {
      setEmployeeDetailsError(prev => ({ ...prev, lastName: '' }))
    } else {
      setEmployeeDetailsError(prev => ({ ...prev, lastName: 'Please enter valid last name' }))
    }
    if (regExValidation.email(email)) {
      setEmployeeDetailsError(prev => ({ ...prev, email: '' }))
    } else {
      setEmployeeDetailsError(prev => ({ ...prev, email: 'Please enter valid email' }))
    }
    if (DOB) {
      if (IsAgeValid(DOB) == -1) {
        setEmployeeDetailsError(prev => ({ ...prev, DOB: 'date of birth must be 17 years before' }))
      } else if (IsAgeValid(DOB) == 1 || IsAgeValid(DOB) == 0) {
        setEmployeeDetailsError(prev => ({ ...prev, DOB: '' }))
      }
    } else {
      setEmployeeDetailsError(prev => ({ ...prev, DOB: 'Please enter valid date of birth' }))
    }
    if (hobbies && hobbies?.length) {
      setEmployeeDetailsError(prev => ({ ...prev, hobbies: '' }))
    } else {
      setEmployeeDetailsError(prev => ({ ...prev, hobbies: 'Please enter hobbies' }))
    }
    if (images && images?.length) {
      setEmployeeDetailsError(prev => ({ ...prev, images: '' }))
    } else {
      setEmployeeDetailsError(prev => ({ ...prev, images: 'Please enter profile picture' }))
    }
  }

  // call api for add employee
  const addEmployeeDetails = async () => {
    try {
      setLoader(true)
      const { firstName,
        lastName,
        email,
        DOB,
        employeeType,
        hobbies,
        images } = employeeDetails;
      const convertedDOB = moment(DOB).format('');
      const formData = new FormData();
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('email', email)
      if(Array.isArray(images)){formData.append('profile_pic', images[0].file);}
      else  {formData.append('fileurl', images);}
      formData.append('employee_type', employeeType)
      formData.append('DOB', convertedDOB)
      formData.append('hobbies', hobbies)
      const data = await Api.put(`${ApiEndpoints.employee.updateEmployeeById}/${params.id}`, formData)
      setLoader(false);
      if (data.data.success) {
        toast.success('Employee updated successfully')
        navigate('/employees')
      } else { toast.error(data.data.message); }
    } catch (err) {
      setLoader(false)
      toast.error(err.message ?? 'something want to wrong')
      throw err;
    }
  }

  // submit employee details
  const submitEmployeeDetails = (e) => {
    const { firstName,
      lastName,
      email,
      DOB,
      hobbies,
      images } = employeeDetails;
    e.preventDefault();
    checkValidation();
    if (
      regExValidation.name(firstName) &&
      regExValidation.name(lastName) &&
      regExValidation.email(email) &&
      hobbies && hobbies?.length &&
      images && images?.length &&
      DOB && (IsAgeValid(DOB) !== -1)
    ) addEmployeeDetails();
  }

  return (
    <>
      <ToastContainer />
      <Container maxWidth='md'>
        <form onSubmit={submitEmployeeDetails}>
          <Card sx={{ mt: '30px' }}>
            <Typography variant='h5'
              sx={{
                mt: '10px',
                mb: '30px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>UPDATE EMPLOYEE</Typography>
            <CardContent>
              <Box sx={{ mb: '30px' }}>
                <TextField
                  name='firstName'
                  value={employeeDetails?.firstName}
                  onChange={handleOnChange}
                  label="First name"
                  fullWidth />
                <FormError>{employeeDetailsError.firstName}</FormError>
              </Box>
              <Box sx={{ mb: '30px' }}>
                <TextField
                  name='lastName'
                  value={employeeDetails?.lastName}
                  onChange={handleOnChange}
                  label="Last name"
                  fullWidth />
                <FormError>{employeeDetailsError.lastName}</FormError>
              </Box>
              <Box sx={{ mb: '30px' }}>
                <TextField
                  name='email'
                  value={employeeDetails?.email}
                  onChange={handleOnChange}
                  label="Email"
                  fullWidth
                />
                <FormError>{employeeDetailsError.email}</FormError>
              </Box>
              <Grid container spacing={2.5}>
                <Grid item xs={6}>
                  <Box sx={{ mb: '30px' }}>
                    {/*  upload file */}
                    <UploadFile
                      images={employeeDetails.images}
                      setImages={(v) => setEmployeeDetails({ ...employeeDetails, images: v })} />
                    <FormError>{employeeDetailsError.images}</FormError>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: '30px' }}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Employee type</FormLabel>
                      <RadioGroup
                        name='employeeType'
                        value={employeeDetails?.employeeType}
                        onChange={handleOnChange}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                      >
                        <FormControlLabel value="WFH" control={<Radio />} label="WFH" />
                        <FormControlLabel sx={{ ml: '20px' }} value="office workplace" control={<Radio />} label="Office workplace" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2.5}>
                <Grid item xs={6}>
                  <Box sx={{ mb: '30px' }}>
                    <TextField
                      id="date"
                      label="Date of birth"
                      type="date"
                      name='DOB'
                      initialvalue={employeeDetails?.DOB}
                      value={employeeDetails?.DOB}
                      onChange={handleOnChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <FormError>{employeeDetailsError.DOB}</FormError>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: '30px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-name-label">Hobbies</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        name='hobbies'
                        value={employeeDetails?.hobbies}
                        onChange={handleOnChange}
                        input={<OutlinedInput label="Name" />}
                      >
                        {hobbies.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormError>{employeeDetailsError.hobbies}</FormError>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ float: 'right' }}>
              <Button
                startIcon={loader ? <CircularProgress color='inherit' /> : null}
                type='submit'
                sx={{
                  m: '10px',
                  width: '125px',
                  height: '40px',
                }}
                variant='contained'>Submit</Button>
            </CardActions>
          </Card>
        </form>
      </Container>
    </>
  )
}

export default UpdateEmployee
