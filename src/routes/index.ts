import findMyWay from 'find-my-way'
import { homeController } from '../controller/home.controller'

const router = findMyWay()

router.on('GET', '/', homeController.home)
router.on('POST', '/data', homeController.postData)

export default router
