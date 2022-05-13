import { login, logout, getInfo} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: 'https://img.zcool.cn/community/01919c58f81259a8012049ef415bf5.jpg@1280w_1l_2o_100sh.jpg',
    userId:'',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERUID: (state, userId) => {
    state.userId = userId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }

}


const actions = {

  // user login
  login({ commit }, userInfo) {
    //解构出用户名和密码
    const { username, password,strCode,sessionId } = userInfo
    return new Promise((resolve, reject) => {
      //调用api/user里面的login方法
      login({ username: username.trim(), password: password ,strCode:strCode, 
        sessionId:sessionId}).then(response => {
        console.log("store中的login")
        console.log("response",response)
        console.log("x-access-token",response.headers['x-access-token']) 

        // const { token,expireTime } = response
        //把后端返回的token存到vuex中
        commit('SET_TOKEN', response.headers['x-access-token'])
        // commit('SET_TOKEN', token)
        //把后端返回的token存到cookies里面
        setToken(response.headers['x-access-token'])

        // 把后端返回的userid存在vuex中
        console.log("response.data.id",response.data.id) 
        commit('SET_USERUID', response.data.id)
        console.log("state.userId",state.userId) 
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // get user info
  getInfo({ commit, state }) {
    console.log("state.token",state.token)
    return new Promise((resolve, reject) => {
      getInfo({
        id: 1
      }).then(response => {
        const { data } = response
        console.log("getinfo",data)

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { reallyname, avatar } = data
        const reallyname=data.reallyname
        
        console.log("reallyname",reallyname)

        commit('SET_NAME', reallyname)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        // reject(error)\
        console.log(error, 'error ')
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

