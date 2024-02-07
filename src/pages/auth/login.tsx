import styles from './login.module.css';
import cn from 'classnames';
import React, {useCallback} from "react";
import {IApiAuth} from '../../services';
import {TAuth} from '../../types';
import {isAxiosError} from "axios";
import {LOCAL_STORAGE_KEY} from "../../utils/config";

function LoginPage() {

  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const formDataObject: TAuth.Login.Request = {
      UserName: '',
      Password: ''
    };

    formData.forEach((value, key) => {
      formDataObject[key as keyof TAuth.Login.Request] = value.toString()
    });

    try {
      const {SessionId} = await IApiAuth.Login(formDataObject)
      localStorage.setItem(LOCAL_STORAGE_KEY, SessionId)
    } catch (err) {
      if (isAxiosError(err)) {
        alert('Something went wrong')
      }
    }
  }, [])

  return <div>
    <div className={styles['login-page']}>
      <div className={styles['auth-modal']}>
        <h1 className={styles.h1}>Login</h1>
        <div className={styles['form-container']}>
          <form onSubmit={handleLogin}>
            <div className={cn(styles['login-input-box'])}>
              <label htmlFor="username">Username</label>
              <input className={cn(styles['login-input'])} type="text"
                     id="username" name="UserName"/>
            </div>
            <div className={cn(styles['login-input-box'])}>
              <label htmlFor="password">Password</label>
              <input className={cn(styles['login-input'])}
                     type="password" id="password" name="Password"/>
            </div>
            <button className={styles['login-btn']}
                    type="submit">Login
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
}

export default LoginPage;
