import express from 'express'
import {StoreUsersJSON} from '../controllers/StoreJSONfromUserController.js'
import {SendJSON} from '../controllers/SendJSONtoUserController.js'
const router = express.Router();

router.post('/*', StoreUsersJSON)

router.get('/*', SendJSON)


export{ 
    router
}