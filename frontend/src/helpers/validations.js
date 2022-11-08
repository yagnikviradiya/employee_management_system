const USER_NAME_REGEX = /^(([A-Za-z]*_)*(([A-Za-z*_]+\s)*[A-Za-z])){1,40}$/
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

const regExValidation = {
    name(value) {
        return (new RegExp(USER_NAME_REGEX).test(value))
    },
    email(value) {
        return new RegExp(EMAIL_REGEX).test(value)
    },
}
export default regExValidation;