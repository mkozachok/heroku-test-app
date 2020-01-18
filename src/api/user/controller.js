import {createCommonCtrl} from '../common/controller';
import { User } from './model';

const findUser = (email, callback) => User.findOne({ email }, callback);

export const userApi = {...createCommonCtrl(User), findUser};