/**
 * function to return the all the details after success
 * @param {*} res
 * @param {*} data
 * @return {void}
 */
export function success(res, status, data) {
  return res.status(status).send({ data: data });
}

/**
 * function to return the failure data
 * @param {*} res
 * @param {*} status
 * @param {*} message
 * @return {void}
 */
export function failure(res, status, msg) {
  return res.status(status).json({ message: msg });
}
