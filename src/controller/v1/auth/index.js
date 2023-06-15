const createError = require('http-errors')
const Account = require('../../service/account')
const { registerSchema, loginSchema } = require('../../helpers/validation_schema')
const { signAccessToken, verifyAccessToken } = require('../../helpers/jwt')

module.exports = {
  Register: async (req, res, next) => {
    try {
      // validation if (!name || !email || !password || !gender || !role) throw createError.BadRequest()
      const body = await registerSchema.validateAsync(req.body)

      // validation if email already exist
      const doesExist = await Account.Find({ email: body.email })
      if (doesExist)
        throw createError.Conflict(`${body.email} is already been registered`)

      const user = new Account(body)
      const savedAccount = await user.save()
      console.log(savedAccount.id)

      const accessToken = await signAccessToken(savedAccount.id)
      console.log(accessToken)

      return res.status(200).send({
        message: 'success',
        user: {
          id: savedAccount.id,
          name: savedAccount.name,
          email: savedAccount.email,
          role: savedAccount.role,
        },
        token: accessToken,
      })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  Login: async (req, res, next) => {
    try {
      // validation
      const body = await loginSchema.validateAsync(req.body)

      // if email not exist
      const user = await Account.findOne({ email: body.email })
      if (!user) throw createError.NotFound('Account not registered')

      // if password is not match
      const isMatch = await user.isValidPassword(body.password)
      if (!isMatch)
        throw createError.Unauthorized('Email/password not valid')
      console.log(isMatch)

      const accessToken = await signAccessToken(user.id)
      console.log(accessToken)

      return res.status(200).send({ 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: accessToken,
      })
    } catch (error) {
      console.log(error)
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid email/password'))
        console.log(error.isJoi)
      next(error)
    }
  },

  userAuthorization: async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    // decoded JWT Token
    const decodedResult = await verifyAccessToken(token)
    console.log(decodedResult.id)

    try {
      const user = await Account.findOne({ _id: decodedResult.id })
      console.log(user.id)
      if (user.role === 'admin') {
          return res.status(200).send({
              message: 'congratulations! there is no hidden content', name: user.name,
          });
      }
      return res.status(200).send({
          message: 'congratulations! but there is a hidden content', name: user.name,
      });
    } catch (error) {
      return res.status(401).send({message: 'invalid jwt token'});
    }
  },
}
