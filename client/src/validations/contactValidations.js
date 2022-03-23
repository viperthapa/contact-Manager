const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  }
  if (!values.phone[0]["home"]) {
    errors.home = "Home Number is required!";
  } else if (values.phone[0]["home"].length > 10) {
    errors.home = "Phone cannot exceed more than 10 characters";
  }
  if (!values.phone[0]["work"]) {
    errors.work = "Work Number is required!";
  } else if (values.phone[0]["work"].length > 10) {
    errors.work = "Phone cannot exceed more than 10 characters";
  }
  if (!values.phone[0]["mobile"]) {
    errors.mobile = "Mobile Number is required!";
  } else if (values.phone[0]["mobile"].length > 10) {
    errors.mobile = "Phone cannot exceed more than 10 characters";
  }
  if (!values.profile) {
    errors.image = "Image is required!";
  }
  return errors;
};

export default validate;
