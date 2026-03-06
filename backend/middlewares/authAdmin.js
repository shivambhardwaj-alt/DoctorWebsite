import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
  try {
    // 1 Get Authorization header
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.json({
        success: false,
        message: 'Token missing. Login again.',
      })
    }

    // 2 Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1]

    // 3 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 4 decoded is STRING because you signed a string
    const expectedPayload =
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD

    if (decoded !== expectedPayload) {
      return res.json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // 5 Authorized
    next()
  } catch (error) {
    console.error(error.message)
    return res.json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

export default authAdmin
