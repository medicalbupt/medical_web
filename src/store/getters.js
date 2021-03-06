const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  userCreateTime: state => state.user.userCreateTime,
  userModifyTime: state => state.user.userModifyTime,
  userRole: state => state.user.userRole,
  userPhone: state => state.user.userPhone,
  userName: state => state.user.userName,
}
export default getters
