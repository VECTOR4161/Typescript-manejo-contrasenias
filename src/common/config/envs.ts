import 'dotenv/config';
import { get } from 'env-var' 


export const envs = {
    SECRET_KEY: get('SECRET_KEY').required().asString()
}