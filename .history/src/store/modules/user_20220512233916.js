import { login, logout, getInfo} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    // 用户名字
    name: '',
    // 头像
    avatar: 'https://img.zcool.cn/community/01919c58f81259a8012049ef415bf5.jpg@1280w_1l_2o_100sh.jpg',
    // 用户id
    userId:'',
    // 用户创建时间
    userCreateTime:'',
    // 用户修改时间
    userModifyTime:'',
    // 用户角色信息
    userRole:'',
    // 用户手机号
    userPhone:'',
    // 用户账号名
    userName:""
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
  // 用户名字
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERCREATETIME:(state, userCreateTime) => {
    state.userCreateTime = userCreateTime
  },
  SET_USERMODIFYTIME:(state, userModifyTime) => {
    state.userModifyTime = userModifyTime
  },
  SET_USERROLE:(state, userRole) => {
    state.userRole = userRole
  },
  SET_USERPHONE:(state, userPhone) => {
    state.userPhone = userPhone
  },
  SET_USERNAME:(state, userName) => {
    state.userName = userName
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

