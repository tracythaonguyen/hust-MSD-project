import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'

// import accountRouter from './routes/account.router.js'
import testRouter from './routes/test.router.js'
import categoryRouter from './routes/category.router.js'
import tagRouter from './routes/tag.router.js'
import learnerRouter from './routes/learner.router.js'
import videoRouter from './routes/video.router.js'
import trackRouter from './routes/track.router.js'
import progressRouter from './routes/progress.router.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 6969

// app.use('/account', accountRouter)
app.use('/test', testRouter)
app.use('/category', categoryRouter)
app.use('/tag', tagRouter)
app.use('/learner', learnerRouter)
app.use('/video', videoRouter)
app.use('/track', trackRouter)
app.use('/progress', progressRouter)

app.listen(port, () => {
  console.log('Backend is running on the port: ' + port)
})

export default app
